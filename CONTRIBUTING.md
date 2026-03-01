# Contributing to LogLens

Thank you for taking the time to contribute. Please read this guide fully before opening a PR.

---

## Table of Contents

- [Dev Environment Setup](#dev-environment-setup)
- [Fork and Clone](#fork-and-clone)
- [Create a Branch](#create-a-branch)
- [Make Your Changes](#make-your-changes)
- [Push and Open a PR](#push-and-open-a-pr)
- [How to Add a New Log Source](#how-to-add-a-new-log-source)
- [How to Add a New tRPC Route](#how-to-add-a-new-trpc-route)
- [Code Style Rules](#code-style-rules)
- [PR Guidelines](#pr-guidelines)

---

## Dev Environment Setup

**Requirements:**
- Node.js 18 or higher
- npm 9 or higher
- Git

```bash
node --version  # should be >= 18
npm --version   # should be >= 9
```

---

## Fork and Clone

**Step 1 — Fork the repository**

Go to [https://github.com/mdryaan/loglens](https://github.com/mdryaan/loglens) and click the **Fork** button in the top-right corner. This creates a copy under your own GitHub account.

**Step 2 — Clone your fork**

```bash
git clone https://github.com/<your-username>/loglens.git
cd loglens
```

**Step 3 — Add the upstream remote**

```bash
git remote add upstream https://github.com/mdryaan/loglens.git
```

This lets you pull future changes from the original repo into your fork.

**Step 4 — Install dependencies**

```bash
npm install
```

**Step 5 — Set up environment**

```bash
cp .env.example .env.local
```

**Step 6 — Start the dev server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to verify everything is running.

---

## Create a Branch

Always work on a new branch — never commit directly to `main`.

```bash
git checkout -b feat/your-feature-name
```

Branch naming conventions:

| Prefix | When to use |
|---|---|
| `feat/` | New feature |
| `fix/` | Bug fix |
| `docs/` | Documentation only |
| `refactor/` | Code cleanup, no behavior change |
| `chore/` | Config, deps, tooling |

---

## Make Your Changes

- Run `npm run type-check` after every significant change
- Keep changes focused — one feature or fix per branch
- Follow the [Code Style Rules](#code-style-rules) below

Before committing, make sure:

```bash
npm run type-check   # must pass with zero errors
npm run lint         # must pass with zero warnings
npm run dev          # app must run without console errors
```

---

## Push and Open a PR

**Step 1 — Stage and commit your changes**

```bash
git add <files you changed>
git commit -m "feat(scope): short description of what you did"
```

Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/): `feat`, `fix`, `docs`, `refactor`, `chore`.

**Step 2 — Sync with upstream before pushing**

```bash
git fetch upstream
git rebase upstream/main
```

Resolve any conflicts, then continue:

```bash
git rebase --continue
```

**Step 3 — Push your branch to your fork**

```bash
git push origin feat/your-feature-name
```

**Step 4 — Open a Pull Request**

1. Go to your fork on GitHub: `https://github.com/<your-username>/loglens`
2. You will see a **"Compare & pull request"** banner — click it
3. Set the base repository to `mdryaan/loglens` and base branch to `main`
4. Fill in the PR template:
   - **What does this PR do?** — one paragraph summary
   - **How was it tested?** — describe what you manually verified
   - **Screenshots** — include a before/after if it's a UI change
5. Click **"Create pull request"**

---

## How to Add a New Log Source

1. Add the new source name to `LogSourceSchema` in `src/types/log.ts`:

   ```ts
   export const LogSourceSchema = z.enum(["app", "error", "system", "access", "yourSource"]);
   ```

2. Add a label and description in `src/constants/log-sources.ts`:

   ```ts
   export const LOG_SOURCE_LABELS: Record<LogSource, string> = {
     // ...existing
     yourSource: "Your Source Label",
   };

   export const LOG_SOURCE_DESCRIPTIONS: Record<LogSource, string> = {
     // ...existing
     yourSource: "Short description of what this source streams",
   };
   ```

3. Add a color in `src/constants/colors.ts`:

   ```ts
   export const SOURCE_COLORS: Record<LogSource, string> = {
     // ...existing
     yourSource: "text-pink-400",
   };
   ```

4. Add message templates in `src/lib/log-generator.ts` following the same pattern as `APP_MESSAGES`.

5. Wire the new source into the `generateLogLine` switch and update the weights in `generateMixedLog`.

---

## How to Add a New tRPC Route

1. Create a new router file in `src/server/routers/`:

   ```ts
   // src/server/routers/myFeature.ts
   import { z } from "zod";
   import { publicProcedure, router } from "../trpc";

   export const myFeatureRouter = router({
     getData: publicProcedure
       .input(z.object({ id: z.string() }))
       .query(({ input }) => {
         return { id: input.id };
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

3. Use it on the client with full type safety:

   ```ts
   const { data } = trpc.myFeature.getData.useQuery({ id: "123" });
   ```

---

## Code Style Rules

- **No `any` types** — use `unknown` and narrow with Zod or type guards
- **No comments** — use descriptive names instead; comments for non-obvious WHY only
- **No default exports** from library or component files — only from Next.js page/layout files
- Use `cn()` from `@/lib/utils` for all conditional class merging
- Keep components under 150 lines; extract sub-components when they grow larger
- Prefer `const` arrow functions for React components
- All new UI strings must use the `terminal-*` color tokens from `tailwind.config.ts`

---

## PR Guidelines

- One feature or fix per PR — keep scope tight
- `npm run type-check` must pass with zero errors before you open the PR
- UI changes must include screenshots in the PR description
- PRs that introduce `any`, comments, or unused exports will be asked to revise
- Rebase onto `main` before requesting review — do not merge commits
