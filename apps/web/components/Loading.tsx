interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Loading({
  message = "Loading...",
  size = "md",
  className = "",
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center space-y-4 ${className}`}
    >
      <div
        className={`${sizeClasses[size]} rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/70 flex items-center justify-center shadow-lg ring-1 ring-primary/20 animate-pulse`}
      >
        <span className="text-primary-foreground font-bold text-sm">BM</span>
      </div>
      <p className="text-muted-foreground text-sm">{message}</p>
    </div>
  );
}
