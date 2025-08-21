import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { EmailCodeDto, VerifyEmailCodeDto, AuthResponseDto } from './user.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { IUserProfile } from '@repo/types';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('send-code')
  async sendLoginCode(
    @Body() emailCodeDto: EmailCodeDto,
  ): Promise<AuthResponseDto> {
    await this.userService.sendLoginEmail(emailCodeDto.email);
    return {
      success: true,
      message: 'Verification code sent to your email',
    };
  }

  @Post('verify-code')
  async verifyCode(
    @Body() verifyCodeDto: VerifyEmailCodeDto,
  ): Promise<AuthResponseDto> {
    await this.userService.verifyEmailCode(
      verifyCodeDto.email,
      verifyCodeDto.code,
    );
    const token = await this.userService.getTokenForUser(verifyCodeDto.email);
    return {
      success: true,
      message: 'Authentication successful',
      accessToken: token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<IUserProfile> {
    return this.userService.getUserProfile(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate')
  async validateToken(@Request() req): Promise<AuthResponseDto> {
    return {
      success: true,
      message: `Token is valid for user: ${req.user.email}`,
    };
  }
}
