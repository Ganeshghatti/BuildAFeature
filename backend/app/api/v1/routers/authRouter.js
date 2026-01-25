const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../../../middlewares/authMiddleware');
const { authLimiter, otpLimiter } = require('../../../middlewares/rateLimiter');
const {
  sendSignupOTPValidation,
  verifySignupOTPValidation,
  loginValidation,
} = require('../schemas/authSchemas');

// Public routes with rate limiting
// OTP endpoints have stricter rate limits
router.post('/signup/send-otp', otpLimiter, sendSignupOTPValidation, authController.sendSignupOTP);
router.post('/signup/verify-otp', otpLimiter, verifySignupOTPValidation, authController.verifySignupOTP);
// Login has auth rate limiter
router.post('/login', authLimiter, loginValidation, authController.login);

// Protected routes
router.get('/me', authMiddleware, authController.getCurrentUser);
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;
