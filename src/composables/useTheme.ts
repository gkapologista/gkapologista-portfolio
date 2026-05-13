import { ref } from 'vue';

const isDark = ref(true);

function applyTheme(dark: boolean) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
}

export function useTheme() {
  function init() {
    const saved = localStorage.getItem('portfolio-theme');
    isDark.value = saved !== 'light';
    applyTheme(isDark.value);
  }

  function toggle() {
    isDark.value = !isDark.value;
    localStorage.setItem('portfolio-theme', isDark.value ? 'dark' : 'light');
    applyTheme(isDark.value);
  }

  return { isDark, toggle, init };
}
