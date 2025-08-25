import axios, { AxiosResponse, AxiosError } from "axios";
import {
  ISendCodeRequest,
  IVerifyCodeRequest,
  IVerifyCodeResponse,
  IResponseBody,
  IUserProfile,
  IUserUpdateProfile,
  IApiKeyEntity,
  IUpdateApiKeyStatus,
  IBillingEntity,
} from "@repo/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const authService = {
  sendCode: async (data: ISendCodeRequest): Promise<IResponseBody<void>> => {
    const response: AxiosResponse<IResponseBody<void>> = await api.post(
      "/auth/send-code",
      data
    );
    return response.data;
  },

  verifyCode: async (
    data: IVerifyCodeRequest
  ): Promise<IVerifyCodeResponse> => {
    const response: AxiosResponse<IVerifyCodeResponse> = await api.post(
      "/auth/verify-code",
      data
    );
    return response.data;
  },

  getProfile: async (): Promise<IResponseBody<IUserProfile>> => {
    const response: AxiosResponse<IResponseBody<IUserProfile>> =
      await api.get("/auth/profile");
    return response.data;
  },

  logout: async (): Promise<void> => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("auth_user");
  },
};

export const userService = {
  updateProfile: async (
    data: IUserUpdateProfile
  ): Promise<IResponseBody<void>> => {
    const response: AxiosResponse<IResponseBody<void>> = await api.put(
      "/auth/profile",
      data
    );
    return response.data;
  },

  getApiKeys: async (): Promise<IResponseBody<IApiKeyEntity>> => {
    const response: AxiosResponse<IResponseBody<IApiKeyEntity>> =
      await api.get("/api-key");
    return response.data;
  },

  toggleApiKey: async (
    data: IUpdateApiKeyStatus
  ): Promise<IResponseBody<IApiKeyEntity>> => {
    const response: AxiosResponse<IResponseBody<IApiKeyEntity>> = await api.put(
      "/api-key/status",
      data
    );
    return response.data;
  },

  getBilling: async (): Promise<IResponseBody<IBillingEntity>> => {
    const response: AxiosResponse<IResponseBody<IBillingEntity>> =
      await api.get("/billing");
    return response.data;
  },
};

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<IResponseBody<any>>;
    return {
      message:
        axiosError.response?.data?.message ||
        axiosError.message ||
        "An error occurred",
      status: axiosError.response?.status,
      code: axiosError.code,
    };
  }

  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  return {
    message: "An unknown error occurred",
  };
};

export default api;
