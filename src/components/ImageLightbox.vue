<template>
  <q-dialog
    v-model="isOpen"
    :aria-label="title ? `${title} screenshots` : 'Image viewer'"
    @keydown="handleKeydown"
  >
    <div class="lightbox" v-touch-swipe.mouse.horizontal="onSwipe">
      <button class="lb-close" @click="isOpen = false" aria-label="Close lightbox">
        <q-icon name="close" size="sm" />
      </button>
      <button
        v-if="images.length > 1"
        class="lb-nav lb-prev"
        :disabled="index === 0"
        @click="prevImage"
        aria-label="Previous image"
      >
        <q-icon name="chevron_left" />
      </button>
      <picture>
        <source :srcset="webpFrom(images[index])" type="image/webp" />
        <img
          :src="images[index]"
          :alt="`${title} screenshot ${index + 1}`"
          class="lb-img"
          decoding="async"
        />
      </picture>
      <button
        v-if="images.length > 1"
        class="lb-nav lb-next"
        :disabled="index >= images.length - 1"
        @click="nextImage"
        aria-label="Next image"
      >
        <q-icon name="chevron_right" />
      </button>
      <div
        v-if="images.length > 1"
        ref="stripEl"
        class="lb-strip"
        role="group"
        aria-label="Screenshots"
      >
        <button
          v-for="(img, i) in images"
          :key="img"
          type="button"
          class="lb-thumb"
          :class="{ 'is-active': i === index }"
          :aria-current="i === index ? 'true' : undefined"
          :aria-label="`Go to screenshot ${i + 1}`"
          @click="index = i"
        >
          <picture>
            <source :srcset="webpFrom(img)" type="image/webp" />
            <img :src="img" :alt="''" loading="lazy" decoding="async" />
          </picture>
        </button>
      </div>
      <div class="lb-caption" aria-live="polite" aria-atomic="true">
        {{ title }} — {{ index + 1 }} / {{ images.length }}
      </div>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { webpFrom } from '../utils/images';

interface Props {
  modelValue: boolean;
  images: string[];
  title: string;
  startIndex?: number;
}

const props = withDefaults(defineProps<Props>(), {
  startIndex: 0,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

// The active slide is the component's own concern; it seeds from `startIndex`
// each time the dialog opens so the caller only has to set which image to show.
const index = ref(props.startIndex);
watch(
  () => props.modelValue,
  (open) => {
    if (open) index.value = props.startIndex;
  },
);

// Keep the active thumbnail visible as the slide changes so it never scrolls
// out of the horizontally-scrolling strip during arrow/swipe navigation.
const stripEl = ref<HTMLElement | null>(null);
watch(index, async () => {
  await nextTick();
  const active = stripEl.value?.querySelector<HTMLElement>('.lb-thumb.is-active');
  if (!active) return;
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  active.scrollIntoView({
    inline: 'nearest',
    block: 'nearest',
    behavior: smooth ? 'smooth' : 'auto',
  });
});

function prevImage() {
  if (index.value > 0) index.value--;
}
function nextImage() {
  if (index.value < props.images.length - 1) index.value++;
}
function onSwipe({ direction }: { direction?: string }) {
  if (direction === 'left') nextImage();
  else if (direction === 'right') prevImage();
}
function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') prevImage();
  else if (event.key === 'ArrowRight') nextImage();
  else if (event.key === 'Escape') isOpen.value = false;
}
</script>

<style scoped>
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
  transition: background-color 0.2s ease, border-color 0.2s ease,
    color 0.2s ease, opacity 0.2s ease;
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
  border-color: #00adb5;
  color: #00adb5;
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
  border-color: #00adb5;
  color: #00adb5;
}

.lb-close:focus-visible,
.lb-nav:focus-visible {
  outline: 2px solid #00adb5;
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
  width: 100%;
  max-width: 100%;
  height: min(65vh, 65svh);
  object-fit: contain;
  border-radius: 2px;
  background: #111;
  margin-bottom: 0.75rem;
}

.lb-caption {
  color: rgba(255, 255, 255, 0.75);
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
  border-color: #00adb5;
}

.lb-thumb:focus-visible {
  outline: 2px solid #00adb5;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
</style>
