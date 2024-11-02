import { BaseError } from './base-error';

export class NotFoundError extends BaseError {
  constructor({ message, action }) {
    super({
      name: 'NotFoundError',
      message: message || 'Não foi possível encontrar este recurso no sistema.',
      action: action || 'Verifique se o caminho (PATH) está correto.',
      statusCode: 404,
    });
  }
  formatMessage() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
      error_id: this.errorId,
      stack: this.stack,
    };
  }
}
