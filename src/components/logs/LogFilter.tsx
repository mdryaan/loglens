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
              "inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] font-mono font-semibold border transition-all",
              active
                ? cn(colors.bg, colors.text, colors.border)
                : "bg-transparent text-terminal-muted border-terminal-border/50 opacity-50 hover:opacity-75",
            )}
          >
            <span className={cn("w-1 h-1 rounded-full", active ? colors.dot : "bg-terminal-muted")} />
            {level}
          </button>
        );
      })}
    </div>
  );
}
