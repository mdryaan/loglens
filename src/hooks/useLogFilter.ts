"use client";

import { useState, useCallback, useMemo } from "react";
import type { LogLine, LogLevel } from "@/types/log";
import { LOG_LEVELS } from "@/constants/log-levels";

interface UseLogFilterReturn {
  activeLevels: Set<LogLevel>;
  toggleLevel: (level: LogLevel) => void;
  setAllLevels: () => void;
  clearLevels: () => void;
  filterLogs: (logs: LogLine[]) => LogLine[];
}

export function useLogFilter(): UseLogFilterReturn {
  const [activeLevels, setActiveLevels] = useState<Set<LogLevel>>(
    new Set(LOG_LEVELS),
  );

  const toggleLevel = useCallback((level: LogLevel) => {
    setActiveLevels((prev) => {
      const next = new Set(prev);
      if (next.has(level)) {
        next.delete(level);
      } else {
        next.add(level);
      }
      return next;
    });
  }, []);

  const setAllLevels = useCallback(() => {
    setActiveLevels(new Set(LOG_LEVELS));
  }, []);

  const clearLevels = useCallback(() => {
    setActiveLevels(new Set());
  }, []);

  const filterLogs = useCallback(
    (logs: LogLine[]) => {
      if (activeLevels.size === LOG_LEVELS.length) return logs;
      return logs.filter((l) => activeLevels.has(l.level));
    },
    [activeLevels],
  );

  return { activeLevels, toggleLevel, setAllLevels, clearLevels, filterLogs };
}
