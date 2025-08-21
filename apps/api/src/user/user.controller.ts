import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { EmailCodeDto, VerifyEmailCodeDto, UpdateProfileDto } from './user.dto';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { IResponseBody, IUserProfile } from '@repo/types';
import { UserId } from './user.decorator';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('send-code')
  async sendLoginCode(
    @Body() emailCodeDto: EmailCodeDto,
  ): Promise<IResponseBody<void>> {
    await this.userService.sendLoginEmail(emailCodeDto.email);
    return {
      success: true,
      message: 'Verification code sent to your email',
    };
  }

  @Post('verify-code')
  async verifyCode(
    @Body() verifyCodeDto: VerifyEmailCodeDto,
  ): Promise<IResponseBody<{ accessToken: string }>> {
    await this.userService.verifyEmailCode(
      verifyCodeDto.email,
      verifyCodeDto.code,
    );
    const token = await this.userService.getTokenForUser(verifyCodeDto.email);
    return {
      success: true,
      message: 'Authentication successful',
      data: { accessToken: token },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(
    @UserId() userId: string,
  ): Promise<IResponseBody<IUserProfile>> {
    const profile = await this.userService.getUserProfile(userId);
    return {
      success: true,
      message: 'Profile retrieved successfully',
      data: profile,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('validate')
  async validateToken(@UserId() userId: string): Promise<IResponseBody<void>> {
    return {
      success: true,
      message: `Token is valid for user: ${userId}`,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfileName(
    @UserId() userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<IResponseBody<void>> {
    await this.userService.updateProfileName(userId, updateProfileDto.name);
    return {
      success: true,
      message: 'Profile name updated successfully',
    };
  }
}
