import { computed, ref, type Ref } from 'vue';
import type { Project } from '../data/projects';

export const categories = ['Web Application', 'Game', 'System'] as const;
export type Category = (typeof categories)[number];

export function useFilters(projects: Ref<Project[]>) {
  const selectedCategories = ref<Category[]>([]);

  const filteredProjects = computed(() => {
    if (selectedCategories.value.length === 0) return projects.value;
    return projects.value.filter((p) =>
      selectedCategories.value.includes(p.category as Category)
    );
  });

  const toggleCategory = (category: Category) => {
    const index = selectedCategories.value.indexOf(category);
    if (index > -1) {
      selectedCategories.value.splice(index, 1);
    } else {
      selectedCategories.value.push(category);
    }
  };

  const removeFilter = (category: Category) => {
    const index = selectedCategories.value.indexOf(category);
    if (index > -1) {
      selectedCategories.value.splice(index, 1);
    }
  };

  const clearFilters = () => {
    selectedCategories.value = [];
  };

  return {
    selectedCategories,
    filteredProjects,
    toggleCategory,
    removeFilter,
    clearFilters,
  };
}

