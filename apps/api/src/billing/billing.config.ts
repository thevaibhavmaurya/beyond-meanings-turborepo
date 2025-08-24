import { IBillingPlan, IBillingPlans } from '@repo/types';

export const BILLING_PLANS: IBillingPlans = {
  [IBillingPlan.FREE]: {
    name: 'Free',
    yearlyPrice: 0,
    halfYearlyPrice: 0,
    features: [
      '10 Lookups per day',
      'Use on 1 Device',
      'Wikipedia Information',
      'Dictionary Definitions',
      'Basic Web Search Results',
      'Standard Response Time',
    ],
  },
  [IBillingPlan.PREMIUM]: {
    name: 'Premium',
    yearlyPrice: 24,
    halfYearlyPrice: 15,
    features: [
      'Unlimited Lookups',
      'Use on 5 Devices',
      'All Information Sources',
      'Movie & TV Database (TMDB)',
      'Gaming Database (IGDB)',
      'Real-time Web Search',
      'Custom Shortcut Keys',
      'Priority Response Time',
      'Organized Tab Interface',
      'Advanced AI Summaries',
    ],
  },
};
