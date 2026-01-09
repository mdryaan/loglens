import { router } from "../trpc";
import { logsRouter } from "./logs";
import { statsRouter } from "./stats";
import { streamRouter } from "./stream";

export const appRouter = router({
  logs: logsRouter,
  stats: statsRouter,
  stream: streamRouter,
});

export type AppRouter = typeof appRouter;
