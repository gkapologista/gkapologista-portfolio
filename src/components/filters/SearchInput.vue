<template>
  <div class="search-input-wrapper">
    <div
      class="search-input"
      :class="{
        'search-input--focused': isFocused,
        'search-input--active': props.modelValue || isFocused,
        'search-input--scanning': props.isSearching,
      }"
    >
      <!-- Terminal prompt glyph -->
      <span class="search-prompt" aria-hidden="true">&gt;</span>

      <!-- Native input -->
      <input
        ref="inputEl"
        type="text"
        class="search-input__field"
        :value="props.modelValue"
        :placeholder="placeholder"
        :aria-label="ariaLabel"
        autocomplete="off"
        spellcheck="false"
        @input="handleInput"
        @keydown.escape="handleClear"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />

      <!-- Right-side status: mutually exclusive states -->
      <div class="search-status" aria-hidden="true">
        <span v-if="props.isSearching && props.modelValue" class="scanning-dots">
          <span class="dot" />
          <span class="dot" />
          <span class="dot" />
        </span>
        <span v-else-if="props.modelValue" class="char-count">[{{ props.modelValue.length }}]</span>

        <!-- Keyboard shortcut hint: only visible when idle and empty -->
        <Transition name="shortcut-fade">
          <span
            v-if="!props.modelValue && !isFocused"
            class="shortcut-hint"
            title="Press / to focus search"
          >[/]</span>
        </Transition>

        <button
          v-if="props.modelValue"
          type="button"
          class="clear-btn"
          :aria-label="`Clear search`"
          tabindex="-1"
          @click="handleClear"
        >
          <q-icon name="close" size="xs" />
        </button>
      </div>

      <!-- Scan line: v-if recreates the element each new debounce session,
           which resets the CSS animation to frame 0 automatically -->
      <div v-if="props.isSearching" class="scan-line" aria-hidden="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Props {
  modelValue: string;
  isSearching?: boolean;
  placeholder?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  isSearching: false,
  placeholder: 'title, tech, description...',
  ariaLabel: 'Search projects by title, technology, or description',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'clear'): void;
}>();

const inputEl = ref<HTMLInputElement | null>(null);
const isFocused = ref(false);

const handleInput = (e: Event) => {
  emit('update:modelValue', (e.target as HTMLInputElement).value);
};

const handleClear = () => {
  emit('update:modelValue', '');
  emit('clear');
  inputEl.value?.focus();
};

const handleSlashKey = (e: KeyboardEvent) => {
  if (e.key !== '/') return;
  const tag = (e.target as HTMLElement).tagName;
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;
  e.preventDefault();
  inputEl.value?.focus();
};

onMounted(() => document.addEventListener('keydown', handleSlashKey));
onUnmounted(() => document.removeEventListener('keydown', handleSlashKey));
</script>

<style scoped>
.search-input-wrapper {
  flex: 0 0 auto;
  min-width: 200px;
  max-width: var(--search-max-width, 280px);
}

/* ── Container ──────────────────────────────────────────────── */
.search-input {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  background: var(--bg-charcoal);
  border: 1px solid rgba(0, 173, 181, 0.45);
  border-radius: 10px;
  padding: 0 0.625rem 0 0.75rem;
  height: var(--search-height, 44px);
  box-sizing: border-box;
  overflow: hidden;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.search-input--focused,
.search-input--active {
  border-color: var(--accent-teal);
}

.search-input--focused {
  box-shadow: 0 0 0 1px rgba(0, 173, 181, 0.25), 4px 4px 0 rgba(0, 0, 0, 0.4);
}

.search-input--scanning {
  border-color: var(--accent-teal);
}

/* ── Prompt ─────────────────────────────────────────────────── */
.search-prompt {
  flex-shrink: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--accent-teal);
  line-height: 1;
  user-select: none;
  transition: opacity 0.2s ease;
}

.search-input--scanning .search-prompt {
  animation: prompt-pulse 0.9s ease-in-out infinite;
}

@keyframes prompt-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}

/* ── Input field ────────────────────────────────────────────── */
.search-input__field {
  flex: 1 1 auto;
  min-width: 0;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-white);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  line-height: 1;
  padding: 0;
  caret-color: var(--accent-teal);
}

.search-input__field::placeholder {
  color: rgba(238, 238, 238, 0.38);
  font-style: normal;
}

/* ── Status area ────────────────────────────────────────────── */
.search-status {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

/* Scanning dots */
.scanning-dots {
  display: flex;
  align-items: center;
  gap: 3px;
}

.dot {
  display: block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent-teal);
  animation: dot-wave 1.1s ease-in-out infinite;
}

.dot:nth-child(1) { animation-delay: 0ms; }
.dot:nth-child(2) { animation-delay: 160ms; }
.dot:nth-child(3) { animation-delay: 320ms; }

@keyframes dot-wave {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40%           { transform: scale(1);   opacity: 1; }
}

/* Character count badge */
.char-count {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgba(0, 173, 181, 0.7);
  white-space: nowrap;
}

/* Keyboard shortcut hint [/] */
.shortcut-hint {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgba(0, 173, 181, 0.5);
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
}

.shortcut-fade-enter-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
  transition-delay: 0.15s; /* slight delay so it doesn't flash on quick focus */
}

.shortcut-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.shortcut-fade-enter-from,
.shortcut-fade-leave-to {
  opacity: 0;
  transform: translateX(4px);
}

/* Clear button */
.clear-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background: none;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  color: rgba(238, 238, 238, 0.45);
  transition: color 0.15s ease, background 0.15s ease;
  padding: 0;
  line-height: 1;
}

.clear-btn:hover {
  color: var(--text-white);
  background: rgba(255, 255, 255, 0.1);
}

.clear-btn:focus-visible {
  outline: 2px solid var(--accent-teal);
  outline-offset: 1px;
}

/* ── Scan line ──────────────────────────────────────────────── */
/* Absolutely positioned inside .search-input (overflow: hidden clips it).
   The element is created/destroyed by v-if, so the animation always
   starts from frame 0 at the beginning of each debounce cycle. */
.scan-line {
  position: absolute;
  bottom: 0;
  left: -40%;
  width: 40%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(0, 173, 181, 0.6) 40%,
    var(--accent-teal) 50%,
    rgba(0, 173, 181, 0.6) 60%,
    transparent 100%
  );
  animation: scan-sweep 0.9s ease-in-out infinite;
  pointer-events: none;
}

@keyframes scan-sweep {
  0%   { left: -40%; }
  100% { left: 140%; }
}

/* ── Mobile ─────────────────────────────────────────────────── */
@media (max-width: 768px) {
  .search-input-wrapper {
    min-width: 100%;
    max-width: 100%;
  }

  .search-input {
    height: 40px;
  }
}

/* ── Reduced motion ─────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .scan-line {
    animation: none;
    left: 0;
    width: 100%;
    opacity: 0.5;
  }

  .dot {
    animation: none;
    opacity: 0.8;
    transform: scale(1);
  }

  .search-input--scanning .search-prompt {
    animation: none;
  }

  .shortcut-fade-enter-active,
  .shortcut-fade-leave-active {
    transition: opacity 0.15s ease;
  }

  .shortcut-fade-enter-from,
  .shortcut-fade-leave-to {
    opacity: 0;
    transform: none;
  }
}
</style>
