<template>
  <div class="projects-page">
    <a
      href="#main-content"
      class="skip-to-main"
      @click.prevent="focusMainContent"
    >
      Skip to main content
    </a>
    <div class="background-effects">
      <div class="grid-pattern"></div>
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <div class="glow-orb orb-3"></div>
    </div>

    <main id="main-content" tabindex="-1">
    <div class="content">
      <p
        id="projects-filter-results-live"
        class="projects-results-live"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {{ filteredResultsAnnouncement }}
      </p>
      <div class="header-section">
        <h1 class="text-h2 text-white q-mb-sm page-heading">
          <span class="page-heading__title">My Projects</span>
          <span class="project-count-badge" :aria-label="`${projects.length} projects total`">[ {{ projects.length }} ]</span>
        </h1>
        <q-btn
          flat
          icon="home"
          label="Home"
          @click="goHome"
          class="nav-btn q-mb-xl"
        />
      </div>

      <ProjectFilters
        v-model:search-query="searchQuery"
        v-model:selected-categories="selectedCategories"
        v-model:selected-tags="selectedTags"
        :available-tags="availableTags"
        :results-count="filteredProjects.length"
        @clear-all="clearFilters"
        @search-cleared="clearSearch"
      />

      <TransitionGroup
        name="project-fade"
        tag="div"
        ref="projectsGrid"
        class="projects-grid"
      >
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="project-card-container"
          :style="{ '--card-index': index }"
        >
          <ProjectCard :project="project" />
        </div>
      </TransitionGroup>

      <!-- Empty State -->
      <Transition name="empty-state-fade">
        <div
          v-if="filteredProjects.length === 0 && hasActiveFilters"
          class="empty-state"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          <div class="empty-state__symbol" aria-hidden="true">
            <span class="empty-state__bracket">[</span>
            <span class="empty-state__cursor">_</span>
            <span class="empty-state__bracket">]</span>
          </div>

          <p class="empty-state__code" aria-hidden="true">EXIT CODE: 0x00</p>

          <h2 class="empty-state__heading">0 PROJECTS MATCH</h2>

          <div class="empty-state__terminal" aria-label="Active filters summary">
            <span class="empty-state__prompt" aria-hidden="true">&gt;&nbsp;</span>
            <span v-if="searchQuery" class="empty-state__filter-item">
              search: <em class="empty-state__filter-value">"{{ searchQuery }}"</em>
            </span>
            <span
              v-if="searchQuery && (selectedCategories.length > 0 || selectedTags.length > 0)"
              class="empty-state__filter-sep"
              aria-hidden="true"
            >&nbsp;+&nbsp;</span>
            <span v-if="selectedCategories.length > 0" class="empty-state__filter-item">
              category: <em class="empty-state__filter-value">[{{ selectedCategories.join(', ') }}]</em>
            </span>
            <span
              v-if="selectedCategories.length > 0 && selectedTags.length > 0"
              class="empty-state__filter-sep"
              aria-hidden="true"
            >&nbsp;+&nbsp;</span>
            <span v-if="selectedTags.length > 0" class="empty-state__filter-item">
              tags: <em class="empty-state__filter-value">[{{ selectedTags.join(', ') }}]</em>
            </span>
          </div>

          <button
            class="empty-state__clear-btn"
            type="button"
            aria-label="Clear all active filters"
            @click="clearFilters"
          >
            CLEAR FILTERS
          </button>
        </div>
      </Transition>

      <!-- Contextual CTA -->
      <section class="contact-cta" aria-labelledby="cta-heading">
        <h2 id="cta-heading" class="cta-heading">Like what you see?</h2>
        <p class="cta-tagline">Let's discuss your next project.</p>
        <a
          href="mailto:gkapologista@gmail.com?subject=Project Inquiry"
          class="cta-btn"
          aria-label="Send email to discuss a project"
        >
          <q-icon name="email" size="sm" class="q-mr-sm" />
          Get in Touch
        </a>
      </section>
    </div>
    </main>

    <!-- Scroll to top -->
    <Transition name="scroll-top-fade">
      <button
        v-if="showScrollTop"
        class="scroll-top-btn"
        @click="scrollToTop"
        aria-label="Scroll to top"
      >
        ▲
      </button>
    </Transition>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="footer-content">
        <span class="footer-copyright">© {{ currentYear }} GK Apologista</span>
        <div class="footer-links">
          <a href="mailto:gkapologista@gmail.com" class="footer-link"
            >Contact</a
          >
          <span class="footer-divider">•</span>
          <a
            href="https://github.com/gkapologista"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            <q-icon name="fab fa-github" size="xs" class="q-mr-xs" aria-hidden="true" />
            GitHub
          </a>
          <span class="footer-divider">•</span>
          <a
            href="https://linkedin.com/in/gkapologista"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            <q-icon name="fab fa-linkedin" size="xs" class="q-mr-xs" aria-hidden="true" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue';
