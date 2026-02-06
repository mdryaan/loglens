"use client";

import { Button } from "@/components/ui/Button";
import { StreamStatus } from "./StreamStatus";
import { Tooltip } from "@/components/ui/Tooltip";
import type { StreamStatus as StreamStatusType } from "@/types/stream";

const PauseIcon = () => (
  <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
  </svg>
);

const PlayIcon = () => (
  <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
    <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z" />
  </svg>
);

interface StreamControlsProps {
  status: StreamStatusType;
  paused: boolean;
  onTogglePause: () => void;
}

export function StreamControls({ status, paused, onTogglePause }: StreamControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <StreamStatus status={status} />
      <Tooltip content={paused ? "Resume streaming" : "Pause streaming"} side="bottom">
        <Button
          variant={paused ? "default" : "outline"}
          size="sm"
          onClick={onTogglePause}
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
          {paused ? "Resume" : "Pause"}
        </Button>
      </Tooltip>
    </div>
  );
}
