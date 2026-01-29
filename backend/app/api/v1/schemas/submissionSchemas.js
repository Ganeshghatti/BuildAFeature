const { z } = require('zod');
const { validateBody, validateParams } = require('../../../utils/validation');

const startChallengeSchema = z.object({
  challengeId: z.string().min(1, 'Challenge ID is required').trim(),
  challengeVersion: z.number().int().min(1).optional().default(1),
});

const submitChallengeSchema = z.object({
  vfsSnapshot: z.any().optional().nullable(),
  timeTaken: z.number().min(0).optional().nullable(),
});

const submissionIdParamSchema = z.object({
  id: z.string().min(1, 'Submission ID is required'),
});

const startChallengeValidation = validateBody(startChallengeSchema);
const submitChallengeValidation = validateBody(submitChallengeSchema);
const submissionIdParamValidation = validateParams(submissionIdParamSchema);

module.exports = {
  startChallengeValidation,
  submitChallengeValidation,
  submissionIdParamValidation,
};
