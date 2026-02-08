<template>
  <div class="category-dropdown-wrapper">
    <q-select
      v-model="modelValue"
      :options="categoryOptions"
      multiple
      dense
      borderless
      emit-value
      map-options
      use-chips
      :label="selectedCount > 0 ? undefined : 'Categories'"
      class="category-dropdown"
      popup-content-class="category-dropdown-popup"
      :aria-label="ariaLabel"
    >
      <template #prepend>
        <q-icon name="filter_list" class="dropdown-icon" />
      </template>

      <template #selected-item="scope">
        <q-chip
          dense
          removable
          color="white"
          text-color="secondary"
          class="selected-chip"
          @remove="scope.removeAtIndex(scope.index)"
        >
          {{ scope.opt.label }}
        </q-chip>
      </template>

      <template #option="scope">
        <q-item v-bind="scope.itemProps" class="dropdown-option">
          <q-item-section>
            <q-item-label>{{ scope.opt.label }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon
              v-if="scope.selected"
              name="check"
              color="white"
              size="xs"
            />
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { categories, type Category } from '../../composables/useFilters';

interface Props {
  modelValue: Category[];
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  ariaLabel: 'Filter by project category',
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: Category[]): void;
}>();

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: Category[]) => emit('update:modelValue', value),
});

const categoryOptions = categories.map((cat) => ({
  label: cat,
  value: cat,
}));

const selectedCount = computed(() => props.modelValue.length);
</script>

<style scoped>
.category-dropdown-wrapper {
  flex: 0 0 auto;
  min-width: 160px;
}

.category-dropdown {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: var(--filter-radius, 0.75rem);
  padding: 0.25rem 0.5rem;
  transition: var(--filter-transition, all 0.3s ease);
  min-height: var(--search-height, 44px);
}

.category-dropdown:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.25);
}

.category-dropdown:focus-within {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.35);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
}

.category-dropdown :deep(.q-field__control) {
  min-height: 36px;
}

.category-dropdown :deep(.q-field__label) {
  color: rgba(255, 255, 255, 0.6);
  font-family: 'Outfit', sans-serif;
  font-size: 0.875rem;
}

.category-dropdown :deep(.q-field__native) {
  color: white;
  font-family: 'Outfit', sans-serif;
}

.category-dropdown :deep(.q-select__dropdown-icon) {
  color: rgba(255, 255, 255, 0.6);
}

.dropdown-icon {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.125rem;
}

.selected-chip {
  font-family: 'Outfit', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  margin: 2px;
}

.selected-chip :deep(.q-chip__icon--remove) {
  color: var(--q-secondary);
  opacity: 0.7;
}

.selected-chip :deep(.q-chip__icon--remove:hover) {
  opacity: 1;
}

@media (max-width: 768px) {
  .category-dropdown-wrapper {
    min-width: auto;
    flex: 1;
  }

  .category-dropdown {
    min-height: 40px;
  }
}
</style>

<style>
/* Popup styles (not scoped) */
.category-dropdown-popup {
  background: rgba(40, 20, 35, 0.95) !important;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 0.75rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.category-dropdown-popup .q-item {
  color: rgba(255, 255, 255, 0.85);
  font-family: 'Outfit', sans-serif;
  min-height: 40px;
  transition: background 0.2s ease;
}

.category-dropdown-popup .q-item:hover {
  background: rgba(255, 255, 255, 0.1);
}

.category-dropdown-popup .q-item--active {
  background: rgba(255, 255, 255, 0.15);
}
</style>
