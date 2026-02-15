<template>
  <div class="search-input-wrapper">
    <q-input
      v-model="modelValue"
      :placeholder="placeholder"
      dense
      borderless
      class="search-input"
      :aria-label="ariaLabel"
      @keydown.escape="handleClear"
    >
      <template #prepend>
        <q-icon name="search" class="search-icon" />
      </template>
      <template v-if="modelValue" #append>
        <q-btn
          flat
          dense
          round
          icon="clear"
          size="sm"
          class="clear-btn"
          aria-label="Clear search"
          @click="handleClear"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue: string;
  placeholder?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search projects...',
  ariaLabel: 'Search projects by title or description',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'clear'): void;
}>();

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
});

const handleClear = () => {
  emit('update:modelValue', '');
  emit('clear');
};
</script>

<style scoped>
.search-input-wrapper {
  flex: 0 0 auto;
  min-width: 200px;
  max-width: var(--search-max-width, 280px);
}

.search-input {
  background: var(--bg-charcoal);
  border: 1px solid var(--accent-teal);
  border-radius: 10px;
  padding: 0.25rem 0.75rem;
  transition: var(--filter-transition, all 0.3s ease);
  height: var(--search-height, 44px);
  color: var(--text-white);
}

.search-input:hover {
  background: var(--bg-charcoal);
  box-shadow: 2px 2px 0px rgba(0, 173, 181, 0.4);
}

.search-input:focus-within {
  background: var(--bg-charcoal);
  box-shadow: 4px 4px 0px rgba(0, 173, 181, 0.6);
  border-color: var(--accent-teal);
}

.search-input :deep(.q-field__control) {
  height: 100%;
}

.search-input :deep(.q-field__native) {
  color: var(--text-white);
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  padding: 0;
}

.search-input :deep(.q-field__native::placeholder) {
  color: rgba(255, 255, 255, 0.5);
}

.search-icon {
  color: var(--accent-teal);
  font-size: 1.125rem;
}

.clear-btn {
  color: rgba(255, 255, 255, 0.6) !important;
  transition: all 0.2s ease;
}

.clear-btn:hover {
  color: white !important;
  background: rgba(255, 255, 255, 0.15) !important;
}

.clear-btn:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

@media (max-width: 768px) {
  .search-input-wrapper {
    min-width: 100%;
    max-width: 100%;
  }

  .search-input {
    height: 40px;
  }
}
</style>
