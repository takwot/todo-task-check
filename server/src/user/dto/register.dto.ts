import { IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'validation error' })
  email: string;

  @MinLength(6, { message: 'validation error' })
  password: string;
}
