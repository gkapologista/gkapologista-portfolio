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
        <h1 class="text-h2 text-white q-mb-xl">My Projects</h1>
        <q-btn
          flat
          icon="home"
          label="Home"
          @click="goHome"
          class="home-btn q-mb-xl"
        />
      </div>

      <div class="projects-grid">
        <router-link
          v-for="project in projects"
          :key="project.id"
          :to="{ name: 'ProjectDetail', params: { slug: project.slug } }"
          class="project-card-link"
        >
          <div class="project-card">
            <div class="project-image">
              <img :src="project.images[0]" :alt="project.title" />
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { projects } from '../data/projects';
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = () => {
  router.push('/');
};
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
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
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
}

@media (max-width: 768px) {
  .projects-page {
    padding: 1rem;
  }

  .text-h2 {
    font-size: 2.5rem;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-card {
    height: 370px;
    min-height: 370px;
    max-height: 370px;
  }

  .project-image {
    height: 140px;
  }
}
</style>
