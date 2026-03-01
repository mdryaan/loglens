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
        "inline-flex items-center justify-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-bold border font-mono w-[46px]",
        colors.bg,
        colors.text,
        colors.border,
        className,
      )}
    >
      {level}
    </span>
  );
}
