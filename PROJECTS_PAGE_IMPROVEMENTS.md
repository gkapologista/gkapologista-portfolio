# ProjectsPage.vue — UI/UX Improvement Checklist

> Last updated: 2025-12-19 — 20 / 27 items resolved

## Critical / Functional Gaps

- [x] **Empty state for zero results** — When filters return 0 projects, nothing is rendered. Add a "No projects found" message with a clear-filters prompt.
- [x] **No search debounce** (`useFilters.ts`) — Already implemented: `useFilters` uses `useDebounce(searchQuery, 300)` internally; `filteredProjects` only recomputes after 300ms of inactivity.
- [x] **Filter state not persisted in URL** — `syncFromQuery` initializes state from `route.query` on load; a `watch` on filters syncs to URL via `router.replace`; a second `watch` on `route.query` handles back/forward navigation. URL format: `?q=&category=&tags=`.
- [x] **`search-cleared` event goes nowhere** — Destructured `clearSearch` from `useFilters` and bound `@search-cleared="clearSearch"` on `<ProjectFilters>`. Escape key and the × button now correctly clear only the search field without resetting category/tag filters.
- [x] **`onMounted` is a no-op** — Removed the empty lifecycle hook and `onMounted` from the Vue import.

## Accessibility

- [x] **Footer icons missing `aria-hidden`** — Added `aria-hidden="true"` to the GitHub and LinkedIn `<q-icon>` elements in the footer, matching the home page pattern.
- [x] **No `prefers-reduced-motion` support** — Added `@media (prefers-reduced-motion: reduce)` to `ProjectCard.vue` (disables card lift, image scale, chip lift, skeleton pulse) and expanded the existing block in `ProjectsPage.vue` (removes nav/CTA/clear-btn lifts, disables project-fade and grid transitions). Opacity fades are preserved as they don't cause vestibular issues.
- [x] **`overflow: hidden` on `.projects-page`** — Replaced with `overflow-x: clip`. Clips any accidental horizontal overflow without creating a scroll container, so focus rings on edge cards are no longer clipped. `background-effects` is `position: fixed` and never contributed to page overflow anyway.
- [x] **Results count disappears when no filters active** — Removed `v-if="hasActiveFilters"` from the count container; moved it onto the clear button alone (with its own `<transition>`). Count badge is now always in the DOM showing total or filtered count. Added `aria-atomic="true"` to both desktop and mobile `aria-live` spans.

## Card UX (`ProjectCard.vue`)

- [x] **No affordance that the card is clickable** — Added a `> VIEW PROJECT ↗` teal strip (`position: absolute, bottom: 0`) that slides up from below the card on hover (`translateY(100%)` → `translateY(0)`). Works with the existing `overflow: hidden`. Reduced-motion users get an opacity fade instead of a slide.
- [x] **Tags truncated with no overflow indicator** — Added a `+N` chip after the three visible tags (`v-if="project.tags.length > 3"`), styled with dashed teal border and italic text matching the `tag-chip--more` pattern from `TagChips.vue`. Includes `aria-label` for screen readers and suppressed hover lift since the chip is non-interactive.
- [x] **No category badge on card** — Added a terminal-style badge (`position: absolute`, top-left of image) with per-category symbols and colors: `</>` teal (Web Application), `▶` purple (Game), `>_` white (System). `backdrop-filter: blur(6px)` ensures legibility over any image; `pointer-events: none` since it's informational only. Driven by a `CATEGORY_CONFIG` map in `<script setup>`.
- [ ] **No `year` displayed on card** — The `year` field exists on `Project` but is never rendered anywhere on the card.
- [ ] **No quick-action links (live/repo)** — `liveUrl` and `repoUrl` are in the data model but users must navigate into the detail page to find them. Consider small icon links on card hover.
- [x] **Fixed card heights are brittle** — Replaced `height / min-height / max-height: 450px` with `min-height: 450px; height: 100%` on `.project-card`, and added `height: 100%` to `.project-card-link`. The grid's existing `align-items: stretch` now propagates row height down the chain, equalizing all cards in a row. Mobile floor dropped to `min-height: 380px; height: 100%` on the same pattern.
- [x] **Project title ellipsis silently truncates** — Added `:title="project.title"` to the `<h3>` so the native browser tooltip exposes the full name on hover whenever the text is truncated by ellipsis.
- [x] **Border-radius inconsistency** — Changed `.project-card-link` from `border-radius: 1rem` to `4px` to match `.project-card`. Focus ring now hugs the card's sharp corners correctly.
- [x] **`will-change` is on the wrong element** — Moved `will-change: transform, opacity` from `.project-card-container` to `.project-card`, where the hover `transform` and transition `opacity` are actually applied.

## Layout & Visual Design

- [x] **Stagger animation missing from project grid** — Added `(project, index)` to the `v-for` and bound `--card-index` via `:style`. Enter transition uses `transition-delay: min(calc(var(--card-index, 0) * 50ms), 400ms)` plus a `translateY(14px)` rise for a premium staggered reveal. Leave is instant (no stagger). Reduced-motion users get `transition: none; transition-delay: 0ms; transform: none`.
- [x] **No total project count in unfiltered state** — Added `[ N ]` inline with the `<h1>` via `.project-count-badge` (JetBrains Mono, teal, 75% opacity). Uses `projects.length` directly (the static import), so it always reflects the true total regardless of active filters. `aria-label` exposes the count to screen readers.
- [x] **Grid breakpoint gap between 768–1024px** — Added `@media (min-width: 769px) and (max-width: 899px)` with `grid-template-columns: repeat(2, 1fr)`. At those widths, `minmax(360px, 1fr)` fell to 1 column because two 360px columns + 32px gap (752px) exceeded the ~705–751px content area. The forced 2-column layout bridges the gap until `auto-fill` naturally takes over at ≥900px.
- [x] **`position: fixed` background on a scrollable page** — Added `transform: translateZ(0)` to `.background-effects`, promoting it to its own GPU compositor layer. iOS Safari's rubber-band scroll no longer triggers a main-thread repaint of the fixed element. The ancestral `overflow-x: clip` (set earlier) already prevents clipping; this closes the remaining jank vector.
- [ ] **Font fallback typo in footer** (`ProjectsPage.vue:420, 434`) — `.footer-copyright` and `.footer-link` declare `font-family: 'JetBrains Mono', sans-serif`. The fallback should be `monospace`, not `sans-serif`.

## Minor / Polish

- [ ] **No scroll-to-top control** — On a page with many projects, no way to quickly return to the top after scrolling past the filters to the bottom cards.
- [ ] **`/` keyboard shortcut to focus search** — A common pattern (GitHub, Linear, Notion) that significantly improves keyboard-first navigation. `SearchInput` already handles `Escape` to clear — `Enter` to open and `/` to focus would complete the set.
- [ ] **`setTimeout(400)` in watcher is fragile** (`ProjectsPage.vue:131–135`) — Hardcoded duration must be kept in sync with the `0.4s` transition. Extract both to a shared constant or CSS custom property.
- [ ] **CTA email `subject` param lacks encoding** (`ProjectsPage.vue:51`) — `?subject=Project Inquiry` has an unencoded space. Use `%20` or `encodeURIComponent` to ensure cross-client compatibility.
