import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../user/schema/user.entity';
import { TokenHelper } from 'src/lib/utils/token/token.utils';
import { EncryptHelper } from 'src/core/helpers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenHelper, EncryptHelper],
})
export class AuthModule {}
