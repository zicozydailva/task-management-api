import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schema/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from '../user/dto/user.dto';
import { EncryptHelper, ErrorHelper } from 'src/core/helpers';
import { EMAIL_ALREADY_EXISTS } from 'src/core/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userRepo: Model<User>,
    private encryptHelper: EncryptHelper,
  ) {}

  async createUser(payload: CreateUserDto): Promise<User> {
    const { email } = payload;
    const emailQuery = {
      email: email.toLowerCase(),
    };

    const emailExist = await this.userRepo.findOne(emailQuery);

    if (emailExist) {
      ErrorHelper.BadRequestException(EMAIL_ALREADY_EXISTS);
    }

    const user = await this.userRepo.create({
      ...payload,
      password: await this.encryptHelper.hash(payload.password),
      email: email.toLowerCase(),
    });

    return user.toObject();
  }
}
