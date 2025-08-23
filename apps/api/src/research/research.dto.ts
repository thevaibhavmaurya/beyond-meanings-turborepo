import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsEnum,
  IsObject,
  IsOptional,
} from 'class-validator';
import {
  ILookupRequest,
  IStatusRequest,
  IMacLookupOutput,
  IResearchJobStatus,
} from '@repo/types';

export class LookupRequestDto implements ILookupRequest {
  @IsString()
  @IsNotEmpty()
  query: string;
}

export class StatusRequestDto implements IStatusRequest {
  @IsUUID()
  @IsNotEmpty()
  research_id: string;
}

export class UpdateResearchDto {
  @IsUUID()
  @IsNotEmpty()
  research_id: string;

  @IsObject()
  @IsOptional()
  content: IMacLookupOutput | null;

  @IsEnum(IResearchJobStatus)
  @IsNotEmpty()
  status: IResearchJobStatus;
}
