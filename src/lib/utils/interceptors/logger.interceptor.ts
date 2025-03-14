import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<unknown>): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, ip, url } = request;
    const timestamp = new Date().toISOString();

    return next.handle().pipe(tap(() => Logger.log(`info ${timestamp} ip: ${ip} method: ${method} url: ${url}`)));
  }
}
