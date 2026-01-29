const Challenge = require('../models/Challenge');
const { NotFoundException } = require('../core/exceptions');

class ChallengeRepository {
  async create(data) {
    const challenge = new Challenge(data);
    return await challenge.save();
  }

  async findById(id) {
    const challenge = await Challenge.findById(id);
    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }
    return challenge;
  }

  async findLive(filters = {}) {
    const query = { status: 'live', ...filters };
    return await Challenge.find(query).sort({ createdAt: -1 }).lean();
  }

  async findAll(filters = {}, options = {}) {
    const { limit = 50, skip = 0, sort = { createdAt: -1 } } = options;
    return await Challenge.find(filters).sort(sort).skip(skip).limit(limit).lean();
  }

  async update(id, data) {
    const challenge = await Challenge.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true });
    if (!challenge) {
      throw new NotFoundException('Challenge not found');
    }
    return challenge;
  }

  async delete(id) {
    const result = await Challenge.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Challenge not found');
    }
    return result;
  }
}

module.exports = new ChallengeRepository();
