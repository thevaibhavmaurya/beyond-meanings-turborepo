import {
  IBillingPlan,
  IBillingCycle,
  IBillingEntity,
  IWebhookEventEntity,
} from '@repo/types';
import { CoreEntity } from 'src/core/models/core.entity';
import { Users } from 'src/user/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class Billing extends CoreEntity implements IBillingEntity {
  @Column({ type: 'uuid', unique: true })
  userId: string;

  @OneToOne(() => Users, (user) => user.billing, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: Users;

  @Column({ type: 'enum', enum: IBillingPlan, default: IBillingPlan.FREE })
  plan: IBillingPlan;

  @Column({ type: 'enum', enum: IBillingCycle, default: IBillingCycle.MONTHLY })
  billingCycle: IBillingCycle;

  @Column({ type: 'varchar', nullable: true })
  stripeCustomerId?: string;

  @Column({ type: 'varchar', nullable: true })
  stripeSubscriptionId?: string;

  @Column({ type: 'int', default: 0 })
  creditsUsed: number;

  @Column({ type: 'int', default: 100 })
  totalCredits: number;

  @Column({ type: 'timestamp', nullable: true })
  lastBillingDate?: Date;

  @Column({ type: 'timestamp', nullable: true })
  nextBillingDate?: Date;
}

@Entity('webhook_events')
export class WebhookEvent extends CoreEntity implements IWebhookEventEntity {
  @Column({ type: 'varchar' })
  eventType: string;

  @Column({ type: 'varchar' })
  eventId: string;

  @Column({ type: 'boolean', default: false })
  processed: boolean;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;
}
