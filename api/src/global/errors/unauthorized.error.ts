import { BaseError } from './base-error';

export class UnauthorizedError extends BaseError {
  constructor({ message, action }) {
    super({
      name: 'UnauthorizedError',
      message: message || 'You are not authorized to access this resource.',
      action: action || 'Check if you have the necessary permissions.',
      statusCode: 401,
    });
  }

  formatMessage() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
      error_id: this.errorId,
    };
  }
}
