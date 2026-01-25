const userRepository = require('../repositories/userRepository');
const otpRepository = require('../repositories/otpRepository');
const { hashPassword, verifyPassword } = require('../core/security/password');
const { generateToken } = require('../core/security/jwt');
const { generateOTP, generateOTPExpiry } = require('../utils/otp');
const { sendOTPEmail } = require('../utils/email');
const {
  UnauthorizedException,
  BadRequestException,
  ConflictException,
} = require('../core/exceptions');
const { OTP_TYPES } = require('../core/constants');

class AuthService {
  /**
   * Send OTP for signup
   * @param {string} email - User email
   * @param {string|null} phone - Optional phone number
   * @returns {Promise<Object>} Result object
   */
  async sendSignupOTP(email, phone = null) {
    // Check if user already exists
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Generate OTP
    const otpCode = generateOTP();
    const expiresAt = generateOTPExpiry();

    // Save OTP to database
    await otpRepository.create({
      email,
      otp: otpCode,
      type: OTP_TYPES.SIGNUP,
      expiresAt,
    });

    // Send OTP via email
    await sendOTPEmail(email, otpCode);

    return {
      message: 'OTP sent successfully',
      email,
    };
  }

  /**
   * Verify OTP and complete signup
   * @param {string} email - User email
   * @param {string} otp - OTP code
   * @param {string|null} phone - Optional phone number
   * @param {string} password - Password (required)
   * @returns {Promise<Object>} User and token
   */
  async verifySignupOTP(email, otp, phone = null, password) {
    // Find valid OTP
    const otpRecord = await otpRepository.findValidOTP(
      email,
      otp,
      OTP_TYPES.SIGNUP
    );

    if (!otpRecord) {
      throw new BadRequestException('Invalid or expired OTP');
    }

    // Check if user already exists (race condition check)
    let user = await userRepository.findByEmail(email);
    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    user = await userRepository.create({
      email,
      phone,
      password: hashedPassword,
      isEmailVerified: true,
      isPhoneVerified: phone ? false : true, // Phone verification can be added later
    });

    // Mark OTP as used
    await otpRepository.markAsUsed(otpRecord._id);

    // Generate token
    const token = generateToken(user);

    return {
      user: {
        _id: user._id,
        email: user.email,
        phone: user.phone,
        isEmailVerified: user.isEmailVerified,
      },
      token,
    };
  }

  /**
   * Login with email and password
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} User and token
   */
  async login(email, password) {
    // Find user
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check if user has a password set
    if (!user.password) {
      throw new UnauthorizedException(
        'Please sign up using OTP or set a password'
      );
    }

    // Verify password
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedException('Account is deactivated');
    }

    // Generate token
    const token = generateToken(user);

    return {
      user: {
        _id: user._id,
        email: user.email,
        phone: user.phone,
        isEmailVerified: user.isEmailVerified,
      },
      token,
    };
  }

  /**
   * Get current user
   * @param {string} userId - User ID
   * @returns {Promise<Object>} User object
   */
  async getCurrentUser(userId) {
    const user = await userRepository.findById(userId);
    return {
      user: {
        _id: user._id,
        email: user.email,
        phone: user.phone,
        isEmailVerified: user.isEmailVerified,
        isPhoneVerified: user.isPhoneVerified,
        role: user.role,
        createdAt: user.createdAt,
      },
    };
  }

  /**
   * Logout (client-side token removal, but can add token blacklisting here)
   * @returns {Promise<Object>} Success message
   */
  async logout() {
    // In a production app, you might want to blacklist the token here
    return {
      message: 'Logged out successfully',
    };
  }

}

module.exports = new AuthService();
