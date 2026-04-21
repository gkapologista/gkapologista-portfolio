<template>
  <div class="project-detail-page">
    <div class="bg-fx">
      <div class="scan-lines"></div>
      <div class="grid-pattern"></div>
      <div class="glow orb-1"></div>
      <div class="glow orb-2"></div>
    </div>

    <div class="page-wrap">
      <!-- Navigation bar -->
      <nav class="top-nav">
        <q-btn
          flat
          icon="arrow_back"
          label="Back"
          @click="goBack"
          class="back-btn"
        />
        <div v-if="project" class="breadcrumb">
          <span class="bc-seg">projects</span>
          <span class="bc-sep">/</span>
          <span class="bc-active">{{ project.title }}</span>
        </div>
      </nav>

      <!-- Loading state -->
      <div v-if="loading" class="loader-wrap">
        <q-spinner-dots color="primary" size="64px" />
        <p class="loader-label">Loading project details…</p>
      </div>

      <!-- Project content -->
      <template v-else-if="project">
        <!-- Hero: Split layout -->
        <header class="hero" :class="{ 'is-visible': heroVisible }">
          <!-- Image pane -->
          <div class="hero-img-pane">
            <div class="img-frame">
              <img
                :src="project.images[0]"
                :alt="project.title"
                class="hero-img"
              />
              <div class="scanline-anim"></div>
              <span class="corner c-tl"></span>
              <span class="corner c-tr"></span>
              <span class="corner c-bl"></span>
              <span class="corner c-br"></span>
            </div>
            <div class="img-badge">
              <q-icon name="photo_library" size="xs" />
              {{ project.images.length }} image{{ project.images.length !== 1 ? 's' : '' }}
            </div>
          </div>

          <!-- Info pane -->
          <div class="hero-info">
            <div class="eyebrow">
              <span class="eyebrow-tag cat-tag">{{ project.category }}</span>
              <span v-if="project.year" class="eyebrow-tag year-tag">{{
                project.year
              }}</span>
            </div>

            <h1 class="project-title">{{ project.title }}</h1>

            <p class="project-desc">{{ project.description }}</p>

            <div
              v-if="project.liveUrl || project.repoUrl"
              class="hero-actions"
            >
              <a
                v-if="project.liveUrl"
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="cta-btn cta-primary"
              >
                <q-icon name="open_in_new" size="xs" />
                Live Demo
              </a>
              <a
                v-if="project.repoUrl"
                :href="project.repoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="cta-btn cta-outline"
              >
                <q-icon name="fab fa-github" size="xs" />
                Source Code
              </a>
            </div>

            <div class="tech-stack">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="tech-pill"
                >{{ tech }}</span
              >
            </div>
          </div>
        </header>

        <!-- Detail sections -->
        <div class="detail-wrap">
          <section class="detail-sec" style="--delay: 0">
            <div class="sec-head">
              <span class="sec-num">01</span>
              <span class="sec-divider">//</span>
              <h2 class="sec-title">Overview &amp; Objectives</h2>
            </div>
            <div class="sec-body">
              <p>{{ project.overview }}</p>
            </div>
          </section>

          <section class="detail-sec" style="--delay: 1">
            <div class="sec-head">
              <span class="sec-num">02</span>
              <span class="sec-divider">//</span>
              <h2 class="sec-title">Key Features</h2>
            </div>
            <div class="sec-body">
              <ul class="item-list">
                <li
                  v-for="(f, i) in project.features"
                  :key="f"
                  :style="`--li: ${i}`"
                >
                  <span class="li-bullet" aria-hidden="true">›</span>
                  {{ f }}
                </li>
              </ul>
            </div>
          </section>

          <section class="detail-sec" style="--delay: 2">
            <div class="sec-head">
              <span class="sec-num">03</span>
              <span class="sec-divider">//</span>
              <h2 class="sec-title">Challenges &amp; Outcomes</h2>
            </div>
            <div class="sec-body">
              <ul class="item-list">
                <li
                  v-for="(c, i) in project.challenges"
                  :key="c"
                  :style="`--li: ${i}`"
                >
                  <span class="li-bullet" aria-hidden="true">›</span>
                  {{ c }}
                </li>
              </ul>
            </div>
          </section>

          <section class="detail-sec gallery-sec" style="--delay: 3">
            <div class="sec-head">
              <span class="sec-num">04</span>
              <span class="sec-divider">//</span>
              <h2 class="sec-title">Project Gallery</h2>
            </div>
            <div class="sec-body">
              <div class="gallery-grid">
                <div
                  v-for="(img, idx) in project.images"
                  :key="img"
                  class="g-thumb"
                  @click="openLightbox(Number(idx))"
                  @keydown.enter="openLightbox(Number(idx))"
                  tabindex="0"
                  role="button"
                  :aria-label="`View ${project.title} screenshot ${Number(idx) + 1}`"
                >
                  <img
                    :src="img"
                    :alt="`${project.title} screenshot ${Number(idx) + 1}`"
                    loading="lazy"
                  />
                  <div class="g-hover">
                    <q-icon name="zoom_in" size="md" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </template>

      <!-- Not found -->
      <div v-else class="not-found">
        <q-icon name="warning" color="negative" size="64px" />
        <h2>Project Not Found</h2>
        <p>The project you are looking for does not exist or has been removed.</p>
        <q-btn
          color="primary"
          unelevated
          label="Back to Projects"
          to="/projects"
          class="q-mt-md"
          icon="arrow_back"
        />
      </div>

      <!-- Lightbox -->
      <q-dialog v-model="lightbox" persistent @keydown="handleLightboxKeydown">
        <div class="lightbox">
          <button
            class="lb-close"
            @click="lightbox = false"
            aria-label="Close lightbox"
          >
            <q-icon name="close" size="sm" />
          </button>
          <button
            v-if="carouselIndex > 0"
            class="lb-nav lb-prev"
            @click="prevImage"
            aria-label="Previous image"
          >
            <q-icon name="chevron_left" />
          </button>
          <img
            v-if="project"
            :src="project.images[carouselIndex]"
            :alt="`${project.title} screenshot ${carouselIndex + 1}`"
            class="lb-img"
          />
          <button
            v-if="project && carouselIndex < project.images.length - 1"
            class="lb-nav lb-next"
            @click="nextImage"
            aria-label="Next image"
          >
            <q-icon name="chevron_right" />
          </button>
          <div v-if="project" class="lb-caption">
            {{ project.title }} — {{ carouselIndex + 1 }} /
            {{ project.images.length }}
          </div>
        </div>
      </q-dialog>
    </div>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="footer-inner">
        <span class="footer-copy">© {{ currentYear }} GK Apologista</span>
        <div class="footer-links">
          <a href="mailto:gkapologista@gmail.com" class="footer-link"
            >Contact</a
          >
          <span class="footer-sep">•</span>
          <a
            href="https://github.com/gkapologista"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            <q-icon name="fab fa-github" size="xs" class="q-mr-xs" />GitHub
          </a>
          <span class="footer-sep">•</span>
          <a
            href="https://linkedin.com/in/gkapologista"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            <q-icon name="fab fa-linkedin" size="xs" class="q-mr-xs" />LinkedIn
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { projects } from '../data/projects';
import { useMeta } from 'quasar';

