<template>
  <div class="project-detail-page">
    <a
      href="#main-content"
      class="skip-to-main"
      @click.prevent="focusMainContent"
    >
      Skip to main content
    </a>
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

      <main id="main-content" tabindex="-1">
      <!-- Project content -->
      <template v-if="project">
        <!-- Hero: Split layout -->
        <header class="hero" :class="{ 'is-visible': heroVisible }">
          <!-- Image pane -->
          <div class="hero-img-pane">
            <button
              type="button"
              class="img-frame"
              @click="openLightbox(0)"
              :aria-label="`View ${project.title} screenshot 1`"
            >
              <picture>
                <source :srcset="webpFrom(project.images[0])" type="image/webp" />
                <img
                  :src="project.images[0]"
                  :alt="project.title"
                  class="hero-img"
                  width="1280"
                  height="800"
                  decoding="async"
                  fetchpriority="high"
                />
              </picture>
              <div class="scanline-anim"></div>
              <span class="corner c-tl"></span>
              <span class="corner c-tr"></span>
              <span class="corner c-bl"></span>
              <span class="corner c-br"></span>
              <span class="hero-zoom" aria-hidden="true">
                <q-icon name="zoom_in" size="md" />
              </span>
            </button>
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
                <IconGithub size="1.1rem" />
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
          <section
            v-if="project.overview"
            class="detail-sec"
            style="--delay: 0"
          >
            <div class="sec-head">
              <span class="sec-num">01</span>
              <span class="sec-divider">//</span>
              <h2 class="sec-title">Overview &amp; Objectives</h2>
            </div>
            <div class="sec-body">
              <p>{{ project.overview }}</p>
            </div>
          </section>

          <section
            v-if="project.features?.length"
            class="detail-sec"
            style="--delay: 1"
          >
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

          <section
            v-if="project.challenges?.length"
            class="detail-sec"
            style="--delay: 2"
          >
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

          <section
            v-if="galleryImages.length"
            class="detail-sec gallery-sec"
            style="--delay: 3"
          >
            <div class="sec-head">
              <span class="sec-num">04</span>
              <span class="sec-divider">//</span>
              <h2 class="sec-title">Project Gallery</h2>
            </div>
            <div class="sec-body">
              <div class="gallery-grid">
                <button
                  v-for="g in galleryImages"
                  :key="g.src"
                  type="button"
                  class="g-thumb"
                  @click="openLightbox(g.index)"
                  :aria-label="`View ${project.title} screenshot ${g.index + 1}`"
                >
                  <picture>
                    <source :srcset="webpFrom(g.src)" type="image/webp" />
                    <img
                      :src="g.src"
                      :alt="`${project.title} screenshot ${g.index + 1}`"
                      width="1280"
                      height="800"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <div class="g-hover">
                    <q-icon name="zoom_in" size="md" />
                  </div>
                </button>
              </div>
            </div>
          </section>
        </div>

        <!-- Prev / next project pager -->
        <nav
          v-if="prevProject || nextProject"
          class="project-pager"
          aria-label="Project navigation"
        >
          <button
            v-if="prevProject"
            type="button"
            class="pager-btn pager-prev"
            @click="goToProject(prevProject)"
          >
            <q-icon name="chevron_left" size="sm" class="pager-arrow" />
            <span class="pager-meta">
              <span class="pager-label">Prev</span>
              <span class="pager-title">{{ prevProject.title }}</span>
            </span>
          </button>
          <button
            v-if="nextProject"
            type="button"
            class="pager-btn pager-next"
            @click="goToProject(nextProject)"
          >
            <span class="pager-meta">
              <span class="pager-label">Next</span>
              <span class="pager-title">{{ nextProject.title }}</span>
            </span>
            <q-icon name="chevron_right" size="sm" class="pager-arrow" />
          </button>
        </nav>
      </template>

      <!-- Not found -->
      <div v-else class="not-found">
        <q-icon name="warning" color="negative" size="64px" />
        <h1>Project Not Found</h1>
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
      </main>

      <!-- Lightbox -->
      <q-dialog
        v-model="lightbox"
        :aria-label="project ? `${project.title} screenshots` : 'Image viewer'"
        @keydown="handleLightboxKeydown"
      >
        <div
          class="lightbox"
          v-touch-swipe.mouse.horizontal="onLightboxSwipe"
        >
          <button
            class="lb-close"
            @click="lightbox = false"
            aria-label="Close lightbox"
          >
            <q-icon name="close" size="sm" />
          </button>
          <button
            v-if="project && project.images.length > 1"
            class="lb-nav lb-prev"
            :disabled="carouselIndex === 0"
            @click="prevImage"
            aria-label="Previous image"
          >
            <q-icon name="chevron_left" />
          </button>
          <picture v-if="project">
            <source :srcset="webpFrom(project.images[carouselIndex])" type="image/webp" />
            <img
              :src="project.images[carouselIndex]"
              :alt="`${project.title} screenshot ${carouselIndex + 1}`"
              class="lb-img"
              decoding="async"
            />
          </picture>
          <button
            v-if="project && project.images.length > 1"
            class="lb-nav lb-next"
            :disabled="carouselIndex >= project.images.length - 1"
            @click="nextImage"
            aria-label="Next image"
          >
            <q-icon name="chevron_right" />
          </button>
          <div
            v-if="project && project.images.length > 1"
            class="lb-strip"
            role="group"
            aria-label="Screenshots"
          >
            <button
              v-for="(img, i) in project.images"
              :key="img"
              type="button"
              class="lb-thumb"
              :class="{ 'is-active': i === carouselIndex }"
              :aria-current="i === carouselIndex ? 'true' : undefined"
              :aria-label="`Go to screenshot ${i + 1}`"
              @click="carouselIndex = i"
            >
              <picture>
                <source :srcset="webpFrom(img)" type="image/webp" />
                <img :src="img" :alt="''" loading="lazy" decoding="async" />
              </picture>
            </button>
          </div>
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
            <IconGithub size="1.1rem" class="q-mr-xs" />GitHub
          </a>
          <span class="footer-sep">•</span>
          <a
            href="https://linkedin.com/in/gkapologista"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            <IconLinkedin size="1.1rem" class="q-mr-xs" />LinkedIn
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { type Project, projects } from '../data/projects';
import { useMeta } from 'quasar';
import { webpFrom } from '../utils/images';
import IconGithub from '../components/icons/IconGithub.vue';
import IconLinkedin from '../components/icons/IconLinkedin.vue';

