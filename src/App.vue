<template>
  <GlitchTransition :show="isTransitioning" />
  <router-view />
  <ThemeToggle />
</template>

<script setup lang="ts">
import { ref, provide, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import GlitchTransition from './components/GlitchTransition.vue';
import ThemeToggle from './components/ThemeToggle.vue';
import { useTheme } from './composables/useTheme';
import { projects } from './data/projects';

const { init: initTheme } = useTheme();
onMounted(() => initTheme());

const isTransitioning = ref(false);
const currentTransitionText = ref('FETCHING_DATA...');
const router = useRouter();

// Global Transition Guard
router.beforeEach(async (to) => {
  // Avoid re-triggering if we are already in the middle of a transition
  if (isTransitioning.value) return true;

  // Resolve Transition Text
  if (to.name === 'ProjectDetail') {
    const slug = to.params.slug;
    const project = projects.find((p) => p.slug === slug);
    if (project) {
      currentTransitionText.value = `DECRYPTING: ${project.title.toUpperCase()} ARCHIVES...`;
    } else {
      currentTransitionText.value = 'FETCHING_DATA...';
    }
  } else {
    currentTransitionText.value = (to.meta.transitionText as string) || 'FETCHING_DATA...';
  }

  isTransitioning.value = true;

  // Briefly hold the navigation so the glitch "hits" without adding noticeable latency
  await new Promise((resolve) => setTimeout(resolve, 120));

  // Proceed with navigation and schedule the hide
  setTimeout(() => {
    isTransitioning.value = false;
  }, 250);

  return true;
});

provide('transition', {
  isTransitioning,
});
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-body, #1a1a1d);
}

#app {
  width: 100%;
  height: 100%;
}

.full-height {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.text-h2 {
  font-size: 2.5rem;
  line-height: 1.2;
  font-weight: 500;
}
</style>
