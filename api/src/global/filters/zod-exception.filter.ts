// zod-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { randomUUID } from 'crypto';

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
export class ZodExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.error('Exception caught:', exception);

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
  }
}