import { projects } from '../data/projects';
import { useRouter, useRoute } from 'vue-router';
import { useFilters, categories, type Category } from '../composables/useFilters';
import { ProjectFilters } from '../components/filters';
import ProjectCard from '../components/ProjectCard.vue';

const router = useRouter();
const route = useRoute();

const goHome = () => {
  router.push('/');
};

/** Hash-router safe: avoid replacing `#/route` with `#main-content`. */
const focusMainContent = () => {
  const el = document.getElementById('main-content');
  if (!el || !(el instanceof HTMLElement)) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.focus({ preventScroll: true });
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
};

const currentYear = computed(() => new Date().getFullYear());

const {
  searchQuery,
  selectedCategories,
  selectedTags,
  availableTags,
  filteredProjects,
  clearFilters,
  hasActiveFilters,
  clearSearch,
} = useFilters(ref(projects));

/** Page-level SR announcement for filter result count (single live region). */
const filteredResultsAnnouncement = computed(() => {
  const n = filteredProjects.value.length;
  return n === 1 ? 'Showing 1 project' : `Showing ${n} projects`;
});

// --- URL ↔ Filter sync ---

const syncFromQuery = (query: typeof route.query) => {
  const q = typeof query.q === 'string' ? query.q : '';
  const cats = typeof query.category === 'string'
    ? (query.category.split(',').filter(c => (categories as readonly string[]).includes(c)) as Category[])
    : [];
  const tgs = typeof query.tags === 'string'
    ? query.tags.split(',').filter(Boolean)
    : [];

  if (q !== searchQuery.value) searchQuery.value = q;
  if (JSON.stringify(cats) !== JSON.stringify(selectedCategories.value)) selectedCategories.value = cats;
  if (JSON.stringify(tgs) !== JSON.stringify(selectedTags.value)) selectedTags.value = tgs;
};

// Initialize from URL on load (supports bookmarked/shared URLs)
syncFromQuery(route.query);

// Sync filter state → URL (uses replace to avoid polluting history)
watch(
  [searchQuery, selectedCategories, selectedTags],
  () => {
    const query: Record<string, string> = {};
    if (searchQuery.value) query.q = searchQuery.value;
    if (selectedCategories.value.length) query.category = selectedCategories.value.join(',');
    if (selectedTags.value.length) query.tags = selectedTags.value.join(',');
    router.replace({ query });
  },
  { deep: true },
);

// Sync URL → filter state (handles browser back/forward)
watch(() => route.query, syncFromQuery, { deep: true });

// --- Scroll to top ---

const showScrollTop = ref(false);

const onScroll = () => {
  showScrollTop.value = window.scrollY > 300;
};

const scrollToTop = () => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
};

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', onScroll));

// --- Layout shift prevention ---

/** Single source of truth for the card enter/leave transition duration. */
const CARD_TRANSITION_MS = 400;
/** CSS string consumed by v-bind() in <style scoped>. */
const cardTransitionDuration = `${CARD_TRANSITION_MS}ms`;

const projectsGrid = ref<HTMLElement | null>(null);

watch(filteredProjects, async () => {
  if (!projectsGrid.value) return;

  // Capture and trap height to prevent layout shifts
  const currentHeight = projectsGrid.value.clientHeight;
  projectsGrid.value.style.minHeight = `${currentHeight}px`;

  // Release height after the transition settles
  await nextTick();
  setTimeout(() => {
    if (projectsGrid.value) {
      projectsGrid.value.style.minHeight = '';
    }
  }, CARD_TRANSITION_MS);
});
</script>

