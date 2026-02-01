import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "success" | "warning" | "error" | "debug";
}

export function Badge({ children, className, variant = "default" }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium border",
        {
          "bg-terminal-border/50 text-terminal-muted border-terminal-border": variant === "default",
          "bg-blue-500/10 text-blue-400 border-blue-500/20": variant === "success",
          "bg-yellow-500/10 text-yellow-400 border-yellow-500/20": variant === "warning",
          "bg-red-500/10 text-red-400 border-red-500/20": variant === "error",
          "bg-purple-500/10 text-purple-400 border-purple-500/20": variant === "debug",
        },
        className,
      )}
    >
      {children}
    </span>
  );
}
