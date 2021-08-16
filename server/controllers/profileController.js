const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Profile = require("../modals/profileModal");
const User = require("../modals/userModal");
const filterObj = require("../helper/filterObj");

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
  res.status(200).json({
    status: "success",
    profiles,
  });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const profile = await Profile.findOne({ user: user._id });
    if (profile) {
      const filteredBody = filterObj(
        req.body,
        "firstName",
        "lastName",
        "image",
        "gallery",
        "city",
        "country",
        "faceBook",
        "gitHub",
        "twitter",
        "phone",
        "dob",
        "gender"
      );
      console.log("profile id = ", profile._id);
      const updatedProfile = await Profile.findByIdAndUpdate(
        profile._id,
        filteredBody,
        {
          new: true,
          runValidators: true,
        }
      );
      res.status(200).json({
        status: "success",
        data: {
          profile: updatedProfile,
        },
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
        faceBook,
        gitHub,
        twitter,
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
