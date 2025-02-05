import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseError } from '../errors/base-error';
import { randomUUID } from 'crypto';
import { ZodError } from 'zod';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof BaseError) {
      return response.status(exception.statusCode).json({
        error: {
          ...exception.formatMessage(),
          path: request.url,
        },
      });
    }
    console.error(exception);

    if (exception instanceof ZodError) {
      return response.status(400).json({
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
      });
    }

    if (exception instanceof PrismaClientKnownRequestError) {
      let status = 500;
      let message = 'An unexpected database error occurred.';
      let action = 'Please try again or contact support.';
      let errorName = 'DatabaseError';

      if (exception.code === 'P2025') {
        status = 404;
        message = 'The record could not be found.';
        action = 'Please check the provided identifier and try again.';
        errorName = 'NotFoundError';
      }

      return response.status(status).json({
        error: {
          name: errorName,
          message: message,
          action: action,
          status_code: status,
          error_id: randomUUID(),
          path: request.url,
          details: {
            code: exception.code,
            meta: exception.meta,
          },
        },
      });
    }

    return response.status(500).json({
      error: {
        name: 'InternalError',
        message: 'Unexpected server error.',
        action: 'Please contact the system administrator.',
        status_code: 500,
        error_id: randomUUID(),
        path: request.url,
      },
    });
  }
}
