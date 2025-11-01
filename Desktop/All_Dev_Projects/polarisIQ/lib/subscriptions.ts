// Subscription tier configuration and limits

export const PLANS = {
  FREE: {
    id: 'FREE',
    name: 'Free Trial',
    price: 0,
    interval: 'month' as const,
    limits: {
      textQueries: 10,
      voiceQueries: 0,
      meetings: 3,
      exports: 1,
      users: 1,
    },
    features: [
      'Text assistant only',
      '10 AI queries',
      '3 meeting sessions',
      'Basic expert personas',
    ],
  },
  STARTER: {
    id: 'STARTER',
    name: 'Starter',
    price: 29,
    interval: 'month' as const,
    stripePriceId: process.env.STRIPE_PRICE_ID_STARTER,
    limits: {
      textQueries: 100,
      voiceQueries: 0,
      meetings: 50,
      exports: 20,
      users: 1,
    },
    features: [
      'Text assistant',
      '100 AI queries per month',
      '50 meeting sessions',
      'All expert personas',
      'Sales pitch support',
      'Meeting notes export',
      'Email support',
    ],
  },
  PROFESSIONAL: {
    id: 'PROFESSIONAL',
    name: 'Professional',
    price: 99,
    interval: 'month' as const,
    stripePriceId: process.env.STRIPE_PRICE_ID_PROFESSIONAL,
    popular: true,
    limits: {
      textQueries: 500,
      voiceQueries: 500,
      meetings: 200,
      exports: 100,
      users: 3,
    },
    features: [
      'Everything in Starter',
      'Voice assistant (iPad optimized)',
      '500 text + voice queries',
      '200 meeting sessions',
      'Live meeting mode',
      'Intelligent interjections',
      'Action item tracking',
      'Priority support',
    ],
  },
  ENTERPRISE: {
    id: 'ENTERPRISE',
    name: 'Enterprise',
    price: 299,
    interval: 'month' as const,
    stripePriceId: process.env.STRIPE_PRICE_ID_ENTERPRISE,
    limits: {
      textQueries: 2000,
      voiceQueries: 2000,
      meetings: -1, // unlimited
      exports: -1, // unlimited
      users: -1, // unlimited
    },
    features: [
      'Everything in Professional',
      '2,000 text + voice queries',
      'Unlimited meeting sessions',
      'Unlimited team members',
      'Custom knowledge base',
      'Advanced analytics',
      'Dedicated support',
      'SSO (coming soon)',
    ],
  },
} as const;

export type PlanId = keyof typeof PLANS;

export function getPlanById(planId: PlanId) {
  return PLANS[planId];
}

export function checkLimit(plan: PlanId, limitType: keyof typeof PLANS.STARTER.limits, currentUsage: number): boolean {
  const planLimits = PLANS[plan].limits;
  const limit = planLimits[limitType];

  // -1 means unlimited
  if (limit === -1) return true;

  return currentUsage < limit;
}

export function getUsagePercentage(plan: PlanId, limitType: keyof typeof PLANS.STARTER.limits, currentUsage: number): number {
  const planLimits = PLANS[plan].limits;
  const limit = planLimits[limitType];

  // -1 means unlimited
  if (limit === -1) return 0;

  return Math.min(100, Math.round((currentUsage / limit) * 100));
}
