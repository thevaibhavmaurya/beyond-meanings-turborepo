import { PrimaryGeneratedColumn } from 'typeorm';
import { DateMetaEntity } from './date-meta.entity';
import { ICoreEntity } from '@repo/types';

export abstract class CoreEntity extends DateMetaEntity implements ICoreEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string;
}
