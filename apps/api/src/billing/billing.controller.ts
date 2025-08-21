import { Controller, Get } from '@nestjs/common';
import { IBillingPlans, IResponseBody } from '@repo/types';
import { BILLING_PLANS } from './billing.config';
import { BillingService } from './billing.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('config')
  getBillingConfig(): IResponseBody<IBillingPlans> {
    return {
      success: true,
      message: 'Billing config fetched successfully',
      data: BILLING_PLANS,
    };
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleResetCredits() {
    return this.billingService.resetCredits();
  }
}
