import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PASSWORD_PATTERN } from 'src/core/constants';
import { IsMatchPattern } from 'src/core/validators';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsMatchPattern(PASSWORD_PATTERN)
  password?: string;
}

export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
