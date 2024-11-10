export const ErrorMessages = {
  validation: {
    IS_NOT_EMPTY: "Field shouldn't be empty",
    IS_ALPHA_NAME: "Name shouldn't contain special characters or numbers",
    IS_EMAIL: 'Invalid email address',
    PASSWORD_LENGTH: 'Password should be at least 8 characters long',
    PASSWORD_MATCH: "Passwords don't match",
    IS_STRONG_PASSWORD: 'Password is too weak',
    IS_NUMBER_STRING: 'Value should be a number',
    IS_STRING: 'Value should be a string',
  },
  http: {
    NOT_FOUND: 'Not found',
    BAD_REQUEST: 'Bad request',
    UNAUTHORIZED: 'Unauthorized',
    FORBIDDEN: 'Forbidden',
    INTERNAL_SERVER_ERROR: 'Internal server error',
  },
  jwt: {
    NO_AUTHENTICATION: 'No authentication provided',
    INVALID: 'Invalid Session',
  },
  user: {
    ALREADY_EXISTS: 'User with this email already exists',
    NOT_FOUND: 'User not found',
    WRONG_PASSWORD: 'Wrong password',
  },
  auth: {
    INVALID_CREDENTIALS: 'Invalid credentials',
  },
};
