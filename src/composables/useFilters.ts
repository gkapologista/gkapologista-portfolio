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
  const debouncedSearch = useDebounce(searchQuery, 450);

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

  /** True while the typed query hasn't settled into the debounced value yet. */
  const isSearching = computed(() => searchQuery.value !== debouncedSearch.value);

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
   * Filtered projects based on search, categories, and tags.
   * Uses AND logic: all active filters must match.
   *
   * Search is token-based (space-separated) and covers title, technologies,
   * and description. Results are sorted by relevance when a query is active:
   * title match (3 pts) > tech/tag match (2 pts) > description match (1 pt).
   */
  const filteredProjects = computed(() => {
    let result = projects.value;

    const searchTerm = debouncedSearch.value.trim().toLowerCase();
    if (searchTerm) {
      // Split into tokens; every token must match somewhere in the project.
      const tokens = searchTerm.split(/\s+/).filter(Boolean);

      interface Scored { project: typeof result[number]; score: number }

      const scored = result
        .map((p): Scored | null => {
          const titleL = p.title.toLowerCase();
          const descL  = p.description.toLowerCase();
          const techL  = p.technologies.map((t) => t.toLowerCase());
          const tagsL  = p.tags.map((t) => t.toLowerCase());

          const allMatch = tokens.every(
            (tok) =>
              titleL.includes(tok) ||
              descL.includes(tok)  ||
              techL.some((t) => t.includes(tok)) ||
              tagsL.some((t) => t.includes(tok)),
          );

          if (!allMatch) return null;

          let score = 0;
          tokens.forEach((tok) => {
            if (titleL.includes(tok))               score += 3;
            if (techL.some((t) => t.includes(tok))) score += 2;
            if (descL.includes(tok))                score += 1;
          });

          return { project: p, score };
        })
        .filter((x): x is Scored => x !== null)
        .sort((a, b) => b.score - a.score)
        .map((x) => x.project);

      result = scored;
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
    isSearching,
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

