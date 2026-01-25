const { verifyToken } = require('../core/security/jwt');
const { UnauthorizedException } = require('../core/exceptions');
const { errorResponse } = require('../utils/response');
const { HTTP_STATUS } = require('../core/constants');
const config = require('../core/config');

/**
 * Authentication middleware
 * Verifies JWT token from cookie and attaches user info to request
 */
const authMiddleware = (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies[config.cookie.name];
    
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    // Verify token
    const decoded = verifyToken(token);

    // Attach user info to request
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
    };

    next();
  } catch (error) {
    if (error instanceof UnauthorizedException) {
      return errorResponse(res, error.message, HTTP_STATUS.UNAUTHORIZED);
    }
    return errorResponse(res, 'Invalid or expired token', HTTP_STATUS.UNAUTHORIZED);
  }
};

module.exports = authMiddleware;
