// User Roles
const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

// OTP Types
const OTP_TYPES = {
  SIGNUP: 'signup',
  PASSWORD_RESET: 'password_reset',
  EMAIL_VERIFICATION: 'email_verification',
};

// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = {
  USER_ROLES,
  OTP_TYPES,
  HTTP_STATUS,
};
