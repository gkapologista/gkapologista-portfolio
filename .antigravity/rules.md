# Project Constitution: Portfolio (Quasar/Vue 3)

## 1. Project Context

This is a personal portfolio website built using the **Vue 3** framework and **Quasar 2** UI library. The project uses **Vite** as a build tool and is strictly typed with **TypeScript**.

## 2. Tech Stack Constraints

- **Framework**: Use Vue 3 (Composition API with `<script setup>`).
- **UI Library**: Use Quasar 2 components (`q-*`). Leverage Quasar's utility classes (e.g., `q-pa-md`, `text-h1`) instead of custom CSS where possible.
- **Language**: Always use TypeScript. Prefer `interface` over `type` for object definitions unless specific type utility features are needed.
- **HTTP Client**: Use the centralized Axios instance provided via Quasar's boot system (`src/boot/axios.ts`).
- **Build Tool**: Vite (via Quasar CLI). Do not add custom Vite configs unless absolutely necessary.

## 3. Coding Style

- **Components**:
  - Use **PascalCase** for component filenames and references (e.g., `ProjectCard.vue`).
  - Use `<script setup lang="ts">` in all `.vue` files.
- **Naming**:
  - Functions and variables: `camelCase`.
  - CSS classes: `kebab-case`.
- **Logic**:
  - Prefer **Early Returns** to reduce nesting.
  - Use **Arrow Functions** for anonymous callbacks.
- **Styling**:
  - Use `<style scoped>` in components.
  - Use CSS variables for colors (e.g., `var(--q-primary)`).

## 4. Architectural Patterns

- **Shared Logic**: Extract repeatable logic into the `src/composables` directory.
- **Data Management**: Keep static content and configurations in `src/data/` (e.g., `projects.ts`).
- **Global Config**: Place all global startup logic (API config, global components) in `src/boot/`.
- **Navigation**: Define all routes in `src/router/routes.ts`.

## 5. Testing Mandates

- **Unit Tests**: Although no testing framework is currently active, all new business logic in `src/composables` should be written as pure functions to facilitate future testing with **Vitest**.
- **Component Tests**: Prioritize testing user interactions for complex forms or interactive lists.

---

## 6. Animation & Interaction Patterns

- **Library**: Use **GSAP** (GreenSock Animation Platform) for complex staggered reveals and scroll-triggered animations.
- **Performance**:
  - Animations must strictly target `transform` (GPU-accelerated) and `opacity` to maintain 60fps on mobile and desktop.
  - Avoid animating properties that trigger layout shifts (top, left, width, margin, etc.).
- **Lazy Loading**: Implement scroll-triggered animations using GSAP `ScrollTrigger` or Quasar's `v-intersection` to ensure elements only animate when entering the viewport.
- **Staggering**: Use GSAP's `stagger` utility for grid-based items to create a playful, sequential "pop-in" effect.
