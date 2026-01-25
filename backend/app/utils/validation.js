const { z } = require('zod');
const { errorResponse } = require('./response');
const { HTTP_STATUS } = require('../core/constants');

/**
 * Validation middleware factory
 * Creates a middleware that validates request body, query, or params against a Zod schema
 * 
 * This utility provides a reusable way to validate incoming requests using Zod schemas.
 * It automatically:
 * - Validates data against the schema
 * - Sanitizes/transforms data (e.g., trim, toLowerCase)
 * - Returns standardized error responses if validation fails
 * - Replaces the original request data with validated data
 * 
 * Usage:
 *   const validateBody = (schema) => validate(schema, 'body');
 *   router.post('/endpoint', validateBody(mySchema), controller);
 * 
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @param {string} source - Source to validate ('body', 'query', or 'params')
 * @returns {Function} Express middleware function
 */
const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    try {
      // Get data from the specified source
      const data = req[source];
      
      // Validate and parse the data
      // Zod automatically sanitizes (trim, toLowerCase, etc.) based on schema
      const validatedData = schema.parse(data);
      
      // Replace the original data with validated and sanitized data
      req[source] = validatedData;
      
      next();
    } catch (error) {
      if (error instanceof z.ZodError && error.errors && Array.isArray(error.errors)) {
        // Format Zod errors into our standard error format
        const errors = error.errors.map((err) => ({
          field: err.path ? err.path.join('.') : 'unknown',
          message: err.message || 'Invalid value',
        }));
        
        return errorResponse(
          res,
          'Please check your input and try again',
          HTTP_STATUS.BAD_REQUEST,
          errors
        );
      }
      // Handle unexpected errors with user-friendly message
      return errorResponse(
        res,
        'Invalid request. Please check your input and try again.',
        HTTP_STATUS.BAD_REQUEST
      );
    }
  };
};

/**
 * Validate request body
 * Most common use case - validates POST/PUT request bodies
 */
const validateBody = (schema) => validate(schema, 'body');

/**
 * Validate request query parameters
 * Useful for GET requests with query strings
 */
const validateQuery = (schema) => validate(schema, 'query');

/**
 * Validate request route parameters
 * Useful for validating URL parameters like /users/:id
 */
const validateParams = (schema) => validate(schema, 'params');

module.exports = {
  validate,
  validateBody,
  validateQuery,
  validateParams,
};
