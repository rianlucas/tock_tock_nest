import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseError } from '../errors/base-error';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const status = exception.statusCode;

    if (exception instanceof BaseError) {
      response.status(status).json({
        error: {
          ...exception.formatMessage(),
          path: request.url,
        },
      });
    }

    response.status(500).json({
      error: {
        name: 'InternalError',
        message: 'Unexpected server error.',
        action: 'Please, contact the system administrator.',
        status_code: 500,
        error_id: crypto.randomUUID(),
      },
    });
  }
}
