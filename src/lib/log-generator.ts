import type { LogLine, LogLevel, LogSource } from "@/types/log";

const APP_MESSAGES: Array<{ level: LogLevel; message: string }> = [
  { level: "INFO", message: "Server started on port 3000" },
  { level: "INFO", message: "Database connection pool initialized (max: 20)" },
  { level: "INFO", message: "Redis cache connected at localhost:6379" },
  { level: "INFO", message: "Worker thread pool spawned with 4 workers" },
  { level: "INFO", message: "Configuration loaded from /etc/app/config.yaml" },
  { level: "INFO", message: "Health check endpoint registered at /healthz" },
  { level: "DEBUG", message: "Middleware chain: cors → auth → rate-limit → handler" },
  { level: "DEBUG", message: "Session store using MemoryStore (dev mode)" },
  { level: "DEBUG", message: "Feature flag 'dark_mode_v2' evaluated: true" },
  { level: "DEBUG", message: "GraphQL schema compiled in 43ms" },
  { level: "WARN", message: "Memory usage at 78% — approaching threshold" },
  { level: "WARN", message: "Rate limit approaching for client 192.168.1.105 (480/500 rpm)" },
  { level: "WARN", message: "Slow query detected: SELECT * FROM events took 2340ms" },
  { level: "WARN", message: "Deprecated API endpoint /v1/users called by client sdk-2.1.0" },
  { level: "ERROR", message: "Failed to acquire DB connection after 30s timeout" },
  { level: "ERROR", message: "Uncaught TypeError: Cannot read properties of undefined (reading 'id')" },
  { level: "ERROR", message: "Payment gateway returned 503 — retrying in 5s" },
  { level: "INFO", message: "Cache miss ratio: 12.4% over last 5 minutes" },
  { level: "INFO", message: "Background job 'send-digest-emails' completed: 1204 processed" },
  { level: "DEBUG", message: "JWT validated for user_id=u_8f3k2m in 0.8ms" },
  { level: "INFO", message: "Metrics flushed to StatsD at 10s interval" },
  { level: "WARN", message: "Circuit breaker for 'inventory-service' is HALF_OPEN" },
  { level: "DEBUG", message: "Incoming webhook verified: HMAC-SHA256 match" },
  { level: "INFO", message: "Graceful shutdown initiated — draining 3 active requests" },
];

const ERROR_MESSAGES: Array<{ level: LogLevel; message: string }> = [
  { level: "ERROR", message: "Unhandled promise rejection: ReferenceError: fetch is not defined" },
  { level: "ERROR", message: "ECONNREFUSED 127.0.0.1:5432 — PostgreSQL unreachable" },
  { level: "ERROR", message: "Stack overflow detected in recursive parser at depth 10000" },
  { level: "ERROR", message: "Segmentation fault (core dumped) in native addon" },
  { level: "WARN", message: "Caught recoverable error: JSON.parse failed on malformed payload" },
  { level: "ERROR", message: "Out of memory: Kill process 14872 (node) score 901 or sacrifice child" },
  { level: "WARN", message: "Retrying failed S3 upload (attempt 2/3): RequestTimeout" },
  { level: "ERROR", message: "SSL handshake failed: certificate has expired (CN=api.internal)" },
  { level: "ERROR", message: "Panic: runtime error: index out of range [5] with length 3" },
  { level: "WARN", message: "Disk I/O wait above 85% — possible disk saturation" },
  { level: "ERROR", message: "gRPC stream closed with code UNAVAILABLE: upstream connect error" },
];