<style scoped>
.skip-to-main {
  position: absolute;
  left: 1rem;
  top: 0;
  z-index: 50;
  transform: translateY(calc(-100% - 1.5rem));
  padding: 0.625rem 1.25rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  color: var(--bg-charcoal);
  background: var(--accent-teal);
  border: 1px solid var(--accent-teal);
  border-radius: 2px;
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.35);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.skip-to-main:focus {
  outline: none;
}

.skip-to-main:focus-visible {
  transform: translateY(0.75rem);
  box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.45);
  outline: 2px solid rgba(255, 255, 255, 0.9);
  outline-offset: 3px;
}

.skip-to-main:focus-visible:hover {
  color: var(--bg-charcoal);
  background: #00c4cd;
}

.projects-page {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: clip;
  background-color: var(--bg-charcoal);
  padding: 2rem;
}

.content {
  position: relative;
  z-index: 3;
  max-width: var(--content-max-width, 1280px);
  margin: 0 auto;
}

/* Visually hidden; kept in a11y tree for aria-live (page-level result count). */
.projects-results-live {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip-path: inset(50%);
  white-space: nowrap;
  border: 0;
}

.page-heading {
  display: flex;
  align-items: baseline;
  gap: 0.625rem;
}

.page-heading__title {
  flex: 1 1 auto;
  min-width: 0;
}

.page-heading__title,
.empty-state__heading,
.cta-heading {
  text-wrap: balance;
}

@supports (text-wrap: pretty) {
  .page-heading__title,
  .empty-state__heading,
  .cta-heading {
    text-wrap: pretty;
  }
}

.project-count-badge {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9375rem;
  font-weight: 400;
  letter-spacing: 0.06em;
  /* Full-strength teal on charcoal meets WCAG AA (opacity was ~3.67:1). */
  color: var(--accent-teal);
  white-space: nowrap;
}

.header-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 2rem;
}

.nav-btn {
  color: var(--text-secondary, rgba(255, 255, 255, 0.8)) !important;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 0.5rem;
  padding: var(--space-sm, 0.5rem) var(--space-md, 1rem);
}

.nav-btn:hover {
  color: white !important;
  background: rgba(255, 255, 255, 0.1) !important;
  transform: translateY(-1px);
}

.background-effects {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  transform: translateZ(0); /* promote to compositor layer — prevents iOS Safari scroll jank */
}

.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.3;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.3;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.4),
    transparent 70%
  );
  top: 20%;
  left: 20%;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.3),
    transparent 70%
  );
  top: 50%;
  right: 20%;
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.2),
    transparent 70%
  );
  bottom: 20%;
  left: 40%;
}

.text-h2 {
  font-family: 'JetBrains Mono', monospace;
  font-size: 3.5rem;
  line-height: var(--lh-snug, 1.3);
  font-weight: 700;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  color: var(--accent-teal);
  text-transform: uppercase;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  align-items: stretch;
  justify-content: center;
  position: relative;
  transition: opacity 0.3s ease;
}

/* Mid-range breakpoint: force 2 columns between mobile and the point where
   auto-fill naturally produces 2 columns (~816px viewport). Without this,
   minmax(360px, 1fr) falls back to 1 very wide column at 769–815px. */
