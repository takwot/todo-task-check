import { IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'validation error 1' })
  email: string;

  @MinLength(1, { message: 'validation error' })
  password: string;
}
