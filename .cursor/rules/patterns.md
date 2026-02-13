# Pattern References & Golden Samples

Use these files as the source of truth for code style and structure.

## UI Components & Pages

- **Reference File**: `src/pages/ProjectDetailPage.vue`
- **Patterns**:
  - `<script setup lang="ts">` usage.
  - `ref`, `computed`, `onMounted` lifecycle hooks.
  - Quasar component usage (`q-btn`, `q-dialog`, `q-icon`).
  - Scoped CSS with CSS variables.
  - `useMeta` for SEO tags.
  - Handling route params with `useRoute` and `computed`.

## Routing

- **Reference File**: `src/router/routes.ts`
- **Patterns**:
  - Lazy loading components: `component: () => import('layouts/MainLayout.vue')`.
  - Type definitions: `RouteRecordRaw`.
  - Nested routes and catch-all 404 handling.

## Layouts

- **Reference File**: `src/layouts/MainLayout.vue`
- **Patterns**:
  - `q-layout` structure (`view="lhr lpr lfr"`).
  - `q-page-container` wrapping `router-view`.

## Component Logic

- **Key Principle**: Encapsulate logic in composables (`src/composables/`) if reused across multiple components.
- **Example**: `useFilters.ts` (if available) for filtering logic.
