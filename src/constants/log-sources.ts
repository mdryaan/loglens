import type { LogSource } from "@/types/log";

export const LOG_SOURCES: LogSource[] = ["app", "error", "system", "access"];

export const LOG_SOURCE_LABELS: Record<LogSource, string> = {
  app: "Application",
  error: "Error Log",
  system: "System",
  access: "Access Log",
};

export const LOG_SOURCE_DESCRIPTIONS: Record<LogSource, string> = {
  app: "Main application events and lifecycle",
  error: "Unhandled exceptions and stack traces",
  system: "OS-level metrics and daemon output",
  access: "HTTP request and response records",
};
