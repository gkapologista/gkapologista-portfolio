<template>
  <div class="project-detail-page">
    <div class="background-effects">
      <div class="grid-pattern"></div>
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
      <div class="glow-orb orb-3"></div>
    </div>

    <div class="content">
      <!-- Header Section -->
      <div class="header-section">
        <q-btn
          flat
          icon="arrow_back"
          label="Back"
          @click="goBack"
          class="back-btn"
        />
      </div>

      <div v-if="loading" class="custom-loader">
        <q-spinner-dots color="primary" size="64px" />
        <div class="loader-text">Loading project details…</div>
      </div>

      <div v-else-if="project" class="project-container">
        <!-- Project Header -->
        <div class="project-header">
          <h1 class="project-title">{{ project.title }}</h1>
          <div class="project-meta">
            <div class="tech-preview">
              <q-chip
                v-for="tech in project.technologies"
                :key="tech"
                color="white"
                text-color="primary"
                size="sm"
                class="tech-chip-preview"
              >
                {{ tech }}
              </q-chip>
            </div>
          </div>
        </div>

        <!-- Main Content Grid -->
        <div class="project-grid">
          <!-- Left Column - Additional Images/Details -->
          <div class="images-column">
            <div class="content-card">
              <h2 class="section-title">
                <q-icon name="photo_library" class="section-icon" />
                Project Gallery
              </h2>
              <div class="image-grid">
                <div
                  v-for="(img, idx) in project.images?.slice(0, 4)"
                  :key="img"
                  class="gallery-item"
                  @click="openLightbox(idx)"
                >
                  <img
                    :src="img"
                    :alt="project.title + ' screenshot ' + (idx + 1)"
                    class="gallery-img"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column - Content -->
          <div class="content-column">
            <!-- Overview Section -->
            <div class="content-card">
              <h2 class="section-title">
                <q-icon name="info" class="section-icon" />
                Overview & Objectives
              </h2>
              <p class="section-content">{{ project.overview }}</p>
            </div>

            <!-- Features Section -->
            <div class="content-card">
              <h2 class="section-title">
                <q-icon name="star" class="section-icon" />
                Key Features
              </h2>
              <ul class="feature-list">
                <li v-for="feature in project.features" :key="feature">
                  {{ feature }}
                </li>
              </ul>
            </div>

            <!-- Challenges Section -->
            <div class="content-card">
              <h2 class="section-title">
                <q-icon name="trending_up" class="section-icon" />
                Challenges & Outcomes
              </h2>
              <ul class="feature-list">
                <li v-for="challenge in project.challenges" :key="challenge">
                  {{ challenge }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="not-found improved-not-found">
        <q-icon
          name="warning"
          color="negative"
          size="64px"
          class="not-found-icon"
        />
        <h2>Project Not Found</h2>
        <p>
          The project you are looking for does not exist or has been removed.
        </p>
        <q-btn
          color="primary"
          unelevated
          label="Back to Projects"
          to="/projects"
          class="q-mt-md"
          icon="arrow_back"
        />
      </div>

      <!-- Lightbox Dialog -->
      <q-dialog v-model="lightbox" persistent>
        <div class="custom-lightbox">
          <q-btn
            icon="close"
            flat
            round
            dense
            class="lightbox-close"
            @click="lightbox = false"
            aria-label="Close"
          />
          <img
            :src="project.images[carouselIndex]"
            :alt="project.title + ' screenshot ' + (carouselIndex + 1)"
            class="lightbox-img"
          />
          <div class="lightbox-caption">
            {{ project.title }} — Screenshot {{ carouselIndex + 1 }}
          </div>
        </div>
      </q-dialog>
    </div>
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

function goBack() {
  router.back();
}
function openLightbox(idx: number) {
  carouselIndex.value = idx;
  lightbox.value = true;
}

onMounted(() => {
  setTimeout(() => {
    project.value = projects.find((p) => p.slug === slug.value);
    loading.value = false;
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
  }, 500); // Simulate loading
});
</script>

<style scoped>
.project-detail-page {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow-x: hidden;
  background-color: var(--q-secondary);
  padding: 2rem;
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

.content {
  position: relative;
  z-index: 3;
  max-width: 1400px;
  margin: 0 auto;
}

.header-section {
  margin-bottom: 2rem;
}

.back-btn {
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  transition: all 0.3s ease;
}

.back-btn:hover {
  color: white;
  transform: translateX(-5px);
}

.project-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.project-header {
  text-align: center;
  margin-bottom: 2rem;
}

.project-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 4rem;
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  background: linear-gradient(to right, #ffffff, #e0e0e0);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.project-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
}

.tech-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}

.tech-chip-preview {
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.75rem 1.25rem;
  border-radius: 1.5rem;
  max-width: 100%;
  white-space: nowrap;
  box-sizing: border-box;
}

.more-tech {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  font-weight: 500;
}

.project-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.images-column {
  position: sticky;
  top: 2rem;
}

.image-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1rem;
}

.gallery-item {
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.gallery-item:hover {
  transform: scale(1.05);
}

.gallery-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.content-column {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.content-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.content-card:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #fff;
}

.section-icon {
  color: var(--q-primary);
  font-size: 1.25rem;
}

.section-content {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  font-size: 1rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  padding: 0.5rem 0;
  position: relative;
  padding-left: 1.5rem;
}

.feature-list li::before {
  content: '•';
  color: var(--q-primary);
  font-weight: bold;
  position: absolute;
  left: 0;
  font-size: 1.2rem;
}

.custom-lightbox {
  position: relative;
  background: #222;
  border-radius: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  max-width: 1000px;
  max-height: 90vh;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lightbox-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 2;
  color: #fff;
  background: rgba(0, 0, 0, 0.2);
  transition: background 0.2s;
}
.lightbox-close:hover {
  background: rgba(0, 0, 0, 0.4);
}

.lightbox-img {
  max-width: 100%;
  max-height: 60vh;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  background: #111;
  object-fit: contain;
}

.lightbox-caption {
  color: #eee;
  font-size: 1rem;
  text-align: center;
  margin-top: 0.5rem;
  word-break: break-word;
}

.not-found {
  text-align: center;
  margin-top: 4rem;
  color: rgba(255, 255, 255, 0.8);
}

.improved-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 1rem;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  margin-top: 2rem;
  animation: fadeIn 0.7s;
}

.not-found-icon {
  margin-bottom: 1rem;
  animation: bounceIn 1s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounceIn {
  0% {
    transform: scale(0.7);
  }
  60% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@media (max-width: 1024px) {
  .project-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .images-column {
    position: static;
  }

  .image-grid {
    grid-template-columns: 1fr 1fr;
  }

  .project-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .project-detail-page {
    padding: 1rem;
  }

  .project-title {
    font-size: 1.75rem;
  }

  .content-card {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .image-grid {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .gallery-img {
    height: 120px;
  }
}

@media (max-width: 480px) {
  .project-title {
    font-size: 1.75rem;
  }

  .content-card {
    padding: 1rem;
  }
}

@media (max-width: 600px) {
  .tech-preview {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
    justify-content: center;
  }
  .tech-chip-preview {
    width: auto;
    justify-content: center;
    text-align: center;
    font-size: 1rem;
    padding: 0.5rem 0.75rem;
  }
}

body,
html {
  overflow-x: hidden;
}

.custom-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  width: 100%;
  animation: fadeIn 0.5s;
}

.loader-text {
  margin-top: 1.5rem;
  color: #fff;
  font-size: 1.2rem;
  letter-spacing: 0.02em;
  opacity: 0.8;
}
</style>