@media (min-width: 769px) and (max-width: 899px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Fade Animation Classes */
.project-fade-enter-active {
  transition: opacity v-bind(cardTransitionDuration) ease, transform v-bind(cardTransitionDuration) ease;
  transition-delay: min(calc(var(--card-index, 0) * 50ms), v-bind(cardTransitionDuration));
}

.project-fade-leave-active {
  transition: opacity 0.3s ease;
}

.project-fade-enter-from {
  opacity: 0;
  transform: translateY(14px);
}

.project-fade-leave-to {
  opacity: 0;
}

/* Empty State Transition */
.empty-state-fade-enter-active {
  transition: opacity v-bind(cardTransitionDuration) ease, transform v-bind(cardTransitionDuration) ease;
}

.empty-state-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.empty-state-fade-enter-from,
.empty-state-fade-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

/* Container — matches .contact-cta card style */
.empty-state {
  margin-top: 2rem;
  padding: 3rem 2rem;
  text-align: center;
  background: var(--bg-grey);
  border-radius: 4px;
  border: 1px solid var(--accent-teal);
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

/* [_] symbol */
.empty-state__symbol {
  font-family: 'JetBrains Mono', monospace;
  font-size: 3rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.25em;
  user-select: none;
}

.empty-state__bracket {
  /* Brackets sit on grey panel; ≥4.5:1 at large sizes for consistency */
  color: rgba(238, 238, 238, 0.62);
}

.empty-state__cursor {
  color: var(--accent-teal);
  animation: cursor-blink 1.1s step-end infinite;
  display: inline-block;
  width: 0.6em;
}

@keyframes cursor-blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

/* Sub-label */
.empty-state__code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: rgba(238, 238, 238, 0.74);
  text-transform: uppercase;
  margin: 0;
}

/* Heading */
.empty-state__heading {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--accent-teal);
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin: 0;
}

/* Terminal filter summary */
.empty-state__terminal {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9rem;
  color: var(--text-white);
  background: var(--bg-charcoal);
  border: 1px solid rgba(0, 173, 181, 0.55);
  border-radius: 2px;
  padding: 0.625rem 1rem;
  max-width: 100%;
  word-break: break-word;
  text-align: left;
  line-height: 1.6;
}

.empty-state__prompt {
  color: var(--accent-teal);
  font-weight: 700;
}

.empty-state__filter-item {
  color: rgba(238, 238, 238, 0.75);
  font-style: normal;
}

.empty-state__filter-value {
  color: var(--accent-teal);
  font-style: normal;
}

.empty-state__filter-sep {
  color: rgba(238, 238, 238, 0.62);
}

/* Clear button */
.empty-state__clear-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.75rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9375rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--bg-charcoal);
  background: var(--accent-teal);
  border: none;
  border-radius: 2px;
  box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
  appearance: none;
  -webkit-appearance: none;
  outline: none;
}

.empty-state__clear-btn:hover {
  transform: translateY(-2px);
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.5);
  background: #00c4cd;
}

.empty-state__clear-btn:active {
  transform: translateY(1px);
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.4);
}

.empty-state__clear-btn:focus-visible {
  outline: 2px solid var(--accent-teal);
  outline-offset: 4px;
  box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.4);
}

/* Scroll to top button — min 44×44px touch target; safe area clears iOS home indicator */
.scroll-top-btn {
  position: fixed;
  bottom: calc(2rem + env(safe-area-inset-bottom, 0px));
  right: calc(2rem + env(safe-area-inset-right, 0px));
  z-index: 10;
  box-sizing: border-box;
  min-width: 44px;
  min-height: 44px;
  width: 2.75rem;
  height: 2.75rem;
  background: var(--bg-charcoal);
  border: 1px solid var(--accent-teal);
  color: var(--accent-teal);
  border-radius: 2px;
  cursor: pointer;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.scroll-top-btn:hover {
  background: var(--accent-teal);
  color: var(--bg-charcoal);
  transform: translateY(-2px);
  box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.3);
}

.scroll-top-btn:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 3px;
}

.scroll-top-fade-enter-active,
.scroll-top-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.scroll-top-fade-enter-from,
.scroll-top-fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .skip-to-main {
    transition: none;
  }

  /* Project grid — instant filter transitions */
  .projects-grid {
    transition: none;
  }

  .project-fade-enter-active,
  .project-fade-leave-active {
    transition: none;
    transition-delay: 0ms;
  }

  .project-fade-enter-from {
    transform: none;
  }

  /* Nav button hover lift */
  .nav-btn:hover {
    transform: none;
  }

  /* CTA button hover lift */
  .cta-btn:hover {
    transform: none;
  }

  /* Empty state — cursor blink, slide transitions, button lifts */
  .empty-state__cursor {
    animation: none;
    opacity: 1;
  }

  .empty-state-fade-enter-active,
  .empty-state-fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .empty-state-fade-enter-from,
  .empty-state-fade-leave-to {
    opacity: 0;
    transform: none;
  }

  .empty-state__clear-btn:hover,
  .empty-state__clear-btn:active {
    transform: none;
  }

  .scroll-top-btn {
    transition: background 0.2s ease, color 0.2s ease;
  }

  .scroll-top-btn:hover {
    transform: none;
  }

  .scroll-top-fade-enter-active,
  .scroll-top-fade-leave-active {
    transition: opacity 0.2s ease;
  }

  .scroll-top-fade-enter-from,
  .scroll-top-fade-leave-to {
    transform: none;
  }
}

