import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SecretsService } from './service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  providers: [SecretsService],
  exports: [SecretsService],
})
export class SecretsModule {}
