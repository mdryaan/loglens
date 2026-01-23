"use client";

import { useState, useCallback, useMemo } from "react";
import type { LogLine } from "@/types/log";
import { matchesSearch, highlightMatch } from "@/lib/log-parser";

interface UseLogSearchReturn {
  query: string;
  setQuery: (q: string) => void;
  searchLogs: (logs: LogLine[]) => LogLine[];
  highlight: (text: string) => Array<{ text: string; highlighted: boolean }>;
  matchCount: (logs: LogLine[]) => number;
}

export function useLogSearch(): UseLogSearchReturn {
  const [query, setQuery] = useState("");

  const searchLogs = useCallback(
    (logs: LogLine[]) => {
      if (!query.trim()) return logs;
      return logs.filter((l) => matchesSearch(l, query));
    },
    [query],
  );

  const highlight = useCallback(
    (text: string) => highlightMatch(text, query),
    [query],
  );

  const matchCount = useCallback(
    (logs: LogLine[]) => {
      if (!query.trim()) return 0;
      return logs.filter((l) => matchesSearch(l, query)).length;
    },
    [query],
  );

  return { query, setQuery, searchLogs, highlight, matchCount };
}
