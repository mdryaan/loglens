"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "destructive" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-1.5 rounded font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-terminal-accent disabled:pointer-events-none disabled:opacity-40",
          {
            "bg-terminal-accent text-white hover:bg-blue-500": variant === "default",
            "bg-transparent text-terminal-muted hover:text-terminal-text hover:bg-terminal-border":
              variant === "ghost",
            "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20":
              variant === "destructive",
            "border border-terminal-border bg-transparent text-terminal-text hover:bg-terminal-border":
              variant === "outline",
          },
          {
            "h-7 px-2.5 text-xs": size === "sm",
            "h-8 px-3 text-sm": size === "md",
            "h-9 px-4 text-sm": size === "lg",
          },
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";
