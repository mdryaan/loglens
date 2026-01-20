"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { LogLine, LogSource } from "@/types/log";
import type { StreamStatus } from "@/types/stream";
import { parseLogLine } from "@/lib/log-parser";

const MAX_BUFFER = 1000;

interface UseLogStreamOptions {
  source: LogSource;
  paused: boolean;
}

interface UseLogStreamReturn {
  logs: LogLine[];
  status: StreamStatus;
  clear: () => void;
}

export function useLogStream({ source, paused }: UseLogStreamOptions): UseLogStreamReturn {
  const [logs, setLogs] = useState<LogLine[]>([]);
  const [status, setStatus] = useState<StreamStatus>("connecting");
  const esRef = useRef<EventSource | null>(null);
  const pendingRef = useRef<LogLine[]>([]);
  const flushRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const flush = useCallback(() => {
    if (pendingRef.current.length === 0) return;
    const incoming = pendingRef.current.splice(0);
    setLogs((prev) => {
      const next = [...prev, ...incoming];
      return next.length > MAX_BUFFER ? next.slice(next.length - MAX_BUFFER) : next;
    });
  }, []);

  useEffect(() => {
    flushRef.current = setInterval(flush, 200);
    return () => {
      if (flushRef.current) clearInterval(flushRef.current);
    };
  }, [flush]);

  useEffect(() => {
    if (paused) {
      esRef.current?.close();
      esRef.current = null;
      setStatus("paused");
      return;
    }

    setStatus("connecting");
    const es = new EventSource(`/api/stream?source=${source}`);
    esRef.current = es;

    es.addEventListener("log", (e) => {
      const line = parseLogLine(e.data);
      if (line) pendingRef.current.push(line);
    });

    es.onopen = () => setStatus("connected");
    es.onerror = () => {
      setStatus("error");
      es.close();
    };

    return () => {
      es.close();
      esRef.current = null;
    };
  }, [source, paused]);

  const clear = useCallback(() => {
    pendingRef.current = [];
    setLogs([]);
  }, []);

  return { logs, status, clear };
}
