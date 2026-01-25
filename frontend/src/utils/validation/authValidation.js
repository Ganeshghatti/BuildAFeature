// Validation utilities for authentication forms

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return 'Email is required';
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  if (password.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return null;
};

export const validateOTP = (otp) => {
  if (!otp) {
    return 'OTP is required';
  }
  if (!/^\d{6}$/.test(otp)) {
    return 'OTP must be 6 digits';
  }
  return null;
};

export const validatePhone = (phone) => {
  if (!phone) {
    return null; // Phone is optional
  }
  const phoneRegex = /^\+?[\d\s-()]+$/;
  if (!phoneRegex.test(phone)) {
    return 'Please enter a valid phone number';
  }
  return null;
};