const route = useRoute();
const router = useRouter();
const slug = computed(() => route.params.slug as string);
const loading = ref(true);
const project = ref();
const carouselIndex = ref(0);
const lightbox = ref(false);
const heroVisible = ref(false);
const currentYear = computed(() => new Date().getFullYear());

function goBack() {
  router.back();
}
function openLightbox(idx: number) {
  carouselIndex.value = idx;
  lightbox.value = true;
}
function prevImage() {
  if (carouselIndex.value > 0) {
    carouselIndex.value--;
  }
}
function nextImage() {
  if (project.value && carouselIndex.value < project.value.images.length - 1) {
    carouselIndex.value++;
  }
}
function handleLightboxKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') {
    prevImage();
  } else if (event.key === 'ArrowRight') {
    nextImage();
  } else if (event.key === 'Escape') {
    lightbox.value = false;
  }
}

onMounted(() => {
  project.value = projects.find((p) => p.slug === slug.value);
  loading.value = false;
  requestAnimationFrame(() => {
    setTimeout(() => {
      heroVisible.value = true;
    }, 50);
  });
  if (project.value) {
    useMeta({
      title: project.value.title,
      meta: {
        description: {
          name: 'description',
          content: project.value.description,
        },
      },
    });
  }
});
</script>

<style scoped>
/* ─── PAGE SHELL ─── */
.project-detail-page {
  min-height: 100vh;
  width: 100%;
  background-color: var(--bg-charcoal);
  position: relative;
  overflow-x: hidden;
}

/* ─── BACKGROUND EFFECTS ─── */
.bg-fx {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}

.scan-lines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.07) 2px,
    rgba(0, 0, 0, 0.07) 4px
  );
  opacity: 0.6;
}

.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.04) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
  background-size: 50px 50px;
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(
    circle,
    rgba(0, 173, 181, 0.1),
    transparent 70%
  );
  top: -10%;
  right: 5%;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(0, 173, 181, 0.07),
    transparent 70%
  );
  bottom: 15%;
  left: 0%;
}

/* ─── PAGE WRAP ─── */
.page-wrap {
  position: relative;
  z-index: 3;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem 2rem 4rem;
}

