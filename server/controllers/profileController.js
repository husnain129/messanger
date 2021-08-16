const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Profile = require("../modals/profileModal");
const User = require("../modals/userModal");

exports.getProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user) {
    const profile = await Profile.findOne({ user: user._id }).populate(
      "user",
      "_id username"
    );
    if (profile) {
      res.status(200).json({
        status: "success",
        profile,
      });
    } else {
      return next(new AppError("Profile with this id not found", 404));
    }
  } else {
    return next(new AppError("User not found", 404));
  }
});

exports.getAllProfiles = catchAsync(async (req, res, next) => {
  const profiles = await Profile.find({}).populate("user", "_id username");
  res.status(200).json(profiles);
});

exports.updateProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const {
      firstName,
      lastName,
      image,
      gallery,
      city,
      country,
      faceBook,
      gitHub,
      twitter,
      phone,
      dob,
      gender,
    } = req.body;
    const profile = await Profile.findOne({ user: user._id });
    if (profile) {
      const updateProfile = new Profile({
        user: req.user._id,
        firstName: firstName || profile.firstName,
        lastName: lastName || profile.lastName,
        image: image || profile.image,
        gallery: gallery || profile.gallery,
        city: city || profile.city,
        country: country || profile.country,
        faceBook: faceBook || profile.faceBook,
        gitHub: gitHub || profile.gitHub,
        twitter: twitter || profile.twitter,
        phone: phone || profile.phone,
        dob: dob || profile.dob,
        gender: gender || profile.gender,
      });
      const saveProfile = await updateProfile.save();
      res.status(200).json({
        status: "success",
        profile: saveProfile,
      });
    } else {
      const newProfile = new Profile({
        user: req.user._id,
        firstName,
        lastName,
        image,
        gallery,
        city,
        country,
        faceBook: String,
        gitHub: String,
        twitter: String,
        phone,
        dob,
        gender,
      });

      const saveProfile = await newProfile.save();
      res.status(200).json({
        status: "success",
        profile: saveProfile,
      });
    }
  } else {
    return next(new AppError("User not found", 404));
  }
});
