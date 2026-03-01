"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { LogBadge } from "./LogBadge";
import { SOURCE_COLORS } from "@/constants/colors";
import { formatTimestamp, relativeTime } from "@/lib/log-parser";
import type { LogLine as LogLineType } from "@/types/log";

interface LogLineProps {
  log: LogLineType;
  onCopy: (text: string) => void;
  isCopied: boolean;
  highlight: (text: string) => Array<{ text: string; highlighted: boolean }>;
}

export function LogLine({ log, onCopy, isCopied, highlight }: LogLineProps) {
  const [hovered, setHovered] = useState(false);

  const handleCopy = () => {
    onCopy(`[${formatTimestamp(log.timestamp)}] [${log.level}] [${log.source}] ${log.message}`);
  };

  const parts = highlight(log.message);

  return (
    <div
      className={cn(
        "flex items-center gap-0 px-3 h-7 text-xs font-mono border-b border-terminal-border/30 cursor-pointer transition-colors select-none",
        hovered ? "bg-white/[0.04]" : "bg-transparent",
      )}
      onClick={handleCopy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="text-terminal-muted/70 shrink-0 w-[72px] tabular-nums">
        {formatTimestamp(log.timestamp)}
      </span>

      <span className="shrink-0 w-[58px]">
        <LogBadge level={log.level} />
      </span>

      <span className={cn("shrink-0 w-[52px] text-[10px] font-medium", SOURCE_COLORS[log.source])}>
        {log.source}
      </span>

      <span className="flex-1 text-terminal-text min-w-0 truncate">
        {parts.map((part, i) =>
          part.highlighted ? (
            <mark key={i} className="bg-yellow-400/25 text-yellow-200 rounded-sm px-0.5">
              {part.text}
            </mark>
          ) : (
            <span key={i}>{part.text}</span>
          ),
        )}
      </span>

      <span className="shrink-0 w-[56px] text-right text-[10px] text-terminal-muted/50 tabular-nums pl-2">
        {isCopied ? (
          <span className="text-emerald-400">copied!</span>
        ) : (
          <span className={hovered ? "opacity-100" : "opacity-0"}>
            {relativeTime(log.timestamp)}
          </span>
        )}
      </span>
    </div>
  );
}
