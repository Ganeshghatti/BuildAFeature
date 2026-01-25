const config = require('../core/config');

/**
 * Generate a random OTP
 * @param {number} length - Length of OTP (default: 6)
 * @returns {string} Generated OTP
 */
const generateOTP = (length = config.otp.length) => {
  const digits = '0123456789';
  let otp = '';
  
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  
  return otp;
};

/**
 * Generate OTP expiration timestamp
 * @returns {Date} Expiration date
 */
const generateOTPExpiry = () => {
  return new Date(Date.now() + config.otp.expiresIn);
};

/**
 * Verify if OTP is expired
 * @param {Date} expiryDate - OTP expiration date
 * @returns {boolean} True if expired
 */
const isOTPExpired = (expiryDate) => {
  return new Date() > new Date(expiryDate);
};

module.exports = {
  generateOTP,
  generateOTPExpiry,
  isOTPExpired,
};
