import type { Metadata } from "next";
import "./globals.css";
import { TRPCProvider } from "@/lib/trpc/provider";

export const metadata: Metadata = {
  title: "LogLens — Real-time Log Viewer",
  description: "Stream, filter, search and export logs in real time with a terminal-style UI.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔍</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full font-mono antialiased">
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
