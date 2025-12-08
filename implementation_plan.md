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
