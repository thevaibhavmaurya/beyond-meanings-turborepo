"use client";

import { Button } from "@repo/ui/components/button";
import { cn } from "@repo/ui/lib/utils";

export function LinkNavigate({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode | string;
  className?: string;
}) {
  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Button
      className={cn("cursor-pointer", className)}
      onClick={() => handleNavClick(href)}
    >
      {children}
    </Button>
  );
}
