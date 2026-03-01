<template>
  <GlitchTransition :show="isTransitioning" />
  <router-view />
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import { useRouter } from 'vue-router';
import GlitchTransition from './components/GlitchTransition.vue';

const isTransitioning = ref(false);
const router = useRouter();

// Global Transition Guard
router.beforeEach(async () => {
  // Avoid re-triggering if we are already in the middle of a transition
  if (isTransitioning.value) return true;

  isTransitioning.value = true;

  // Hold the navigation for 300ms to allow the glitch to "hit"
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Proceed with navigation and schedule the hide
  setTimeout(() => {
    isTransitioning.value = false;
  }, 400);

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
  background-color: #1a1a1d;
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
