"use client";

import { cn } from "@/lib/utils";

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, label, className, disabled }: ToggleProps) {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-2 cursor-pointer select-none",
        disabled && "opacity-40 cursor-not-allowed",
        className,
      )}
    >
      <div
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "relative w-8 h-4 rounded-full transition-colors duration-150",
          checked ? "bg-terminal-accent" : "bg-terminal-border",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white shadow transition-transform duration-150",
            checked && "translate-x-4",
          )}
        />
      </div>
      {label && <span className="text-xs text-terminal-muted">{label}</span>}
    </label>
  );
}
