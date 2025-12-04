# Projects page — WCAG AA contrast (implementation plan)

## Context

- **Route:** `/#/projects` — composition in [`src/pages/ProjectsPage.vue`](src/pages/ProjectsPage.vue).
- **Backgrounds for audit:** `var(--bg-charcoal)` `#222831`, `var(--bg-grey)` `#393E46` (tokens unchanged per scope).
- **Thresholds:** WCAG 2.2 — **4.5:1** normal text; **3:1** large/bold text and non-text UI where applicable.

## Audit method

1. **Deterministic check:** Relative luminance (WCAG sRGB) computed in Node for representative pairs (opaque blend for translucent text).
2. **Recommended manual pass:** Chrome **Lighthouse** (Accessibility) or **axe DevTools** on `http://localhost:9000/#/projects` after `npm run dev`, to catch stacking contexts, images, and Quasar internals.

## Findings (pre-fix)

| Element / selector | Foreground | Background | Ratio | Notes |
|-------------------|-------------|------------|-------|--------|
| `.project-count-badge` | teal @ 75% opacity | charcoal | ~3.67 | Fails 4.5:1 (normal text) |
| `.empty-state__code` | rgba(238,238,238,0.35) | grey | ~2.56 | Fails 4.5:1 |
| `.empty-state__bracket` | rgba(238,238,238,0.4) | grey | ~2.87 | Fails 3:1 for large symbol target |
| `.empty-state__filter-sep` | rgba(238,238,238,0.4) | charcoal | ~3.38 | Fails 4.5:1 at ~0.9rem |
| `.footer-copyright` | rgba(238,238,238,0.5) | charcoal | ~4.33 | Fails 4.5:1 (margin) |
| `.footer-divider` | rgba(255,255,255,0.3) | charcoal | ~2.68 | Weak for visible bullet |
| `ProjectCard` `.category-badge--game` | #A64D79 | grey | ~2.03 | Fails 4.5:1 (small badge label) |
| `ProjectCard` `.tech-chip--overflow` | composite @ 0.7 opacity | grey | Low | Opacity reduces effective contrast |
| Search placeholder (optional margin) | rgba(255,255,255,0.5) | charcoal | ~4.87 | Near threshold — bumped for headroom |

## Fix strategy

- All changes in **`ProjectsPage.vue` scoped CSS** only.
- Local selectors: badge, empty-state, footer, terminal border.
- **`:deep(...)`** for `ProjectFilters` / `SearchInput` / `ProjectCard` descendants under `.projects-page`.

## Verification

- `npm run lint`
- Re-run **Lighthouse** accessibility on `/projects` after changes.

## Applied fixes (summary)

| Area | Change |
|------|--------|
| `.project-count-badge` | Removed `opacity: 0.75` so teal meets 4.5:1 on charcoal |
| `.empty-state__*` | Raised alphas on grey/charcoal for code, brackets, filter sep; stronger terminal border |
| `.footer-copyright` / `.footer-divider` | Higher-contrast rgba on charcoal |
| `:deep(.search-input …)` | Placeholder `rgba(255,255,255,0.62)` on charcoal |
| `:deep(.category-badge--game)` | Lighter label `#eeb4d8` on grey panel |
| `:deep(.tech-chip--overflow)` / `:deep(.tag-chip--more)` | `opacity: 1` to avoid diluted contrast over grey |

---

## Heading `text-wrap` (follow-up)

### DOM (after)

```html
<h1 class="… page-heading">
  <span class="page-heading__title">My Projects</span>
  <span class="project-count-badge" …>[ … ]</span>
</h1>
```

`h1.page-heading` stays `display: flex`; the title span gets `flex: 1 1 auto; min-width: 0` so it can shrink-wrap while the badge stays a sibling.

### Selectors

| Selector | `text-wrap: balance` | `@supports (text-wrap: pretty)` → `pretty` |
|----------|----------------------|---------------------------------------------|
| `.page-heading__title` | yes | yes |
| `.empty-state__heading` | yes | yes |
| `.cta-heading` | yes | yes |

### Browser support

- `text-wrap: balance` — Chromium, Safari (recent), Firefox.
- `text-wrap: pretty` — newer; layered so supporting UAs prefer `pretty`, others keep `balance` or no-op if neither applies.
- No change to [`src/css/app.css`](src/css/app.css).

---

## Scroll-to-top FAB (touch target + safe area)

### Current vs target

| Property | Before | After |
|----------|--------|--------|
| Hit box | `2.5rem` (~40px) | **≥ 44×44 CSS px** (`min-width` / `min-height` + `box-sizing: border-box`) |
| `bottom` / `right` | `2rem` | `calc(2rem + env(safe-area-inset-bottom, 0px))` and `calc(2rem + env(safe-area-inset-right, 0px))` |

### Viewport caveat

[`index.html`](index.html) only adds `viewport-fit=cover` in Cordova/Capacitor builds. On plain mobile Safari, `env(safe-area-inset-bottom)` may stay **0** until the viewport meta includes `viewport-fit=cover` for the web SPA — optional global follow-up if devices still clip the home indicator.

### Vibe

Unchanged terminal styling (charcoal, teal border, hard shadow, ▲); size and offsets only.

---

## Filter results live region (SR announcements)

### DOM

- First child inside `.content` (inside `<main>`): `<p id="projects-filter-results-live" class="projects-results-live" role="status" aria-live="polite" aria-atomic="true">` bound to a computed string from `filteredProjects.length`.

### Copy

| Count | Text |
|-------|------|
| `1` | `Showing 1 project` |
| else | `Showing N projects` |

### Dedupe checklist

- [x] Remove `aria-live` / `aria-atomic` from `ProjectFilters.vue` `.results-count` and `.results-count-mobile`.
- [ ] Empty-state panel (`.empty-state`) still uses `role="status"` when visible — possible double announcement at zero results; acceptable unless follow-up narrows it.

### Edge case

If **N unchanged** but filters change, identical live text may not re-announce in all SRs (out of scope per Danny plan).

---

## Heading `text-wrap` — parity check (Danny reference)

**Date:** 2026-04-18

**Verified in source (no code gap):** [`src/pages/ProjectsPage.vue`](src/pages/ProjectsPage.vue)

- `h1.page-heading` contains `<span class="page-heading__title">My Projects</span>` plus count badge; `.page-heading__title` has `flex: 1 1 auto; min-width: 0`.
- `.page-heading__title`, `.empty-state__heading`, `.cta-heading` declare `text-wrap: balance`, with `@supports (text-wrap: pretty) { … text-wrap: pretty; }`.

**Manual check:** Resize viewport on `/#/projects` in DevTools or device to confirm multi-line headings look acceptable in supported browsers (Phase 4 visual verification).
