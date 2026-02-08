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
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card-container"
        >
          <router-link
            :to="{ name: 'ProjectDetail', params: { slug: project.slug } }"
            class="project-card-link"
          >
            <div class="project-card">
              <div class="project-image">
                <img
                  :src="project.images[0]"
                  :alt="project.title"
                  loading="lazy"
                />
                <div class="project-title-overlay">
                  <h3 class="project-title">{{ project.title }}</h3>
                </div>
              </div>
              <div class="project-info">
                <p class="project-description">{{ project.description }}</p>
                <div class="project-tags">
                  <q-chip
                    v-for="tag in project.tags.slice(0, 3)"
                    :key="tag"
                    color="white"
                    text-color="secondary"
                    size="sm"
                    class="tech-chip"
                  >
                    {{ tag }}
                  </q-chip>
                </div>
              </div>
            </div>
          </router-link>
        </div>
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
  background-color: var(--q-secondary);
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
  font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;
  font-size: 3.5rem;
  line-height: var(--lh-snug, 1.3);
  font-weight: 700;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  background: linear-gradient(to right, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
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


.project-card {
  background: var(--card-bg, rgba(255, 255, 255, 0.08));
  border-radius: var(--card-radius, 1rem);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid var(--card-border, rgba(255, 255, 255, 0.15));
  display: flex;
  flex-direction: column;
  height: 450px;
  min-height: 450px;
  max-height: 450px;
  width: 100%;
  box-sizing: border-box;
}

.project-card-container {
  width: 360px;
  will-change: transform, opacity;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.project-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.05);
}

.project-title-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
}

.project-title {
  font-family: 'Space Grotesk', system-ui, -apple-system, sans-serif;
  font-size: 1.875rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
  line-height: var(--lh-tight, 1.1);
}

.project-info {
  padding: 1.5rem;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.project-description {
  color: var(--text-secondary, rgba(255, 255, 255, 0.8));
  font-size: 1rem;
  line-height: var(--lh-relaxed, 1.6);
  letter-spacing: 0.01em;
  margin-bottom: var(--space-md, 1rem);
  display: -webkit-box;
  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
  justify-content: flex-start;
  align-items: flex-end;
  min-height: 2rem;
}

.tech-chip {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 0.4rem 0.8rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.9) !important;
  height: 1.8rem;
  line-height: 1.2;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.tech-chip:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: white !important;
}

.project-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  border-radius: 1rem;
  transition: outline 0.2s ease;
}

.project-card-link:focus-visible {
  outline: 3px solid rgba(255, 255, 255, 0.8);
  outline-offset: 4px;
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

  .project-card {
    width: 100%;
    height: 380px;
    min-height: 380px;
    max-height: 380px;
  }

  .project-image {
    height: 140px;
  }
}

/* Contextual CTA */
.contact-cta {
  margin-top: 4rem;
  padding: 3rem 2rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.cta-heading {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
  background: linear-gradient(to right, #ffffff, #e0e0e0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.cta-tagline {
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1.75rem;
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: var(--q-secondary);
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(106, 30, 85, 0.4);
}

.cta-btn:focus-visible {
  outline: 3px solid rgba(255, 255, 255, 0.8);
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
  font-family: 'Outfit', sans-serif;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  font-family: 'Outfit', sans-serif;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #fff;
}

.footer-link:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.8);
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
