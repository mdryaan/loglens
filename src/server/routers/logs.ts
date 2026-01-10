import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import { LogSourceSchema, LogLevelSchema } from "@/types/log";
import { generateLogLine } from "@/lib/log-generator";

export const logsRouter = router({
  getRecent: publicProcedure
    .input(
      z.object({
        source: LogSourceSchema,
        limit: z.number().min(1).max(500).default(100),
      }),
    )
    .query(({ input }) => {
      const lines = Array.from({ length: input.limit }, () => generateLogLine(input.source));
      return { lines, total: lines.length };
    }),

  getByLevel: publicProcedure
    .input(
      z.object({
        level: LogLevelSchema,
        limit: z.number().min(1).max(200).default(50),
      }),
    )
    .query(({ input }) => {
      const sources = ["app", "error", "system", "access"] as const;
      const all = Array.from({ length: input.limit * 4 }, () =>
        generateLogLine(sources[Math.floor(Math.random() * sources.length)]!),
      );
      const filtered = all.filter((l) => l.level === input.level).slice(0, input.limit);
      return { lines: filtered };
    }),

  getSources: publicProcedure.query(() => {
    return {
      sources: [
        { id: "app", label: "Application", active: true },
        { id: "error", label: "Error Log", active: true },
        { id: "system", label: "System", active: true },
        { id: "access", label: "Access Log", active: true },
      ],
    };
  }),
});
