"use client";

import { cn } from "@/lib/utils";
import { LOG_SOURCES, LOG_SOURCE_LABELS, LOG_SOURCE_DESCRIPTIONS } from "@/constants/log-sources";
import { SOURCE_COLORS } from "@/constants/colors";
import type { LogSource } from "@/types/log";

interface SidebarProps {
  activeSource: LogSource;
  onSourceChange: (source: LogSource) => void;
}

export function Sidebar({ activeSource, onSourceChange }: SidebarProps) {
  return (
    <aside className="w-52 shrink-0 border-r border-terminal-border bg-terminal-surface/50 flex flex-col">
      <div className="px-3 py-2.5 border-b border-terminal-border">
        <span className="text-xs font-medium text-terminal-muted uppercase tracking-wider">
          Log Sources
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {LOG_SOURCES.map((source) => (
          <button
            key={source}
            onClick={() => onSourceChange(source)}
            className={cn(
              "w-full text-left rounded px-2.5 py-2 transition-colors group",
              activeSource === source
                ? "bg-terminal-border text-terminal-text"
                : "text-terminal-muted hover:bg-terminal-border/50 hover:text-terminal-text",
            )}
          >
            <div className="flex items-center gap-2">
              <div
                className={cn(
                  "w-1.5 h-1.5 rounded-full shrink-0",
                  activeSource === source ? SOURCE_COLORS[source] : "bg-terminal-muted",
                  activeSource === source ? "bg-current" : "",
                )}
              />
              <span className="text-xs font-medium truncate">{LOG_SOURCE_LABELS[source]}</span>
            </div>
            <p className="text-[10px] text-terminal-muted mt-0.5 pl-3.5 leading-tight truncate">
              {LOG_SOURCE_DESCRIPTIONS[source]}
            </p>
          </button>
        ))}
      </nav>
      <div className="px-3 py-2 border-t border-terminal-border">
        <p className="text-[10px] text-terminal-muted">
          Streams at ~1 log/s per source
        </p>
      </div>
    </aside>
  );
}
