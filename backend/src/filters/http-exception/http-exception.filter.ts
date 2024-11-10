import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ErrorMessages } from 'src/constant/errorMessages';

/**
 * HttpExceptionFilter is a custom exception filter that handles all exceptions in a structured manner.
 * It captures both HTTP and non-HTTP exceptions, providing a standardized JSON response.
 *
 * @method catch - Executes when an exception is caught, formats the response, and sends a JSON response.
 *
 * @param {ArgumentsHost} host - The execution context, providing access to the request/response objects.
 *
 * @returns {void}
 */
@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  /**
   * Handles and transforms exceptions into a structured JSON response.
   *
   * @param exception - The exception caught by the filter.
   * @param host - The ArgumentsHost instance, used to switch to HTTP context and access the response object.
   */
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : ErrorMessages.http.INTERNAL_SERVER_ERROR;

    response.status(statusCode).json({
      status: 'error',
      code: statusCode,
      message,
    });
  }
}
