import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { LoggerService } from '../../modules/logger/logger.service';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  // constructor(
  //   private readonly loggerService: LoggerService,
  // ) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log(exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status: number;
    let messages: string | string[];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      messages = (exception as HttpException).message;
    } else {
      status = 500;
      messages = 'Internal server error';
    }

    // this.loggerService.error(exception);

    messages = Array.isArray(messages) ? messages : [messages];
    response.status(status).json({
      messages,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
