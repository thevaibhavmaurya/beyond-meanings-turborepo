import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { Billing, WebhookEvent } from './billing.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditGuard } from './credit.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Billing, WebhookEvent])],
  controllers: [BillingController],
  providers: [BillingService, CreditGuard],
  exports: [BillingService, CreditGuard],
})
export class BillingModule {}
