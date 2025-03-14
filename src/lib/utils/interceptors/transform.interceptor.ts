import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { finalize, map, Observable } from 'rxjs';

import { PaginationResultDto } from '../dto';
import { AppResponse } from 'src/core/interfaces';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, unknown> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>,
  ): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const { method, ip, url } = request;
    const now = Date.now();
    const timestamp = new Date().toISOString();

    Logger.log(`info ${timestamp} ip: ${ip} method: ${method} url: ${url}`);

    return next.handle().pipe(
      map((response: AppResponse) => {
        if (response?.data instanceof PaginationResultDto) {
          return {
            success: true,
            data: response?.data['data'],
            message: response?.message,
            meta: response?.data['meta'],
          };
        }

        return {
          success: true,
          data: response?.data,
          message: response?.message,
        };
      }),
      finalize(() => {
        Logger.log(`Excution time... ${Date.now() - now}ms`);
      }),
    );
  }
}
