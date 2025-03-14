import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Match } from 'common/decorators';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Match('password', { message: 'Confirm password must match password' })
  confirmPassword!: string;
}
