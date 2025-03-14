import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

type ExceptionResponse = {
  statusCode: number;
  message: string | string[];
  error: string;
};

//
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse = exception.getResponse() as ExceptionResponse;

    const getMessage = () => {
      if (typeof exceptionResponse === 'string') {
        return exceptionResponse;
      }

      if (typeof exceptionResponse.message === 'string') {
        return exceptionResponse.message;
      }

      if (Array.isArray(exceptionResponse.message)) {
        return exceptionResponse.message[0];
      }

      return 'Internal server error';
    };

    response.status(status).json({
      success: false,
      statusCode: status,
      message: getMessage(),
    });
  }
}
