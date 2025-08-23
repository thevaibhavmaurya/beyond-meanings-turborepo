import { Card, CardContent } from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import {
  LogIn,
  Puzzle,
  Key,
  Zap,
  Target,
  Smartphone,
  Play,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Login & Get API Key",
    description:
      "Create your free BeyondMeanings account and generate your personal API key for seamless access.",
    icon: LogIn,
    detail: "Free account with 15 daily lookups",
  },
  {
    number: "02",
    title: "Add Chrome Extension",
    description:
      "Install our lightweight browser extension from the Chrome Web Store or your browser's extension marketplace.",
    icon: Puzzle,
    detail: "Works on Chrome, Firefox, Safari & Edge",
  },
  {
    number: "03",
    title: "Enter API Key",
    description:
      "Simply paste your API key into the extension settings and start researching with unlimited intelligence.",
    icon: Key,
    detail: "One-time setup, permanent access",
  },
];

export function HowTo() {
  return (
    <section id="how-to" className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <Badge variant="outline" className="mb-4">
            Simple Process
          </Badge>
          <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            How It <span className="text-primary">Works</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Get started with BeyondMeanings in just three simple steps and
            transform your research experience forever.
          </p>
        </div>

        {/* Desktop Steps */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-1/2 top-1/2 w-full h-0.5 bg-border transform -translate-y-1/2 -translate-x-1/2" />

            <div className="grid grid-cols-3 gap-8">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={index} className="relative">
                    <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary/50 relative bg-background">
                      <CardContent className="p-6 sm:p-8 text-center">
                        {/* Step number */}
                        <div className="mx-auto mb-6 h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg sm:text-xl relative z-10">
                          {step.number}
                        </div>

                        {/* Icon */}
                        <div className="mb-4 h-10 w-10 sm:h-12 sm:w-12 mx-auto rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                        </div>

                        {/* Content */}
                        <h3 className="mb-3 text-lg sm:text-xl font-bold group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 text-sm sm:text-base leading-relaxed">
                          {step.description}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {step.detail}
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Mobile Steps */}
        <div className="lg:hidden space-y-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-16 bg-border" />
                )}

                <Card className="hover:border-primary/50 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg sm:text-xl flex-shrink-0">
                        {step.number}
                      </div>
                      <div className="flex-1">
                        <div className="mb-3 h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                        </div>
                        <h3 className="mb-2 text-lg sm:text-xl font-bold">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground mb-3 text-sm sm:text-base leading-relaxed">
                          {step.description}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {step.detail}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Demo callout
        <div className="mt-12 sm:mt-16 text-center">
          <Card className="mx-auto max-w-2xl border-dashed border-primary/30 bg-primary/5">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-4 h-12 w-12 sm:h-16 sm:w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Play className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              <h3 className="mb-4 text-lg sm:text-xl font-bold">
                See It In Action
              </h3>
              <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                Watch our quick demo to see exactly how BeyondMeanings
                transforms your research workflow.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                <Badge variant="outline" className="px-3 py-1 text-xs">
                  <Zap className="mr-1 h-3 w-3" />
                  30 second demo
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-xs">
                  <Target className="mr-1 h-3 w-3" />
                  Real examples
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-xs">
                  <Smartphone className="mr-1 h-3 w-3" />
                  All devices
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </section>
  );
}