const route = useRoute();
const router = useRouter();
const slug = computed(() => route.params.slug as string);
const project = ref<Project | undefined>();
const carouselIndex = ref(0);
const lightbox = ref(false);
const heroVisible = ref(false);
const currentYear = computed(() => new Date().getFullYear());

// Gallery excludes the hero image (images[0]); keep each image's absolute
// index so the lightbox still opens at the right slide and can reach the hero.
const galleryImages = computed(() =>
  (project.value?.images ?? [])
    .map((src, index) => ({ src, index }))
    .slice(1),
);

// Wrap-around neighbours for the prev/next project pager.
const currentIndex = computed(() =>
  projects.findIndex((p) => p.slug === slug.value),
);
const prevProject = computed<Project | undefined>(() => {
  const i = currentIndex.value;
  if (i < 0 || projects.length <= 1) return undefined;
  return projects[(i - 1 + projects.length) % projects.length];
});
const nextProject = computed<Project | undefined>(() => {
  const i = currentIndex.value;
  if (i < 0 || projects.length <= 1) return undefined;
  return projects[(i + 1) % projects.length];
});

function goBack() {
  if (window.history.state?.back) {
    router.back();
  } else {
    router.push('/projects');
  }
}

/** Hash-router safe: avoid replacing `#/route` with `#main-content`. */
function focusMainContent() {
  const el = document.getElementById('main-content');
  if (!el || !(el instanceof HTMLElement)) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.focus({ preventScroll: true });
  el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
}
function goToProject(target?: Project) {
  if (target) {
    router.push({ name: 'ProjectDetail', params: { slug: target.slug } });
  }
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
function onLightboxSwipe({ direction }: { direction?: string }) {
  if (direction === 'left') {
    nextImage();
  } else if (direction === 'right') {
    prevImage();
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

function revealHero() {
  heroVisible.value = false;
  requestAnimationFrame(() => {
    setTimeout(() => {
      heroVisible.value = true;
    }, 50);
  });
}
function loadProject() {
  project.value = projects.find((p) => p.slug === slug.value);
  carouselIndex.value = 0;
  lightbox.value = false;
}

// The ProjectDetail route reuses this component across slugs, so onMounted only
// fires once — re-resolve and re-animate whenever the slug changes in place.
watch(slug, () => {
  loadProject();
  revealHero();
});

onMounted(() => {
  loadProject();
  revealHero();
});

// Reactive so title/description/social tags refresh on in-place navigation.
useMeta(() => {
  const p = project.value;
  if (!p) return { title: 'Project Not Found' };
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const url = `${origin}${import.meta.env.BASE_URL}#/project/${p.slug}`;
  const image = `${origin}${p.images[0]}`;
  return {
    title: p.title,
    meta: {
      description: { name: 'description', content: p.description },
      ogTitle: { property: 'og:title', content: p.title },
      ogDescription: { property: 'og:description', content: p.description },
      ogImage: { property: 'og:image', content: image },
      ogType: { property: 'og:type', content: 'website' },
      ogUrl: { property: 'og:url', content: url },
      twitterCard: { name: 'twitter:card', content: 'summary_large_image' },
    },
    link: {
      canonical: { rel: 'canonical', href: url },
    },
  };
});
</script>

<style scoped>
/* ─── SKIP LINK ─── */
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
  box-shadow: 4px 4px 0px var(--shadow-soft);
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.skip-to-main:focus {
  outline: none;
}

.skip-to-main:focus-visible {
  transform: translateY(0.75rem);
  box-shadow: 6px 6px 0px var(--shadow-hard);
  outline: 2px solid var(--text-white);
  outline-offset: 3px;
}

.skip-to-main:focus-visible:hover {
  color: var(--bg-charcoal);
  background: var(--accent-teal-hover);
}

/* ─── PAGE SHELL ─── */
.project-detail-page {
  min-height: 100vh;
  min-height: 100svh;
  width: 100%;
  background-color: var(--bg-charcoal);
  position: relative;
  overflow-x: clip;
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
      var(--border-subtle) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px);
  background-size: 50px 50px;
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
}

.orb-1 {
  width: clamp(260px, 40vw, 500px);
  height: clamp(260px, 40vw, 500px);
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--accent-teal) 10%, transparent),
    transparent 70%
  );
  top: -10%;
  right: 5%;
}

