import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  RefreshCw,
  Puzzle,
  RotateCcw,
  BookOpen,
  Target,
  Smartphone,
} from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import Link from "next/link";
import { LinkNavigate } from "./LinkNavigate";

const problems = [
  {
    title: "Mac Lookup Missing on Other Platforms",
    description:
      "Mac users feel completely lost without their beloved three-finger tap lookup when using Windows, Linux, or different browsers. The muscle memory is there, but the feature isn't.",
    icon: Target,
    readMoreLink:
      "https://www.reddit.com/r/MacOS/comments/1lf1k9k/what_are_simple_windows_features_that_you_miss_on/",
  },
  {
    title: "Three-Finger Tap Constantly Breaking",
    description:
      "Users report frequent issues with Mac's three-finger lookup gesture randomly stopping or becoming unreliable after macOS updates, requiring constant troubleshooting and restarts.",
    icon: RefreshCw,
    readMoreLink: "https://discussions.apple.com/thread/254513079",
  },
  {
    title: "Microsoft Office Apps Block Mac Lookup",
    description:
      "Force touch and three-finger tap lookup features don't work in Microsoft Word, PowerPoint, and other Office apps, forcing users to rely on inferior built-in tools or manual searches.",
    icon: Puzzle,
    readMoreLink: "https://discussions.apple.com/thread/253687435",
  },
  {
    title: "Browser Extensions Are Too Basic",
    description:
      "Available dictionary extensions only provide simple definitions. Users need comprehensive information about movies, people, games, and complex topics in one organized interface.",
    icon: BookOpen,
    readMoreLink:
      "https://www.reddit.com/r/Safari/comments/1ckh2kq/is_there_a_dictionary_extension/",
  },
  {
    title: "Constant Tab Switching Breaks Flow",
    description:
      "Opening Wikipedia, IMDB, Google, and dictionary sites in separate tabs destroys reading concentration and wastes time during research sessions.",
    icon: RotateCcw,
    readMoreLink:
      "https://stackoverflow.com/questions/20507457/how-can-i-override-the-3-finger-tap-behavior-in-a-nstextview",
  },
  {
    title: "Gesture Conflicts and Compatibility Issues",
    description:
      "Mac trackpad gestures conflict with other apps and settings, causing lookup to trigger wrong actions or fail completely, especially with third-party tools like BetterTouchTool.",
    icon: Smartphone,
    readMoreLink:
      "https://community.folivora.ai/t/lookup-word-under-cursor-not-working/32004",
  },
];

export function Problems() {
  return (
    <section id="problems" className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Why Mac Users Are{" "}
            <span className="text-destructive">Frustrated</span> Without Their
            Lookup Feature
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Real problems shared by thousands of users across Reddit, Apple
            Support Communities, and Stack Overflow about the missing Mac lookup
            experience everywhere else.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50"
              >
                <CardHeader className="pb-3">
                  <div className="mb-3 sm:mb-4 h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-destructive/10 flex items-center justify-center group-hover:bg-destructive/20 transition-colors">
                    <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 text-destructive" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl group-hover:text-primary transition-colors">
                    {problem.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm sm:text-base leading-relaxed mb-4">
                    {problem.description}
                  </CardDescription>
                  <a
                    href={problem.readMoreLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      "hover:text-primary text-sm text-muted-foreground"
                    }
                  >
                    Read Discussion →
                  </a>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <div className="mx-auto max-w-2xl rounded-lg bg-muted/50 p-6 sm:p-8">
            <h3 className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold">
              Over 10,000 Users Share These Frustrations
            </h3>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
              From Apple Support threads with hundreds of "Me too" responses to
              Reddit posts with thousands of upvotes, the demand for a universal
              Mac-like lookup is overwhelming.
            </p>
            <LinkNavigate href="#features">
              See How MacLookup Solves This
            </LinkNavigate>
          </div>
        </div>
      </div>
    </section>
  );
}
