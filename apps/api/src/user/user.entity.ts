import { IUserEntity } from '@repo/types';
import { CoreEntity } from 'src/core/models/core.entity';
import { Column, Entity } from 'typeorm';

@Entity('users')
export class Users extends CoreEntity implements IUserEntity {
  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'varchar', length: 255 })
  accessToken: string;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;
}
