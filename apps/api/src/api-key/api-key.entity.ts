import { IApiKeyEntity } from '@repo/types';
import { CoreEntity } from 'src/core/models/core.entity';
import { Users } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class ApiKey extends CoreEntity implements IApiKeyEntity {
  @Column({ type: 'varchar', unique: true })
  key: string;

  @Column({ type: 'uuid', unique: true })
  userId: string;

  @OneToOne(() => Users, (user) => user.apiKey, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Users;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;
}
