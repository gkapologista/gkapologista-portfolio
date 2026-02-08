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
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--filter-radius, 0.75rem);
  padding: 0.25rem 0.75rem;
  transition: var(--filter-transition, all 0.3s ease);
  height: var(--search-height, 44px);
}

.search-input:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
}

.search-input:focus-within {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.35);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
}

.search-input :deep(.q-field__control) {
  height: 100%;
}

.search-input :deep(.q-field__native) {
  color: white;
  font-family: 'Outfit', sans-serif;
  font-size: 0.875rem;
  padding: 0;
}

.search-input :deep(.q-field__native::placeholder) {
  color: rgba(255, 255, 255, 0.5);
}

.search-icon {
  color: rgba(255, 255, 255, 0.6);
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
