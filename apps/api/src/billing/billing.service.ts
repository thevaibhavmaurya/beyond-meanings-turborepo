import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, MoreThan, Repository } from 'typeorm';
import { Billing } from './billing.entity';
import {
  IBillingPlan,
  IBillingCycle,
  ICreditOperation,
  CREDIT_COSTS,
} from '@repo/types';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);
  constructor(
    @InjectRepository(Billing)
    private readonly billingRepository: Repository<Billing>,
  ) {}

  createDefaultBilling(
    transactionalEntityManager: EntityManager,
    userId: string,
  ) {
    return transactionalEntityManager.create(Billing, {
      userId,
      plan: IBillingPlan.FREE,
      billingCycle: IBillingCycle.MONTHLY,
      creditsUsed: 0,
      totalCredits: 10,
    });
  }

  async getBillingInfo(userId: string) {
    const billing = await this.billingRepository.findOne({
      where: { userId },
    });

    if (!billing) {
      throw new NotFoundException('Billing information not found');
    }

    return billing;
  }

  async hasEnoughCredits(
    userId: string,
    operation: ICreditOperation,
    billingInfo?: Billing,
  ): Promise<boolean> {
    let billing: Billing;
    if (billingInfo) {
      billing = billingInfo;
    } else {
      billing = await this.getBillingInfo(userId);
    }
    const creditCost = CREDIT_COSTS[operation];
    return billing.creditsUsed + creditCost <= billing.totalCredits;
  }

  async consumeCredits(userId: string, operation: ICreditOperation) {
    const billing = await this.getBillingInfo(userId);
    const creditCost = CREDIT_COSTS[operation];

    if (billing.creditsUsed + creditCost > billing.totalCredits) {
      throw new Error('Insufficient credits');
    }

    billing.creditsUsed += creditCost;
    return this.billingRepository.save(billing);
  }

  async resetCredits() {
    await this.billingRepository.update(
      {
        creditsUsed: MoreThan(0),
      },
      {
        creditsUsed: 0,
      },
    );
    this.logger.log('Reset credits successfully');
  }
}
