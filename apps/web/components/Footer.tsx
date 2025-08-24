import Link from "next/link";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Separator } from "@repo/ui/components/separator";
import { Card, CardContent } from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import Logo from "./logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-br from-background via-muted/20 to-muted/40 border-t border-border/50">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]" />

      <div className="relative container mx-auto px-4 py-12 lg:py-20">
        {/* Newsletter Section */}
        <Card className="glass-card mb-16 border-0">
          <CardContent className="p-8 lg:p-12">
            <div className="mx-auto max-w-2xl text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Badge variant="secondary" className="glass px-3 py-1">
                  Newsletter
                </Badge>
              </div>
              <h3 className="mb-4 text-2xl lg:text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Stay in the Loop
              </h3>
              <p className="text-muted-foreground mb-8 text-base lg:text-lg leading-relaxed">
                Get the latest updates, tips, and feature announcements
                delivered straight to your inbox. No spam, just value.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="glass-card border-0 h-11 flex-1"
                />
                <Button
                  size="lg"
                  className="sm:w-auto h-11 px-8 bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Subscribe
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator className="mb-16 bg-border/30" />

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-16">
          {/* Company Info */}
          <div className="lg:col-span-1 space-y-6">
            <Logo />

            <p className="text-muted-foreground text-sm lg:text-base leading-relaxed max-w-xs">
              Intelligent browser extension that brings Mac's Lookup feature to
              any browser with AI-powered multi-source research capabilities.
            </p>

            {/* Social Links */}
            <div className="flex space-x-3">
              {[
                {
                  name: "Twitter",
                  icon: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84",
                },
                {
                  name: "GitHub",
                  icon: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z",
                },
                {
                  name: "LinkedIn",
                  icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
              ].map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="sm"
                  className="glass-card h-10 w-10 p-0 hover:scale-110 transition-all duration-300"
                  asChild
                >
                  <a href="#" aria-label={social.name}>
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={social.icon} />
                    </svg>
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {[
            {
              title: "Product",
              links: [
                { name: "Features", href: "#features" },
                { name: "Pricing", href: "#pricing" },
                { name: "Download", href: "#" },
                { name: "Changelog", href: "#" },
                { name: "Browser Support", href: "#" },
              ],
            },
            {
              title: "Support",
              links: [
                { name: "FAQ", href: "#faq" },
                { name: "Help Center", href: "#" },
                { name: "Contact Us", href: "#" },
                { name: "Bug Reports", href: "#" },
                { name: "Feature Requests", href: "#" },
              ],
            },
            {
              title: "Company",
              links: [
                { name: "About Us", href: "#" },
                { name: "Blog", href: "#" },
                { name: "Careers", href: "#" },
                { name: "Press Kit", href: "#" },
                { name: "Partners", href: "#" },
              ],
            },
          ].map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="font-semibold text-lg text-foreground/90">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200 text-sm lg:text-base hover:translate-x-1 inline-block transition-transform"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="mb-8 bg-border/30" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-2">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-primary/60 to-primary/40" />
            <p className="text-sm lg:text-base text-muted-foreground">
              © {currentYear} BeyondMeanings. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm lg:text-base text-muted-foreground">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  className="hover:text-foreground transition-colors duration-200 hover:underline underline-offset-4"
                >
                  {item}
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </footer>
  );
}
