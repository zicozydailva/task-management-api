import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/lib/utils/guards';
import { PaginationDto } from 'src/lib/utils/dto';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAllUsers(@Query() params: PaginationDto) {
    const res = await this.userService.getAllUsers(params);

    return {
      data: res,
      message: 'All Users Fetched Successfully',
      success: true,
    };
  }
}
