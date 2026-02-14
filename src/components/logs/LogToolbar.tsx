"use client";

import { Button } from "@/components/ui/Button";
import { Toggle } from "@/components/ui/Toggle";
import { Tooltip } from "@/components/ui/Tooltip";
import { LogSearch } from "./LogSearch";
import { LogFilter } from "./LogFilter";
import { LogExport } from "./LogExport";
import { StreamControls } from "@/components/stream/StreamControls";
import type { LogLevel, LogLine } from "@/types/log";
import type { StreamStatus } from "@/types/stream";

interface LogToolbarProps {
  query: string;
  onQueryChange: (q: string) => void;
  matchCount: number;
  totalCount: number;
  activeLevels: Set<LogLevel>;
  onToggleLevel: (level: LogLevel) => void;
  paused: boolean;
  onTogglePause: () => void;
  autoScroll: boolean;
  onToggleAutoScroll: (v: boolean) => void;
  onClear: () => void;
  visibleLogs: LogLine[];
  status: StreamStatus;
}

const TrashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
  </svg>
);

export function LogToolbar({
  query,
  onQueryChange,
  matchCount,
  totalCount,
  activeLevels,
  onToggleLevel,
  paused,
  onTogglePause,
  autoScroll,
  onToggleAutoScroll,
  onClear,
  visibleLogs,
  status,
}: LogToolbarProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 border-b border-terminal-border bg-terminal-surface/60 shrink-0 flex-wrap">
      <StreamControls status={status} paused={paused} onTogglePause={onTogglePause} />
      <div className="w-px h-5 bg-terminal-border" />
      <LogSearch
        query={query}
        onChange={onQueryChange}
        matchCount={matchCount}
        totalCount={totalCount}
      />
      <div className="w-px h-5 bg-terminal-border" />
      <LogFilter activeLevels={activeLevels} onToggle={onToggleLevel} />
      <div className="flex-1" />
      <Toggle
        checked={autoScroll}
        onChange={onToggleAutoScroll}
        label="Auto-scroll"
      />
      <div className="w-px h-5 bg-terminal-border" />
      <LogExport logs={visibleLogs} />
      <Tooltip content="Clear all logs" side="bottom">
        <Button variant="ghost" size="sm" onClick={onClear}>
          <TrashIcon />
          Clear
        </Button>
      </Tooltip>
    </div>
  );
}
