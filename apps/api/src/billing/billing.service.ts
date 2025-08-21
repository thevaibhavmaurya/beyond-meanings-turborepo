import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { Billing } from './billing.entity';

@Injectable()
export class BillingService {
  private readonly logger = new Logger(BillingService.name);
  constructor(
    @InjectRepository(Billing)
    private readonly billingRepository: Repository<Billing>,
  ) {}

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
