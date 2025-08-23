import {
  IResearchEntity,
  IResearchJobStatus,
  IMacLookupOutput,
} from '@repo/types';
import { CoreEntity } from 'src/core/models/core.entity';
import { Column, Entity } from 'typeorm';

@Entity('research')
export class Research extends CoreEntity implements IResearchEntity {
  @Column({ type: 'varchar', length: 255, unique: true })
  query_id: string;

  @Column({ type: 'varchar', length: 500 })
  query: string;

  @Column({
    type: 'jsonb',
    nullable: true,
    transformer: {
      to: (value: IMacLookupOutput | null) => value,
      from: (value: any) => value,
    },
  })
  content: IMacLookupOutput | null;

  @Column({
    type: 'enum',
    enum: IResearchJobStatus,
    default: IResearchJobStatus.PROCESSING,
  })
  job_status: IResearchJobStatus;
}
