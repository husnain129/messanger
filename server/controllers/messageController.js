const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Message = require("../modals/messageModal");

exports.newMessage = catchAsync(async (req, res, next) => {
  const newMessage = new Message(req.body);
  try {
    const message = await newMessage.save();
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
});

exports.getMessage = catchAsync(async (req, res, next) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});
