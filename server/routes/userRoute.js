const router = require("express").Router();
const userController = require("../controllers/userController");

const auth = require("../middleware/authMiddleware");

router
  .route("/")
  .post(userController.registerUser)
  .get(userController.getAllUsers);

router.route("/login").post(userController.login);

router
  .route("/profile")
  .get(auth.protect, userController.getUserProfile)
  .patch(auth.protect, userController.updateUserProfile);

router
  .route("/updatePassword")
  .patch(auth.protect, userController.updatePassword);

module.exports = router;