.orb-2 {
  width: clamp(220px, 32vw, 400px);
  height: clamp(220px, 32vw, 400px);
  background: radial-gradient(
    circle,
    color-mix(in srgb, var(--accent-teal) 7%, transparent),
    transparent 70%
  );
  bottom: 15%;
  left: 0%;
}

/* ─── PAGE WRAP ─── */
.page-wrap {
  position: relative;
  z-index: 3;
  width: min(100%, 1280px);
  margin: 0 auto;
  padding: clamp(1rem, 0.65rem + 1.5vw, 1.5rem)
    clamp(1rem, 0.3rem + 3vw, 2rem) clamp(3rem, 2rem + 4vw, 4rem);
}

/* ─── NAVIGATION ─── */
.top-nav {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
  margin-bottom: clamp(1.75rem, 1.25rem + 2vw, 2.5rem);
  padding-bottom: 1rem;
  border-bottom: 1px solid color-mix(in srgb, var(--accent-teal) 18%, transparent);
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
  display: none;
  align-items: center;
  gap: 0.5rem;
  min-width: 0;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  overflow: hidden;
}

.bc-seg {
  color: var(--text-muted);
}

.bc-sep {
  color: color-mix(in srgb, var(--accent-teal) 45%, transparent);
}

.bc-active {
  color: var(--text-secondary);
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ─── HERO ─── */
.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: clamp(2rem, 1rem + 4vw, 3rem);
  margin-bottom: clamp(2.5rem, 1.75rem + 3vw, 3.5rem);
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
  min-width: 0;
}

