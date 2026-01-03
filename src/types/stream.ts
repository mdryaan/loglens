export type StreamStatus = "connecting" | "connected" | "paused" | "disconnected" | "error";

export interface StreamState {
  status: StreamStatus;
  connectedAt: Date | null;
  errorMessage: string | null;
}

export interface StreamEvent {
  type: "log" | "heartbeat" | "error";
  data: string;
}
