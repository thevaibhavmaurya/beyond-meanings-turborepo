export interface ICoreEntity {
  id?: string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

// User Entity
export interface IUserEntity extends ICoreEntity {
  name: string;
  status: boolean;
  email: string;
  accessToken: string;
  expiresAt: Date;
}

export type IUserProfile = Omit<
  IUserEntity,
  "password_hash" | "expiresAt" | "accessToken"
>;

export interface IAuthResponse {
  success: boolean;
  message: string;
  accessToken?: string;
}

export interface IResponseBody<T> {
  success: boolean;
  message: string;
  data?: T;
}

// Email
export const enum IEmailTemplates {
  SendCode = "send-code",
}

export interface ITeamInvitationProps {
  email: string;
  token: string;
  teamName: string;
  inviterName?: string;
  expiresAt: Date;
}

export interface IEmailCodeDto {
  email: string;
  otp: string;
  expiresAt: string;
}

// Jwt
export interface IJwtPayload {
  email: string;
  userId: string;
}

// Billing
export enum IBillingPlan {
  FREE = "FREE",
  PREMIUM = "PREMIUM",
}

export enum IBillingCycle {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

export interface IBillingEntity extends ICoreEntity {
  plan: IBillingPlan;
  billingCycle: IBillingCycle;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  creditsUsed: number;
  totalCredits: number;
  lastBillingDate: Date;
  nextBillingDate: Date;
}

export interface IWebhookEventEntity extends ICoreEntity {
  eventType: string;
  eventId: string;
  processed: boolean;
  metadata?: Record<string, any>;
}

export interface IBillingPlanDetails {
  name: string;
  yearlyPrice: number;
  halfYearlyPrice?: number;
  features: string[];
}

export type IBillingPlans = Record<IBillingPlan, IBillingPlanDetails>;
