import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';
import { IResponseBody } from '@repo/types';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { UserId } from 'src/user/user.decorator';
import { ApiKey } from './api-key.entity';
import { UpdateApiKeyStatusDto } from './api-key.dto';

@Controller('api-key')
export class ApiKeyController {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getApiKey(@UserId() userId: string): Promise<IResponseBody<ApiKey>> {
    const apiKey = await this.apiKeyService.getApiKey(userId);
    return {
      success: true,
      message: 'API key retrieved successfully',
      data: apiKey,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('regenerate')
  async regenerateApiKey(
    @UserId() userId: string,
  ): Promise<IResponseBody<void>> {
    await this.apiKeyService.regenerateUserApiKey(userId);
    return {
      success: true,
      message: 'API key regenerated successfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('status')
  async updateApiKeyStatus(
    @UserId() userId: string,
    @Body() updateApiKeyStatusDto: UpdateApiKeyStatusDto,
  ): Promise<IResponseBody<void>> {
    await this.apiKeyService.updateApiKeyStatus(
      userId,
      updateApiKeyStatusDto.isActive,
    );
    return {
      success: true,
      message: `API key ${updateApiKeyStatusDto.isActive ? 'activated' : 'deactivated'} successfully`,
    };
  }
}
