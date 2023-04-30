const express = require("express");
const router = express.Router();

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

router.post("/register", registrationCheck, registrationController);
router.post("/login", loginCheck, loginController);
router.post("/logout", authMiddileware, logoutController);
router.get("/current", authMiddileware, currentUserController);

module.exports = router;
