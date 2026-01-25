// Error handling utilities
export class AppError extends Error {
  constructor(message, code, statusCode = 500) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.statusCode = statusCode;
  }
}

export const handleApiError = (error) => {
  if (error.response) {
    return error.response.data?.message || 'An error occurred';
  }
  return error.message || 'An unexpected error occurred';
};
