const { errorResponse } = require('../utils/response');
const { HTTP_STATUS } = require('../core/constants');
const { AppException } = require('../core/exceptions');

/**
 * User-friendly error messages mapping
 */
const USER_FRIENDLY_MESSAGES = {
  // Authentication errors
  'No token provided': 'Please sign in to continue',
  'Invalid token': 'Your session has expired. Please sign in again.',
  'Token expired': 'Your session has expired. Please sign in again.',
  'Invalid or expired token': 'Your session has expired. Please sign in again.',
  
  // Validation errors
  'Validation failed': 'Please check your input and try again',
  'Validation error': 'Please check your input and try again',
  
  // Database errors
  'User with this email already exists': 'An account with this email already exists',
  'Invalid email or password': 'The email or password you entered is incorrect',
  
  // Generic errors
  'Internal server error': 'Something went wrong. Please try again later.',
  'Request failed': 'Something went wrong. Please try again.',
};

/**
 * Get user-friendly error message
 */
const getUserFriendlyMessage = (errorMessage, statusCode) => {
  // Check if we have a user-friendly message for this error
  if (USER_FRIENDLY_MESSAGES[errorMessage]) {
    return USER_FRIENDLY_MESSAGES[errorMessage];
  }
  
  // For 500 errors, always show generic message
  if (statusCode >= 500) {
    return 'Something went wrong. Please try again later.';
  }
  
  // For client errors (400-499), show the message if it's user-friendly
  // Otherwise show generic message
  if (statusCode >= 400 && statusCode < 500) {
    // If message contains technical details, show generic message
    if (errorMessage.includes('Cannot read') || 
        errorMessage.includes('undefined') ||
        errorMessage.includes('TypeError') ||
        errorMessage.includes('ReferenceError')) {
      return 'Invalid request. Please check your input and try again.';
    }
    return errorMessage;
  }
  
  return 'Something went wrong. Please try again later.';
};

/**
 * Global error handler middleware
 */
const errorHandler = (err, req, res, next) => {
  // Log full error for debugging (server-side only)
  console.error('Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    name: err.name,
    code: err.code,
  });

  // Handle known application exceptions
  if (err instanceof AppException) {
    const userMessage = getUserFriendlyMessage(err.message, err.statusCode);
    return errorResponse(res, userMessage, err.statusCode, err.errors);
  }

  // Handle validation errors
  if (err.name === 'ValidationError') {
    return errorResponse(
      res,
      'Please check your input and try again',
      HTTP_STATUS.BAD_REQUEST,
      err.errors
    );
  }

  // Handle MongoDB duplicate key errors
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || 'field';
    return errorResponse(
      res,
      `An account with this ${field} already exists`,
      HTTP_STATUS.CONFLICT
    );
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 'Your session has expired. Please sign in again.', HTTP_STATUS.UNAUTHORIZED);
  }

  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 'Your session has expired. Please sign in again.', HTTP_STATUS.UNAUTHORIZED);
  }

  // Default error response with user-friendly message
  const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  const userMessage = getUserFriendlyMessage(err.message || 'Internal server error', statusCode);
  
  return errorResponse(res, userMessage, statusCode);
};

module.exports = errorHandler;
