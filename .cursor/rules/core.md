# Core Tech Stack & Constraints

This project is a personal portfolio website.

## Tech Stack
- **Framework**: Vue 3 (Composition API with `<script setup>`)
- **UI Library**: Quasar 2 (`q-*` components). Use Quasar utility classes (e.g., `q-pa-md`, `text-h1`) primarily.
- **Language**: TypeScript (Strictly typed). Prefer `interface` over `type`.
- **HTTP Client**: Axios (via `src/boot/axios.ts`).
- **Build Tool**: Vite (via Quasar CLI).

## Testing
- **Unit Tests**: Business logic in `src/composables` should be pure functions for **Vitest**.
- **Component Tests**: Prioritize testing user interactions for complex forms or interactive lists.
