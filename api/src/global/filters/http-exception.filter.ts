import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseError } from '../errors/base-error';
import { randomUUID } from 'crypto';
import { ZodError } from 'zod';

interface ErrorResponse {
  error: {
    name: string;
    message: string;
    action: string;
    status_code: number;
    error_id: string;
    path: string;
    details?: any;
  };
}

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
      return response.status(status).json({
        error: {
          ...exception.formatMessage(),
          path: request.url,
        },
      });
    }

    if (exception instanceof ZodError) {
      const errorResponse: ErrorResponse = {
        error: {
          name: 'ValidationError',
          message: 'Invalid request data',
          action: 'Please check your request data and try again',
          status_code: 400,
          error_id: randomUUID(),
          path: request.url,
          details: exception.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
            code: err.code,
          })),
        },
      };

      return response.status(400).json(errorResponse);
    }

    return response.status(500).json({
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