const SYSTEM_MESSAGES: Array<{ level: LogLevel; message: string }> = [
  { level: "INFO", message: "systemd: Starting nginx.service — A high performance web server" },
  { level: "INFO", message: "kernel: eth0: renamed from veth3a8f21d" },
  { level: "DEBUG", message: "cron[1]: (root) CMD (/usr/lib/cron/run-crons)" },
  { level: "WARN", message: "kernel: possible SYN flooding on port 443. Sending cookies." },
  { level: "INFO", message: "sshd[2048]: Accepted publickey for deploy from 10.0.0.5 port 52341" },
  { level: "INFO", message: "systemd-resolved: Positive trust anchors loaded" },
  { level: "DEBUG", message: "NetworkManager: device eth0 state change: config -> ip-config" },
  { level: "WARN", message: "systemd: docker.service: Main process exited, code=killed, status=9/KILL" },
  { level: "INFO", message: "audit: type=SYSCALL msg=audit(1706812800.123:4521): arch=c000003e" },
  { level: "ERROR", message: "kernel: SCSI error: return code = 0x08000002" },
  { level: "INFO", message: "useradd[3301]: new user: name=appuser, UID=1001, GID=1001" },
  { level: "INFO", message: "systemctl: Reloading daemon configuration" },
];

const ACCESS_MESSAGES: string[] = [
  '192.168.1.101 - - "GET /api/v2/users HTTP/1.1" 200 1423 "https://app.internal" "Mozilla/5.0"',
  '10.0.0.22 - admin "POST /api/v2/auth/login HTTP/1.1" 200 512 "-" "axios/1.6.0"',
  '203.0.113.45 - - "GET /api/v2/products?page=2&limit=50 HTTP/1.1" 200 8921 "-" "curl/7.88.1"',
  '192.168.1.200 - - "DELETE /api/v2/sessions/s_9kx2 HTTP/1.1" 204 0 "-" "sdk/2.3.1"',
  '10.10.0.15 - - "GET /health HTTP/1.1" 200 18 "-" "kube-probe/1.27"',
  '192.0.2.88 - - "POST /api/v2/webhooks HTTP/1.1" 201 344 "-" "Stripe/v3"',
  '198.51.100.7 - - "GET /api/v2/reports/annual HTTP/1.1" 404 97 "-" "python-requests/2.31"',
  '192.168.1.101 - - "PUT /api/v2/users/u_3m5k HTTP/1.1" 422 213 "-" "axios/1.6.0"',
  '10.0.0.1 - - "GET /metrics HTTP/1.1" 200 14302 "-" "Prometheus/2.45"',
  '203.0.113.11 - - "POST /api/v2/upload HTTP/1.1" 413 88 "-" "Mozilla/5.0"',
  '192.168.1.77 - - "GET /api/v2/events?since=1706812800 HTTP/1.1" 200 34521 "-" "eventlib/1.0"',
  '10.0.0.33 - - "OPTIONS /api/v2/users HTTP/1.1" 204 0 "https://dashboard.internal" "Mozilla/5.0"',
];

let counter = 0;

function generateId(): string {
  return `log_${Date.now()}_${++counter}`;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

function generateAccessLog(): LogLine {
  const msg = pickRandom(ACCESS_MESSAGES);
  const level: LogLevel = msg.includes('" 4') || msg.includes('" 5') ? "WARN" : "INFO";
  return {
    id: generateId(),
    timestamp: new Date().toISOString(),
    level,
    source: "access",
    message: msg,
  };
}

export function generateLogLine(source: LogSource): LogLine {
  if (source === "access") return generateAccessLog();

  const pool =
    source === "app" ? APP_MESSAGES : source === "error" ? ERROR_MESSAGES : SYSTEM_MESSAGES;

  const entry = pickRandom(pool);
  return {
    id: generateId(),
    timestamp: new Date().toISOString(),
    level: entry.level,
    source,
    message: entry.message,
  };
}

export function generateMixedLog(): LogLine {
  const sources: LogSource[] = ["app", "error", "system", "access"];
  const weights = [0.5, 0.15, 0.2, 0.15];
  const rand = Math.random();
  let cumulative = 0;
  for (let i = 0; i < sources.length; i++) {
    cumulative += weights[i]!;
    if (rand < cumulative) return generateLogLine(sources[i]!);
  }
  return generateLogLine("app");
}
