import { ThemeProvider } from "@repo/ui/components/theme-provider";
import { ThemeToggle } from "@repo/ui/components/theme-toggle";
import "@repo/ui/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "BeyondMeanings - Mac Lookup for Any Browser | AI-Powered Research Extension",
  description:
    "Transform any text into comprehensive insights with AI-powered research across Wikipedia, web search, movies, games, and dictionaries. The intelligent browser extension that brings Mac's Lookup feature to Chrome, Firefox, Safari, and Edge.",
  keywords:
    "browser extension, research tool, Mac Lookup, AI research, Wikipedia, web search, productivity, Chrome extension, Firefox addon",
  authors: [{ name: "BeyondMeanings Team" }],
  openGraph: {
    title: "BeyondMeanings - Mac Lookup for Any Browser",
    description:
      "AI-powered research extension that brings Mac's Spotlight Lookup to any browser with organized, comprehensive results.",
    url: "https://beyondmeanings.com",
    siteName: "BeyondMeanings",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BeyondMeanings - Mac Lookup for Any Browser",
    description:
      "AI-powered research extension with organized results from multiple sources.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" id="home" className="scroll-pt-12">
      <body className="relative">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
