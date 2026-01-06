import { LogLineSchema } from "@/types/log";
import type { LogLine } from "@/types/log";

export function parseLogLine(raw: string): LogLine | null {
  try {
    const parsed = JSON.parse(raw) as unknown;
    return LogLineSchema.parse(parsed);
  } catch {
    return null;
  }
}

export function serializeLogLine(line: LogLine): string {
  return JSON.stringify(line);
}

export function formatTimestamp(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function relativeTime(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 5) return "just now";
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export function matchesSearch(line: LogLine, query: string): boolean {
  if (!query.trim()) return false;
  const lower = query.toLowerCase();
  return (
    line.message.toLowerCase().includes(lower) ||
    line.level.toLowerCase().includes(lower) ||
    line.source.toLowerCase().includes(lower)
  );
}

export function highlightMatch(text: string, query: string): Array<{ text: string; highlighted: boolean }> {
  if (!query.trim()) return [{ text, highlighted: false }];
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part) => ({
    text: part,
    highlighted: regex.test(part),
  }));
}
