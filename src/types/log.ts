import { z } from "zod";

export const LogLevelSchema = z.enum(["INFO", "WARN", "ERROR", "DEBUG"]);
export type LogLevel = z.infer<typeof LogLevelSchema>;

export const LogSourceSchema = z.enum(["app", "error", "system", "access"]);
export type LogSource = z.infer<typeof LogSourceSchema>;

export const LogLineSchema = z.object({
  id: z.string(),
  timestamp: z.string(),
  level: LogLevelSchema,
  source: LogSourceSchema,
  message: z.string(),
});
export type LogLine = z.infer<typeof LogLineSchema>;

export const LogStatsSchema = z.object({
  total: z.number(),
  info: z.number(),
  warn: z.number(),
  error: z.number(),
  debug: z.number(),
});
export type LogStats = z.infer<typeof LogStatsSchema>;
