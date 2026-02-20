import { LEVEL_COLORS } from "@/constants/colors";
import type { LogLine } from "@/types/log";
import type { LogLevel } from "@/types/log";

interface LogStatsProps {
  logs: LogLine[];
  visibleCount: number;
}

export function LogStats({ logs, visibleCount }: LogStatsProps) {
  const counts = logs.reduce(
    (acc, l) => {
      acc[l.level] = (acc[l.level] ?? 0) + 1;
      return acc;
    },
    {} as Record<LogLevel, number>,
  );

  return (
    <div className="flex items-center gap-3 text-[10px] font-mono">
      <span className="text-terminal-muted">
        <span className="text-terminal-text font-semibold">{visibleCount.toLocaleString()}</span> lines
      </span>
      {(["ERROR", "WARN", "INFO", "DEBUG"] as LogLevel[]).map((level) => {
        const count = counts[level] ?? 0;
        if (count === 0) return null;
        return (
          <span key={level} className={LEVEL_COLORS[level].text}>
            {count} {level}
          </span>
        );
      })}
    </div>
  );
}
