import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseError } from '../errors/base-error';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: BaseError, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.statusCode;

    response.status(status).json({
      error: {
        ...exception.formatMessage(),
        path: request.url,
      },
    });
  }
}
