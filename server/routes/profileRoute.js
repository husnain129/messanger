const router = require("express").Router();
const profileController = require("../controllers/profileController");

const auth = require("../middleware/authMiddleware");

router.route("/:id").get(profileController.getProfile);
router.route("/all").get(profileController.getAllProfiles);
router.route("/").patch(auth.protect, profileController.updateProfile);

module.exports = router;
