import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, LoginDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async register(@Body() body: CreateUserDto) {
    const data = await this.authService.signup(body);

    return {
      data,
      message: 'User created successfully',
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const data = await this.authService.login(loginDto);

    return {
      data,
      message: 'Login successful',
    };
  }
}
