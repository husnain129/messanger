const router = require("express").Router();
const conversationController = require("../controllers/conversationController");

router.route("/").post(conversationController.newConversation);
router.route("/:userId").get(conversationController.getConversation);

module.exports = router;
