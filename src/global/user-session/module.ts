import { Module } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';

import { SecretsService } from '../secrets/service';
import { UserSessionService } from './service';

@Module({
  imports: [
    RedisModule.forRootAsync({
      useFactory: ({ userSessionRedis }: SecretsService) => ({
        config: {
          host: userSessionRedis.REDIS_HOST,
          port: userSessionRedis.REDIS_PORT,
          username: userSessionRedis.REDIS_USER,
          password: userSessionRedis.REDIS_PASSWORD,
        },
      }),
      inject: [SecretsService],
    }),
  ],
  providers: [UserSessionService],
  exports: [UserSessionService],
})
export class UserSessionModule {}
