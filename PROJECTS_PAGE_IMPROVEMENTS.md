# ProjectsPage.vue — UI/UX Improvement Checklist

> Last updated: 2025-12-29 — 8 / 27 items resolved

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
- [ ] **Results count disappears when no filters active** — The `aria-live` region only renders when `hasActiveFilters`. Users never know the total project count, and screen readers get no announcement on initial page load.

## Card UX (`ProjectCard.vue`)

- [ ] **No affordance that the card is clickable** — On hover, the card lifts (`translateY(-5px)`) but there's no overlay, arrow icon, "View Project" label, or cursor pointer indicator beyond the browser default. Add a visible hover CTA.
- [ ] **Tags truncated with no overflow indicator** (`ProjectCard.vue:15`) — `.slice(0, 3)` silently drops tags. Add a `+N more` chip when the project has more than 3 tags.
- [ ] **No category badge on card** — The `category` field (`'Web Application' | 'Game' | 'System'`) exists in data but isn't displayed on the card. Users can't tell what type a project is at a glance.
- [ ] **No `year` displayed on card** — The `year` field exists on `Project` but is never rendered anywhere on the card.
- [ ] **No quick-action links (live/repo)** — `liveUrl` and `repoUrl` are in the data model but users must navigate into the detail page to find them. Consider small icon links on card hover.
- [ ] **Fixed card heights are brittle** (`ProjectCard.vue:50–52`) — `height: 450px / min-height / max-height` all hardcoded. If description text length varies, this creates visual imbalance. Consider `min-height` only and let the grid equalize row heights.
- [ ] **Project title ellipsis silently truncates** (`ProjectCard.vue:147–149`) — `white-space: nowrap; overflow: hidden; text-overflow: ellipsis` on the image overlay hides long titles with no tooltip (`title` attribute) to expose the full name.
- [ ] **Border-radius inconsistency** — `.project-card-link` has `border-radius: 1rem` (`:209`) but `.project-card` is `4px` (`:46`). The focus ring follows the link's radius, misaligning with the card's visual shape.
- [ ] **`will-change` is on the wrong element** (`ProjectCard.vue:61`) — `will-change: transform, opacity` is on `.project-card-container` but the transforms are applied to `.project-card`. Move it.

## Layout & Visual Design

- [ ] **Stagger animation missing from project grid** — The `TransitionGroup` uses a flat fade (`project-fade`). Adding CSS `animation-delay` per card index via `v-bind` style creates a more premium staggered reveal.
- [ ] **No total project count in unfiltered state** — A subtle "X projects" badge near the page heading or filters lets users orient before interacting.
- [ ] **Grid breakpoint gap between 768–1024px** — At ~800–900px viewport widths, `minmax(360px, 1fr)` produces a single very wide card. A mid-range breakpoint (e.g. 900px with 2-column layout) would smooth this.
- [ ] **`position: fixed` background on a scrollable page** (`ProjectsPage.vue:185`) — On iOS Safari, `position: fixed` combined with `overflow: hidden` on an ancestor can cause scroll jank and visual artifacts.
- [ ] **Font fallback typo in footer** (`ProjectsPage.vue:420, 434`) — `.footer-copyright` and `.footer-link` declare `font-family: 'JetBrains Mono', sans-serif`. The fallback should be `monospace`, not `sans-serif`.

## Minor / Polish

- [ ] **No scroll-to-top control** — On a page with many projects, no way to quickly return to the top after scrolling past the filters to the bottom cards.
- [ ] **`/` keyboard shortcut to focus search** — A common pattern (GitHub, Linear, Notion) that significantly improves keyboard-first navigation. `SearchInput` already handles `Escape` to clear — `Enter` to open and `/` to focus would complete the set.
- [ ] **`setTimeout(400)` in watcher is fragile** (`ProjectsPage.vue:131–135`) — Hardcoded duration must be kept in sync with the `0.4s` transition. Extract both to a shared constant or CSS custom property.
- [ ] **CTA email `subject` param lacks encoding** (`ProjectsPage.vue:51`) — `?subject=Project Inquiry` has an unencoded space. Use `%20` or `encodeURIComponent` to ensure cross-client compatibility.
