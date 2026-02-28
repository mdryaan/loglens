"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { LogViewer } from "@/components/logs/LogViewer";
import type { LogSource } from "@/types/log";
import type { StreamStatus } from "@/types/stream";

export default function Page() {
  const [source, setSource] = useState<LogSource>("app");
  const [streamStatus, setStreamStatus] = useState<StreamStatus>("connecting");

  return (
    <div className="flex flex-col h-full bg-terminal-bg">
      <Header status={streamStatus} source={source} />
      <div className="flex flex-1 min-h-0">
        <Sidebar activeSource={source} onSourceChange={setSource} />
        <main className="flex-1 flex flex-col min-w-0 min-h-0">
          <LogViewer source={source} onStatusChange={setStreamStatus} />
        </main>
      </div>
      <Footer />
    </div>
  );
}
