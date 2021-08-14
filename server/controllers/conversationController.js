const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Conversation = require("../modals/conversationModal");

// @desc  create new conversation
// @route POST /api/v1/conversations
// @access  private

exports.newConversation = catchAsync(async (req, res, next) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  const saveConversation = await newConversation.save();
  if (saveConversation) {
    res.status(200).json(saveConversation);
  } else {
    return next(new AppError("conversation faild", 404));
  }
});

exports.getConversation = catchAsync(async (req, res, next) => {
  const conversation = await Conversation.find({
    members: { $in: [req.params.userId] },
  });
  if (conversation) {
    res.status(200).json(conversation);
  } else {
    return next(new AppError("conversation faild due to invalid user", 404));
  }
});
