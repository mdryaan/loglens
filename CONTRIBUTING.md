# Contributing to LogLens

## Dev environment setup

```bash
git clone https://github.com/mdryaan/loglens.git
cd loglens
npm install
cp .env.example .env.local
npm run dev
```

Node.js 18+ required. The app runs on `http://localhost:3000`.

## How to add a new log source

1. Add the new source to `LogSourceSchema` in `src/types/log.ts`:
   ```ts
   export const LogSourceSchema = z.enum(["app", "error", "system", "access", "yourSource"]);
   ```

2. Add a label and description to `src/constants/log-sources.ts`.

3. Add a source color to `src/constants/colors.ts` in `SOURCE_COLORS`.

4. Add message templates to `src/lib/log-generator.ts` (follow the existing pattern).

5. Wire the source into `generateLogLine` and `generateMixedLog` weight arrays.

## How to add a new tRPC route

1. Create a new router file in `src/server/routers/`:
   ```ts
   // src/server/routers/myFeature.ts
   import { z } from "zod";
   import { publicProcedure, router } from "../trpc";

   export const myFeatureRouter = router({
     getData: publicProcedure
       .input(z.object({ id: z.string() }))
       .query(({ input }) => {
         return { id: input.id, data: "..." };
       }),
   });
   ```

2. Register it in `src/server/routers/_app.ts`:
   ```ts
   import { myFeatureRouter } from "./myFeature";

   export const appRouter = router({
     // ...existing routers
     myFeature: myFeatureRouter,
   });
   ```

3. Call it on the client using the `trpc` client:
   ```ts
   const { data } = trpc.myFeature.getData.useQuery({ id: "123" });
   ```

## PR guidelines

- Keep PRs focused — one feature or fix per PR
- Run `npm run type-check` before opening a PR
- Use the conventional commit format: `feat(scope): description`
- Update `CONTRIBUTING.md` if you add a new source or router pattern
- PRs that break TypeScript strict mode will not be merged

## Code style rules

- No `any` types — use `unknown` and narrow with Zod or type guards
- No comments in source files — use descriptive names instead
- No default exports from library files, only from Next.js page/layout files
- Prefer `const` arrow functions for React components exported from `components/`
- Use `cn()` from `@/lib/utils` for conditional class merging
- Keep components under 150 lines; extract sub-components if they grow larger
