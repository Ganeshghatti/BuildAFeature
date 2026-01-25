const authService = require('../../../services/authService');
const { successResponse, errorResponse } = require('../../../utils/response');
const { HTTP_STATUS } = require('../../../core/constants');
const config = require('../../../core/config');

class AuthController {
  /**
   * Send OTP for signup
   */
  async sendSignupOTP(req, res) {
    try {
      const { email, phone } = req.body;
      const result = await authService.sendSignupOTP(email, phone);
      return successResponse(res, result, 'OTP sent successfully', HTTP_STATUS.OK);
    } catch (error) {
      const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      return errorResponse(res, error.message, statusCode);
    }
  }

  /**
   * Verify OTP and complete signup
   */
  async verifySignupOTP(req, res) {
    try {
      const { email, otp, phone, password } = req.body;
      const result = await authService.verifySignupOTP(email, otp, phone, password);
      
      // Set cookie with token
      res.cookie(config.cookie.name, result.token, {
        httpOnly: config.cookie.httpOnly,
        secure: config.cookie.secure,
        sameSite: config.cookie.sameSite,
        maxAge: config.cookie.maxAge,
      });
      
      // Remove token from response body (security)
      const { token, ...responseData } = result;
      
      return successResponse(res, responseData, 'Signup successful', HTTP_STATUS.CREATED);
    } catch (error) {
      const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      return errorResponse(res, error.message, statusCode);
    }
  }

  /**
   * Login with email and password
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      
      // Set cookie with token
      res.cookie(config.cookie.name, result.token, {
        httpOnly: config.cookie.httpOnly,
        secure: config.cookie.secure,
        sameSite: config.cookie.sameSite,
        maxAge: config.cookie.maxAge,
      });
      
      // Remove token from response body (security)
      const { token, ...responseData } = result;
      
      return successResponse(res, responseData, 'Login successful', HTTP_STATUS.OK);
    } catch (error) {
      const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      return errorResponse(res, error.message, statusCode);
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(req, res) {
    try {
      const userId = req.user.userId;
      const result = await authService.getCurrentUser(userId);
      return successResponse(res, result, 'User retrieved successfully', HTTP_STATUS.OK);
    } catch (error) {
      const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      return errorResponse(res, error.message, statusCode);
    }
  }

  /**
   * Logout
   */
  async logout(req, res) {
    try {
      const result = await authService.logout();
      
      // Clear cookie
      res.clearCookie(config.cookie.name, {
        httpOnly: config.cookie.httpOnly,
        secure: config.cookie.secure,
        sameSite: config.cookie.sameSite,
      });
      
      return successResponse(res, result, 'Logout successful', HTTP_STATUS.OK);
    } catch (error) {
      const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      return errorResponse(res, error.message, statusCode);
    }
  }
}

module.exports = new AuthController();
