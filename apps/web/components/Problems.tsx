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
import { LinkNavigate } from "./LinkNavigate";

const problems = [
  {
    title: "Constant Tab Switching Breaks Focus",
    description:
      "Researching a topic often means bouncing between search, Wikipedia, forums, and articles—breaking your flow. A Mac-style Lookup feel, but for every browser and OS, keeps you in context.",
    icon: RotateCcw,
    readMoreLink:
      "https://www.cmu.edu/news/stories/archives/2021/may/overcoming-tab-overload.html",
  },
  {
    title: "Fragmented Information Across Sites",
    description:
      "Answers live on many sources (Google, Reddit, Stack Overflow, Wikipedia, TMDB, IGDB). People keep asking for one query that checks multiple sites and pulls results together.",
    icon: Puzzle,
    readMoreLink:
      "https://www.reddit.com/r/browsers/comments/1k8za0c/looking_for_a_browser_extension_that_can_parallel/",
  },
  {
    title: "Time Wasted Repeating the Same Searches",
    description:
      "Re-running the same query across different apps and sites adds friction and drains time. An in-page lookup that fans out once and organizes results saves cycles.",
    icon: RefreshCw,
    readMoreLink:
      "https://hbr.org/2022/08/how-much-time-and-energy-do-we-waste-toggling-between-applications",
  },
  {
    title: "Unorganized Results Make Synthesis Hard",
    description:
      "Plain definitions aren’t enough. People install tools to structure results or narrow noise—signal needs a clean, organized view right where you’re reading.",
    icon: BookOpen,
    readMoreLink:
      "https://www.wired.com/story/9-browser-extensions-search-the-web-better",
  },
  {
    title: "Missing Context While Reading",
    description:
      "You need more than a dictionary pop-up—surrounding text, encyclopedic context, people and media references. A Mac-like Lookup experience should surface richer context in place.",
    icon: Target,
    readMoreLink:
      "https://www.reddit.com/r/readwise/comments/1781r5m/have_access_to_the_surrounding_text_around_a/",
  },
  {
    title: "Research on Mobile Is Harder",
    description:
      "Small screens, cramped UIs, and tab clutter make on-phone research tougher. Keeping results summarized and organized in a single, lightweight panel matters even more on mobile.",
    icon: Smartphone,
    readMoreLink:
      "https://www.nngroup.com/articles/mobile-content-is-twice-as-difficult-2011/",
  },
];

export function Problems() {
  return (
    <section id="problems" className="py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-16">
          <h2 className="mb-4 sm:mb-6 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Real Research Pain Points{" "}
            <span className="text-destructive">Everyone</span> Experiences
            Across the Web
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Bring the speed of Mac’s Lookup to <em>any</em> browser and OS.
            These are the universal problems people report across forums,
            communities, and studies. BeyondMeanings tackles them in-place,
            without breaking your reading flow.
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
