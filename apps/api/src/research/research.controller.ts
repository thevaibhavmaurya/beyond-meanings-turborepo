import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { ResearchService } from './research.service';
import {
  LookupRequestDto,
  StatusRequestDto,
  UpdateResearchDto,
} from './research.dto';
import {
  ILookupResponse,
  IStatusResponse,
  IResponseBody,
  IResearchJobStatus,
  IMacLookupOutput,
} from '@repo/types';
import { ApiKeyGuard } from 'src/api-key/api-key.guard';

@Controller('research')
export class ResearchController {
  private readonly logger = new Logger(ResearchController.name);

  constructor(private readonly researchService: ResearchService) {}

  @Post('lookup')
  @HttpCode(HttpStatus.OK)
  @UseGuards(ApiKeyGuard)
  async lookup(
    @Body() body: LookupRequestDto,
  ): Promise<IResponseBody<ILookupResponse>> {
    try {
      const result = await this.researchService.lookup(body.query);
      return {
        success: true,
        message: 'Research initiated successfully',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : 'Research lookup failed',
      };
    }
  }

  @Get('status')
  @UseGuards(ApiKeyGuard)
  async getStatus(
    @Query() query: StatusRequestDto,
  ): Promise<IResponseBody<IStatusResponse>> {
    try {
      const result = await this.researchService.getStatus(query.research_id);
      return {
        success: true,
        message: 'Status retrieved successfully',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error instanceof Error ? error.message : 'Failed to get status',
      };
    }
  }

  @Post('update')
  @HttpCode(HttpStatus.OK)
  async updateResearch(
    @Body() body: UpdateResearchDto,
  ): Promise<IResponseBody<void>> {
    try {
      this.logger.log('🔄 Received update request:', {
        research_id: body.research_id,
        status: body.status,
        hasContent: !!body.content,
      });

      const research = await this.researchService.findById(body.research_id);
      if (!research) {
        this.logger.error('❌ Research not found:', body.research_id);
        throw new NotFoundException('Research not found');
      }

      this.logger.log('📊 Current research status:', research.job_status);

      await this.researchService.updateResearchResult(
        body.research_id,
        body.content as IMacLookupOutput,
        body.status as IResearchJobStatus,
      );

      this.logger.log('✅ Research updated successfully');

      return {
        success: true,
        message: 'Research updated successfully',
      };
    } catch (error) {
      this.logger.error('❌ Update error:', error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : 'Failed to update research',
      };
    }
  }
}
