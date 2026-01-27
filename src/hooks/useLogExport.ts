"use client";

import { useCallback } from "react";
import type { LogLine } from "@/types/log";
import { formatTimestamp } from "@/lib/log-parser";

export function useLogExport() {
  const exportLogs = useCallback((logs: LogLine[], filename?: string) => {
    const content = logs
      .map(
        (l) =>
          `[${formatTimestamp(l.timestamp)}] [${l.level.padEnd(5)}] [${l.source}] ${l.message}`,
      )
      .join("\n");

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename ?? `loglens-export-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }, []);

  return { exportLogs };
}
