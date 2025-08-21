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
