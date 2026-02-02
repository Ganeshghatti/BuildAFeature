const challengeService = require('../../../services/challengeService');
const { successResponse, errorResponse } = require('../../../utils/response');
const { HTTP_STATUS } = require('../../../core/constants');
const { NotFoundException } = require('../../../core/exceptions');

class ChallengeController {
  async list(req, res) {
    try {
      const { status, difficulty, type, limit, skip } = req.query;
      const filters = {};
      if (status) filters.status = status;
      if (difficulty) filters.difficulty = difficulty;
      if (type) filters.type = type;
      const challenges = await challengeService.listAll(filters, { limit: Number(limit), skip: Number(skip) });
      return successResponse(res, { challenges }, 'Challenges retrieved', HTTP_STATUS.OK);
    } catch (error) {
      const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      return errorResponse(res, error.message, statusCode);
    }
  }

  async listLive(req, res) {
    try {
      const { difficulty, type } = req.query;
      const filters = {};
      if (difficulty) filters.difficulty = difficulty;
      if (type) filters.type = type;
      const challenges = challengeService.listLive(filters);
      return successResponse(res, { challenges }, 'Live challenges retrieved', HTTP_STATUS.OK);
    } catch (error) {
      const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      return errorResponse(res, error.message, statusCode);
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const challenge = challengeService.getById(id);
      if (!challenge) {
        throw new NotFoundException('Challenge not found');
      }
      return successResponse(res, { challenge }, 'Challenge retrieved', HTTP_STATUS.OK);
    } catch (error) {
      const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      return errorResponse(res, error.message, statusCode);
    }
  }

  async create(req, res) {
    try {
      const challenge = await challengeService.create(req.body);
      return successResponse(res, { challenge }, 'Challenge created', HTTP_STATUS.CREATED);
    } catch (error) {
      const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      return errorResponse(res, error.message, statusCode);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const challenge = await challengeService.update(id, req.body);
      return successResponse(res, { challenge }, 'Challenge updated', HTTP_STATUS.OK);
    } catch (error) {
      const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      return errorResponse(res, error.message, statusCode);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      await challengeService.delete(id);
      return successResponse(res, null, 'Challenge deleted', HTTP_STATUS.OK);
    } catch (error) {
      const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      return errorResponse(res, error.message, statusCode);
    }
  }

  async downloadZip(req, res) {
    try{
      await challengeService.zipdownload(req , res , req.body);
    }
    catch(error){
      const statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
      return errorResponse(res, error.message, statusCode);
    }
  }
}

module.exports = new ChallengeController();
