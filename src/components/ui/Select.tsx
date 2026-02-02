"use client";

import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  className?: string;
  disabled?: boolean;
}

export function Select({ value, onChange, options, className, disabled }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={cn(
        "h-8 rounded border border-terminal-border bg-terminal-surface px-2.5 pr-7 text-sm text-terminal-text transition-colors appearance-none cursor-pointer",
        "hover:border-terminal-accent/50 focus:outline-none focus:border-terminal-accent focus:ring-1 focus:ring-terminal-accent/30",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        className,
      )}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-terminal-surface">
          {opt.label}
        </option>
      ))}
    </select>
  );
}
