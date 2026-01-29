const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const { optionalAuth, submissionIdentity } = require('../../../middlewares/submissionIdentityMiddleware');
const {
  startChallengeValidation,
  submitChallengeValidation,
  submissionIdParamValidation,
} = require('../schemas/submissionSchemas');

// Optional auth (detect if user sent token), then set identity (anonymousId + userId if authenticated)
router.use(optionalAuth);
router.use(submissionIdentity);

// Start challenge: POST /api/submissions/start
router.post('/start', startChallengeValidation, submissionController.startChallenge);

// Submit challenge: POST /api/submissions/:id/submit
router.post('/:id/submit', submissionIdParamValidation, submitChallengeValidation, submissionController.submitChallenge);

// Get submission by id: GET /api/submissions/:id
router.get('/:id', submissionIdParamValidation, submissionController.getSubmission);

module.exports = router;
