import { NestFactory } from '@nestjs/core';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';

import { MainModule } from './main.module';
import { SecretsService } from './global/secrets/service';

async function bootstrap() {
  const app = await NestFactory.create(MainModule, {
    bufferLogs: true,
    cors: true,
  });

  const { PORT } = app.get<SecretsService>(SecretsService);

  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.setGlobalPrefix('api');
  await app.listen(PORT);
}
bootstrap();
