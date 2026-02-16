"use client";

import { Input } from "@/components/ui/Input";

interface LogSearchProps {
  query: string;
  onChange: (q: string) => void;
  matchCount: number;
  totalCount: number;
}

const SearchIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
  </svg>
);

export function LogSearch({ query, onChange, matchCount, totalCount }: LogSearchProps) {
  return (
    <div className="flex items-center gap-2 w-56">
      <Input
        value={query}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search logs..."
        leftIcon={<SearchIcon />}
        className="font-mono text-xs"
      />
      {query && (
        <span className="text-[10px] text-terminal-muted shrink-0 font-mono whitespace-nowrap">
          {matchCount}/{totalCount}
        </span>
      )}
    </div>
  );
}
