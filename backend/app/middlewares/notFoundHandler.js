const { errorResponse } = require('../utils/response');
const { HTTP_STATUS } = require('../core/constants');

/**
 * 404 Not Found handler middleware
 */
const notFoundHandler = (req, res) => {
  return errorResponse(
    res,
    `Route ${req.originalUrl} not found`,
    HTTP_STATUS.NOT_FOUND
  );
};

module.exports = notFoundHandler;
