import { IBillingPlan, IBillingPlans } from '@repo/types';

export const BILLING_PLANS: IBillingPlans = {
  [IBillingPlan.FREE]: {
    name: 'Free',
    yearlyPrice: 0,
    halfYearlyPrice: 0,
    features: [
      '10 Credits per day',
      'Use on 1 Device',
      'Meaning with Example',
      'Related Links & Content',
    ],
  },
  [IBillingPlan.PREMIUM]: {
    name: 'Premium',
    yearlyPrice: 30,
    halfYearlyPrice: 20,
    features: [
      'Unlimited Credits',
      'Use on 3 Devices',
      'Meaning with Example',
      'Related Links & Content',
    ],
  },
};
