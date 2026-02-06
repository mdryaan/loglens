import { cn } from "@/lib/utils";
import type { StreamStatus } from "@/types/stream";

interface StreamIndicatorProps {
  status: StreamStatus;
}

const STATUS_CONFIG: Record<StreamStatus, { dot: string; label: string; pulse: boolean }> = {
  connecting: { dot: "bg-yellow-400", label: "Connecting...", pulse: true },
  connected: { dot: "bg-emerald-400", label: "Live", pulse: true },
  paused: { dot: "bg-terminal-muted", label: "Paused", pulse: false },
  disconnected: { dot: "bg-red-400", label: "Disconnected", pulse: false },
  error: { dot: "bg-red-500", label: "Error", pulse: false },
};

export function StreamIndicator({ status }: StreamIndicatorProps) {
  const config = STATUS_CONFIG[status];
  return (
    <div className="flex items-center gap-1.5 text-[10px] font-mono text-terminal-muted">
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full",
          config.dot,
          config.pulse && "animate-pulse",
        )}
      />
      <span>{config.label}</span>
    </div>
  );
}
