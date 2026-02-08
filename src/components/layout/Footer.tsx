export function Footer() {
  return (
    <footer className="h-7 px-4 flex items-center justify-between border-t border-terminal-border bg-terminal-surface/80 shrink-0">
      <div className="flex items-center gap-3">
        <span className="text-[10px] text-terminal-muted font-mono">
          LogLens — real-time log viewer
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-[10px] text-terminal-muted font-mono">
          Next.js 14 · tRPC · SSE
        </span>
      </div>
    </footer>
  );
}
