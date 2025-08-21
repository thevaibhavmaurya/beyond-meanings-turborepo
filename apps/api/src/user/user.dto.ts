import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
import { IAuthResponse, IUserProfile } from '@repo/types';

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

export class AuthResponseDto implements IAuthResponse {
  success: boolean;
  message: string;
  accessToken?: string;
}

export class UserProfileDto implements IUserProfile {
  id: string;
  email: string;
  name: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
