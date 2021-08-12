const User = require("../modals/userModal");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const generateToken = require("./../utils/generateToken");
const filterObj = require("../helper/filterObj");
const bcrypt = require("bcryptjs");
var moment = require("moment");

// @desc  Auth user & get token
// @route POST /api/users/login
// @access  public

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastname,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
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
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    passwordConfirm,
    address,
    gender,
  } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) return next(new AppError("User already exists", 404));
  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password,
    passwordConfirm,
    address,
    gender,
  });
  if (user) {
    res.status(200).json({
      status: "success",
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      image: user.image,
      address: user.address,
      joined: moment(user.joined).format("YYYY-MM-DD"),
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    return next(new AppError("User not found", 404));
  }
});

// @desc  Get user profile
// @route GET /api/users/profile
// @access  Private

exports.getUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) return next(new AppError("User not found", 404));

  res.status(200).json({
    status: "success",
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    image: user.image,
    email: user.email,
    joined: moment(user.joined).format("YYYY-MM-DD"),
    address: user.address,
    isAdmin: user.isAdmin,
  });
});
// @desc  Update profile
// @route PATCH /api/users/profile
// @access  Private

exports.updateUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const filteredBody = filterObj(
    req.body,
    user,
    "firstName",
    "lastName",
    "username",
    "email",
    "address",
    "image",
    "bookIssued"
  );
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
// @route PATCH /api/users/updatePassword
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

// @desc  Get Admin
// @route GET /api/users
// @access  Private/Admin

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.find({}).select("-password");
  res.status(200).json({
    status: "success",
    user,
  });
});

// @desc  Delte user
// @route DELETE /api/users/:id
// @access  Private/Admin

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) return next(new AppError("User not found", 404));
  await user.remove();
  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
});

// @desc  Get user
// @route GET /api/users/:id
// @access  Private/Admin

exports.getUserByIdByAdmin = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return next(new AppError("User not found", 404));
  res.status(200).json({
    status: "success",
    user,
  });
});

// @desc  Update User
// @route PUT /api/users/:id
// @access  Private/Admin

exports.updateUserByAdmin = catchAsync(async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    user,
    "firstName",
    "lastName",
    "username",
    "email",
    "isAdmin"
  );
  const updateUser = await User.findByIdAndUpdate(req.params.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    id: updateUser._id,
    firstName: updateUser.firstName,
    lastName: updateUser.lastName,
    username: updateUser.username,
    email: updateUser.email,
    fine: updateUser.fine,
    isAdmin: updateUser.isAdmin,
  });
});
