import type { LogLevel, LogSource } from "./log";

export interface LogFilter {
  levels: Set<LogLevel>;
  sources: Set<LogSource>;
}

export interface FilterAction {
  type: "toggle-level" | "toggle-source" | "set-all-levels" | "clear-levels";
  payload?: LogLevel | LogSource;
}
