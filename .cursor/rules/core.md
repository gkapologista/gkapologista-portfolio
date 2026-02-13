# Core Repository Laws

## Tech Stack & Versions

- **Framework**: Vue.js `^3.4.18` (Composition API required)
- **UI Framework**: Quasar `^2.8.0`
- **Language**: TypeScript `^4.5.4`
- **Build Tool**: Vite (via `@quasar/app-vite`)
- **State Management**: Pinia (implied/preferred) or Composition API Reactivity
- **Routing**: Vue Router `^4.0.12`

## Code Style & Immutable Laws

1.  **Composition API Only**: ALWAYS use `<script setup lang="ts">`. NEVER use the Options API.
2.  **TypeScript Strictness**: explicit types are required. Avoid `any` whenever possible.
3.  **Quasar Components**: Use Quasar components (e.g., `q-btn`, `q-input`) instead of native HTML elements where possible.
4.  **Styling**: Use `scoped` SCSS/CSS or Quasar utility classes (`q-pa-md`, `text-primary`). Avoid inline styles.
5.  **Reactivity**: Use `ref` for primitives and `reactive` for objects/arrays. Always use `.value` when accessing refs in scripts.

## Negative Constraints (NEVER DO THIS)

1.  **No `console.log` in Production**: Use a proper logging utility or remove logs before committing.
2.  **No Placeholder Comments**: Do not leave `// TODO: implement this` without a tracking ID or immediate implementation.
3.  **No jQuery or Direct DOM Manipulation**: Use Vue's template refs and reactive state.
4.  **No Sync XHR**: properly use `async/await` with `axios` or `fetch`.
5.  **No Component Logic in Templates**: Move complex logic to `computed` properties or functions.
