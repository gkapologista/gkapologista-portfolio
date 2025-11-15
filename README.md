# GK Apologista Portfolio

A modern, responsive portfolio website built with Vue.js 3 and Quasar Framework. This application showcases professional projects, skills, and work experience with a sleek glassmorphism design aesthetic.

## Features

- **Project Showcase**: Browse projects with filtering by category (Web Application, Game, System)
- **Project Details**: Detailed view of each project with images, technologies, features, and challenges
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI**: Glassmorphism effects, smooth animations, and dark theme
- **Type-Safe**: Built with TypeScript for better code quality and developer experience

## Tech Stack

- **Framework**: Vue.js 3.4.18 (Composition API)
- **UI Framework**: Quasar 2.8.0
- **Language**: TypeScript 4.5.4
- **Build Tool**: Vite (via @quasar/app-vite)
- **Routing**: Vue Router 4.0.12
- **HTTP Client**: Axios 1.2.1
- **Code Quality**: ESLint + Prettier

## Installation

### Prerequisites

- **Node.js**: Version 20, 18, or 16
- **Package Manager**: npm (>= 6.13.4) or yarn (>= 1.21.1)

### Setup

1. Clone the repository:
```bash
git clone https://github.com/gkapologista/gkapologista-portfolio.git
cd gkapologista-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will open automatically in your browser at `http://localhost:9000` (or the next available port).

## Usage

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

### Production Build

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist/spa/` directory.

### Routes

The application uses hash-based routing with the following routes:

- **`/`** - Home page with landing content
- **`/projects`** - Projects listing page with category filters
- **`/project/:slug`** - Individual project detail page
  - Example: `/project/communication-app`
- **`/:catchAll(.*)*`** - 404 error page for unmatched routes

### Example Navigation

```typescript
// Programmatic navigation
import { useRouter } from 'vue-router';

const router = useRouter();
router.push('/projects');
router.push({ name: 'ProjectDetail', params: { slug: 'communication-app' } });
```

## Environment Variables

This project currently does not require any environment variables. All configuration is handled through `quasar.config.js`.

If you need to add environment variables in the future:

1. Create a `.env` file in the project root
2. Add your variables (e.g., `VITE_API_URL=https://api.example.com`)
3. Access them in code using `import.meta.env.VITE_API_URL`

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production (outputs to `dist/spa/`) |
| `npm run lint` | Run ESLint to check code quality |
| `npm run format` | Format code using Prettier |
| `npm test` | Run tests (currently placeholder) |

## Project Structure

```
src/
├── assets/          # Static assets (images, fonts)
│   └── images/      # Project images and screenshots
├── boot/            # Boot files (runs before app initialization)
│   └── axios.ts     # Axios HTTP client configuration
├── components/      # Reusable Vue components
├── composables/     # Vue 3 composables (reusable logic)
│   └── useFilters.ts # Filter logic for projects page
├── css/             # Global styles
│   └── app.css      # Main stylesheet with fonts and global styles
├── data/            # Static data and type definitions
│   └── projects.ts  # Project data and TypeScript interfaces
├── layouts/         # Layout components
│   └── MainLayout.vue # Main application layout
├── pages/           # Page components (routes)
│   ├── HomePage.vue
│   ├── ProjectsPage.vue
│   ├── ProjectDetailPage.vue
│   └── ErrorNotFound.vue
└── router/          # Vue Router configuration
    ├── index.ts     # Router setup
    └── routes.ts    # Route definitions
```

## Testing

Currently, no testing framework is configured. The `test` script is a placeholder.

To add testing in the future, consider:

- **Unit Tests**: [Vitest](https://vitest.dev/) or [Jest](https://jestjs.io/)
- **Component Tests**: [Vue Test Utils](https://test-utils.vuejs.org/)
- **E2E Tests**: [Cypress](https://www.cypress.io/) or [Playwright](https://playwright.dev/)

Example test setup:

```bash
npm install -D vitest @vue/test-utils
```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. **Code Style**: Follow ESLint and Prettier configurations
   - Run `npm run lint` before committing
   - Run `npm run format` to auto-format code

2. **Git Workflow**:
   - Create a feature branch from `main`
   - Make your changes
   - Ensure code passes linting
   - Submit a pull request

3. **Commit Messages**: Use clear, descriptive commit messages

4. **TypeScript**: Maintain type safety - avoid `any` types when possible

5. **Component Structure**: Follow Vue 3 Composition API patterns with `<script setup>`

## License

This project is currently **unlicensed**. It is intended for demonstration and development purposes only.

---

**Author**: Geoff Kevin G. Apologista  
**Email**: gkapologista0800@gmail.com

