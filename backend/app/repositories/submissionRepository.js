const Submission = require('../models/Submission');
const { NotFoundException } = require('../core/exceptions');

class SubmissionRepository {
  async create(data) {
    const submission = new Submission(data);
    return await submission.save();
  }

  async findById(id) {
    const submission = await Submission.findById(id).lean();
    if (!submission) {
      throw new NotFoundException('Submission not found');
    }
    return submission;
  }

  async findByIdWithOwner(id, ownerFilter) {
    const submission = await Submission.findOne({
      _id: id,
      ...ownerFilter,
    }).lean();
    if (!submission) {
      throw new NotFoundException('Submission not found');
    }
    return submission;
  }

  async update(id, data, ownerFilter = null) {
    const query = ownerFilter ? { _id: id, ...ownerFilter } : { _id: id };
    const submission = await Submission.findOneAndUpdate(
      query,
      { $set: data },
      { new: true, runValidators: true }
    ).lean();
    if (!submission) {
      throw new NotFoundException('Submission not found');
    }
    return submission;
  }
}

module.exports = new SubmissionRepository();
