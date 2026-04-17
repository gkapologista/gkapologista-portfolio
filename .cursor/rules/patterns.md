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

## Primary content landmark

- **Pattern**: Use exactly one `<main id="main-content">` per route page for the primary task or reading flow. Keep decorative backgrounds, fixed controls (for example scroll-to-top), and `<footer>` **outside** `<main>` so document landmarks stay clear.
- **Reference File**: `src/pages/ProjectsPage.vue`

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

## Transitions & Animations

- **Reference Pattern**: Use a global `TransitionState` composable to orchestrate complex multi-step transitions (e.g., Glitch -> Route Change -> Data Load).
- **Golden Sample**: Glitch effect logic should be centralized in a reusable component or directive to prevent repetition in page files.

### Standard List Transitions

- **Pattern**: Use Vue `<TransitionGroup>` for simple list filtering (fade/slide) instead of imperative GSAP logic.
- **Why**: Keeps UI logic declarative and leverages Vue's internal diffing for smoother cross-fades.
- **Reference**: `src/pages/ProjectsPage.vue` (Post-Implementation)

### Coordinated Route Transitions

- **Pattern**: Orchestrate global route changes using a centralized `GlitchTransition` component in `App.vue` combined with `router.beforeEach`.
- **Extension (Route-Aware Data)**: Use the route's `meta` field to define descriptive transition text. For dynamic routes (e.g., project details), resolve data in the guard to provide context-sensitive feedback (e.g., "DECRYPTING: [PROJECT] ARCHIVES...").
- **Why**: Enhances the "Cyberpunk" immersion by making the system feel reactive to the user's target.
- **Reference**: `src/App.vue` & `src/router/index.ts`
