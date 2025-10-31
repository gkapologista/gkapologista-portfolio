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
      <div ref="stageEl" class="lb-stage">
        <picture>
          <source :srcset="webpFrom(images[index])" type="image/webp" />
          <img
            :src="images[index]"
            :alt="`${title} screenshot ${index + 1}`"
            class="lb-img"
            :class="{ 'is-zoomed': isZoomed }"
            :style="imgStyle"
            decoding="async"
            @load="onImgLoad"
            @error="onImgLoad"
            @click="onImgClick"
            @pointerdown="onImgPointerDown"
            @pointermove="onImgPointerMove"
            @pointerup="onImgPointerUp"
            @pointercancel="onImgPointerUp"
          />
        </picture>
        <div v-if="loading" class="lb-spinner" aria-hidden="true">
          <q-spinner color="primary" size="2.5em" />
        </div>
      </div>
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
import { usePrefetch } from '../composables/usePrefetch';

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

// Loading affordance + click-to-zoom/pan state.
const { prefetchImages } = usePrefetch();
const stageEl = ref<HTMLElement | null>(null);
const loading = ref(true);

const ZOOM = 2.5;
const zoom = ref(1);
const panX = ref(0);
const panY = ref(0);
const isZoomed = computed(() => zoom.value > 1);
const imgStyle = computed(() => ({
  transform: `translate(${panX.value}px, ${panY.value}px) scale(${zoom.value})`,
  cursor: isZoomed.value ? 'grab' : 'zoom-in',
}));

function resetZoom() {
  zoom.value = 1;
  panX.value = 0;
  panY.value = 0;
}

// Warm the immediate neighbours so prev/next feels instant.
function prefetchNeighbors() {
  const urls: string[] = [];
  for (const i of [index.value - 1, index.value + 1]) {
    if (i >= 0 && i < props.images.length) {
      urls.push(webpFrom(props.images[i]), props.images[i]);
    }
  }
  if (urls.length) prefetchImages(urls);
}

// Reset transient state whenever a new slide becomes active.
function onSlideChange() {
  resetZoom();
  loading.value = true;
  prefetchNeighbors();
}

watch(
  () => props.modelValue,
  (open) => {
    if (!open) return;
    index.value = props.startIndex;
    onSlideChange();
  },
);

// Keep the active thumbnail visible as the slide changes so it never scrolls
// out of the horizontally-scrolling strip during arrow/swipe navigation.
const stripEl = ref<HTMLElement | null>(null);
watch(index, async () => {
  onSlideChange();
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
  // While zoomed, pointer drags pan the image instead of switching slides.
  if (isZoomed.value) return;
  if (direction === 'left') nextImage();
  else if (direction === 'right') prevImage();
}
function handleKeydown(event: KeyboardEvent) {
  // Escape is handled by q-dialog itself; only arrows are ours to wire up.
  if (event.key === 'ArrowLeft') prevImage();
  else if (event.key === 'ArrowRight') nextImage();
}

function onImgLoad() {
  loading.value = false;
}

function clamp(value: number, limit: number) {
  return Math.max(-limit, Math.min(limit, value));
}
function panLimitX() {
  return ((stageEl.value?.clientWidth ?? 0) * (zoom.value - 1)) / 2;
}
function panLimitY() {
  return ((stageEl.value?.clientHeight ?? 0) * (zoom.value - 1)) / 2;
}

// Pointer bookkeeping so a tap toggles zoom while a drag pans (and never both).
let pressed = false;
let panning = false;
let captured = false;
let dragMoved = false;
let startX = 0;
let startY = 0;
let panBaseX = 0;
let panBaseY = 0;

function onImgPointerDown(event: PointerEvent) {
  pressed = true;
  dragMoved = false;
  startX = event.clientX;
  startY = event.clientY;
  panBaseX = panX.value;
  panBaseY = panY.value;
  panning = isZoomed.value;
  if (panning) {
    (event.target as HTMLElement).setPointerCapture?.(event.pointerId);
    captured = true;
  }
}
function onImgPointerMove(event: PointerEvent) {
  if (!pressed) return;
  const dx = event.clientX - startX;
  const dy = event.clientY - startY;
  if (Math.abs(dx) > 4 || Math.abs(dy) > 4) dragMoved = true;
  if (panning) {
    panX.value = clamp(panBaseX + dx, panLimitX());
    panY.value = clamp(panBaseY + dy, panLimitY());
  }
}
function onImgPointerUp(event: PointerEvent) {
  pressed = false;
  panning = false;
  if (captured) {
    (event.target as HTMLElement).releasePointerCapture?.(event.pointerId);
    captured = false;
  }
}
function onImgClick(event: MouseEvent) {
  // Swallow the click that ends a drag so it doesn't also toggle zoom.
  if (dragMoved) {
    dragMoved = false;
    return;
  }
  if (isZoomed.value) {
    resetZoom();
    return;
  }
  const stage = stageEl.value;
  if (!stage) {
    zoom.value = ZOOM;
    return;
  }
  // Zoom toward the clicked point by translating it back to centre.
  const rect = stage.getBoundingClientRect();
  const dx = event.clientX - (rect.left + rect.width / 2);
  const dy = event.clientY - (rect.top + rect.height / 2);
  zoom.value = ZOOM;
  panX.value = clamp(-dx * (ZOOM - 1), panLimitX());
  panY.value = clamp(-dy * (ZOOM - 1), panLimitY());
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

.lb-stage {
  position: relative;
  width: 100%;
  height: min(65vh, 65svh);
  margin-bottom: 0.75rem;
  overflow: hidden;
  background: #111;
  border-radius: 2px;
}

.lb-stage picture {
  display: contents;
}

.lb-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  transform-origin: center center;
  transition: transform 0.2s ease;
}

.lb-img.is-zoomed {
  cursor: grab;
  /* Let pointer panning own the gesture instead of browser scroll/zoom. */
  touch-action: none;
}

.lb-spinner {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
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
  width: 72px;
  height: 48px;
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
