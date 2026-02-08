<template>
  <div
    class="tag-chips-wrapper"
    role="group"
    :aria-label="ariaLabel"
  >
    <div class="tag-chips-scroll" ref="scrollContainer">
      <q-chip
        v-for="tag in displayedTags"
        :key="tag"
        :class="{
          'tag-chip': true,
          'tag-chip--active': modelValue.includes(tag),
        }"
        :color="modelValue.includes(tag) ? 'white' : undefined"
        :text-color="modelValue.includes(tag) ? 'secondary' : undefined"
        clickable
        size="sm"
        :aria-pressed="modelValue.includes(tag)"
        :aria-label="`Filter by ${tag}`"
        @click="toggleTag(tag)"
      >
        {{ tag }}
      </q-chip>

      <q-chip
        v-if="hasMoreTags && !showAll"
        clickable
        size="sm"
        class="tag-chip tag-chip--more"
        aria-label="Show all tags"
        @click="showAll = true"
      >
        +{{ hiddenCount }} more
      </q-chip>

      <q-chip
        v-if="showAll && hasMoreTags"
        clickable
        size="sm"
        class="tag-chip tag-chip--more"
        aria-label="Show fewer tags"
        @click="showAll = false"
      >
        Show less
      </q-chip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Props {
  modelValue: string[];
  availableTags: string[];
  maxVisible?: number;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  maxVisible: 10,
  ariaLabel: 'Filter by technology tags',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
}>();

const showAll = ref(false);
const scrollContainer = ref<HTMLElement | null>(null);

const hasMoreTags = computed(() => props.availableTags.length > props.maxVisible);
const hiddenCount = computed(() => props.availableTags.length - props.maxVisible);

const displayedTags = computed(() => {
  if (showAll.value || !hasMoreTags.value) {
    return props.availableTags;
  }

  // Always show selected tags even if they would be hidden
  const visibleTags = props.availableTags.slice(0, props.maxVisible);
  const selectedHiddenTags = props.modelValue.filter(
    (tag) => !visibleTags.includes(tag)
  );

  return [...visibleTags, ...selectedHiddenTags];
});

const toggleTag = (tag: string) => {
  const newValue = props.modelValue.includes(tag)
    ? props.modelValue.filter((t) => t !== tag)
    : [...props.modelValue, tag];

  emit('update:modelValue', newValue);

  // Debug logging for verification
  if (import.meta.env.DEV) {
    console.log('[TagChips] Tag toggled:', {
      tag,
      isSelected: !props.modelValue.includes(tag),
      newSelection: newValue,
    });
  }
};
</script>

<style scoped>
.tag-chips-wrapper {
  flex: 1;
  min-width: 0;
  overflow: hidden;
}

.tag-chips-scroll {
  display: flex;
  flex-wrap: nowrap;
  gap: var(--tag-chip-gap, 0.5rem);
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.25rem 0;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
}

.tag-chips-scroll::-webkit-scrollbar {
  height: 4px;
}

.tag-chips-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.tag-chips-scroll::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.tag-chips-scroll::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

.tag-chip {
  font-family: 'Outfit', sans-serif;
  font-weight: 500;
  font-size: 0.8125rem;
  padding: 0.375rem 0.625rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.1) !important;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.85) !important;
  transition: all 0.25s ease;
  cursor: pointer;
  height: var(--tag-chip-height, 32px);
  flex-shrink: 0;
  white-space: nowrap;
}

.tag-chip:hover {
  background: rgba(255, 255, 255, 0.18) !important;
  border-color: rgba(255, 255, 255, 0.35);
  transform: translateY(-1px);
}

.tag-chip--active {
  background: rgba(255, 255, 255, 0.95) !important;
  border-color: rgba(255, 255, 255, 0.5);
  color: var(--q-secondary) !important;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(166, 77, 121, 0.3);
}

.tag-chip--active:hover {
  background: white !important;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(166, 77, 121, 0.4);
}

.tag-chip--more {
  background: rgba(255, 255, 255, 0.05) !important;
  border-style: dashed;
  color: rgba(255, 255, 255, 0.6) !important;
  font-style: italic;
}

.tag-chip--more:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  color: rgba(255, 255, 255, 0.85) !important;
}

.tag-chip:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

@media (max-width: 768px) {
  .tag-chip {
    font-size: 0.75rem;
    height: 28px;
    padding: 0.25rem 0.5rem;
  }
}
</style>
