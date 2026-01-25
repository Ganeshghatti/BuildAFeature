// Base Application Exception
class AppException extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Authentication Exceptions
class UnauthorizedException extends AppException {
  constructor(message = 'Unauthorized') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

class ForbiddenException extends AppException {
  constructor(message = 'Forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}

// Validation Exceptions
class ValidationException extends AppException {
  constructor(message = 'Validation failed', errors = {}) {
    super(message, 400, 'VALIDATION_ERROR');
    this.errors = errors;
  }
}

// Not Found Exception
class NotFoundException extends AppException {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

// Conflict Exception
class ConflictException extends AppException {
  constructor(message = 'Resource already exists') {
    super(message, 409, 'CONFLICT');
  }
}

// Bad Request Exception
class BadRequestException extends AppException {
  constructor(message = 'Bad request') {
    super(message, 400, 'BAD_REQUEST');
  }
}

module.exports = {
  AppException,
  UnauthorizedException,
  ForbiddenException,
  ValidationException,
  NotFoundException,
  ConflictException,
  BadRequestException,
};