.img-frame {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  overflow: clip;
  border: 1px solid color-mix(in srgb, var(--accent-teal) 35%, transparent);
  box-shadow: 8px 8px 0 var(--shadow-hard);
  background: var(--bg-grey);
  cursor: pointer;
  color: inherit;
  font: inherit;
  text-align: inherit;
}

.img-frame:focus-visible {
  outline: 2px solid var(--accent-teal);
  outline-offset: 2px;
}

.hero-img {
  display: block;
  width: 100%;
  max-width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.img-frame:hover .hero-img {
  transform: scale(1.04);
}

/* Zoom affordance — the hero opens the lightbox at the first image. */
.hero-zoom {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  color: var(--accent-teal);
  opacity: 0;
  transition: opacity 0.22s ease;
  pointer-events: none;
}

.img-frame:hover .hero-zoom,
.img-frame:focus-visible .hero-zoom {
  opacity: 1;
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
    color-mix(in srgb, var(--accent-teal) 20%, transparent) 20%,
    var(--accent-teal) 50%,
    color-mix(in srgb, var(--accent-teal) 20%, transparent) 80%,
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
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.7rem;
  font-size: 0.68rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* Info pane */
.hero-info {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: 0;
  padding-top: 0.25rem;
}

.eyebrow {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
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
  background: color-mix(in srgb, var(--accent-teal) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--accent-teal) 45%, transparent);
  color: var(--accent-teal);
}

.year-tag {
  background: var(--border-subtle);
  border: 1px solid var(--border-mid);
  color: var(--text-muted);
}

.project-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(1.75rem, 1.1rem + 2.8vw, 3.25rem);
  font-weight: 700;
  line-height: 1.05;
  text-transform: uppercase;
  color: var(--accent-teal);
  text-shadow: 0 0 40px color-mix(in srgb, var(--accent-teal) 25%, transparent);
  margin: 0;
  overflow-wrap: anywhere;
}

.project-desc {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 1rem;
  letter-spacing: 0.01em;
  margin: 0;
  overflow-wrap: break-word;
}

/* CTA buttons */
.hero-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 44px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.6rem 1.2rem;
  width: 100%;
  border-radius: 2px;
  text-decoration: none;
  transition: all 0.18s ease;
  cursor: pointer;
}

.cta-primary {
  background: var(--accent-teal);
  color: var(--bg-charcoal);
  box-shadow: 4px 4px 0 var(--shadow-hard);
}

.cta-primary:hover {
  background: var(--accent-teal-hover);
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--shadow-hard);
}

.cta-outline {
  border: 2px solid var(--accent-teal);
  color: var(--accent-teal);
  box-shadow: 4px 4px 0 var(--shadow-hard);
}

.cta-outline:hover {
  background: color-mix(in srgb, var(--accent-teal) 10%, transparent);
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 var(--shadow-hard);
}

/* Tech pills */
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  min-width: 0;
}

.tech-pill {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  padding: 0.28rem 0.65rem;
  border-radius: 2px;
  background: var(--border-subtle);
  border: 1px solid var(--border-mid);
  color: var(--text-muted);
  transition: all 0.15s ease;
  cursor: default;
  overflow-wrap: anywhere;
}

.tech-pill:hover {
  border-color: color-mix(in srgb, var(--accent-teal) 50%, transparent);
  color: var(--accent-teal);
  background: color-mix(in srgb, var(--accent-teal) 7%, transparent);
}

