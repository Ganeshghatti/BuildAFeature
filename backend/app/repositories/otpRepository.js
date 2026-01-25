const OTP = require('../models/OTP');
const { NotFoundException, BadRequestException } = require('../core/exceptions');

class OTPRepository {
  /**
   * Create a new OTP record
   * @param {Object} otpData - OTP data
   * @returns {Promise<Object>} Created OTP record
   */
  async create(otpData) {
    // Invalidate any existing OTPs for this email and type
    await OTP.updateMany(
      { email: otpData.email, type: otpData.type, isUsed: false },
      { isUsed: true }
    );

    const otp = new OTP(otpData);
    return await otp.save();
  }

  /**
   * Find valid OTP by email and code
   * @param {string} email - User email
   * @param {string} otpCode - OTP code
   * @param {string} type - OTP type
   * @returns {Promise<Object|null>} OTP record or null
   */
  async findValidOTP(email, otpCode, type = 'signup') {
    const otpRecord = await OTP.findOne({
      email: email.toLowerCase(),
      otp: otpCode,
      type,
      isUsed: false,
      expiresAt: { $gt: new Date() },
    });

    return otpRecord;
  }

  /**
   * Mark OTP as used
   * @param {string} otpId - OTP record ID
   * @returns {Promise<Object>} Updated OTP record
   */
  async markAsUsed(otpId) {
    const otp = await OTP.findByIdAndUpdate(
      otpId,
      { isUsed: true },
      { new: true }
    );

    if (!otp) {
      throw new NotFoundException('OTP record not found');
    }

    return otp;
  }

  /**
   * Delete expired OTPs (cleanup)
   * @returns {Promise<number>} Number of deleted records
   */
  async deleteExpired() {
    const result = await OTP.deleteMany({
      expiresAt: { $lt: new Date() },
    });
    return result.deletedCount;
  }
}

module.exports = new OTPRepository();
