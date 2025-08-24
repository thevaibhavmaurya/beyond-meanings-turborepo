"use client";

import { IApiKeyEntity, IBillingEntity, IBillingPlan } from "@repo/types";
import { Badge } from "@repo/ui/components/badge";
import { Button, buttonVariants } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { cn } from "@repo/ui/lib/utils";
import {
  Copy,
  CreditCard,
  Edit,
  Home,
  Key,
  LogOut,
  Save,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LinkNavigate } from "../../components/LinkNavigate";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { handleApiError, userService } from "../../lib/api";
import { useAuth } from "../../lib/auth-context";

function DashboardContent() {
  const { user, logout } = useAuth();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");
  const [isSaving, setIsSaving] = useState(false);
  const [apiKey, setApiKey] = useState<IApiKeyEntity | null>(null);
  const [billing, setBilling] = useState<IBillingEntity | null>(null);
  const [isLoadingApiKeys, setIsLoadingApiKeys] = useState(true);
  const [isLoadingBilling, setIsLoadingBilling] = useState(true);
  const [updatingApiKey, setUpdatingApiKey] = useState<string | null>(null);

  const loadApiKeys = async () => {
    try {
      setIsLoadingApiKeys(true);
      const response = await userService.getApiKeys();
      if (response.success && response.data) {
        setApiKey(response.data);
      }
    } catch (error) {
      const apiError = handleApiError(error);
      toast.error(`Failed to load API keys: ${apiError.message}`);
    } finally {
      setIsLoadingApiKeys(false);
    }
  };

  const loadBilling = async () => {
    try {
      setIsLoadingBilling(true);
      const response = await userService.getBilling();
      if (response.success && response.data) {
        setBilling(response.data);
      }
    } catch (error) {
      const apiError = handleApiError(error);
      toast.error(`Failed to load billing info: ${apiError.message}`);
    } finally {
      setIsLoadingBilling(false);
    }
  };

  useEffect(() => {
    loadApiKeys();
    loadBilling();
  }, []);

  const handleSaveName = async () => {
    if (!editedName.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      setIsSaving(true);
      const response = await userService.updateProfile({
        name: editedName.trim(),
      });
      if (response.success) {
        toast.success("Profile updated successfully");
        setIsEditingName(false);
      }
    } catch (error) {
      const apiError = handleApiError(error);
      toast.error(`Failed to update profile: ${apiError.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedName(user?.name || "");
    setIsEditingName(false);
  };

  const handleToggleApiKey = async (apiKey: IApiKeyEntity) => {
    try {
      setUpdatingApiKey(apiKey.id || "");
      const response = await userService.toggleApiKey({
        isActive: !apiKey.isActive,
      });
      if (response.success) {
        setApiKey((prev) =>
          prev ? { ...prev, isActive: !prev.isActive } : null
        );
        toast.success(
          `API key ${!apiKey.isActive ? "activated" : "deactivated"}`
        );
      }
    } catch (error) {
      const apiError = handleApiError(error);
      toast.error(`Failed to toggle API key: ${apiError.message}`);
    } finally {
      setUpdatingApiKey(null);
    }
  };

  const handleCopyApiKey = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      toast.success("API key copied to clipboard");
    } catch (error) {
      toast.error("Failed to copy API key");
    }
  };

  const formatCredits = (used: number, total: number) => {
    return `${used.toLocaleString()} / ${total.toLocaleString()} credits`;
  };

  const getUsagePercentage = (used: number, total: number) => {
    return Math.min((used / total) * 100, 100);
  };

  const getPlanDisplayName = (plan: IBillingPlan) => {
    return plan === IBillingPlan.FREE ? "Free Plan" : "Premium Plan";
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/20 bg-card/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <Link
              href="/"
              className="flex items-center space-x-3 transition-all duration-300 hover:scale-105"
            >
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 flex items-center justify-center shadow-lg ring-1 ring-primary/20">
                <span className="text-primary-foreground font-bold text-sm">
                  BM
                </span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                BeyondMeanings
              </span>
            </Link>

            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="outline" size="sm" className="cursor-pointer">
                  <Home className="h-4 w-4 mr-2 " />
                  Home
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your profile, API keys, and billing information
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile
              </CardTitle>
              <CardDescription>
                Your account information and settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email
                </label>
                <p className="text-sm mt-1">{user?.email}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Name
                </label>
                {isEditingName ? (
                  <div className="mt-1 space-y-2">
                    <Input
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
                      placeholder="Enter your name"
                      disabled={isSaving}
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleSaveName}
                        disabled={isSaving}
                      >
                        <Save className="h-4 w-4 mr-1" />
                        {isSaving ? "Saving..." : "Save"}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancelEdit}
                        disabled={isSaving}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-1 flex items-center justify-between">
                    <p className="text-sm">{user?.name}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setIsEditingName(true)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Status
                </label>
                <div className="mt-1">
                  <Badge variant={user?.status ? "default" : "secondary"}>
                    {user?.status ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys
              </CardTitle>
              <CardDescription>
                Manage your API access and endpoints
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingApiKeys ? (
                <div className="space-y-3">
                  <div className="h-4 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
                </div>
              ) : apiKey ? (
                <div className="space-y-4">
                  <div
                    key={apiKey.id}
                    className="border rounded-lg p-3 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <Badge
                        variant={apiKey.isActive ? "default" : "secondary"}
                      >
                        {apiKey.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggleApiKey(apiKey)}
                        disabled={updatingApiKey === apiKey.id}
                      >
                        {updatingApiKey === apiKey.id
                          ? "Updating..."
                          : apiKey.isActive
                            ? "Deactivate"
                            : "Activate"}
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-medium text-muted-foreground">
                        API Key
                      </label>
                      <div className="flex items-center gap-2">
                        <code className="flex-1 text-xs bg-muted px-2 py-1 rounded font-mono truncate">
                          {apiKey.key}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopyApiKey(apiKey.key)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No API keys found
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Billing
              </CardTitle>
              <CardDescription>
                Your subscription and usage information
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingBilling ? (
                <div className="space-y-3">
                  <div className="h-4 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                  <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                </div>
              ) : billing ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Plan
                    </label>
                    <div className="mt-1">
                      <Badge variant="outline">
                        {getPlanDisplayName(billing.plan)}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Credit Usage
                    </label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>
                          {formatCredits(
                            billing.creditsUsed,
                            billing.totalCredits
                          )}
                        </span>
                        <span>
                          {getUsagePercentage(
                            billing.creditsUsed,
                            billing.totalCredits
                          ).toFixed(1)}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${getUsagePercentage(billing.creditsUsed, billing.totalCredits)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {billing.nextBillingDate && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Next Billing Date
                      </label>
                      <p className="text-sm mt-1">
                        {new Date(billing.nextBillingDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {billing.plan === IBillingPlan.FREE && (
                    <LinkNavigate
                      href="/#pricing"
                      className={cn(buttonVariants(), "w-full")}
                    >
                      Upgrade to Premium
                    </LinkNavigate>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No billing information found
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
