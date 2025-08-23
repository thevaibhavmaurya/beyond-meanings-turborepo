import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";
import "../styles/hero.css";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden py-12 sm:py-16 lg:py-20 min-h-screen flex items-center"
    >
      {/* Enhanced background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-muted/40" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />

      {/* Floating elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Animated Badge */}
          <Badge className="mb-4 sm:mb-6 animate-fade-in-up">
            🍎 Mac's Beloved Lookup Feature, Now Supercharged
          </Badge>

          {/* Main headline with gradient text */}
          <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight animate-fade-in-up delay-100">
            Your Favorite{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
              Mac Lookup
            </span>{" "}
            Enhanced with AI Intelligence
          </h1>

          {/* Enhanced subtitle */}
          <p className="mb-6 sm:mb-8 text-lg sm:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Simply highlight any word or phrase to instantly access definitions,
            movie details, person info, and comprehensive research just like
            Mac's three-finger tap, but with{" "}
            <span className="text-primary font-medium">
              AI-powered multi-source insights
            </span>
            .
          </p>

          {/* Enhanced interaction flow with better styling */}
          <div className="mb-8 sm:mb-10 animate-fade-in-up delay-300">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-muted/50 backdrop-blur-sm border">
              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="p-2 rounded-full bg-primary/10">
                  <svg
                    className="h-4 w-4 text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                </div>
                <span>Highlight</span>
              </div>

              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-muted-foreground animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="p-2 rounded-full bg-secondary/10">
                  <kbd className="px-2 py-1 text-xs font-mono bg-muted rounded border">
                    Ctrl+I
                  </kbd>
                </div>
                <span>Trigger</span>
              </div>

              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-muted-foreground animate-pulse"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium">
                <div className="p-2 rounded-full bg-accent/10">
                  <svg
                    className="h-4 w-4 text-accent"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                  </svg>
                </div>
                <span>Discover</span>
              </div>
            </div>
          </div>

          <div className="mb-8 sm:mb-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Button
              size="lg"
              className="w-full sm:w-auto px-6 sm:px-8 cursor-pointer"
            >
              Add to Browser
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-6 sm:px-8 cursor-pointer"
            >
              See It in Action
            </Button>
          </div>

          {/* Enhanced video placeholder */}
          <div className="mx-auto max-w-4xl mb-12 sm:mb-16 animate-fade-in-up delay-500">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted shadow-2xl">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/r7X_D8XMGq0"
                  title="BeyondMeanings - AI-Powered Research Extension Demo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>

          {/* Enhanced features with hover effects */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 animate-fade-in-up delay-600">
            {[
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                ),
                title: "Smart Context Detection",
                desc: "Knows if you're looking up movies, people, or definitions",
                bg: "bg-primary/10",
                iconColor: "text-primary",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                ),
                title: "Multi-Source Research",
                desc: "Wikipedia, web search, movies, games & definitions combined",
                bg: "bg-secondary/10",
                iconColor: "text-secondary-foreground",
              },
              {
                icon: (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                ),
                title: "Mac-Like Experience",
                desc: "Familiar interaction, enhanced with AI intelligence",
                bg: "bg-accent/10",
                iconColor: "text-accent-foreground",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group text-center p-6 rounded-xl hover:bg-muted/30 transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`mx-auto mb-4 h-12 w-12 sm:h-14 sm:w-14 rounded-xl ${feature.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <svg
                    className={`h-6 w-6 sm:h-7 sm:w-7 ${feature.iconColor}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
