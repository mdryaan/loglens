"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { LogBadge } from "./LogBadge";
import { LEVEL_ROW_HIGHLIGHT, SOURCE_COLORS } from "@/constants/colors";
import { formatTimestamp, relativeTime } from "@/lib/log-parser";
import type { LogLine as LogLineType } from "@/types/log";

interface LogLineProps {
  log: LogLineType;
  searchQuery: string;
  onCopy: (text: string) => void;
  isCopied: boolean;
  highlight: (text: string) => Array<{ text: string; highlighted: boolean }>;
}

export function LogLine({ log, searchQuery, onCopy, isCopied, highlight }: LogLineProps) {
  const [hovered, setHovered] = useState(false);

  const handleCopy = () => {
    onCopy(`[${formatTimestamp(log.timestamp)}] [${log.level}] [${log.source}] ${log.message}`);
  };

  const parts = highlight(log.message);

  return (
    <div
      className={cn(
        "group flex items-start gap-2 px-3 py-1 text-xs font-mono border-b border-terminal-border/40 cursor-pointer transition-colors animate-fade-in",
        LEVEL_ROW_HIGHLIGHT[log.level],
        hovered && "bg-terminal-border/30",
      )}
      onClick={handleCopy}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="text-terminal-muted shrink-0 w-16 tabular-nums leading-5">
        {formatTimestamp(log.timestamp)}
      </span>
      <LogBadge level={log.level} />
      <span className={cn("shrink-0 w-12 leading-5 text-[10px]", SOURCE_COLORS[log.source])}>
        {log.source}
      </span>
      <span className="flex-1 text-terminal-text leading-5 break-all">
        {parts.map((part, i) =>
          part.highlighted ? (
            <mark key={i} className="bg-yellow-400/30 text-yellow-200 rounded-sm px-0.5">
              {part.text}
            </mark>
          ) : (
            <span key={i}>{part.text}</span>
          ),
        )}
      </span>
      <span className="shrink-0 text-[10px] text-terminal-muted/60 leading-5 tabular-nums w-14 text-right">
        {isCopied ? (
          <span className="text-emerald-400">copied</span>
        ) : hovered ? (
          <span className="text-terminal-muted">{relativeTime(log.timestamp)}</span>
        ) : null}
      </span>
    </div>
  );
}