/* ─── DETAIL SECTIONS ─── */
.detail-wrap {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.detail-sec {
  background: var(--bg-grey);
  border: 1px solid color-mix(in srgb, var(--accent-teal) 25%, transparent);
  border-left: 3px solid var(--accent-teal);
  box-shadow: 6px 6px 0 var(--shadow-soft);
  animation: secReveal 0.55s ease both;
  animation-delay: calc(0.65s + var(--delay, 0) * 0.1s);
  transition: box-shadow 0.25s ease, transform 0.25s ease;
}

.detail-sec:hover {
  box-shadow: 8px 8px 0 var(--shadow-soft);
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
  flex-wrap: wrap;
  gap: 0.7rem;
  padding: 0.875rem clamp(1rem, 0.6rem + 1.8vw, 1.5rem);
  border-bottom: 1px solid color-mix(in srgb, var(--accent-teal) 12%, transparent);
  background: var(--bg-card-overlay);
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
  color: color-mix(in srgb, var(--accent-teal) 35%, transparent);
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
  color: var(--text-white) !important;
  margin: 0;
  min-width: 0;
  overflow-wrap: anywhere;
}

.sec-body {
  padding: clamp(1rem, 0.55rem + 2vw, 1.5rem);
}

.sec-body p {
  color: var(--text-secondary);
  line-height: 1.75;
  font-size: 1rem;
  letter-spacing: 0.01em;
  margin: 0;
  /* Cap the measure for readability — sections span the full container. */
  max-width: 68ch;
}

/* ─── ITEM LIST ─── */
.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  /* Cap the measure for readability. */
  max-width: 68ch;
}

.item-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  min-width: 0;
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.65;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--border-subtle);
  transition: color 0.15s ease, padding-left 0.15s ease;
  animation: liReveal 0.4s ease both;
  animation-delay: calc(
    0.85s + var(--delay, 0) * 0.1s + var(--li, 0) * 0.04s
  );
  overflow-wrap: anywhere;
}

.item-list li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.item-list li:first-child {
  padding-top: 0;
}

.item-list li:hover {
  color: var(--text-white);
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
  grid-template-columns: repeat(auto-fit, minmax(min(220px, 100%), 1fr));
  gap: 0.75rem;
}

.g-thumb {
  position: relative;
  overflow: clip;
  min-width: 0;
  padding: 0;
  cursor: pointer;
  border: 1px solid color-mix(in srgb, var(--accent-teal) 18%, transparent);
  background: var(--bg-charcoal);
  color: inherit;
  font: inherit;
  text-align: inherit;
  transition: all 0.22s ease;
}

.g-thumb:hover {
  border-color: var(--accent-teal);
  box-shadow: 4px 4px 0 var(--shadow-soft);
  transform: translate(-2px, -2px);
}

.g-thumb:focus-visible {
  outline: 2px solid var(--accent-teal);
  outline-offset: 2px;
}

.g-thumb img {
  display: block;
  width: 100%;
  max-width: 100%;
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

.g-thumb:hover .g-hover,
.g-thumb:focus-visible .g-hover {
  opacity: 1;
}

/* ─── PROJECT PAGER ─── */
.project-pager {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin-top: clamp(2rem, 1.25rem + 3vw, 3rem);
}

.pager-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 64px;
  padding: 0.75rem clamp(0.85rem, 0.5rem + 1.5vw, 1.25rem);
  min-width: 0;
  cursor: pointer;
  background: var(--bg-grey);
  border: 1px solid color-mix(in srgb, var(--accent-teal) 25%, transparent);
  box-shadow: 6px 6px 0 var(--shadow-soft);
  color: var(--text-secondary);
  transition: box-shadow 0.22s ease, transform 0.22s ease,
    border-color 0.22s ease;
}

.pager-next {
  justify-content: flex-end;
  text-align: right;
}

.pager-btn:hover {
  border-color: var(--accent-teal);
  box-shadow: 8px 8px 0 var(--shadow-soft);
  transform: translate(-2px, -2px);
}

.pager-btn:focus-visible {
  outline: 2px solid var(--accent-teal);
  outline-offset: 2px;
}

