"use client";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { LayoutDashboard, Menu, User, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../lib/auth-context";
import Logo from "./logo";
import { LoginLink } from "../lib/contant";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navItems = [
    { id: "home", label: "Home", href: "#home" },
    {
      id: "problems",
      label: "Problems",
      href: "#problems",
    },
    {
      id: "features",
      label: "Features",
      href: "#features",
      badge: "New",
    },
    { id: "how-to", label: "How To", href: "#how-to" },
    { id: "pricing", label: "Pricing", href: "#pricing" },
    { id: "faq", label: "FAQ", href: "#faq" },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass-card border-b border-border/20 shadow-lg backdrop-blur-xl"
            : "bg-background/80 backdrop-blur-sm"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className="group relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-accent/50 text-muted-foreground hover:text-foreground flex items-center gap-2"
                >
                  {item.label}
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="text-xs px-1.5 py-0.5 bg-primary/10 text-primary"
                    >
                      {item.badge}
                    </Badge>
                  )}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </button>
              ))}
            </nav>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg cursor-pointer"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href={LoginLink}>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg cursor-pointer"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Login
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden glass-card border-0 h-10 w-10 rounded-lg flex items-center justify-center hover:scale-110 transition-all duration-300"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="glass-card border-t border-border/20 mx-4 mt-2 mb-4 rounded-xl overflow-hidden">
            {/* Mobile Navigation Links */}
            <nav className="p-2">
              {navItems.map((item, index) => {
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.href)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-all duration-300 text-left group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex-1 flex items-center justify-between">
                      <span className="font-medium text-foreground">
                        {item.label}
                      </span>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Mobile Action Buttons */}
            <div className="p-4 pt-2 space-y-2 border-t border-border/20">
              {isAuthenticated ? (
                <Link href="/dashboard">
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-primary to-primary/80 justify-start cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-4 w-4 mr-3" />
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href={LoginLink}>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-primary to-primary/80 justify-start cursor-pointer"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User className="h-4 w-4 mr-3" />
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-16" />
    </>
  );
}
