# knit-civic

Single-package Next.js app (App Router). Code lives under `src/`: routes in `src/app/`, UI components in `src/components/ui/`, helpers in `src/lib/`. Path alias `@/*` → `src/*`.

## Commands

- `npm run dev` — dev server on localhost:3000 (Turbopack)
- `npm run build` / `npm run start` — production build / serve
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`); no `typecheck` script — use `npx tsc --noEmit`
- No test framework is configured. There is no CI.

## Stack quirks

- **Next.js 16.4.3 / React 19.3** — newer than most training data. Before writing Next code, check the bundled guides in `node_modules/next/dist/docs/` for current APIs and file conventions.
- **React Compiler is enabled** (`reactCompiler: true` in `next.config.ts`). Do not add manual `useMemo`/`useCallback`/memoization.
- **Tailwind v4, no config file.** Styling is set up via CSS `@import`s in `src/app/globals.css` (tailwindcss, tw-animate-css, shadcn/tailwind.css, @heroui/styles) and Turbopack in `next.config.ts`.
- **UI stack is mixed, keyed off `components.json`:** shadcn components use the `base-nova` style but are built on **`@base-ui/react` primitives, not Radix** — copy that import pattern when adding components (`npx shadcn add <component>`). HeroUI is available too. Icons: lucide.
- `cn` is imported from the `cn` npm package, re-exported by `src/lib/utils`. In components use `import { cn } from "cn"` (matches existing code).
- **Dark mode is homegrown — do not reach for `next-themes`.** Class-based via `@custom-variant dark (&:is(.dark *))` in `src/app/globals.css`; toggle the `.dark` class on `<html>`, persist under localStorage key `knit-civic-theme`. The root layout (`src/app/layout.tsx`) has an inline pre-hydration script that applies it — keep it in sync if the key changes. For theme-dependent icons/images, render both variants and let CSS pick (`dark:hidden` / `hidden dark:block`), e.g. `theme-toggle.tsx`.
- **Palette lives in `src/app/globals.css`, in two blocks per mode:** shadcn/tailwind tokens (`--primary`, `--surface`, …) and a separate HeroUI override block. Brand color is pink `#ff3d71`. Any color change must update both blocks and both light + dark.
- **Full-stack integration:** Authentication is powered by Better-Auth (`src/lib/auth.ts`, `src/app/api/auth/[...all]/route.ts`) connected to MongoDB. Events data and management communicate with the Express backend at `http://localhost:8000`. Placeholders live as first-party SVGs in `public/`, which is why `next.config.ts` sets `dangerouslyAllowSVG: true` — don't replicate that for untrusted third-party images.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
