import toast from 'react-hot-toast';

/**
 * Standard API Error Response Format
 * All backend errors follow this structure:
 * {
 *   success: false,
 *   message: string,
 *   errors?: array of { field: string, message: string }
 * }
 */

/**
 * Handle API errors and show toast notifications
 * @param {Error} error - Error object
 * @param {Object} options - Options for error handling
 * @param {boolean} options.showToast - Whether to show toast (default: true)
 * @param {string} options.defaultMessage - Default error message
 * @returns {Object} Error details
 */
export const handleApiError = (error, options = {}) => {
  const { showToast = true, defaultMessage = 'An error occurred' } = options;

  let errorMessage = defaultMessage;
  let errorDetails = null;

  // Check if error has a response with our standard format
  if (error.message) {
    // Try to parse if it's a JSON string
    try {
      const parsed = JSON.parse(error.message);
      if (parsed.message) {
        errorMessage = parsed.message;
        errorDetails = parsed.errors || null;
      }
    } catch {
      // If not JSON, use the error message directly
      errorMessage = error.message;
    }
  }

  // Show toast notification
  if (showToast) {
    if (errorDetails && Array.isArray(errorDetails) && errorDetails.length > 0) {
      // Show first validation error
      toast.error(errorDetails[0].message || errorMessage);
    } else {
      toast.error(errorMessage);
    }
  }

  return {
    message: errorMessage,
    errors: errorDetails,
  };
};

/**
 * Handle API success and show toast notification
 * @param {string} message - Success message
 * @param {Object} options - Options for success handling
 * @param {boolean} options.showToast - Whether to show toast (default: true)
 */
export const handleApiSuccess = (message, options = {}) => {
  const { showToast = true } = options;
  if (showToast && message) {
    toast.success(message);
  }
};
