import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.entity';
import { ErrorHelper } from 'src/core/helpers';
import { PaginationDto, PaginationResultDto } from 'src/lib/utils/dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userRepo: Model<UserDocument>,
  ) {}

  async getAllUsers(params: PaginationDto) {
    const { limit, page } = params;
    const skip = (page - 1) * limit;
    try {
      const users = await this.userRepo.find().limit(limit).skip(skip);
      const count = await this.userRepo.countDocuments();

      return new PaginationResultDto(users, count, { limit, page });
    } catch (error) {
      ErrorHelper.BadRequestException(error);
    }
  }
}
