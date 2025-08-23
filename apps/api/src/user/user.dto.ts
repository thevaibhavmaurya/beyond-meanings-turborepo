import { IUserUpdateProfile } from '@repo/types';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class EmailCodeDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class VerifyEmailCodeDto extends EmailCodeDto {
  @IsNumber()
  @IsNotEmpty()
  code: number;
}

export class UpdateProfileDto implements IUserUpdateProfile {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;
}
