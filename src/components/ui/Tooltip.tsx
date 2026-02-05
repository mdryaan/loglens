"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Tooltip({ content, children, side = "top", className }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div
          className={cn(
            "absolute z-50 whitespace-nowrap rounded border border-terminal-border bg-terminal-surface px-2 py-1 text-xs text-terminal-text shadow-lg pointer-events-none animate-fade-in",
            {
              "bottom-full left-1/2 -translate-x-1/2 mb-1.5": side === "top",
              "top-full left-1/2 -translate-x-1/2 mt-1.5": side === "bottom",
              "right-full top-1/2 -translate-y-1/2 mr-1.5": side === "left",
              "left-full top-1/2 -translate-y-1/2 ml-1.5": side === "right",
            },
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
