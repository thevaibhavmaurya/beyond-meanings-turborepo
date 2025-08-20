import { Exclude } from 'class-transformer';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class DateMetaEntity {
  @Exclude({ toClassOnly: true })
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: Date;
}
