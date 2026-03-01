"use client";

import { cn } from "@/lib/utils";
import { LEVEL_COLORS } from "@/constants/colors";
import { LOG_LEVELS } from "@/constants/log-levels";
import type { LogLevel } from "@/types/log";

interface LogFilterProps {
  activeLevels: Set<LogLevel>;
  onToggle: (level: LogLevel) => void;
}

export function LogFilter({ activeLevels, onToggle }: LogFilterProps) {
  return (
    <div className="flex items-center gap-1">
      {LOG_LEVELS.map((level) => {
        const active = activeLevels.has(level);
        const colors = LEVEL_COLORS[level];
        return (
          <button
            key={level}
            onClick={() => onToggle(level)}
            className={cn(
              "inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[10px] font-bold border font-mono w-[46px] transition-opacity",
              active
                ? cn(colors.bg, colors.text, colors.border)
                : "bg-terminal-surface text-terminal-muted border-terminal-border/50 opacity-40 hover:opacity-70",
            )}
          >
            {level}
          </button>
        );
      })}
    </div>
  );
}
