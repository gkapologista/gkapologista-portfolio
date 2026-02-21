<template>
  <GlitchTransition :show="isTransitioning" />
  <router-view />
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import GlitchTransition from './components/GlitchTransition.vue';

const isTransitioning = ref(false);

const triggerTransition = async (callback: () => Promise<void>) => {
  isTransitioning.value = true;
  // Give the glitch effect a moment to "hit"
  await new Promise((resolve) => setTimeout(resolve, 300));
  await callback();
  // Keep the overlay for a split second on the new page
  setTimeout(() => {
    isTransitioning.value = false;
  }, 400);
};

provide('transition', {
  isTransitioning,
  triggerTransition,
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
