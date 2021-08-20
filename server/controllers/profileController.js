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
            res.status(404).json({
                status: "fail",
                message: "Profile with this id not found",
            });
        }
    } else {
        res.status(404).json({
            status: "fail",
            message: "User not found",
        });
    }
});

exports.get_others_profile = catchAsync(async (req, res, next) => {
    const profiles = await Profile.find({}).populate("user", "_id username");
    let data = profiles.filter(e=>parseInt(e.user._id) !== parseInt(req.params.id))    
    res.status(200).json({
        status: "success",
        profiles:data,
    });
});

exports.updateProfile = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    if (user) {
        const profile = await Profile.findOne({ user: user._id });
        if (profile) {
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

            const updatedProfile = await Profile.findByIdAndUpdate(
                profile._id, {
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
                    gender: gender || profile.gender
                }, {
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

            console.log(lastName,
                image,
                gallery,
                city,
                country,
                faceBook,
                gitHub,
                twitter,
                phone)

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
            console.log(saveProfile);
            res.status(200).json({
                status: "success",
                profile: saveProfile,
            });
        }
    } else {
        return next(new AppError("User not found", 404));
    }
});