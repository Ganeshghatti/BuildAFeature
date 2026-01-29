const mongoose = require('mongoose');
const submissionRepository = require('../repositories/submissionRepository');
const challengeRepository = require('../repositories/challengeRepository');
const { calculateSubmissionScores } = require('../utils/submissionScoring');
const { NotFoundException } = require('../core/exceptions');

class SubmissionService {
  async startChallenge(identity, data) {
    const challengeId = mongoose.Types.ObjectId.isValid(data.challengeId)
      ? new mongoose.Types.ObjectId(data.challengeId)
      : data.challengeId;
    const challenge = await challengeRepository.findById(challengeId).catch(() => null);
    const timeAllowedMinutes = challenge?.timeAllowed ?? 15;
    const payload = {
      challengeId,
      challengeVersion: data.challengeVersion ?? 1,
      status: 'in_progress',
      anonymousId: identity.anonymousId,
      ...(identity.userId && { userId: identity.userId }),
    };
    const submission = await submissionRepository.create(payload);
    const submissionId = submission._id;
    const ms = timeAllowedMinutes * 60 * 1000;
    setTimeout(async () => {
      try {
        const current = await submissionRepository.findById(submissionId).catch(() => null);
        if (!current || current.status !== 'in_progress') return;
        const { aiScores, totalScore, testCaseResults } = calculateSubmissionScores(current);
        await submissionRepository.update(submissionId, {
          aiScores,
          totalScore,
          testCaseResults,
          status: 'under_review',
        });
      } catch (err) {
        console.error('[submissionScoring] timeout callback error:', err);
      }
    }, ms);
    return submission;
  }

  async submitChallenge(identity, submissionId, data) {
    const ownerFilter = { anonymousId: identity.anonymousId };
    const update = {
      ...(data.vfsSnapshot !== undefined && { vfsSnapshot: data.vfsSnapshot }),
      ...(data.timeTaken !== undefined && { timeTaken: data.timeTaken }),
    };
    const submission = await submissionRepository.update(submissionId, update, ownerFilter);
    const { aiScores, totalScore, testCaseResults } = calculateSubmissionScores(submission);
    return await submissionRepository.update(
      submissionId,
      { aiScores, totalScore, testCaseResults, status: 'under_review' },
      ownerFilter
    );
  }

  async getSubmission(identity, submissionId) {
    const id = mongoose.Types.ObjectId.isValid(submissionId) ? submissionId : null;
    if (!id) {
      throw new NotFoundException('Submission not found');
    }
    return await submissionRepository.findByIdWithOwner(id, { anonymousId: identity.anonymousId });
  }
}

module.exports = new SubmissionService();
