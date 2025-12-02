<template>
  <router-link :to="{ name: 'ProjectDetail', params: { slug: project.slug } }" class="project-card-link">
    <div class="project-card">
      <div class="project-image">
        <div
          class="category-badge"
          :class="`category-badge--${categoryConfig.mod}`"
          :aria-label="`Category: ${project.category}`"
        >
          <span class="category-badge__symbol" aria-hidden="true">{{ categoryConfig.symbol }}</span>
          <span class="category-badge__label">{{ categoryConfig.label }}</span>
        </div>
        <q-skeleton v-if="!imageLoaded" class="image-skeleton brand-pulse" square animation="none" />
        <picture>
          <source :srcset="webpFrom(project.images[0])" type="image/webp" />
          <img :src="project.images[0]" :alt="project.title" width="1400" height="875"
            loading="lazy" decoding="async" @load="onImageLoad"
            :class="{ 'is-loaded': imageLoaded }" />
        </picture>
        <div class="project-title-overlay">
          <h3 class="project-title" :title="project.title">{{ project.title }}</h3>
        </div>
      </div>
      <div class="project-info">
        <p class="project-description">{{ project.description }}</p>
        <div class="project-tags">
          <q-chip v-for="tag in project.tags.slice(0, 3)" :key="tag" color="white" text-color="secondary" size="sm"
            class="tech-chip">
            {{ tag }}
          </q-chip>
          <q-chip
            v-if="project.tags.length > 3"
            color="white"
            text-color="secondary"
            size="sm"
            class="tech-chip tech-chip--overflow"
            :aria-label="`${project.tags.length - 3} more tags`"
          >
            +{{ project.tags.length - 3 }}
          </q-chip>
        </div>
      </div>
      <div class="project-cta" aria-hidden="true">
        <span class="project-cta__label">&gt;&nbsp;VIEW PROJECT</span>
        <span class="project-cta__arrow">↗</span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Project } from '../data/projects';
import { webpFrom } from '../utils/images';

const props = defineProps<{
  project: Project;
}>();

const imageLoaded = ref(false);

const onImageLoad = () => {
  imageLoaded.value = true;
};

const CATEGORY_CONFIG: Record<string, { symbol: string; mod: string; label: string }> = {
  'Web Application': { symbol: '</>', mod: 'web',    label: 'WEB APP' },
  'Game':            { symbol: '▶',   mod: 'game',   label: 'GAME'    },
  'System':          { symbol: '>_',  mod: 'system', label: 'SYSTEM'  },
};

const categoryConfig = computed(
  () => CATEGORY_CONFIG[props.project.category] ?? { symbol: '◈', mod: 'web', label: props.project.category.toUpperCase() }
);
</script>

<style scoped>
.project-card {
  background: var(--bg-grey);
  border-radius: 4px;
  overflow: clip; /* clip = no scroll container; same visual result as hidden */
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid var(--accent-teal);
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  /* min-height removed — grid row stretching handles alignment */
  height: 100%;
  width: 100%;
  min-width: 0; /* prevent flex overflow on long content */
  box-sizing: border-box;
  position: relative;
}

.project-card-container {
  width: 100%;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 12px 12px 0px rgba(0, 0, 0, 0.3);
  /* Promote to a compositor layer only while hovered, not for every card. */
  will-change: transform;
}

.project-image {
  width: 100%;
  /* fluid height: scales with container width, bounded by sensible min/max */
  height: clamp(140px, 38cqi, 210px);
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background: var(--bg-image-fallback, rgba(255, 255, 255, 0.05));
}

.category-badge {
  position: absolute;
  top: 0.625rem;
  left: 0.625rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.2rem 0.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: 2px;
  border: 1px solid currentColor;
  box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(6px);
  pointer-events: none;
}

.category-badge--web {
  color: var(--accent-teal);
  background: rgba(0, 173, 181, 0.12);
}

.category-badge--game {
  color: #A64D79;
  background: rgba(166, 77, 121, 0.15);
}

.category-badge--system {
  color: var(--text-white, #EEEEEE);
  border-color: rgba(238, 238, 238, 0.45);
  background: rgba(238, 238, 238, 0.08);
}

.category-badge__symbol {
  font-size: 0.625rem;
  line-height: 1;
}

.category-badge__label {
  line-height: 1;
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
  /* fluid: scales with container width via cqi; no viewport breakpoints needed */
  font-size: clamp(1.125rem, 2.5cqi + 0.5rem, 1.875rem);
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  text-shadow: 2px 2px 0px #000;
  letter-spacing: -0.02em;
  line-height: var(--lh-tight, 1.1);
  text-transform: uppercase;
  /* Allow up to two lines so longer titles aren't clipped mid-word. */
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.project-info {
  padding: clamp(0.875rem, 3cqi, 1.5rem); /* fluid padding — less cramped on narrow cards */
  flex: 1 1 auto;
  min-width: 0; /* prevent flex-child overflow on long descriptions */
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
  background: var(--bg-charcoal) !important;
  color: var(--accent-teal) !important;
  border: 1px solid var(--accent-teal);
  height: 1.8rem;
  line-height: 1.2;
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}

/* Chips are decorative labels — no independent hover (the card handles it). */
.tech-chip--overflow {
  border-style: dashed;
  font-style: italic;
  opacity: 0.7;
  cursor: default;
}

/* CTA: persistent footer by default — the baseline for touch / no-hover pointers. */
.project-cta {
  position: relative;
  height: 2.75rem;
  background: var(--accent-teal);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  z-index: 2;
}

/* Hover-capable pointers: collapse the CTA and slide it up on card hover. */
@media (hover: hover) {
  .project-cta {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }

  .project-card:hover .project-cta {
    transform: translateY(0);
  }
}

.project-cta__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--bg-charcoal);
}

.project-cta__arrow {
  font-size: 1.125rem;
  color: var(--bg-charcoal);
  font-weight: 700;
  line-height: 1;
}

.project-card-link {
  /* register as a container so children can size with cqi units */
  container-type: inline-size;
  container-name: card;
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
  border-radius: 4px;
  transition: outline 0.2s ease;
}

.project-card-link:focus-visible {
  outline: 3px solid rgba(255, 255, 255, 0.8);
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  .project-card {
    transition: box-shadow 0.3s ease;
  }

  .project-card:hover {
    transform: none;
  }

  .project-image img {
    transition: opacity 0.5s ease;
  }

  .project-card:hover .project-image img {
    transform: none;
  }

  .brand-pulse {
    animation: none;
    opacity: 0.45;
  }
}

/* Reduced motion on hover pointers: fade the CTA in instead of sliding it.
   Scoped to hover pointers so the persistent touch footer is never hidden. */
@media (hover: hover) and (prefers-reduced-motion: reduce) {
  .project-cta {
    transform: translateY(0);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .project-card:hover .project-cta {
    opacity: 1;
  }
}
</style>
