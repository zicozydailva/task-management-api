import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GlobalModule } from './global/global.module';
import { SecretsModule } from './global/secrets/module';
import { SecretsService } from './global/secrets/service';
import { TaskModule } from './modules/task/task.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    GlobalModule,
    AuthModule,
    TaskModule,
    UserModule,
    MongooseModule.forRootAsync({
      imports: [SecretsModule],
      inject: [SecretsService],
      useFactory: (secretsService: SecretsService) => ({
        uri: secretsService.MONGO_URI,
      }),
    }),
  ],
  providers: [],
  controllers: [],
})
export class MainModule {}
