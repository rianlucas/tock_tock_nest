import { BaseError } from './base-error';

export class UnprocessableEntityError extends BaseError {
  constructor({ message, action }) {
    super({
      name: 'UnprocessableEntityError',
      message: message || 'Não foi possível realizar esta operação.',
      action:
        action ||
        'Os dados enviados estão corretos, porém não foi possível realizar esta operação.',
      statusCode: 422,
    });
  }

  formatMessage() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
