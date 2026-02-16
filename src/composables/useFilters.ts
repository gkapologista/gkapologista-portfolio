import { computed, ref, watch, type Ref } from 'vue';
import type { Project } from '../data/projects';

export const categories = ['Web Application', 'Game', 'System'] as const;
export type Category = (typeof categories)[number];

/**
 * Debounce utility for search input
 */
function useDebounce<T>(value: Ref<T>, delay: number): Ref<T> {
  const debouncedValue = ref(value.value) as Ref<T>;
  let timeout: ReturnType<typeof setTimeout>;

  watch(value, (newValue) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      debouncedValue.value = newValue;
    }, delay);
  });

  return debouncedValue;
}

export function useFilters(projects: Ref<Project[]>) {
  // Search state
  const searchQuery = ref('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Category state
  const selectedCategories = ref<Category[]>([]);

  // Tag state
  const selectedTags = ref<string[]>([]);

  /**
   * Extract all unique tags from projects, sorted by frequency (most common first)
   */
  const availableTags = computed(() => {
    const tagCount = new Map<string, number>();

    projects.value.forEach((project) => {
      project.technologies.forEach((tech) => {
        tagCount.set(tech, (tagCount.get(tech) || 0) + 1);
      });
    });

    // Sort by frequency descending, then alphabetically
    return Array.from(tagCount.entries())
      .sort((a, b) => {
        if (b[1] !== a[1]) return b[1] - a[1];
        return a[0].localeCompare(b[0]);
      })
      .map(([tag]) => tag);
  });

  /**
   * Check if any filters are currently active
   */
  const hasActiveFilters = computed(() => {
    return (
      debouncedSearch.value.trim() !== '' ||
      selectedCategories.value.length > 0 ||
      selectedTags.value.length > 0
    );
  });

  /**
   * Filtered projects based on search, categories, and tags
   * Uses AND logic: all active filters must match
   */
  const filteredProjects = computed(() => {
    let result = projects.value;

    // Filter by search query (searches title and description)
    const searchTerm = debouncedSearch.value.trim().toLowerCase();
    if (searchTerm) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by categories (OR within categories)
    if (selectedCategories.value.length > 0) {
      result = result.filter((p) =>
        selectedCategories.value.includes(p.category as Category)
      );
    }

    // Filter by tags (AND - project must have ALL selected tags)
    if (selectedTags.value.length > 0) {
      result = result.filter((p) =>
        selectedTags.value.every((tag) => p.technologies.includes(tag))
      );
    }

    return result;
  });

  /**
   * Toggle a category filter on/off
   */
  const toggleCategory = (category: Category) => {
    const index = selectedCategories.value.indexOf(category);
    if (index > -1) {
      selectedCategories.value.splice(index, 1);
    } else {
      selectedCategories.value.push(category);
    }
  };

  /**
   * Remove a specific category filter
   */
  const removeFilter = (category: Category) => {
    const index = selectedCategories.value.indexOf(category);
    if (index > -1) {
      selectedCategories.value.splice(index, 1);
    }
  };

  /**
   * Toggle a tag filter on/off
   */
  const toggleTag = (tag: string) => {
    const index = selectedTags.value.indexOf(tag);
    if (index > -1) {
      selectedTags.value.splice(index, 1);
    } else {
      selectedTags.value.push(tag);
    }
  };

  /**
   * Remove a specific tag filter
   */
  const removeTag = (tag: string) => {
    const index = selectedTags.value.indexOf(tag);
    if (index > -1) {
      selectedTags.value.splice(index, 1);
    }
  };

  /**
   * Clear all filters (search, categories, and tags)
   */
  const clearFilters = () => {
    searchQuery.value = '';
    selectedCategories.value = [];
    selectedTags.value = [];
  };

  /**
   * Clear only search query
   */
  const clearSearch = () => {
    searchQuery.value = '';
  };

  return {
    // Search
    searchQuery,
    clearSearch,

    // Categories
    selectedCategories,
    toggleCategory,
    removeFilter,

    // Tags
    selectedTags,
    availableTags,
    toggleTag,
    removeTag,

    // Combined
    filteredProjects,
    hasActiveFilters,
    clearFilters,
  };
}

