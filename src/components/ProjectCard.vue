<template>
  <router-link
    :to="{ name: 'ProjectDetail', params: { slug: project.slug } }"
    class="project-card-link"
  >
    <div class="project-card">
      <div class="project-image">
        <q-skeleton
          v-if="!imageLoaded"
          class="image-skeleton brand-pulse"
          square
          animation="none"
        />
        <img
          :src="project.images[0]"
          :alt="project.title"
          loading="lazy"
          @load="onImageLoad"
          :class="{ 'is-loaded': imageLoaded }"
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
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Project } from '../data/projects';

defineProps<{
  project: Project;
}>();

const imageLoaded = ref(false);

const onImageLoad = () => {
  imageLoaded.value = true;
};
</script>

<style scoped>
.project-card {
  background: var(--bg-grey);
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--accent-teal);
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  height: 450px;
  min-height: 450px;
  max-height: 450px;
  width: 100%;
  box-sizing: border-box;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 12px 12px 0px rgba(0, 0, 0, 0.3);
}

.project-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.05);
}

.image-skeleton {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
}

/* Custom pulse animation using brand color */
.brand-pulse {
  animation: q-skeleton--pulse-brand 2s infinite ease-in-out;
}

@keyframes q-skeleton--pulse-brand {
  0% {
    opacity: 0.3;
    background: rgba(255, 255, 255, 0.05);
  }

  50% {
    opacity: 0.6;
    background: rgba(106, 30, 85, 0.15);
    /* #6A1E55 */
  }

  100% {
    opacity: 0.3;
    background: rgba(255, 255, 255, 0.05);
  }
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease, opacity 0.5s ease;
  opacity: 0;
}

.project-image img.is-loaded {
  opacity: 1;
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
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.875rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-shadow: 2px 2px 0px #000;
  letter-spacing: -0.02em;
  line-height: var(--lh-tight, 1.1);
  text-transform: uppercase;
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
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 0.4rem 0.8rem;
  transition: all 0.3s ease;
  background: var(--bg-charcoal) !important;
  color: var(--accent-teal) !important;
  border: 1px solid var(--accent-teal);
  height: 1.8rem;
  line-height: 1.2;
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
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
</style>
