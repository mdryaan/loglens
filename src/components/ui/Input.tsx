"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-2.5 text-terminal-muted pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            "h-8 w-full rounded border border-terminal-border bg-terminal-surface text-sm text-terminal-text placeholder:text-terminal-muted transition-colors",
            "focus:outline-none focus:border-terminal-accent focus:ring-1 focus:ring-terminal-accent/30",
            leftIcon ? "pl-8" : "pl-3",
            rightIcon ? "pr-8" : "pr-3",
            className,
          )}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-2.5 text-terminal-muted pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
