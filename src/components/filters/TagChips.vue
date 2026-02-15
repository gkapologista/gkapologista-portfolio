<template>
  <div class="tag-chips-wrapper" role="group" :aria-label="ariaLabel">
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

const hasMoreTags = computed(
  () => props.availableTags.length > props.maxVisible
);
const hiddenCount = computed(
  () => props.availableTags.length - props.maxVisible
);

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
  font-family: 'JetBrains Mono', monospace;
  font-weight: 500;
  font-size: 0.8125rem;
  padding: 0.375rem 0.625rem;
  border-radius: 10px;
  background: var(--bg-charcoal) !important;
  border: 1px solid var(--accent-teal);
  color: var(--accent-teal) !important;
  transition: all 0.25s ease;
  cursor: pointer;
  height: var(--tag-chip-height, 32px);
  flex-shrink: 0;
  white-space: nowrap;
}

.tag-chip:hover {
  background: var(--bg-charcoal) !important;
  border-color: var(--accent-teal);
  transform: translateY(-2px);
  box-shadow: 4px 4px 0px rgba(0, 173, 181, 0.4);
}

.tag-chip--active {
  background: var(--accent-teal) !important;
  border-color: var(--accent-teal);
  color: var(--bg-charcoal) !important;
  font-weight: 600;
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.3);
}

.tag-chip--active:hover {
  background: var(--accent-teal) !important;
  transform: translateY(-2px);
  box-shadow: 6px 6px 0px rgba(0, 0, 0, 0.4);
}

.tag-chip--more {
  background: var(--bg-charcoal) !important;
  border: 1px dashed var(--accent-teal);
  color: var(--accent-teal) !important;
  font-style: italic;
  opacity: 0.7;
}

.tag-chip--more:hover {
  background: var(--bg-charcoal) !important;
  color: var(--text-white) !important;
  opacity: 1;
  border-style: solid;
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