/* Empty State Mobile */
@media (max-width: 768px) {
  .empty-state {
    margin-top: 1.5rem;
    padding: 2rem 1.25rem;
    gap: 1rem;
  }

  .empty-state__symbol {
    font-size: 2.25rem;
  }

  .empty-state__heading {
    font-size: 1.375rem;
  }

  .empty-state__terminal {
    font-size: 0.8125rem;
    padding: 0.5rem 0.75rem;
  }

  .empty-state__clear-btn {
    width: 100%;
    font-size: 0.875rem;
  }
}

@media (max-width: 1024px) {
  .text-h2 {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .projects-page {
    padding: var(--space-md, 1rem);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: calc(100dvh - 2rem);
    width: 100%;
    gap: 1rem;
  }

  .header-section {
    margin-bottom: 0.5rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .nav-btn {
    margin-bottom: 0 !important;
    padding: 0.25rem 0.5rem;
  }

  .text-h2 {
    font-size: 2rem;
    margin-bottom: 0 !important;
  }

  .projects-grid {
    grid-template-columns: 1fr;
    max-width: 360px;
    margin-left: auto;
    margin-right: auto;
    gap: 1.5rem;
    margin-top: 1rem;
  }

  .project-card-container {
    width: 100%;
  }

  .contact-cta {
    margin-top: 2rem;
    padding: 1.5rem 1rem;
  }

  .site-footer {
    margin-top: 2rem;
    padding: 1rem;
  }
}

/* Contextual CTA */
.contact-cta {
  margin-top: 4rem;
  padding: 3rem 2rem;
  text-align: center;
  background: var(--bg-grey);
  border-radius: 4px;
  border: 1px solid var(--accent-teal);
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.3);
}

.cta-heading {
  font-family: 'JetBrains Mono', monospace;
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-teal);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
}

.cta-tagline {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  color: var(--text-white);
  margin-bottom: 1.5rem;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1.75rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  font-weight: 600;
  color: var(--bg-charcoal);
  background: var(--accent-teal);
  border-radius: 2px;
  text-decoration: none;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.cta-btn:hover {
  transform: translateY(-2px);
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.5);
}

.cta-btn:focus-visible {
  outline: 2px solid var(--accent-teal);
  outline-offset: 4px;
}

/* Footer */
.site-footer {
  position: relative;
  z-index: 3;
  padding: 2rem;
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-copyright {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  color: rgba(238, 238, 238, 0.58);
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  color: var(--accent-teal);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #fff;
}

.footer-link:focus-visible {
  outline: 2px solid var(--accent-teal);
  outline-offset: 2px;
}

.footer-divider {
  color: rgba(255, 255, 255, 0.5);
}

/* WCAG AA: child / Quasar surfaces under this page only (tokens unchanged) */
.projects-page :deep(.search-input .q-field__native::placeholder) {
  color: rgba(255, 255, 255, 0.62);
}

.projects-page :deep(.category-badge--game) {
  color: #eeb4d8;
  background: rgba(166, 77, 121, 0.22);
  border-color: rgba(238, 180, 216, 0.75);
}

.projects-page :deep(.tech-chip--overflow) {
  opacity: 1;
}

.projects-page :deep(.tag-chip--more) {
  opacity: 1;
}

@media (max-width: 768px) {
  .contact-cta {
    margin-top: 2rem;
    padding: 2rem 1.5rem;
  }

  .cta-heading {
    font-size: 1.5rem;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>
