import { Badge } from "@repo/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Search,
  Brain,
  Layout,
  Zap,
  Globe,
  Shield,
  Bot,
  Check,
} from "lucide-react";

const features = [
  {
    title: "Multi-Source Research",
    description:
      "Access Wikipedia, web search, movie databases, gaming info, and dictionary definitions all in one place.",
    icon: Search,
    badge: "Core Feature",
  },
  {
    title: "AI-Powered Intelligence",
    description:
      "Context-aware results that understand what you're looking for and provide relevant, organized information.",
    icon: Brain,
    badge: "AI Powered",
  },
  {
    title: "Organized Tab Interface",
    description:
      "Clean, structured presentation with dedicated tabs for different types of information sources.",
    icon: Layout,
    badge: "User Experience",
  },
  {
    title: "Real-time Information",
    description:
      "Get the latest web results and current information, not outdated cached content.",
    icon: Zap,
    badge: "Live Data",
  },
  {
    title: "Cross-Platform",
    description:
      "Works seamlessly across all major browsers - Chrome, Firefox, Safari, and Edge.",
    icon: Globe,
    badge: "Universal",
  },
  {
    title: "Privacy Focused",
    description:
      "No tracking, no data collection, no ads. Your research stays private and secure.",
    icon: Shield,
    badge: "Privacy First",
  },
];

export function Features() {
  return (
    <section id="features" className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Powerful <span className="text-primary">Features</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Everything you need for intelligent research, built into a beautiful
            browser extension that feels native to your workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="group relative overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all duration-300 p-6"
              >
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <CardHeader className="relative p-0 pb-3">
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative p-0">
                  <CardDescription className="text-sm sm:text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Feature highlight section */}
        <div className="mt-16 sm:mt-20">
          <div className="mx-auto max-w-5xl">
            <Card className="overflow-hidden border-primary/20 py-0">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-6 sm:p-8 lg:p-12">
                  <Badge className="mb-4">Pro Feature</Badge>
                  <h3 className="mb-4 text-xl sm:text-2xl font-bold">
                    Advanced AI Summaries
                  </h3>
                  <p className="text-muted-foreground mb-6 text-base sm:text-lg leading-relaxed">
                    Instead of opening multiple tabs and piecing together
                    information from Wikipedia, IMDB, dictionaries, and Google,
                    our AI instantly synthesizes everything into organized,
                    relevant summaries that save hours of research.
                  </p>
                  <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      Context-aware analysis
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      Multi-source synthesis
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-primary" />
                      Intelligent prioritization
                    </li>
                  </ul>
                </div>
                <div className="bg-muted/50 p-6 sm:p-8 lg:p-12 flex items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 h-16 w-16 sm:h-20 sm:w-20 rounded-full bg-primary flex items-center justify-center">
                      <Bot className="h-8 w-8 sm:h-10 sm:w-10 text-primary-foreground" />
                    </div>
                    <p className="text-base sm:text-lg font-semibold mb-1">
                      AI-Powered Research
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      Smarter than traditional search
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
