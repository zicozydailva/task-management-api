import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';

import { MainModule } from './main.module';
import { SecretsService } from './global/secrets/service';
import { ValidationPipe } from './lib/utils/pipes';
import {
  LoggerInterceptor,
  TransformInterceptor,
} from './lib/utils/interceptors';
import { HttpExceptionFilter } from './lib/utils/filters';

async function bootstrap() {
  const app = await NestFactory.create(MainModule, {
    bufferLogs: true,
    cors: true,
  });

  const { PORT } = app.get<SecretsService>(SecretsService);

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(
    new LoggerInterceptor(),
    new TransformInterceptor(),
  );

  app.setGlobalPrefix('api');
  await app.listen(PORT);
}
bootstrap();
