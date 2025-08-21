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

export interface IUserUpdateProfile {
  name: string;
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

export enum ICreditOperation {
  CREDIT_1 = "CREDIT_1",
}

export const CREDIT_COSTS: Record<ICreditOperation, number> = {
  [ICreditOperation.CREDIT_1]: 1,
};

export interface IBillingEntity extends ICoreEntity {
  userId: string;
  plan: IBillingPlan;
  billingCycle: IBillingCycle;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  creditsUsed: number;
  totalCredits: number;
  lastBillingDate?: Date;
  nextBillingDate?: Date;
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

// API Key
export interface IApiKeyEntity extends ICoreEntity {
  key: string;
  userId: string;
  isActive: boolean;
}

export interface IUpdateApiKeyStatus {
  isActive: boolean;
}
