import { type NextRequest } from "next/server";
import { createSSEStream } from "@/lib/sse";
import { generateLogLine, generateMixedLog } from "@/lib/log-generator";
import { serializeLogLine } from "@/lib/log-parser";
import { LogSourceSchema } from "@/types/log";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export function GET(req: NextRequest) {
  const url = new URL(req.url);
  const rawSource = url.searchParams.get("source") ?? "app";
  const sourceResult = LogSourceSchema.safeParse(rawSource);
  const source = sourceResult.success ? sourceResult.data : null;

  return createSSEStream((send, close) => {
    let stopped = false;

    const emitLog = () => {
      if (stopped) return;
      const line = source ? generateLogLine(source) : generateMixedLog();
      send("log", serializeLogLine(line));
    };

    const heartbeat = () => {
      if (stopped) return;
      send("heartbeat", JSON.stringify({ ts: new Date().toISOString() }));
    };

    emitLog();
    const logInterval = setInterval(emitLog, 800 + Math.random() * 400);
    const heartbeatInterval = setInterval(heartbeat, 15000);

    req.signal.addEventListener("abort", () => {
      stopped = true;
      clearInterval(logInterval);
      clearInterval(heartbeatInterval);
      close();
    });

    return () => {
      stopped = true;
      clearInterval(logInterval);
      clearInterval(heartbeatInterval);
    };
  });
}
