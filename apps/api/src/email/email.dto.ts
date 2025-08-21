import { IEmailCodeDto } from '@repo/types';
import { IsEmail, IsString } from 'class-validator';

/**
 * the enum value must be same as the mjml filename(case sensitive).
 * if the template filename is welcome.mjml,
 * then the enum value must be 'welcome'
 */

export class EmailCodeDto implements IEmailCodeDto {
  @IsEmail()
  email: string;

  @IsString()
  otp: string;

  @IsString()
  expiresAt: string;
}
