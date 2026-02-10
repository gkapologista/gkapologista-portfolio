# Coding Patterns & Standards

## Coding Style

- **Components**: PascalCase filenames (e.g., `ProjectCard.vue`). Use `<script setup lang="ts">`.
- **Naming**: `camelCase` for functions/variables, `kebab-case` for CSS classes.
- **Logic**: Prefer Early Returns, use Arrow Functions for callbacks.
- **Styling**: Use `<style scoped>`, leverage CSS variables (e.g., `var(--q-primary)`).

## Architectural Patterns

- **Shared Logic**: Extract repeatable logic into `src/composables`.
- **Data Management**: Static content belongs in `src/data/`.
- **Global Config**: Startup logic (API config, global components) belongs in `src/boot/`.

## Animation & Interaction (GSAP)

- **Library**: GSAP for staggered reveals and scroll-triggered animations.
- **Performance**: Target `transform` and `opacity` only. Avoid layout-shifting properties.
- **Lazy Loading**: Use GSAP `ScrollTrigger` or Quasar `v-intersection`.
- **Staggering**: Use GSAP `stagger` for grid items.

## Element-Level Skeleton Pattern

- **Principle**: Apply loading states to specific slow elements (like images or async data blocks) rather than the whole page.
- **Implementation**:
  - Use `v-if="!isLoaded"` to show a `q-skeleton` placeholder.
  - Track load events (e.g., `@load` on images) to toggle visibility.
- **Styling**: Maintain layout dimensions to prevent CLS. Use brand-colored pulses.
- **Transition**: Use smooth opacity fades (`0` to `1`) when transitioning from skeleton to real content.

## Dark Mode Styling

- **Plugin**: Use Quasar's `Dark` plugin to detect/toggle state.
- **CSS Selectors**: Use `.body--dark` and `.body--light` classes for theme-specific overrides in scoped styles.
- **Variables**: Prefer Quasar brand CSS variables (e.g., `var(--q-primary)`) which handle theme switching automatically if configured in `quasar.config.js`.
