# 🔍 LogLens

**Real-time log viewer for developers who don't have time to tail files.**

Stream, filter, search, and export application logs with a terminal-style UI — no backend setup, no auth, no database. Just logs.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![tRPC](https://img.shields.io/badge/tRPC-v11-398CCB?style=flat-square)](https://trpc.io)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Zod](https://img.shields.io/badge/Zod-3.23-3E67B1?style=flat-square)](https://zod.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](LICENSE)

---

![LogLens Screenshot](docs/screenshot-main.png)

| Stream View | Filter Panel |
|---|---|
| ![Stream](docs/screenshot-stream.png) | ![Filter](docs/screenshot-filter.png) |
| Search & Highlight | Export |
| ![Search](docs/screenshot-search.png) | ![Export](docs/screenshot-export.png) |

---

## Features

- **Real-time streaming** — logs arrive via SSE without page refresh
- **Multiple log sources** — switch between app, error, system, and access log streams
- **Keyword search** — type and matching lines highlight instantly across all fields
- **Level filtering** — toggle INFO / WARN / ERROR / DEBUG with color-coded badges
- **Pause & resume** — freeze the stream without losing buffered lines
- **Clear logs** — one click wipes the buffer
- **Auto-scroll** — snaps to the bottom as new logs arrive; disable to inspect history
- **Line count** — live count of visible lines after filters are applied
- **Relative timestamps** — every line shows "2s ago", "14m ago" on hover
- **Copy on click** — click any line to copy the full formatted entry to clipboard
- **Export as .txt** — download all currently visible lines in a structured format
- **Dark terminal UI** — monospace font, ANSI-style color coding, zero chrome

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 App Router |
| Language | TypeScript (strict) |
| API | tRPC v11 with superjson |
| Validation | Zod |
| Styling | Tailwind CSS |
| Streaming | Server-Sent Events (SSE) |
| State | React hooks (no external store) |

---

## Architecture

```mermaid
flowchart TD
    Browser["Browser\n(React + hooks)"]
    SSE["GET /api/stream?source=app\n(SSE endpoint)"]
    tRPC["POST /api/trpc\n(tRPC handler)"]
    Gen["log-generator.ts\n(fake log factory)"]
    Router["appRouter\nlogs · stats · stream"]

    Browser -->|EventSource| SSE
    Browser -->|HTTP batch| tRPC
    SSE --> Gen
    tRPC --> Router
    Router --> Gen
```

**Data flow for streaming:**

1. `useLogStream` opens an `EventSource` to `/api/stream?source=<source>`
2. The route handler calls `generateLogLine()` every ~800ms and pushes JSON via SSE
3. Incoming events are buffered in a ref and flushed to React state every 200ms (batched)
4. `useLogFilter` and `useLogSearch` derive the visible set from the buffered logs
5. `useAutoScroll` scrolls the container whenever the visible list grows

---

## Getting Started

```bash
# 1. Clone
git clone https://github.com/mdryaan/loglens.git
cd loglens

# 2. Install
npm install

# 3. Configure (optional — works out of the box with defaults)
cp .env.example .env.local

# 4. Run
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | `http://localhost:3000` | Used by the tRPC server client for SSR requests |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add log sources, tRPC routes, and PR guidelines.

---

## License

MIT © 2026 [mdryaan](https://github.com/mdryaan)
