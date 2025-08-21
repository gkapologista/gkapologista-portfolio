<template>
  <div>
    <div class="cursor" ref="cursor">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="#A64D79"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <div class="cursor-dot" ref="cursorDot">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const cursor = ref<HTMLElement | null>(null);
const cursorDot = ref<HTMLElement | null>(null);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let cursorDotX = 0;
let cursorDotY = 0;

const updateCursorPosition = (e: MouseEvent) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

const updateCursor = () => {
  if (!cursor.value || !cursorDot.value) return;

  // Smooth movement for main cursor
  const dx = mouseX - cursorX;
  const dy = mouseY - cursorY;
  cursorX += dx * 0.25;
  cursorY += dy * 0.25;
  cursor.value.style.transform = `translate(${cursorX - 12}px, ${
    cursorY - 12
  }px)`;

  // Faster movement for dot cursor
  const dotDx = mouseX - cursorDotX;
  const dotDy = mouseY - cursorDotY;
  cursorDotX += dotDx * 1.0;
  cursorDotY += dotDy * 1.0;
  cursorDot.value.style.transform = `translate(${cursorDotX - 12}px, ${
    cursorDotY - 12
  }px)`;

  requestAnimationFrame(updateCursor);
};

onMounted(() => {
  document.addEventListener('mousemove', updateCursorPosition);
  updateCursor();
});

onUnmounted(() => {
  document.removeEventListener('mousemove', updateCursorPosition);
});
</script>

<style scoped>
.cursor,
.cursor-dot {
  position: fixed;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
  pointer-events: none;
  z-index: 99999;
  will-change: transform;
  mix-blend-mode: difference;
}

.cursor svg,
.cursor-dot svg {
  width: 100%;
  height: 100%;
}
</style>
