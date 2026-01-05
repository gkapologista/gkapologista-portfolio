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
        <q-btn flat icon="home" label="Home" @click="goHome" class="home-btn q-mb-xl" />
      </div>

      <div
        class="filters"
        :class="{ 'filters--active': selectedCategories.length > 0 }"
        role="group"
        aria-label="Project category filters"
        aria-live="polite"
      >
        <div class="filters-row">
          <div class="category-chips-container" role="group" aria-label="Category filters">
            <q-chip v-for="category in categories" :key="category" :class="{
              'category-chip': true,
              'category-chip--active': selectedCategories.includes(category),
            }" :color="selectedCategories.includes(category) ? 'white' : undefined"
              :text-color="selectedCategories.includes(category) ? 'secondary' : undefined"
              :removable="selectedCategories.includes(category)" size="sm" clickable @click="toggleCategory(category)"
              @remove="removeFilter(category)" :aria-pressed="selectedCategories.includes(category)"
              :aria-label="`Filter by ${category}`">
              {{ category }}
            </q-chip>
          </div>
          <transition name="fade">
            <span v-if="selectedCategories.length > 0" class="results-count-inline" aria-live="polite">
              <strong>{{ filteredProjects.length }}</strong>
              {{ filteredProjects.length === 1 ? 'project' : 'projects' }}
            </span>
          </transition>
          <transition name="fade">
            <q-btn v-if="selectedCategories.length > 0" flat dense round icon="clear_all" @click="clearFilters"
              class="clear-btn-inline" aria-label="Clear all filters" />
          </transition>
        </div>
      </div>

      <transition-group name="projects" tag="div" class="projects-grid">
        <router-link v-for="project in filteredProjects" :key="project.id"
          :to="{ name: 'ProjectDetail', params: { slug: project.slug } }" class="project-card-link">
          <div class="project-card">
            <div class="project-image">
              <img :src="project.images[0]" :alt="project.title" loading="lazy" />
              <div class="project-title-overlay">
                <h3 class="project-title">{{ project.title }}</h3>
              </div>
            </div>
            <div class="project-info">
              <p class="project-description">{{ project.description }}</p>
              <div class="project-tags">
                <q-chip v-for="tag in project.tags.slice(0, 3)" :key="tag" color="white" text-color="secondary"
                  size="sm" class="tech-chip">
                  {{ tag }}
                </q-chip>
              </div>
            </div>
          </div>
        </router-link>
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
          <a href="mailto:gkapologista@gmail.com" class="footer-link">Contact</a>
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
import { ref, computed } from 'vue';
import { projects } from '../data/projects';
import { useRouter } from 'vue-router';
import { useFilters, categories } from '../composables/useFilters';

const router = useRouter();

const goHome = () => {
  router.push('/');
};

const currentYear = computed(() => new Date().getFullYear());

const { selectedCategories, filteredProjects, toggleCategory, removeFilter, clearFilters } =
  useFilters(ref(projects));
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
  max-width: 1200px;
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

.home-btn {
  color: rgba(255, 255, 255, 0.8) !important;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
}

.home-btn:hover {
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
  background-image: linear-gradient(rgba(255, 255, 255, 0.1) 1px,
      transparent 1px),
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
  background: radial-gradient(circle,
      rgba(255, 255, 255, 0.4),
      transparent 70%);
  top: 20%;
  left: 20%;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle,
      rgba(255, 255, 255, 0.3),
      transparent 70%);
  top: 50%;
  right: 20%;
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle,
      rgba(255, 255, 255, 0.2),
      transparent 70%);
  bottom: 20%;
  left: 40%;
}

.text-h2 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 3.5rem;
  line-height: 1.3;
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

/* Filter Container - Compact Single Row */
.filters {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 0.75rem;
  padding: 0.625rem 0.875rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filters--active {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  animation: filterActivate 0.3s ease;
}

@keyframes filterActivate {
  from {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  to {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
}

.filters-row {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  width: 100%;
  flex-wrap: wrap;
}

.category-chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.category-chip {
  font-family: 'Outfit', sans-serif;
  font-weight: 500;
  font-size: 0.8125rem;
  padding: 0.4375rem 0.75rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.85) !important;
  transition: all 0.3s ease;
  cursor: pointer;
  min-height: 30px;
  backdrop-filter: blur(5px);
  white-space: nowrap;
}

.category-chip:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  border-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.category-chip--active {
  background: rgba(255, 255, 255, 0.95) !important;
  border-color: rgba(255, 255, 255, 0.4);
  color: var(--q-secondary) !important;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(166, 77, 121, 0.3);
  animation: chipActivate 0.25s ease;
}

@keyframes chipActivate {
  from {
    transform: scale(0.95);
    opacity: 0.8;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.category-chip--active:hover {
  background: white !important;
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 4px 12px rgba(166, 77, 121, 0.4);
}

.category-chip:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

.results-count-inline {
  font-family: 'Outfit', sans-serif;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
  flex-shrink: 0;
  margin-left: auto;
  padding: 0.25rem 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.375rem;
  transition: all 0.3s ease;
}

.results-count-inline strong {
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
  margin-right: 0.25rem;
}

.clear-btn-inline {
  color: rgba(255, 255, 255, 0.75) !important;
  transition: all 0.3s ease;
  flex-shrink: 0;
  min-width: 32px;
  min-height: 32px;
  background: rgba(255, 255, 255, 0.08) !important;
}

.clear-btn-inline:hover {
  color: white !important;
  background: rgba(255, 255, 255, 0.2) !important;
  transform: scale(1.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.clear-btn-inline:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

/* Animations */
.fade-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
  animation: fadeIn 0.3s ease;
}

.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(-2px);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(-2px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.project-card {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  height: 450px;
  min-height: 450px;
  max-height: 450px;
  width: 360px;
  box-sizing: border-box;
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
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.02em;
}

.project-info {
  padding: 1.5rem;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.project-description {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
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

@media (max-width: 768px) {
  .projects-page {
    padding: 1rem;
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

  .filters {
    padding: 0.625rem 0.875rem;
  }

  .filters-row {
    gap: 0.5rem;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
    padding-bottom: 0.25rem;
  }

  .filters-row::-webkit-scrollbar {
    height: 4px;
  }

  .filters-row::-webkit-scrollbar-track {
    background: transparent;
  }

  .filters-row::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 2px;
  }

  .category-chips-container {
    flex-shrink: 0;
    gap: 0.5rem;
  }

  .category-chip {
    flex-shrink: 0;
    min-height: 36px;
    padding: 0.5rem 0.75rem;
    font-size: 0.8125rem;
  }

  .results-count-inline {
    font-size: 0.75rem;
    flex-shrink: 0;
    margin-left: 0.5rem;
  }

  .clear-btn-inline {
    min-width: 36px;
    min-height: 36px;
    flex-shrink: 0;
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
