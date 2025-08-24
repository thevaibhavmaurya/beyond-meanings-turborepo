import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ApiKeyService } from './api-key.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: ApiKeyService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const key = request.headers['x-api-key'];

    if (!key) {
      return false;
    }

    const apiEntity = await this.apiKeyService.validateAndUpdateUsage(key);

    if (!apiEntity || !apiEntity.isActive) {
      return false;
    }

    request.user = apiEntity.user;

    return true;
  }
}
