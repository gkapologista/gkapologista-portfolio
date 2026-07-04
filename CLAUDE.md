# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start dev server with HMR (opens browser at `http://localhost:9000`).
- `npm run build` — Production build (SPA output to `dist/spa/`).
- `npm run lint` — ESLint over `.js`, `.ts`, `.vue`.
- `npm run format` — Prettier write across the repo.
- `npm run deploy` — Build and publish `dist/spa` to GitHub Pages via `gh-pages`.
- `npm test` — Placeholder only; no test framework is configured.

Type checking and linting also run inline during `dev`/`build` via `vite-plugin-checker` (vue-tsc uses `tsconfig.vue-tsc.json`). There is no separate type-check script.

## Architecture

A Vue 3 + Quasar 2 + TypeScript single-page portfolio. Quasar CLI with the Vite bundler drives the build (`quasar.config.js` is the source of truth, not Vite config directly). Routing is **hash-based** and deployed under the base path `/gkapologista-portfolio/` — both are set in `quasar.config.js` (`build.vueRouterMode`, `build.publicPath`), not in router code.

### Data layer
There is no backend or store library. All content lives in `src/data/projects.ts` as a typed `Project[]` array; the `Project` interface there is the canonical schema. Project images are referenced through `import.meta.env.BASE_URL` so paths resolve correctly under the production base path. There is no `boot/` code — `src/boot/` holds only `.gitkeep` (the axios boot file was removed).

### Image delivery and prefetch
Raster assets are compressed offline by `sharp` (dev dependency) and shipped as WebP with a PNG/JPG fallback via `<picture>` elements. `src/utils/images.ts` exposes `webpFrom(src)`, which derives the `.webp` sibling of a source path so templates can build the `<source srcset>` while keeping the original as the `<img>` fallback. `src/composables/usePrefetch.ts` warms lazy-route chunks (`prefetchComponent`) and images (`prefetchImages`) ahead of navigation.

### Global transition orchestration (the central, non-obvious system)
Route changes trigger a "Cyberpunk" glitch transition coordinated globally, not per-page:
- `App.vue` holds the `isTransitioning` ref, registers a `router.beforeEach` guard, and renders `<GlitchTransition>` over the `<router-view>`. The guard holds navigation ~300ms for the glitch to "hit", then hides it ~400ms after.
- Transition text comes from each route's `meta.transitionText` (defined in `src/router/routes.ts`). The `ProjectDetail` route resolves its text dynamically in `App.vue` by looking up the project by `slug` (e.g. `DECRYPTING: <TITLE> ARCHIVES...`).
- When adding a route, set its `meta.transitionText`, or it falls back to `FETCHING_DATA...`.
- `GlitchTransition.vue` drives the glitch animation with GSAP (the only runtime use of the `gsap` dependency).

### Filtering (`src/composables/useFilters.ts`)
The projects page filtering is fully encapsulated here. Key behaviors to preserve: search is debounced (450ms) and token-based (every space-separated token must match title/description/tech/tags), results are relevance-scored (title 3 / tech 2 / description 1) while a query is active, categories filter with OR, and tags filter with AND. `availableTags` is derived from project `technologies`, ranked by frequency.

### Theme
`src/composables/useTheme.ts` keeps a module-level `isDark` ref (shared singleton across imports), persists to `localStorage` under `portfolio-theme`, and toggles a `data-theme` attribute on `<html>`. Defaults to dark. `App.vue` calls `init()` on mount; `ThemeToggle.vue` calls `toggle()`.

### Routing structure
`MainLayout.vue` (Quasar `q-layout` + `q-page-container`) wraps `/` (HomePage) and `/projects` (ProjectsPage). `/project/:slug` (name `ProjectDetail`, `props: true`) and the catch-all 404 sit outside the layout. All route components are lazy-loaded via dynamic `import()`.

## Conventions (from `.cursor/rules/` and `.cursorrules`)

- **Composition API only** — always `<script setup lang="ts">`; never the Options API.
- Prefer Quasar components (`q-btn`, `q-input`, …) over native HTML elements; style with `scoped` CSS or Quasar utility classes (`q-pa-md`, `text-primary`) — avoid inline styles.
- Explicit TypeScript types; avoid `any`. Use `ref` for primitives, `reactive` for objects, and `.value` in scripts.
- No `console.log`, no untracked `// TODO`, no jQuery/direct DOM manipulation, no sync XHR. Move complex template logic into `computed`/functions.
- Reuse logic via composables in `src/composables/`.
- Programmatic navigation uses `useRouter`; with hash routing, "skip to main" / fragment focus must use `@click.prevent` + programmatic `focus()`/`scrollIntoView()` so the fragment doesn't replace the route hash.
- Each route page should have exactly one `<main id="main-content">`; keep decorative backgrounds, fixed controls, and `<footer>` outside it.

### Golden-sample reference files
- Pages / Quasar usage / `useMeta` SEO / route params: `src/pages/ProjectDetailPage.vue`
- Main landmark + skip link + list `<TransitionGroup>`: `src/pages/ProjectsPage.vue`
- Routing patterns: `src/router/routes.ts`
- Layout: `src/layouts/MainLayout.vue`

### Debugging protocol
When fixing a bug, the repo rules ask you to state expected-vs-actual, list **three** hypotheses and pick one before editing; if a fix fails, re-read the file and pivot to a fundamentally different approach rather than iterating on the failed one.
