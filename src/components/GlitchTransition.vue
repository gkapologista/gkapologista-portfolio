<template>
  <transition name="glitch-fade">
    <div v-if="isVisible" ref="overlay" class="glitch-overlay">
      <div class="glitch-content">
        <div class="glitch-text" data-text="FETCHING_DATA...">
          FETCHING_DATA...
        </div>
        <div class="glitch-bar"></div>
        <div class="scanlines"></div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import { gsap } from 'gsap';

const props = defineProps<{
  show: boolean;
}>();

const isVisible = ref(false);
const overlay = ref<HTMLElement | null>(null);

watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      isVisible.value = true;
      nextTick(() => {
        startGlitch();
      });
    } else {
      // Small delay to ensure the target page is ready
      setTimeout(() => {
        isVisible.value = false;
      }, 50);
    }
  }
);

const startGlitch = () => {
  if (!overlay.value) return;

  // GSAP animations for chromatic aberration and jitter
  // Real implementation would target specific CSS variables or elements
  gsap.to(overlay.value, {
    duration: 0.1,
    repeat: -1,
    yoyo: true,
    skewX: () => (Math.random() - 0.5) * 5,
    ease: 'power1.inOut',
  });
};
</script>

<style scoped>
.glitch-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: var(--bg-charcoal);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: var(--accent-teal);
  font-family: 'JetBrains Mono', monospace;
}

.glitch-text {
  font-size: 2rem;
  font-weight: bold;
  position: relative;
  text-transform: uppercase;
}

.glitch-text::before,
.glitch-text::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text::before {
  color: #ff00ff;
  left: 2px;
  text-shadow: -2px 0 red;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim 5s infinite linear alternate-reverse;
}

.glitch-text::after {
  color: #00ffff;
  left: -2px;
  text-shadow: -2px 0 blue;
  clip: rect(44px, 450px, 56px, 0);
  animation: glitch-anim2 5s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
  0% {
    clip: rect(31px, 9999px, 94px, 0);
  }
  20% {
    clip: rect(62px, 9999px, 42px, 0);
  }
  40% {
    clip: rect(10px, 9999px, 80px, 0);
  }
  60% {
    clip: rect(60px, 9999px, 90px, 0);
  }
  80% {
    clip: rect(40px, 9999px, 20px, 0);
  }
  100% {
    clip: rect(50px, 9999px, 70px, 0);
  }
}

@keyframes glitch-anim2 {
  0% {
    clip: rect(65px, 9999px, 100px, 0);
  }
  20% {
    clip: rect(20px, 9999px, 60px, 0);
  }
  40% {
    clip: rect(30px, 9999px, 80px, 0);
  }
  60% {
    clip: rect(90px, 9999px, 10px, 0);
  }
  80% {
    clip: rect(10px, 9999px, 40px, 0);
  }
  100% {
    clip: rect(80px, 9999px, 20px, 0);
  }
}

.scanlines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%),
    linear-gradient(
      90deg,
      rgba(255, 0, 0, 0.03),
      rgba(0, 255, 0, 0.01),
      rgba(0, 0, 255, 0.03)
    );
  background-size: 100% 2px, 3px 100%;
  pointer-events: none;
}

.glitch-fade-enter-active,
.glitch-fade-leave-active {
  transition: opacity 0.3s ease;
}

.glitch-fade-enter-from,
.glitch-fade-leave-to {
  opacity: 0;
}
</style>
