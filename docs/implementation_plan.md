# Filter UI Overhaul - Implementation Plan

## Overview

This document outlines the implementation plan for overhauling the filter UI in `ProjectsPage.vue`. The new design features a minimal floating search bar with dropdown filters, technology tag filtering, and improved responsive behavior.

---

## Component Tree Diagram

```
ProjectsPage.vue
│
├── ProjectFilters.vue (Container)
│   │
│   ├── SearchInput.vue
│   │   └── q-input (Quasar)
│   │       ├── prepend: search icon
│   │       └── append: clear button (conditional)
│   │
│   ├── CategoryDropdown.vue
│   │   └── q-select (Quasar)
│   │       ├── multiple selection
│   │       └── use-chips display
│   │
│   └── TagChips.vue
│       └── Horizontal scroll container
│           └── q-chip[] (toggle behavior)
│
└── ProjectsGrid (transition-group)
    └── ProjectCard[] (router-link)
```

---

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                     useFilters.ts                           │
│                                                             │
│  ┌─────────────┐  ┌──────────────────┐  ┌─────────────┐   │
│  │ searchQuery │  │ selectedCategories│  │ selectedTags│   │
│  │   Ref<str>  │  │   Ref<Category[]> │  │ Ref<str[]>  │   │
│  └──────┬──────┘  └────────┬─────────┘  └──────┬──────┘   │
│         │                  │                    │          │
│         └──────────────────┼────────────────────┘          │
│                            ▼                               │
│              ┌─────────────────────────┐                   │
│              │    filteredProjects     │                   │
│              │   ComputedRef<Project[]>│                   │
│              └─────────────────────────┘                   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ availableTags: ComputedRef<string[]>                │   │
│  │ (extracted from all projects, sorted by frequency)  │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    ProjectsPage.vue                         │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ProjectFilters                                       │   │
│  │  - v-model:search="searchQuery"                     │   │
│  │  - v-model:categories="selectedCategories"          │   │
│  │  - v-model:tags="selectedTags"                      │   │
│  │  - :available-tags="availableTags"                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                            │                                │
│                            ▼                                │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ ProjectsGrid (:projects="filteredProjects")         │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## CSS Variable Additions

Add to existing design system (can be placed in `src/css/app.css` or scoped):

```css
:root {
  /* Filter Component Variables */
  --filter-bg: rgba(255, 255, 255, 0.08);
  --filter-bg-hover: rgba(255, 255, 255, 0.12);
  --filter-border: rgba(255, 255, 255, 0.15);
  --filter-border-active: rgba(255, 255, 255, 0.25);
  --filter-radius: 0.75rem;
  --filter-padding: 0.75rem 1rem;
  
  /* Search Input */
  --search-height: 44px;
  --search-max-width: 280px;
  
  /* Tag Chips */
  --tag-chip-height: 32px;
  --tag-chip-gap: 0.5rem;
  
  /* Transitions */
  --filter-transition: all 0.3s ease;
  
  /* Responsive */
  --filter-mobile-padding: 0.5rem 0.75rem;
}
```

---

## File Modification Checklist

### Files to CREATE

| File | Purpose | Priority |
|------|---------|----------|
| `src/components/filters/ProjectFilters.vue` | Main container component that orchestrates all filter inputs | 1 |
| `src/components/filters/SearchInput.vue` | Debounced text search input with clear functionality | 2 |
| `src/components/filters/CategoryDropdown.vue` | Multi-select dropdown for category filtering | 3 |
| `src/components/filters/TagChips.vue` | Horizontal scrollable tag chip selector | 4 |

### Files to MODIFY

| File | Changes | Priority |
|------|---------|----------|
| `src/composables/useFilters.ts` | Add `searchQuery`, `selectedTags`, `availableTags`, update `filteredProjects` logic | 1 |
| `src/pages/ProjectsPage.vue` | Replace inline filter markup with `<ProjectFilters />` component | 2 |

### Files to CREATE (Documentation)

| File | Purpose |
|------|---------|
| `docs/filters-implementation.md` | Technical documentation for the filter system |

---

## Implementation Order

1. **useFilters.ts** - Extend composable with new reactive state and filtering logic
2. **SearchInput.vue** - Create standalone search input with debounce
3. **CategoryDropdown.vue** - Create category multi-select dropdown
4. **TagChips.vue** - Create horizontal scrollable tag chips
5. **ProjectFilters.vue** - Compose all filter components into container
6. **ProjectsPage.vue** - Integrate new filter components
7. **Testing & Verification** - Debug mode instrumentation
8. **Documentation** - Create technical docs

---

## Responsive Behavior Summary

| Breakpoint | Layout | Behavior |
|------------|--------|----------|
| Desktop (>1024px) | Horizontal inline | All filters visible in single row |
| Tablet (768-1024px) | Condensed horizontal | Search + dropdown, tags below |
| Mobile (<768px) | Stacked + scroll | Search on top, horizontal scroll chips below |

---

## Accessibility Checklist

- [ ] All inputs have associated labels (via `aria-label` or `<label>`)
- [ ] Filter state changes announced via `aria-live` region
- [ ] Keyboard navigation works for all interactive elements
- [ ] Focus indicators visible and match design system
- [ ] Screen reader can navigate and understand filter purpose
- [ ] Clear filter buttons have descriptive labels

---

## Acceptance Criteria

1. Users can search projects by title and description
2. Users can filter by multiple categories simultaneously
3. Users can filter by technology tags
4. All filters combine (AND logic for search + categories + tags)
5. Clear all filters resets to showing all projects
6. Results count updates in real-time
7. Works correctly at all 3 breakpoints (1440px, 768px, 375px)
8. No linter errors
9. Maintains existing glassmorphism aesthetic
