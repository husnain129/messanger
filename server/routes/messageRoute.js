const router = require("express").Router();
const messageController = require("../controllers/messageController");

router.route("/").post(messageController.newMessage);
router.route("/:conversationId").get(messageController.getMessage);

module.exports = router;
