import { publicProcedure, router } from "../trpc";

export const statsRouter = router({
  getOverview: publicProcedure.query(() => {
    return {
      uptime: process.uptime(),
      memoryMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      activeStreams: Math.floor(Math.random() * 8) + 1,
      logsPerSecond: Math.floor(Math.random() * 12) + 2,
      totalEmitted: Math.floor(Math.random() * 50000) + 10000,
    };
  }),

  getLevelBreakdown: publicProcedure.query(() => {
    const total = Math.floor(Math.random() * 10000) + 5000;
    const errorPct = 0.04 + Math.random() * 0.06;
    const warnPct = 0.08 + Math.random() * 0.1;
    const debugPct = 0.15 + Math.random() * 0.1;
    const infoPct = 1 - errorPct - warnPct - debugPct;

    return {
      total,
      info: Math.floor(total * infoPct),
      warn: Math.floor(total * warnPct),
      error: Math.floor(total * errorPct),
      debug: Math.floor(total * debugPct),
    };
  }),
});
