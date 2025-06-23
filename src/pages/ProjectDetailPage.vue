<template>
  <div class="project-detail-page">
    <q-breadcrumbs class="q-mb-md">
      <q-breadcrumbs-el label="Projects" to="/" />
      <q-breadcrumbs-el :label="project?.title || 'Not Found'" />
    </q-breadcrumbs>
    <q-btn
      flat
      icon="arrow_back"
      label="Back"
      @click="goBack"
      class="q-mb-lg"
    />
    <q-skeleton v-if="loading" type="rect" height="400px" class="q-mb-lg" />
    <div v-else-if="project">
      <h1 class="project-title">{{ project.title }}</h1>
      <q-carousel
        v-if="project.images && project.images.length"
        v-model="carouselIndex"
        navigation
        navigation-position="bottom"
        arrows
        animated
        infinite
        class="q-mb-xl"
      >
        <q-carousel-slide
          v-for="(img, idx) in project.images"
          :key="img"
          :name="idx"
        >
          <img
            :src="img"
            :alt="project.title + ' screenshot ' + (idx + 1)"
            class="carousel-img"
            @click="openLightbox(idx)"
          />
        </q-carousel-slide>
      </q-carousel>
      <q-dialog v-model="lightbox" persistent maximized>
        <q-carousel
          v-if="project.images && project.images.length"
          v-model="carouselIndex"
          navigation
          navigation-position="bottom"
          arrows
          animated
          infinite
        >
          <q-carousel-slide
            v-for="(img, idx) in project.images"
            :key="img"
            :name="idx"
          >
            <img
              :src="img"
              :alt="project.title + ' screenshot ' + (idx + 1)"
              class="lightbox-img"
            />
          </q-carousel-slide>
        </q-carousel>
      </q-dialog>
      <section class="project-section">
        <h2>Overview & Objectives</h2>
        <p>{{ project.overview }}</p>
      </section>
      <section class="project-section">
        <h2>Technologies Used</h2>
        <div class="project-tags">
          <q-chip
            v-for="tech in project.technologies"
            :key="tech"
            color="white"
            text-color="secondary"
            size="sm"
            class="tech-chip"
          >
            {{ tech }}
          </q-chip>
        </div>
      </section>
      <section class="project-section">
        <h2>Key Features</h2>
        <ul>
          <li v-for="feature in project.features" :key="feature">
            {{ feature }}
          </li>
        </ul>
      </section>
      <section class="project-section">
        <h2>Challenges & Outcomes</h2>
        <ul>
          <li v-for="challenge in project.challenges" :key="challenge">
            {{ challenge }}
          </li>
        </ul>
      </section>
    </div>
    <div v-else class="not-found">
      <h2>Project Not Found</h2>
      <p>The project you are looking for does not exist.</p>
      <q-btn flat label="Back to Projects" to="/" />
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
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
  color: #fff;
}
.project-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}
.carousel-img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 1rem;
  cursor: zoom-in;
  transition: box-shadow 0.3s;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}
.lightbox-img {
  width: 100%;
  height: 80vh;
  object-fit: contain;
  background: #222;
}
.project-section {
  margin-bottom: 2rem;
}
.project-section h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #fff;
}
.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}
.tech-chip {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 0.5rem 0.75rem;
  background: rgba(255, 255, 255, 0.9) !important;
}
.not-found {
  text-align: center;
  margin-top: 4rem;
}
@media (max-width: 768px) {
  .project-detail-page {
    padding: 1rem 0.25rem;
  }
  .carousel-img {
    height: 200px;
  }
  .project-title {
    font-size: 1.5rem;
  }
}
</style>
