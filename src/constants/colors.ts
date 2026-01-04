import type { LogLevel, LogSource } from "@/types/log";

export const LEVEL_COLORS: Record<LogLevel, { bg: string; text: string; border: string; dot: string }> = {
  INFO: {
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/20",
    dot: "bg-blue-400",
  },
  WARN: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    border: "border-yellow-500/20",
    dot: "bg-yellow-400",
  },
  ERROR: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    border: "border-red-500/20",
    dot: "bg-red-400",
  },
  DEBUG: {
    bg: "bg-purple-500/10",
    text: "text-purple-400",
    border: "border-purple-500/20",
    dot: "bg-purple-400",
  },
};

export const SOURCE_COLORS: Record<LogSource, string> = {
  app: "text-emerald-400",
  error: "text-red-400",
  system: "text-cyan-400",
  access: "text-orange-400",
};

export const LEVEL_ROW_HIGHLIGHT: Record<LogLevel, string> = {
  INFO: "",
  WARN: "bg-yellow-500/5",
  ERROR: "bg-red-500/5",
  DEBUG: "bg-purple-500/5",
};
