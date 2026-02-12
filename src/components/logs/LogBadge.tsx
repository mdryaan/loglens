import { cn } from "@/lib/utils";
import { LEVEL_COLORS } from "@/constants/colors";
import type { LogLevel } from "@/types/log";

interface LogBadgeProps {
  level: LogLevel;
  className?: string;
}

export function LogBadge({ level, className }: LogBadgeProps) {
  const colors = LEVEL_COLORS[level];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-semibold border font-mono shrink-0",
        colors.bg,
        colors.text,
        colors.border,
        className,
      )}
    >
      <span className={cn("w-1 h-1 rounded-full", colors.dot)} />
      {level}
    </span>
  );
}
