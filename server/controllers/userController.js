const User = require("../modals/userModal");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const generateToken = require("./../utils/generateToken");
const filterObj = require("../helper/filterObj");
const bcrypt = require("bcryptjs");
var moment = require("moment");

// @desc  Auth user & get token
// @route POST /api/users/v1/login
// @access  public

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      status:"success",
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "invalid email or password",
    });
    return next(new AppError("Invalid email or password", 404));
  }
});

// @desc  Register New User
// @route POST /api/users
// @access  Public

exports.registerUser = catchAsync(async (req, res, next) => {
  const { username, email, password, passwordConfirm } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) return next(new AppError("User already exists", 404));
  const user = await User.create({
    username,
    email,
    password,
    passwordConfirm,
  });
  if (user) {
    res.status(200).json({
      status: "success",
      id: user._id,
      username: user.username,
      email: user.email,
      joined: moment(user.joined).format("YYYY-MM-DD"),
      token: generateToken(user._id),
    });
  } else {
    return next(new AppError("User not found", 404));
  }
});

// @desc  Get user profile
// @route GET /api/users/v1/profile
// @access  Private

exports.getUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) return next(new AppError("User not found", 404));

  res.status(200).json({
    status: "success",
    _id: user._id,
    username: user.username,
    email: user.email,
    joined: moment(user.joined).format("YYYY-MM-DD"),
  });
});
// @desc  Update profile
// @route PATCH /api/users/v1/profile
// @access  Private

exports.updateUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const filteredBody = filterObj(req.body, user, "username", "email");
  const updateUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: updateUser,
  });
});

// @desc  Update Passowrd
// @route PATCH /api/users/v1/updatePassword
// @access  Private

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { password, newPassword, passwordConfirm } = req.body;

  const { email } = await User.findById(req.user._id);
  const user = await User.findOne({ email });

  if (await user.matchPassword(password)) {
    if (newPassword === passwordConfirm) {
      const salt = await bcrypt.genSalt(10);
      const passwordUpdate = await bcrypt.hash(newPassword, salt);
      await User.findByIdAndUpdate(req.user._id, {
        password: passwordUpdate,
      });
      res.status(200).json({
        status: "success",
        message: "password change successfully",
      });
    } else {
      res.status(200).json({
        status: "fail",
        message: "password not match",
      });
    }
  } else {
    res.status(200).json({
      status: "fail",
      message: "old password is wrong",
    });
    return next(new AppError("Invalid email or password", 404));
  }
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({}).select("-password");
  res.status(200).json({
    status: "success",
    data: users,
  });
});
