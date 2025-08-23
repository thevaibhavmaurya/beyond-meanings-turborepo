"use client";

import { useState } from "react";
import { Button } from "@repo/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import { Separator } from "@repo/ui/components/separator";
import { Check, Sparkles, RefreshCw, Shield } from "lucide-react";
import { BILLING_PLANS } from "../lib/billing-plans";

export function Pricing() {
  const [isYearly, setIsYearly] = useState(true);

  const freeFeatures = BILLING_PLANS.FREE.features;
  const proFeatures = BILLING_PLANS.PRO.features;
  const proOnlyFeatures = proFeatures.filter(
    (feature) => !freeFeatures.includes(feature)
  );

  return (
    <section id="pricing" className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Simple, Affordable <span className="text-primary">Pricing</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8">
            Start free and upgrade when you need unlimited power. No hidden
            fees, no surprises.
          </p>

          {/* Pricing Toggle */}
          <div className="inline-flex items-center rounded-md bg-muted p-1 border">
            <button
              onClick={() => setIsYearly(false)}
              className={`relative px-3 sm:px-4 py-2 text-sm font-medium rounded-sm transition-all ${
                !isYearly
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              6 Months
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`relative px-3 sm:px-4 py-2 text-sm font-medium rounded-sm transition-all ${
                isYearly
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Yearly
              <Badge
                variant="secondary"
                className="ml-1 sm:ml-2 text-xs px-1.5 py-0.5"
              >
                37% OFF
              </Badge>
            </button>
          </div>
        </div>

        {/* Pricing Cards - New Layout */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Free Plan */}
            <div className="lg:col-span-4">
              <Card className="h-full hover:shadow-lg transition-all duration-300 p-6">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl sm:text-2xl font-bold">
                    Free
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl sm:text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground text-sm">
                      /forever
                    </span>
                  </div>
                  <CardDescription className="mt-2">
                    Perfect for trying out BeyondMeanings
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full">
                    Get Started Free
                  </Button>

                  <Separator />

                  <div className="space-y-3">
                    {BILLING_PLANS.FREE.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground leading-relaxed">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Pro Plan - Featured */}
            <div className="lg:col-span-8">
              <Card className="relative h-full border-primary shadow-lg hover:shadow-xl transition-all duration-300 py-0">
                {/* Popular Badge */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-primary text-primary-foreground px-3 py-1">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>

                <div className="grid md:grid-cols-5 h-full">
                  {/* Pricing Info */}
                  <div className="md:col-span-2 p-6 sm:p-8 bg-primary/5 border-r">
                    <div className="text-center md:text-left">
                      <CardTitle className="text-2xl sm:text-3xl font-bold mb-2">
                        Pro
                      </CardTitle>
                      <div className="mb-4">
                        <span className="text-4xl sm:text-5xl font-bold">
                          $
                          {isYearly
                            ? BILLING_PLANS.PRO.yearlyPrice
                            : BILLING_PLANS.PRO.halfYearlyPrice}
                        </span>
                        <div className="text-sm text-muted-foreground mt-1">
                          {isYearly ? (
                            <>
                              <div>
                                $
                                {(BILLING_PLANS.PRO.yearlyPrice / 12).toFixed(
                                  2
                                )}
                                /month
                              </div>
                              <div>billed annually</div>
                            </>
                          ) : (
                            <>
                              <div>
                                $
                                {(
                                  BILLING_PLANS.PRO.halfYearlyPrice / 6
                                ).toFixed(2)}
                                /month
                              </div>
                              <div>billed every 6 months</div>
                            </>
                          )}
                        </div>
                      </div>

                      <Button className="w-full mb-4">
                        Start 14-Day Free Trial
                      </Button>

                      <div className="text-center p-3 bg-background/50 rounded-md border">
                        <p className="text-xs text-muted-foreground">
                          <span className="font-medium text-foreground">
                            14-day free trial
                          </span>
                          <br />
                          No credit card required
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="md:col-span-3 p-6 sm:p-8">
                    <CardDescription className="mb-6 text-base">
                      Everything in Free, plus unlimited power and advanced
                      features
                    </CardDescription>

                    <div className="space-y-4">
                      {/* Free Features */}
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                          All Free Features
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {BILLING_PLANS.FREE.features.map((feature, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <Check className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                              <span className="text-xs text-muted-foreground">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Pro Only Features */}
                      <div>
                        <h4 className="text-sm font-medium mb-3 uppercase tracking-wide flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          Pro Features
                        </h4>
                        <div className="space-y-3">
                          {proOnlyFeatures.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm leading-relaxed">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="border-dashed">
              <CardContent className="p-6 text-center">
                <div className="mb-3 h-10 w-10 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <RefreshCw className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Cancel Anytime</h3>
                <p className="text-sm text-muted-foreground">
                  No long-term contracts. Cancel your subscription anytime with
                  one click.
                </p>
              </CardContent>
            </Card>

            <Card className="border-dashed">
              <CardContent className="p-6 text-center">
                <div className="mb-3 h-10 w-10 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">30-Day Guarantee</h3>
                <p className="text-sm text-muted-foreground">
                  Not satisfied? Get a full refund within 30 days, no questions
                  asked.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
