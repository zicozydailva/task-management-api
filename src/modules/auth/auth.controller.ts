import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto, LoginDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/lib/utils/guards';
import { IUser } from 'src/core/interfaces';
import { User as UserDecorator } from 'src/lib/utils/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: CreateUserDto) {
    const data = await this.authService.signup(body);

    return {
      data,
      message: 'User created successfully',
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const data = await this.authService.login(loginDto);

    return {
      data,
      message: 'Login successful',
    };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/logout')
  async logout(@UserDecorator() user: IUser) {
    const data = await this.authService.logout(user._id);

    return {
      data,
      message: 'Logout successfully',
    };
  }
}
