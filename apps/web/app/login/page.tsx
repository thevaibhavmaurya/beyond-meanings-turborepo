"use client";

import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@repo/ui/components/input-otp";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Mail,
  Loader2,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useAuth } from "../../lib/auth-context";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"email" | "verification">("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; code?: string }>({});

  const { sendCode, verifyCode, isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  // Memoized email validation
  const validateEmail = useCallback((): boolean => {
    const newErrors: { email?: string } = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [email]);

  // Memoized code validation
  const validateCode = useCallback((): boolean => {
    const newErrors: { code?: string } = {};

    if (!code) {
      newErrors.code = "Verification code is required";
    } else if (code.length !== 6) {
      newErrors.code = "Verification code must be 6 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [code]);

  // Optimized form handlers
  const handleSendCode = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateEmail()) return;

      setIsSubmitting(true);
      setErrors({});

      try {
        await sendCode(email.trim());
        setStep("verification");
      } catch (error) {
        setErrors({ email: "Failed to send code. Please try again." });
        console.error("Send code failed:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [email, validateEmail, sendCode]
  );

  const handleVerifyCode = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateCode()) return;

      setIsSubmitting(true);

      try {
        await verifyCode(email.trim(), code);
        // No need to manually redirect, useEffect will handle it
      } catch (error) {
        setErrors({ code: "Invalid verification code. Please try again." });
        console.error("Verification failed:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [email, code, validateCode, verifyCode]
  );

  const handleBackToEmail = useCallback(() => {
    setStep("email");
    setCode("");
    setErrors({});
  }, []);

  const handleOTPChange = useCallback(
    (value: string) => {
      setCode(value);
      if (errors.code) setErrors({});
    },
    [errors.code]
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      if (errors.email) setErrors({});
    },
    [errors.email]
  );

  // Memoized computed values
  const isEmailValid = useMemo(
    () => email.trim() && !errors.email,
    [email, errors.email]
  );
  const isCodeComplete = useMemo(() => code.length === 6, [code.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-muted/20 relative overflow-hidden">
      {/* Optimized background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none" />

      <div className="relative flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:gap-3 mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>

            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 flex items-center justify-center shadow-xl ring-4 ring-primary/10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  <span className="text-primary-foreground font-bold text-xl relative z-10">
                    BM
                  </span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                    BeyondMeanings
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    AI-Powered Research Extension
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Login Card */}
          <Card className="border-border/50 shadow-2xl backdrop-blur-sm bg-background/80 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

            <CardHeader className="text-center space-y-4 relative">
              <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 flex items-center justify-center mb-2">
                {step === "email" ? (
                  <Mail className="h-6 w-6 text-primary" />
                ) : (
                  <Shield className="h-6 w-6 text-primary" />
                )}
              </div>

              <CardTitle className="text-2xl font-bold">
                {step === "email" ? "Welcome back" : "Verify your email"}
              </CardTitle>

              <CardDescription className="text-base">
                {step === "email" ? (
                  "Enter your email to receive a secure verification code"
                ) : (
                  <div className="space-y-2">
                    <p>We sent a 6-digit code to</p>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-muted rounded-full">
                      <Mail className="h-3 w-3" />
                      <span className="font-medium text-foreground">
                        {email}
                      </span>
                    </div>
                  </div>
                )}
              </CardDescription>
            </CardHeader>

            <CardContent className="relative">
              {step === "email" ? (
                <form onSubmit={handleSendCode} className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      Email address
                    </label>
                    <div className="relative group">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={handleEmailChange}
                        className={`pl-10 h-12 transition-all duration-300 ${
                          errors.email
                            ? "border-destructive focus:border-destructive"
                            : "focus:border-primary focus:ring-2 focus:ring-primary/20"
                        }`}
                        disabled={isSubmitting}
                        autoComplete="email"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive flex items-center gap-1 animate-in slide-in-from-left-1">
                        <span className="w-1 h-1 bg-destructive rounded-full" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                    disabled={isSubmitting || !isEmailValid}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Sending secure code...
                      </>
                    ) : (
                      <>
                        Send verification code
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleVerifyCode} className="space-y-6">
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-foreground block text-center">
                      Enter your 6-digit verification code
                    </label>

                    <div className="flex justify-center">
                      <InputOTP
                        maxLength={6}
                        value={code}
                        onChange={handleOTPChange}
                        disabled={isSubmitting}
                        className="gap-2"
                      >
                        <InputOTPGroup className="gap-2">
                          {[0, 1, 2, 3, 4, 5].map((index) => (
                            <InputOTPSlot
                              key={index}
                              index={index}
                              className="w-12 h-12 text-lg font-semibold rounded-lg border-2 transition-all duration-200 
                                focus:border-primary focus:ring-2 focus:ring-primary/20 
                                data-[active=true]:border-primary data-[active=true]:ring-2 data-[active=true]:ring-primary/20
                                caret-transparent selection:bg-primary/20"
                            />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </div>

                    {errors.code && (
                      <p className="text-sm text-destructive flex items-center justify-center gap-1 animate-in slide-in-from-left-1">
                        <span className="w-1 h-1 bg-destructive rounded-full" />
                        {errors.code}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3">
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer"
                      disabled={isSubmitting || !isCodeComplete}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Verify & Sign in
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-11 hover:bg-muted/50 transition-all duration-300"
                      onClick={handleBackToEmail}
                      disabled={isSubmitting}
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back to email
                    </Button>
                  </div>

                  <div className="text-center pt-4 border-t">
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      onClick={handleSendCode}
                      disabled={isSubmitting}
                    >
                      Didn't receive the code? Resend
                    </Button>
                  </div>
                </form>
              )}

              <div className="mt-8 text-center pt-6 border-t">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    href="/register"
                    className="text-primary hover:underline font-medium transition-all duration-300 hover:text-primary/80"
                  >
                    Create one now
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Security Notice */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <Shield className="h-3 w-3" />
              Your data is encrypted and secure
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
