"use client";

import { StreamIndicator } from "@/components/stream/StreamIndicator";
import type { StreamStatus } from "@/types/stream";

interface HeaderProps {
  status: StreamStatus;
  source: string;
}

export function Header({ status, source }: HeaderProps) {
  return (
    <header className="flex items-center justify-between h-12 px-4 border-b border-terminal-border bg-terminal-surface/80 backdrop-blur-sm shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-terminal-accent shadow-[0_0_8px_rgb(88,166,255,0.6)]" />
          <span className="text-sm font-semibold text-terminal-text tracking-tight">
            Log<span className="text-terminal-accent">Lens</span>
          </span>
        </div>
        <div className="h-4 w-px bg-terminal-border" />
        <span className="text-xs text-terminal-muted font-mono">v1.0.0</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-terminal-muted font-mono">
          source: <span className="text-terminal-accent">{source}</span>
        </span>
        <StreamIndicator status={status} />
      </div>
    </header>
  );
}
