"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed bottom-6 right-6 w-12 h-12"></div>;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300 hover:scale-110 group"
      aria-label="Toggle theme"
      title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-primary/10 rounded-full" />
      <Sun className="h-5 w-5 text-foreground/80 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 text-foreground/80 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
    </button>
  );
}
