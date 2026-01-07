export function createSSEStream(
  generator: (send: (event: string, data: string) => void, close: () => void) => () => void,
): Response {
  const encoder = new TextEncoder();
  let cleanup: (() => void) | undefined;

  const stream = new ReadableStream({
    start(controller) {
      const send = (event: string, data: string) => {
        try {
          controller.enqueue(encoder.encode(`event: ${event}\ndata: ${data}\n\n`));
        } catch {
          // controller already closed
        }
      };

      const close = () => {
        try {
          controller.close();
        } catch {
          // already closed
        }
      };

      cleanup = generator(send, close);
    },
    cancel() {
      cleanup?.();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}

export function sseData(data: string): string {
  return `data: ${data}\n\n`;
}

export function sseEvent(event: string, data: string): string {
  return `event: ${event}\ndata: ${data}\n\n`;
}
