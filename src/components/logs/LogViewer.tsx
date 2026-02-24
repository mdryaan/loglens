"use client";

import { useMemo, useState, useEffect } from "react";
import { useLogStream } from "@/hooks/useLogStream";
import { useLogFilter } from "@/hooks/useLogFilter";
import { useLogSearch } from "@/hooks/useLogSearch";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useClipboard } from "@/hooks/useClipboard";
import { LogToolbar } from "./LogToolbar";
import { LogLine } from "./LogLine";
import { LogStats } from "./LogStats";
import type { LogSource } from "@/types/log";
import type { StreamStatus } from "@/types/stream";

interface LogViewerProps {
  source: LogSource;
  onStatusChange?: (status: StreamStatus) => void;
}

export function LogViewer({ source, onStatusChange }: LogViewerProps) {
  const [paused, setPaused] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);

  const { logs, status, clear } = useLogStream({ source, paused });
  const { activeLevels, toggleLevel, filterLogs } = useLogFilter();
  const { query, setQuery, searchLogs, highlight, matchCount } = useLogSearch();
  const { copy, copiedId } = useClipboard();

  useEffect(() => {
    onStatusChange?.(status);
  }, [status, onStatusChange]);

  const visibleLogs = useMemo(() => {
    const filtered = filterLogs(logs);
    return searchLogs(filtered);
  }, [logs, filterLogs, searchLogs]);

  const { containerRef } = useAutoScroll(autoScroll && !paused, [visibleLogs.length]);

  const handleQueryChange = (q: string) => {
    setQuery(q);
    if (q) setAutoScroll(false);
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <LogToolbar
        query={query}
        onQueryChange={handleQueryChange}
        matchCount={matchCount(logs)}
        totalCount={logs.length}
        activeLevels={activeLevels}
        onToggleLevel={toggleLevel}
        paused={paused}
        onTogglePause={() => setPaused((p) => !p)}
        autoScroll={autoScroll}
        onToggleAutoScroll={setAutoScroll}
        onClear={clear}
        visibleLogs={visibleLogs}
        status={status}
      />

      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto min-h-0 bg-terminal-bg"
      >
        {visibleLogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-terminal-muted text-xs font-mono">
            {paused ? "Stream paused — resume to receive logs" : "Waiting for logs..."}
          </div>
        ) : (
          visibleLogs.map((log) => (
            <LogLine
              key={log.id}
              log={log}
              searchQuery={query}
              onCopy={copy}
              isCopied={
                copiedId ===
                `[${log.timestamp}] [${log.level}] [${log.source}] ${log.message}`
              }
              highlight={highlight}
            />
          ))
        )}
      </div>

      <div className="h-7 px-3 flex items-center border-t border-terminal-border bg-terminal-surface/60 shrink-0">
        <LogStats logs={visibleLogs} visibleCount={visibleLogs.length} />
      </div>
    </div>
  );
}
