import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ApiKey } from './api-key.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class ApiKeyService {
  constructor(
    @InjectRepository(ApiKey)
    private apiKeyRepository: Repository<ApiKey>,
  ) {}

  private generateKey(): string {
    return 'beyond-' + crypto.randomBytes(32).toString('hex');
  }

  generateApiKey(transactionalEntityManager: EntityManager, userId: string) {
    const key = this.generateKey();
    return transactionalEntityManager.create(ApiKey, {
      key,
      userId,
    });
  }

  async getApiKey(userId: string) {
    try {
      const apiKey = await this.apiKeyRepository.findOne({ where: { userId } });
      if (!apiKey) {
        throw new NotFoundException('API key not found');
      }
      return apiKey;
    } catch (error) {
      throw new BadRequestException('Failed to get API key');
    }
  }

  async updateApiKeyStatus(userId: string, isActive: boolean) {
    const apiKey = await this.apiKeyRepository.findOne({ where: { userId } });

    if (!apiKey) {
      throw new NotFoundException('API key not found');
    }

    apiKey.isActive = isActive;
    return await this.apiKeyRepository.save(apiKey);
  }

  async regenerateUserApiKey(userId: string) {
    const apiKey = await this.apiKeyRepository.findOne({ where: { userId } });

    if (!apiKey) {
      throw new NotFoundException('API key not found');
    }

    const newKey = this.generateKey();
    apiKey.key = newKey;
    apiKey.isActive = true;

    return await this.apiKeyRepository.save(apiKey);
  }

  validateAndUpdateUsage(key: string) {
    return this.apiKeyRepository.findOne({
      where: { key },
      relations: ['user'],
    });
  }
}