.pager-arrow {
  flex-shrink: 0;
  color: var(--accent-teal);
}

.pager-meta {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.pager-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--accent-teal);
  opacity: 0.7;
}

.pager-title {
  font-size: 0.85rem;
  font-weight: 600;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ─── LIGHTBOX ─── */
.lightbox {
  position: relative;
  background: #1a1e24;
  border: 1px solid rgba(0, 173, 181, 0.3);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.65), 10px 10px 0 rgba(0, 0, 0, 0.3);
  width: min(calc(100vw - 2rem), 1000px);
  max-height: min(90vh, 90svh);
  margin: 0 auto;
  padding: clamp(0.75rem, 0.4rem + 1.5vw, 1rem);
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
  min-width: 44px;
  min-height: 44px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.lb-close {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  z-index: 2;
  width: 44px;
  height: 44px;
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
  width: 44px;
  height: 44px;
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

.lb-nav:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.lb-nav:disabled:hover {
  background: rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.12);
  color: #fff;
}

.lb-img {
  max-width: 100%;
  max-height: min(65vh, 65svh);
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
  overflow-wrap: anywhere;
}

/* Lightbox thumbnail strip */
.lb-strip {
  display: flex;
  gap: 0.4rem;
  max-width: 100%;
  margin-bottom: 0.75rem;
  padding-bottom: 0.25rem;
  overflow-x: auto;
  scrollbar-width: thin;
}

.lb-thumb {
  flex: 0 0 auto;
  width: 64px;
  height: 40px;
  padding: 0;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 2px;
  background: #111;
  opacity: 0.55;
  transition: opacity 0.18s ease, border-color 0.18s ease;
}

.lb-thumb img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lb-thumb:hover {
  opacity: 0.85;
  border-color: rgba(0, 173, 181, 0.5);
}

.lb-thumb.is-active {
  opacity: 1;
  border-color: var(--accent-teal);
}

.lb-thumb:focus-visible {
  outline: 2px solid var(--accent-teal);
  outline-offset: 2px;
}

/* ─── NOT FOUND ─── */
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: min(60vh, 60svh);
  gap: 1rem;
  text-align: center;
  color: var(--text-secondary);
  padding-inline: 1rem;
}

.not-found h1 {
  font-size: 1.5rem;
  color: var(--text-white) !important;
  margin: 0;
}

.not-found p {
  color: var(--text-muted);
  font-size: 0.875rem;
  margin: 0;
  overflow-wrap: break-word;
}

/* ─── FOOTER ─── */
.site-footer {
  position: relative;
  z-index: 3;
  padding: clamp(1.5rem, 0.75rem + 3vw, 2rem)
    clamp(1rem, 0.3rem + 3vw, 2rem);
  margin-top: 3rem;
  border-top: 1px solid var(--border-subtle);
}

.footer-inner {
  width: min(100%, 1280px);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  text-align: center;
}

.footer-copy {
  font-size: 0.78rem;
  color: var(--text-muted);
  letter-spacing: 0.05em;
}

.footer-links {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  min-height: 44px;
  font-size: 0.78rem;
  color: var(--accent-teal);
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--text-white);
}

.footer-link:focus-visible {
  outline: 2px solid var(--text-white);
  outline-offset: 2px;
}

.footer-sep {
  color: var(--text-dim);
}

/* ─── RESPONSIVE ─── */
@media (min-width: 901px) {
  .hero {
    grid-template-columns: minmax(0, 56%) minmax(0, 44%);
  }
}

@media (min-width: 769px) {
  .breadcrumb {
    display: flex;
  }
}

@media (min-width: 481px) {
  .footer-inner {
    flex-direction: row;
    text-align: left;
  }

  .hero-actions {
    flex-direction: row;
  }

  .cta-btn {
    width: auto;
  }

  .project-pager {
    grid-template-columns: 1fr 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .skip-to-main {
    transition: none;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }

  .hero {
    opacity: 1;
    transform: none;
  }
}
</style>
