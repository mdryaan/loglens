import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { LogSourceSchema } from "@/types/log";

export const streamRouter = router({
  getConfig: publicProcedure
    .input(z.object({ source: LogSourceSchema }))
    .query(({ input }) => {
      return {
        source: input.source,
        endpoint: `/api/stream?source=${input.source}`,
        intervalMs: 800,
        maxBufferSize: 1000,
      };
    }),

  ping: publicProcedure.query(() => ({
    ok: true,
    ts: new Date().toISOString(),
  })),
});
