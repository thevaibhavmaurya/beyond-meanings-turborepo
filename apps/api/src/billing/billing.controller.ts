import { Controller, Get, UseGuards } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { IBillingPlans, IResponseBody } from '@repo/types';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { UserId } from 'src/user/user.decorator';
import { BILLING_PLANS } from './billing.config';
import { Billing } from './billing.entity';
import { BillingService } from './billing.service';

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

  @UseGuards(JwtAuthGuard)
  @Get()
  async getBilling(@UserId() userId: string): Promise<IResponseBody<Billing>> {
    const billing = await this.billingService.getBillingInfo(userId);
    return {
      success: true,
      message: 'Billing information retrieved successfully',
      data: billing,
    };
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleResetCredits() {
    return this.billingService.resetCredits();
  }
}
