const router = require("express").Router();
const profileController = require("../controllers/profileController");

const auth = require("../middleware/authMiddleware");

router.route("/:id").get(profileController.getProfile);
router.route("/all/:id").get(profileController.get_others_profile);
router.route("/").patch(auth.protect, profileController.updateProfile);

module.exports = router;
