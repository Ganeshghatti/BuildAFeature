const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../../../middlewares/authMiddleware");
const {
  sendSignupOTPValidation,
  verifySignupOTPValidation,
  loginValidation,
} = require("../schemas/authSchemas");

// Public routes
router.post(
  "/signup/send-otp",
  sendSignupOTPValidation,
  authController.sendSignupOTP,
);
router.post(
  "/signup/verify-otp",
  verifySignupOTPValidation,
  authController.verifySignupOTP,
);
router.post("/login", loginValidation, authController.login);

// Protected routes
router.get("/me", authMiddleware, authController.getCurrentUser);
router.post("/logout", authMiddleware, authController.logout);

module.exports = router;