/* ─── NAVIGATION ─── */
.top-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 173, 181, 0.18);
}

.back-btn {
  color: var(--accent-teal) !important;
  font-weight: 600;
  letter-spacing: 0.08em;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.back-btn:hover {
  transform: translateX(-4px);
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  overflow: hidden;
}

.bc-seg {
  color: rgba(255, 255, 255, 0.35);
}

.bc-sep {
  color: rgba(0, 173, 181, 0.45);
}

.bc-active {
  color: rgba(255, 255, 255, 0.75);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ─── HERO ─── */
.hero {
  display: grid;
  grid-template-columns: 56% 44%;
  gap: 3rem;
  margin-bottom: 3.5rem;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.75s ease, transform 0.75s ease;
}

.hero.is-visible {
  opacity: 1;
  transform: none;
}

/* Image pane */
.hero-img-pane {
  position: relative;
}

.img-frame {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(0, 173, 181, 0.35);
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.45);
  background: var(--bg-grey);
}

.hero-img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.img-frame:hover .hero-img {
  transform: scale(1.04);
}

/* Scan-line animation */
.scanline-anim {
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 173, 181, 0.2) 20%,
    var(--accent-teal) 50%,
    rgba(0, 173, 181, 0.2) 80%,
    transparent 100%
  );
  opacity: 0;
  animation: doScan 6s ease-in-out infinite;
  animation-delay: 1.2s;
  pointer-events: none;
}

@keyframes doScan {
  0% {
    top: -2px;
    opacity: 0;
  }
  4% {
    opacity: 0.65;
  }
  96% {
    opacity: 0.35;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

/* Corner bracket decorations */
.corner {
  position: absolute;
  width: 14px;
  height: 14px;
  border-color: var(--accent-teal);
  border-style: solid;
}

.c-tl {
  top: 7px;
  left: 7px;
  border-width: 2px 0 0 2px;
}

.c-tr {
  top: 7px;
  right: 7px;
  border-width: 2px 2px 0 0;
}

.c-bl {
  bottom: 7px;
  left: 7px;
  border-width: 0 0 2px 2px;
}

.c-br {
  bottom: 7px;
  right: 7px;
  border-width: 0 2px 2px 0;
}

.img-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.7rem;
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Info pane */
.hero-info {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding-top: 0.25rem;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.eyebrow-tag {
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.25rem 0.65rem;
  border-radius: 2px;
}

.cat-tag {
  background: rgba(0, 173, 181, 0.12);
  border: 1px solid rgba(0, 173, 181, 0.45);
  color: var(--accent-teal);
}

.year-tag {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.45);
}

.project-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(1.75rem, 3.5vw, 3.25rem);
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: var(--accent-teal);
  text-shadow: 0 0 40px rgba(0, 173, 181, 0.25);
  margin: 0;
}

.project-desc {
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.7;
  font-size: 0.875rem;
  letter-spacing: 0.01em;
  margin: 0;
}

/* CTA buttons */
.hero-actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.6rem 1.2rem;
  border-radius: 2px;
  text-decoration: none;
  transition: all 0.18s ease;
  cursor: pointer;
}

.cta-primary {
  background: var(--accent-teal);
  color: var(--bg-charcoal);
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.4);
}

.cta-primary:hover {
  background: #00c8d1;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.4);
}

.cta-outline {
  border: 2px solid var(--accent-teal);
  color: var(--accent-teal);
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.4);
}

.cta-outline:hover {
  background: rgba(0, 173, 181, 0.1);
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.4);
}

/* Tech pills */
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tech-pill {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 0.28rem 0.65rem;
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  transition: all 0.15s ease;
  cursor: default;
}

.tech-pill:hover {
  border-color: rgba(0, 173, 181, 0.5);
  color: var(--accent-teal);
  background: rgba(0, 173, 181, 0.07);
}

/* ─── DETAIL SECTIONS ─── */
.detail-wrap {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.detail-sec {
  background: var(--bg-grey);
  border: 1px solid rgba(0, 173, 181, 0.25);
  border-left: 3px solid var(--accent-teal);
  box-shadow: 6px 6px 0 rgba(0, 0, 0, 0.3);
  animation: secReveal 0.55s ease both;
  animation-delay: calc(0.65s + var(--delay, 0) * 0.1s);
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.detail-sec:hover {
  box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.35);
  transform: translateY(-1px);
}

@keyframes secReveal {
  from {
    opacity: 0;
    transform: translateX(-14px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.sec-head {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.875rem 1.5rem;
  border-bottom: 1px solid rgba(0, 173, 181, 0.12);
  background: rgba(0, 0, 0, 0.18);
}

.sec-num {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--accent-teal);
  opacity: 0.55;
  line-height: 1;
  min-width: 2ch;
}

.sec-divider {
  color: rgba(0, 173, 181, 0.35);
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0;
}

.sec-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.82rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.88) !important;
  margin: 0;
}

.sec-body {
  padding: 1.5rem;
}

.sec-body p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.75;
  font-size: 0.875rem;
  letter-spacing: 0.01em;
  margin: 0;
}

