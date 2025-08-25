"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { authService, handleApiError } from "./api";
import { IAuthContext, IAuthUser } from "@repo/types";
import { toast } from "sonner";

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IAuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const sendCode = async (email: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authService.sendCode({ email });

      if (response.success) {
        toast.success("Verification code sent to your email");
      } else {
        throw new Error(response.message || "Failed to send verification code");
      }
    } catch (error) {
      const apiError = handleApiError(error);
      toast.error(apiError.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async (email: string, code: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await authService.verifyCode({ email, code });

      if (response.success && response.data) {
        const { accessToken } = response.data;
        setToken(accessToken);
        localStorage.setItem("auth_token", accessToken);

        // Get user profile after successful verification
        const profileResponse = await authService.getProfile();
        if (profileResponse.success && profileResponse.data) {
          const authUser: IAuthUser = {
            id: profileResponse.data.id || "",
            name: profileResponse.data.name,
            email: profileResponse.data.email,
            status: profileResponse.data.status,
          };

          setUser(authUser);
          localStorage.setItem("auth_user", JSON.stringify(authUser));
        }

        toast.success("Authentication successful!");
      } else {
        throw new Error(response.message || "Verification failed");
      }
    } catch (error) {
      const apiError = handleApiError(error);
      toast.error(apiError.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    setToken(null);
    authService.logout();
    toast.success("Logged out successfully");
  };

  const checkAuthStatus = async (): Promise<void> => {
    try {
      const savedToken = localStorage.getItem("auth_token");
      const savedUser = localStorage.getItem("auth_user");

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));

        const response = await authService.getProfile();
        if (response.success && response.data) {
          const authUser: IAuthUser = {
            id: response.data.id || "",
            name: response.data.name,
            email: response.data.email,
            status: response.data.status,
          };
          setUser(authUser);
          localStorage.setItem("auth_user", JSON.stringify(authUser));
        }
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const value: IAuthContext = {
    user,
    token,
    sendCode,
    verifyCode,
    logout,
    isLoading,
    isAuthenticated: !!user && !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
