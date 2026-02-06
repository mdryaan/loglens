import { cn } from "@/lib/utils";
import type { StreamStatus as StreamStatusType } from "@/types/stream";

interface StreamStatusProps {
  status: StreamStatusType;
  className?: string;
}

export function StreamStatus({ status, className }: StreamStatusProps) {
  const isLive = status === "connected";
  const isPaused = status === "paused";
  const isError = status === "error" || status === "disconnected";

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-mono border",
        isLive && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        isPaused && "bg-terminal-border/50 text-terminal-muted border-terminal-border",
        isError && "bg-red-500/10 text-red-400 border-red-500/20",
        !isLive && !isPaused && !isError && "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
        className,
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          isLive && "bg-emerald-400 animate-pulse",
          isPaused && "bg-terminal-muted",
          isError && "bg-red-400",
          !isLive && !isPaused && !isError && "bg-yellow-400 animate-pulse",
        )}
      />
      {status === "connected" && "LIVE"}
      {status === "connecting" && "CONNECTING"}
      {status === "paused" && "PAUSED"}
      {status === "disconnected" && "DISCONNECTED"}
      {status === "error" && "ERROR"}
    </div>
  );
}
