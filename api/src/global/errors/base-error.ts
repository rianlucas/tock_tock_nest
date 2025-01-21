export abstract class BaseError extends Error {
  name: string;
  message: string;
  action?: string;
  statusCode: number;
  errorId: string;
  databaseErrorCode?: string;

  constructor({
    name,
    message,
    action,
    statusCode,
    errorId,
    databaseErrorCode,
  }: {
    name: string;
    message: string;
    action?: string;
    statusCode?: number;
    errorId?: string;
    databaseErrorCode?: string;
  }) {
    super();
    this.name = name;
    this.message = message;
    this.action = action;
    this.statusCode = statusCode || 500;
    this.errorId = errorId || crypto.randomUUID();
    this.databaseErrorCode = databaseErrorCode;
  }

  abstract formatMessage();
}
