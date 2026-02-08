<template>
  <div
    class="project-filters"
    :class="{ 'project-filters--active': hasActiveFilters }"
    role="search"
    aria-label="Project filters"
  >
    <!-- Desktop/Tablet Layout -->
    <div class="filters-desktop">
      <SearchInput
        v-model="searchQuery"
        @clear="$emit('search-cleared')"
      />

      <div class="filters-divider" aria-hidden="true"></div>

      <CategoryDropdown v-model="selectedCategories" />

      <div class="filters-divider" aria-hidden="true"></div>

      <TagChips
        v-model="selectedTags"
        :available-tags="availableTags"
        :max-visible="8"
      />

      <transition name="fade">
        <div v-if="hasActiveFilters" class="filters-meta">
          <span class="results-count" aria-live="polite">
            <strong>{{ resultsCount }}</strong>
            {{ resultsCount === 1 ? 'project' : 'projects' }}
          </span>
          <q-btn
            flat
            dense
            round
            icon="clear_all"
            class="clear-all-btn"
            aria-label="Clear all filters"
            @click="handleClearAll"
          />
        </div>
      </transition>
    </div>

    <!-- Mobile Layout -->
    <div class="filters-mobile">
      <SearchInput
        v-model="searchQuery"
        @clear="$emit('search-cleared')"
      />

      <div class="filters-mobile-row">
        <CategoryDropdown v-model="selectedCategories" />

        <transition name="fade">
          <div v-if="hasActiveFilters" class="filters-meta-mobile">
            <span class="results-count-mobile" aria-live="polite">
              {{ resultsCount }}
            </span>
            <q-btn
              flat
              dense
              round
              icon="clear_all"
              size="sm"
              class="clear-all-btn-mobile"
              aria-label="Clear all filters"
              @click="handleClearAll"
            />
          </div>
        </transition>
      </div>

      <TagChips
        v-model="selectedTags"
        :available-tags="availableTags"
        :max-visible="6"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import SearchInput from './SearchInput.vue';
import CategoryDropdown from './CategoryDropdown.vue';
import TagChips from './TagChips.vue';
import type { Category } from '../../composables/useFilters';

interface Props {
  searchQuery: string;
  selectedCategories: Category[];
  selectedTags: string[];
  availableTags: string[];
  resultsCount: number;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void;
  (e: 'update:selectedCategories', value: Category[]): void;
  (e: 'update:selectedTags', value: string[]): void;
  (e: 'clear-all'): void;
  (e: 'search-cleared'): void;
}>();

// Two-way binding for search query
const searchQuery = computed({
  get: () => props.searchQuery,
  set: (value: string) => emit('update:searchQuery', value),
});

// Two-way binding for categories
const selectedCategories = computed({
  get: () => props.selectedCategories,
  set: (value: Category[]) => emit('update:selectedCategories', value),
});

// Two-way binding for tags
const selectedTags = computed({
  get: () => props.selectedTags,
  set: (value: string[]) => emit('update:selectedTags', value),
});

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return (
    props.searchQuery.trim() !== '' ||
    props.selectedCategories.length > 0 ||
    props.selectedTags.length > 0
  );
});

const handleClearAll = () => {
  emit('clear-all');

  // Debug logging for verification
  if (import.meta.env.DEV) {
    console.log('[ProjectFilters] All filters cleared');
  }
};
</script>

<style scoped>
.project-filters {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--filter-radius, 0.75rem);
  padding: var(--filter-padding, 0.75rem 1rem);
  transition: var(--filter-transition, all 0.3s ease);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.project-filters--active {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

/* Desktop Layout */
.filters-desktop {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.filters-mobile {
  display: none;
}

.filters-divider {
  width: 1px;
  height: 24px;
  background: rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
}

.filters-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-left: auto;
  flex-shrink: 0;
}

.results-count {
  font-family: 'Outfit', sans-serif;
  font-size: 0.8125rem;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
  padding: 0.25rem 0.625rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.375rem;
}

.results-count strong {
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  margin-right: 0.25rem;
}

.clear-all-btn {
  color: rgba(255, 255, 255, 0.7) !important;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.08) !important;
}

.clear-all-btn:hover {
  color: white !important;
  background: rgba(255, 255, 255, 0.15) !important;
  transform: scale(1.05);
}

.clear-all-btn:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.5);
  outline-offset: 2px;
}

/* Tablet Layout */
@media (max-width: 1024px) {
  .filters-desktop {
    flex-wrap: wrap;
  }

  .filters-divider:last-of-type {
    display: none;
  }
}

/* Mobile Layout */
@media (max-width: 768px) {
  .project-filters {
    padding: var(--filter-mobile-padding, 0.5rem 0.75rem);
  }

  .filters-desktop {
    display: none;
  }

  .filters-mobile {
    display: flex;
    flex-direction: column;
    gap: 0.625rem;
  }

  .filters-mobile-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .filters-meta-mobile {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    margin-left: auto;
    flex-shrink: 0;
  }

  .results-count-mobile {
    font-family: 'Outfit', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.8);
    background: rgba(255, 255, 255, 0.1);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    min-width: 24px;
    text-align: center;
  }

  .clear-all-btn-mobile {
    color: rgba(255, 255, 255, 0.7) !important;
    transition: all 0.2s ease;
  }

  .clear-all-btn-mobile:hover {
    color: white !important;
    background: rgba(255, 255, 255, 0.15) !important;
  }
}

/* Animations */
.fade-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
