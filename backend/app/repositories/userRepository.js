const User = require('../models/User');
const { NotFoundException, ConflictException } = require('../core/exceptions');

class UserRepository {
  /**
   * Create a new user
   * @param {Object} userData - User data
   * @returns {Promise<Object>} Created user
   */
  async create(userData) {
    try {
      const user = new User(userData);
      return await user.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User with this email already exists');
      }
      throw error;
    }
  }

  /**
   * Find user by email
   * @param {string} email - User email
   * @returns {Promise<Object|null>} User object or null
   */
  async findByEmail(email) {
    return await User.findOne({ email: email.toLowerCase() });
  }

  /**
   * Find user by ID
   * @param {string} userId - User ID
   * @returns {Promise<Object|null>} User object or null
   */
  async findById(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  /**
   * Update user
   * @param {string} userId - User ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated user
   */
  async update(userId, updateData) {
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    return user;
  }

  /**
   * Update user password
   * @param {string} userId - User ID
   * @param {string} hashedPassword - Hashed password
   * @returns {Promise<Object>} Updated user
   */
  async updatePassword(userId, hashedPassword) {
    return await this.update(userId, { password: hashedPassword });
  }

  /**
   * Mark email as verified
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Updated user
   */
  async markEmailVerified(userId) {
    return await this.update(userId, { isEmailVerified: true });
  }
}

module.exports = new UserRepository();
