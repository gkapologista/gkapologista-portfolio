# Filter System Technical Documentation

## Overview

The filter system provides a modern, responsive UI for filtering portfolio projects by search text, categories, and technology tags. It follows Vue.js 3 Composition API patterns with TypeScript for type safety.

---

## Architecture

```
src/
├── components/
│   └── filters/
│       ├── index.ts                # Re-exports all filter components
│       ├── ProjectFilters.vue      # Main container component
│       ├── SearchInput.vue         # Debounced text search
│       ├── CategoryDropdown.vue    # Multi-select category dropdown
│       └── TagChips.vue            # Horizontal scrollable tag chips
├── composables/
│   └── useFilters.ts               # Centralized filter state and logic
└── pages/
    └── ProjectsPage.vue            # Consumes filter components
```

---

## Components

### ProjectFilters.vue

**Purpose**: Main container that orchestrates all filter inputs and manages responsive layouts.

**Props**:
| Prop | Type | Description |
|------|------|-------------|
| `searchQuery` | `string` | Current search text |
| `selectedCategories` | `Category[]` | Selected category filters |
| `selectedTags` | `string[]` | Selected tag filters |
| `availableTags` | `string[]` | All available tags from projects |
| `resultsCount` | `number` | Number of filtered results |

**Events**:
| Event | Payload | Description |
|-------|---------|-------------|
| `update:searchQuery` | `string` | Search text changed |
| `update:selectedCategories` | `Category[]` | Categories changed |
| `update:selectedTags` | `string[]` | Tags changed |
| `clear-all` | - | Clear all filters requested |
| `search-cleared` | - | Search was cleared |

**Responsive Behavior**:
- **Desktop (>768px)**: Horizontal layout with all filters in single row
- **Mobile (<=768px)**: Stacked layout with separate rows

---

### SearchInput.vue

**Purpose**: Debounced text search input with clear functionality.

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | required | Current search text |
| `placeholder` | `string` | `"Search projects..."` | Input placeholder |
| `ariaLabel` | `string` | `"Search projects..."` | Accessibility label |

**Features**:
- Prepended search icon
- Clear button appears when text is present
- Escape key clears input
- Glassmorphism styling

---

### CategoryDropdown.vue

**Purpose**: Multi-select dropdown for category filtering.

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `Category[]` | required | Selected categories |
| `ariaLabel` | `string` | `"Filter by..."` | Accessibility label |

**Features**:
- Uses Quasar `q-select` with multiple selection
- Displays selected items as removable chips
- Custom popup styling matching dark theme

**Categories**:
- Web Application
- Game
- System

---

### TagChips.vue

**Purpose**: Horizontal scrollable list of technology tag chips.

**Props**:
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string[]` | required | Selected tags |
| `availableTags` | `string[]` | required | All available tags |
| `maxVisible` | `number` | `10` | Tags to show before "more" |
| `ariaLabel` | `string` | `"Filter by..."` | Accessibility label |

**Features**:
- Horizontal scroll with touch support
- Toggle selection on click
- "Show more/less" for long tag lists
- Selected tags always visible even if beyond max

---

## Composable: useFilters

**Location**: `src/composables/useFilters.ts`

### Exports

```typescript
// Constants
export const categories = ['Web Application', 'Game', 'System'] as const;
export type Category = (typeof categories)[number];

// Composable
export function useFilters(projects: Ref<Project[]>): {
  // Search
  searchQuery: Ref<string>;
  clearSearch: () => void;

  // Categories
  selectedCategories: Ref<Category[]>;
  toggleCategory: (category: Category) => void;
  removeFilter: (category: Category) => void;

  // Tags
  selectedTags: Ref<string[]>;
  availableTags: ComputedRef<string[]>;
  toggleTag: (tag: string) => void;
  removeTag: (tag: string) => void;

  // Combined
  filteredProjects: ComputedRef<Project[]>;
  hasActiveFilters: ComputedRef<boolean>;
  clearFilters: () => void;
};
```

### Filtering Logic

1. **Search**: Filters by title and description (case-insensitive)
2. **Categories**: OR logic (matches any selected category)
3. **Tags**: AND logic (must have ALL selected tags)
4. **Combined**: All three filters are ANDed together

### Debouncing

Search input is debounced by 300ms to prevent excessive filtering during typing.

---

## Usage Example

```vue
<template>
  <ProjectFilters
    v-model:search-query="searchQuery"
    v-model:selected-categories="selectedCategories"
    v-model:selected-tags="selectedTags"
    :available-tags="availableTags"
    :results-count="filteredProjects.length"
    @clear-all="clearFilters"
  />

  <div v-for="project in filteredProjects" :key="project.id">
    {{ project.title }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { projects } from '../data/projects';
import { useFilters } from '../composables/useFilters';
import { ProjectFilters } from '../components/filters';

const {
  searchQuery,
  selectedCategories,
  selectedTags,
  availableTags,
  filteredProjects,
  clearFilters,
} = useFilters(ref(projects));
</script>
```

---

## Styling

### CSS Variables

The filter components use these CSS variables (can be customized):

```css
:root {
  --filter-radius: 0.75rem;
  --filter-padding: 0.75rem 1rem;
  --filter-mobile-padding: 0.5rem 0.75rem;
  --filter-transition: all 0.3s ease;
  --search-height: 44px;
  --search-max-width: 280px;
  --tag-chip-height: 32px;
  --tag-chip-gap: 0.5rem;
}
```

### Design Tokens

Components use the existing design system:
- `--q-secondary`: Primary accent color
- Glassmorphism with `backdrop-filter: blur(10px)`
- Semi-transparent backgrounds with white borders
- Outfit and Space Grotesk font families

---

## Accessibility

### ARIA Support

- All interactive elements have `aria-label` attributes
- Filter container uses `role="search"`
- Tag chips use `aria-pressed` for toggle state
- Results count uses `aria-live="polite"` for screen reader updates

### Keyboard Navigation

- Tab navigation through all filter controls
- Escape key clears search input
- Enter/Space activates buttons and chips
- Focus indicators visible on all interactive elements

---

## Responsive Breakpoints

| Breakpoint | Layout | Notes |
|------------|--------|-------|
| >1024px | Full inline | All filters in single row |
| 768-1024px | Condensed | May wrap to second row |
| <768px | Stacked | Mobile-specific layout |

---

## Testing Checklist

- [ ] Search filters projects by title
- [ ] Search filters projects by description
- [ ] Category dropdown allows multiple selection
- [ ] Selected categories show as chips
- [ ] Tag chips toggle on click
- [ ] Multiple tags filter with AND logic
- [ ] Clear all button resets all filters
- [ ] Results count updates in real-time
- [ ] Horizontal scroll works on mobile
- [ ] Keyboard navigation works
- [ ] Screen reader announces filter changes

---

## Future Enhancements

1. **URL State Sync**: Persist filters in URL query params
2. **Filter Presets**: Save/load common filter combinations
3. **Sort Options**: Add sorting by date, alphabetical
4. **Year Filter**: Filter by project year
5. **Animation Polish**: Staggered entry animations for filtered results
