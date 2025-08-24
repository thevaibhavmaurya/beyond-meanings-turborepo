import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BillingService } from './billing.service';
import { IBillingPlan, ICreditOperation } from '@repo/types';

export const RequiredCredits = Reflector.createDecorator<ICreditOperation>();

@Injectable()
export class CreditGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private billingService: BillingService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredOperation = this.reflector.get(
      RequiredCredits,
      context.getHandler(),
    );

    if (!requiredOperation) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.id;

    if (!userId) {
      throw new ForbiddenException('User not authenticated');
    }

    try {
      const billing = await this.billingService.getBillingInfo(userId);
      console.log(billing);
      if (billing.plan === IBillingPlan.PREMIUM) {
        return true;
      }

      const hasEnoughCredits = await this.billingService.hasEnoughCredits(
        userId,
        requiredOperation,
        billing,
      );

      if (!hasEnoughCredits) {
        throw new ForbiddenException(
          'You have reached your daily credit quota. Please upgrade to Premium for unlimited access.',
        );
      }

      const consumed = await this.billingService.consumeCredits(
        billing.userId,
        requiredOperation,
      );

      if (!consumed) {
        throw new ForbiddenException(
          'Unable to consume credits. Please try again.',
        );
      }

      request.creditOperation = requiredOperation;
      return true;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new ForbiddenException('Unable to verify credit availability');
    }
  }
}