/* ─── ITEM LIST ─── */
.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.item-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  line-height: 1.65;
  padding: 0.6rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: color 0.15s ease, padding-left 0.15s ease;
  animation: liReveal 0.4s ease both;
  animation-delay: calc(
    0.85s + var(--delay, 0) * 0.1s + var(--li, 0) * 0.04s
  );
}

.item-list li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.item-list li:first-child {
  padding-top: 0;
}

.item-list li:hover {
  color: rgba(255, 255, 255, 0.95);
  padding-left: 4px;
}

@keyframes liReveal {
  from {
    opacity: 0;
    transform: translateX(-8px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.li-bullet {
  color: var(--accent-teal);
  font-size: 1.05rem;
  line-height: 1.65;
  flex-shrink: 0;
  opacity: 0.75;
}

/* ─── GALLERY ─── */
.gallery-sec .sec-body {
  padding-top: 1.25rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.75rem;
}

.g-thumb {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(0, 173, 181, 0.18);
  background: var(--bg-charcoal);
  transition: all 0.22s ease;
}

.g-thumb:hover {
  border-color: var(--accent-teal);
  box-shadow: 4px 4px 0 rgba(0, 0, 0, 0.35);
  transform: translate(-2px, -2px);
}

.g-thumb:focus-visible {
  outline: 2px solid var(--accent-teal);
  outline-offset: 2px;
}

.g-thumb img {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.g-thumb:hover img {
  transform: scale(1.08);
}

.g-hover {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.22s ease;
  color: var(--accent-teal);
}

.g-thumb:hover .g-hover {
  opacity: 1;
}

/* ─── LIGHTBOX ─── */
.lightbox {
  position: relative;
  background: #1a1e24;
  border: 1px solid rgba(0, 173, 181, 0.3);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.65), 10px 10px 0 rgba(0, 0, 0, 0.3);
  max-width: min(90vw, 1000px);
  max-height: 90vh;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lb-close,
.lb-nav {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 2px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lb-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 2;
  width: 34px;
  height: 34px;
}

.lb-close:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--accent-teal);
  color: var(--accent-teal);
}

.lb-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 42px;
  height: 42px;
}

.lb-prev {
  left: 0.75rem;
}

.lb-next {
  right: 0.75rem;
}

.lb-nav:hover {
  background: rgba(0, 173, 181, 0.15);
  border-color: var(--accent-teal);
  color: var(--accent-teal);
}

.lb-nav:focus-visible {
  outline: 2px solid var(--accent-teal);
  outline-offset: 2px;
}

.lb-img {
  max-width: 100%;
  max-height: 65vh;
  object-fit: contain;
  border-radius: 2px;
  background: #111;
  margin-bottom: 0.75rem;
}

.lb-caption {
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
}

/* ─── LOADING STATE ─── */
.loader-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1.5rem;
}

.loader-label {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  animation: blink 1.5s ease-in-out infinite;
}

@keyframes blink {
  0%,
  100% {
    opacity: 0.35;
  }
  50% {
    opacity: 1;
  }
}

/* ─── NOT FOUND ─── */
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
}

.not-found h2 {
  font-size: 1.5rem;
  color: rgba(255, 255, 255, 0.9) !important;
  margin: 0;
}

.not-found p {
  color: rgba(255, 255, 255, 0.45);
  font-size: 0.875rem;
  margin: 0;
}

/* ─── FOOTER ─── */
.site-footer {
  position: relative;
  z-index: 3;
  padding: 2rem;
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-copy {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 0.05em;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  font-size: 0.78rem;
  color: var(--accent-teal);
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #fff;
}

.footer-link:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.7);
  outline-offset: 2px;
}

.footer-sep {
  color: rgba(255, 255, 255, 0.18);
}

/* ─── RESPONSIVE ─── */
@media (max-width: 900px) {
  .hero {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .page-wrap {
    padding: 1rem 1rem 3rem;
  }

  .top-nav {
    margin-bottom: 1.75rem;
  }

  .breadcrumb {
    display: none;
  }

  .hero {
    margin-bottom: 2.5rem;
  }

  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .gallery-grid {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    flex-direction: column;
  }

  .cta-btn {
    width: 100%;
    justify-content: center;
  }

  .footer-inner {
    flex-direction: column;
    text-align: center;
  }
}

/* Global overflow fix */
body,
html {
  overflow-x: hidden;
}
</style>
