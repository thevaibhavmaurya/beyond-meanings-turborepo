import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Research } from './research.entity';
import {
  IResearchJobStatus,
  ILookupResponse,
  IStatusResponse,
  IMacLookupOutput,
} from '@repo/types';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ResearchService {
  constructor(
    @InjectRepository(Research)
    private repository: Repository<Research>,
    private configService: ConfigService,
  ) {}

  private normalizeQuery(query: string): string {
    return query.toLowerCase().replace(/[\s-]/g, '');
  }

  async lookup(query: string): Promise<ILookupResponse> {
    const query_id = this.normalizeQuery(query);
    const existingResearch = await this.repository.findOne({
      where: { query_id },
    });

    if (existingResearch) {
      if (
        existingResearch.job_status === IResearchJobStatus.COMPLETED ||
        existingResearch.job_status === IResearchJobStatus.PROCESSING
      ) {
        return {
          research_id: existingResearch.id!,
          status: existingResearch.job_status,
        };
      }

      if (existingResearch.job_status === IResearchJobStatus.FAILED) {
        await this.repository.update(existingResearch.id!, {
          job_status: IResearchJobStatus.PROCESSING,
        });
        await this.callPythonAgent(query, existingResearch.id!);
        return {
          research_id: existingResearch.id!,
          status: IResearchJobStatus.PROCESSING,
        };
      }
    }

    const research = this.repository.create({
      query_id,
      query,
      job_status: IResearchJobStatus.PROCESSING,
      content: null,
    });

    const savedResearch = await this.repository.save(research);
    await this.callPythonAgent(query, savedResearch.id!);

    return {
      research_id: savedResearch.id!,
      status: IResearchJobStatus.PROCESSING,
    };
  }

  async getStatus(research_id: string): Promise<IStatusResponse> {
    const research = await this.repository.findOne({
      where: { id: research_id },
    });

    if (!research) {
      throw new NotFoundException('Research not found');
    }

    const response: IStatusResponse = {
      research_id,
      job_status: research.job_status,
    };

    if (research.job_status === IResearchJobStatus.COMPLETED) {
      response.data = research;
    }

    return response;
  }

  async updateResearchResult(
    research_id: string,
    content: IMacLookupOutput,
    status: IResearchJobStatus,
  ): Promise<void> {
    await this.repository.update(research_id, {
      content,
      job_status: status,
    });
  }

  async findById(research_id: string): Promise<Research | null> {
    return this.repository.findOne({ where: { id: research_id } });
  }

  private async callPythonAgent(
    query: string,
    research_id: string,
  ): Promise<void> {
    try {
      const pythonApiUrl =
        this.configService.get<string>('PYTHON_AGENT_URL') ||
        'http://localhost:5000';

      const response = await fetch(`${pythonApiUrl}/agent/lookup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          research_id,
        }),
      });

      if (!response.ok) {
        console.error(
          `Python agent API call failed: ${response.status} ${response.statusText}`,
        );
        await this.updateResearchResult(
          research_id,
          null as any,
          IResearchJobStatus.FAILED,
        );
      }
    } catch (error) {
      console.error('Error calling Python agent:', error);
      await this.updateResearchResult(
        research_id,
        null as any,
        IResearchJobStatus.FAILED,
      );
    }
  }
}
