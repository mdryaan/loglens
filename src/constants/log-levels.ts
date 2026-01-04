import type { LogLevel } from "@/types/log";

export const LOG_LEVELS: LogLevel[] = ["INFO", "WARN", "ERROR", "DEBUG"];

export const LOG_LEVEL_LABELS: Record<LogLevel, string> = {
  INFO: "Info",
  WARN: "Warning",
  ERROR: "Error",
  DEBUG: "Debug",
};
