import { IUserEntity } from '@repo/types';
import { ApiKey } from 'src/api-key/api-key.entity';
import { Billing } from 'src/billing/billing.entity';
import { CoreEntity } from 'src/core/models/core.entity';
import { Column, Entity, OneToOne } from 'typeorm';

@Entity('users')
export class Users extends CoreEntity implements IUserEntity {
  @Column({ type: 'varchar', length: 255, nullable: true })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true, nullable: true })
  email: string;

  @Column({ type: 'boolean', default: true, nullable: true })
  status: boolean;

  @Column({ type: 'varchar', length: 255, nullable: true })
  accessToken: string;

  @Column({ type: 'timestamptz', nullable: true })
  expiresAt: Date;

  @OneToOne(() => ApiKey, (apiKey) => apiKey.user, { cascade: true })
  apiKey: ApiKey;

  @OneToOne(() => Billing, (billing) => billing.user, { cascade: true })
  billing: Billing;
}
