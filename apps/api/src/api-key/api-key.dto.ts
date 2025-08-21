import { IUpdateApiKeyStatus } from '@repo/types';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateApiKeyStatusDto implements IUpdateApiKeyStatus {
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}
