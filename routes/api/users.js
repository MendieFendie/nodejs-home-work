const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "tmp/" });

const {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
} = require("../../controllers/usersController");

const {
  registrationCheck,
  loginCheck,
} = require("../../validators/validateUser");
const authMiddileware = require("../../validators/authMiddileware");
const avatarController = require("../../controllers/avatarController");

router.post("/register", registrationCheck, registrationController);
router.post("/login", loginCheck, loginController);
router.post("/logout", authMiddileware, logoutController);
router.get("/current", authMiddileware, currentUserController);
router.patch(
  "/avatars",
  authMiddileware,
  upload.single("avatar"),
  avatarController
);

module.exports = router;
