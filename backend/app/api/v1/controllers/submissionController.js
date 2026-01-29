const submissionService = require('../../../services/submissionService');
const { successResponse, errorResponse } = require('../../../utils/response');
const { HTTP_STATUS } = require('../../../core/constants');

class SubmissionController {
  async startChallenge(req, res) {
    try {
      const identity = req.submissionIdentity;
      const submission = await submissionService.startChallenge(identity, req.body);
      return successResponse(res, { submission }, 'Challenge started', HTTP_STATUS.CREATED);
    } catch (error) {
      const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      return errorResponse(res, error.message, statusCode);
    }
  }

  async submitChallenge(req, res) {
    try {
      const identity = req.submissionIdentity;
      const { id } = req.params;
      const submission = await submissionService.submitChallenge(identity, id, req.body);
      return successResponse(res, { submission }, 'Challenge submitted', HTTP_STATUS.OK);
    } catch (error) {
      const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      return errorResponse(res, error.message, statusCode);
    }
  }

  async getSubmission(req, res) {
    try {
      const identity = req.submissionIdentity;
      const { id } = req.params;
      const submission = await submissionService.getSubmission(identity, id);
      return successResponse(res, { submission }, 'Submission retrieved', HTTP_STATUS.OK);
    } catch (error) {
      const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      return errorResponse(res, error.message, statusCode);
    }
  }
}

module.exports = new SubmissionController();
