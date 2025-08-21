import {
  IBillingPlan,
  IBillingCycle,
  IBillingEntity,
  IWebhookEventEntity,
} from '@repo/types';
import { CoreEntity } from 'src/core/models/core.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Billing extends CoreEntity implements IBillingEntity {
  @Column({ type: 'enum', enum: IBillingPlan })
  plan: IBillingPlan;

  @Column({ type: 'enum', enum: IBillingCycle })
  billingCycle: IBillingCycle;

  @Column({ type: 'varchar' })
  stripeCustomerId: string;

  @Column({ type: 'varchar' })
  stripeSubscriptionId: string;

  @Column({ type: 'int' })
  creditsUsed: number;

  @Column({ type: 'int' })
  totalCredits: number;

  @Column({ type: 'timestamp' })
  lastBillingDate: Date;

  @Column({ type: 'timestamp' })
  nextBillingDate: Date;
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
