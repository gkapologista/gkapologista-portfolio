<template>
  <div class="projects-page">
    <div class="background-effects">
      <div class="grid-pattern"></div>
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <div class="glow-orb orb-3"></div>
    </div>

    <div class="content">
      <div class="header-section">
        <h1 class="text-h2 text-white q-mb-sm">My Projects</h1>
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
      />

      <transition-group name="projects" tag="div" class="projects-grid">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
        />
      </transition-group>

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
            <q-icon name="fab fa-github" size="xs" class="q-mr-xs" />
            GitHub
          </a>
          <span class="footer-divider">•</span>
          <a
            href="https://linkedin.com/in/gkapologista"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            <q-icon name="fab fa-linkedin" size="xs" class="q-mr-xs" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue';
import { projects } from '../data/projects';
import { useRouter } from 'vue-router';
import { useFilters } from '../composables/useFilters';
import { ProjectFilters } from '../components/filters';
import ProjectCard from '../components/ProjectCard.vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();

const goHome = () => {
  router.push('/');
};

const currentYear = computed(() => new Date().getFullYear());

const {
  searchQuery,
  selectedCategories,
  selectedTags,
  availableTags,
  filteredProjects,
  clearFilters,
} = useFilters(ref(projects));

const initAnimations = () => {
  // Kill existing triggers to avoid memory leaks/double animations
  ScrollTrigger.getAll().forEach((t) => t.kill());

  nextTick(() => {
    const cards = document.querySelectorAll('.project-card-container');
    if (cards.length === 0) return;

    // Reset initial state
    gsap.set(cards, { opacity: 0, y: 30, scale: 0.9 });

    ScrollTrigger.batch(cards, {
      onEnter: (batch) => {
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          overwrite: true,
        });
      },
      start: 'top 85%',
      once: true,
    });
  });
};

onMounted(() => {
  initAnimations();
});

// Re-run animations when filters change
watch(
  filteredProjects,
  () => {
    initAnimations();
  },
  { deep: true }
);
</script>

<style scoped>
.projects-page {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: var(--bg-charcoal);
  padding: 2rem;
}

.content {
  position: relative;
  z-index: 3;
  max-width: var(--content-max-width, 1280px);
  margin: 0 auto;
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
  grid-template-columns: repeat(auto-fill, 360px);
  gap: 2rem;
  margin-top: 2rem;
  align-items: stretch;
  justify-content: center;
}

/* Transition-group animations */
.projects-enter-active,
.projects-leave-active {
  transition: all 250ms ease;
}

.projects-enter-from,
.projects-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}

.projects-move {
  transition: transform 250ms ease;
}

@media (max-width: 1024px) {
  .text-h2 {
    font-size: 3rem;
  }
}

@media (max-width: 768px) {
  .projects-page {
    padding: var(--space-md, 1rem);
  }

  .text-h2 {
    font-size: 2.5rem;
  }

  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    justify-content: stretch;
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
  font-family: 'JetBrains Mono', sans-serif;
  font-size: 0.875rem;
  color: rgba(238, 238, 238, 0.5);
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  font-family: 'JetBrains Mono', sans-serif;
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
  color: rgba(255, 255, 255, 0.3);
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
