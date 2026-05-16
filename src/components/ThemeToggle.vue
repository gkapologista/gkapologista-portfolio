<template>
  <button
    class="theme-toggle"
    :class="{ 'theme-toggle--light': !isDark }"
    @click="toggle"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    aria-live="polite"
  >
    <span class="theme-toggle__track" aria-hidden="true">
      <span class="theme-toggle__thumb">
        <span class="theme-toggle__icon">{{ isDark ? '◑' : '◐' }}</span>
      </span>
    </span>
    <span class="theme-toggle__label">{{ isDark ? 'DARK' : 'LITE' }}</span>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '../composables/useTheme';

const { isDark, toggle } = useTheme();
</script>

<style scoped>
.theme-toggle {
  position: fixed;
  bottom: calc(clamp(0.75rem, 2vw, 1.125rem) + env(safe-area-inset-bottom, 0px));
  left: clamp(0.75rem, 2vw, 1.125rem);
  z-index: 200;

  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.6rem 0.3rem 0.3rem;
  min-height: 36px;

  font-family: 'JetBrains Mono', monospace;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  color: var(--accent-teal);
  background: var(--bg-charcoal);
  border: 1px solid var(--accent-teal);
  border-radius: 2px;
  box-shadow: 3px 3px 0px rgba(0, 0, 0, 0.35);

  cursor: pointer;
  transition:
    background 0.25s ease,
    color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.18s ease;
}

.theme-toggle:hover {
  background: var(--accent-teal);
  color: var(--bg-charcoal);
  transform: translateY(-1px);
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.4);
}

.theme-toggle:active {
  transform: translateY(1px);
  box-shadow: 2px 2px 0px rgba(0, 0, 0, 0.35);
}

.theme-toggle:focus-visible {
  outline: 2px solid var(--accent-teal);
  outline-offset: 3px;
}

/* Track (pill switch visual) */
.theme-toggle__track {
  display: flex;
  align-items: center;
  width: 32px;
  height: 18px;
  background: rgba(0, 173, 181, 0.12);
  border: 1px solid currentColor;
  border-radius: 1px;
  padding: 1px;
  flex-shrink: 0;
  transition: background 0.25s ease;
}

.theme-toggle--light .theme-toggle__track {
  background: rgba(0, 107, 114, 0.1);
}

.theme-toggle:hover .theme-toggle__track {
  background: rgba(0, 0, 0, 0.15);
}

.theme-toggle__thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  background: currentColor;
  border-radius: 1px;
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  flex-shrink: 0;
}

.theme-toggle--light .theme-toggle__thumb {
  transform: translateX(14px);
}

.theme-toggle__icon {
  font-size: 0.65rem;
  line-height: 1;
  color: var(--bg-charcoal);
  transition: color 0.25s ease;
}

.theme-toggle:hover .theme-toggle__icon {
  color: var(--accent-teal);
}

.theme-toggle__label {
  line-height: 1;
  letter-spacing: 0.14em;
  min-width: 2.4em;
  text-align: left;
}

@media (prefers-reduced-motion: reduce) {
  .theme-toggle,
  .theme-toggle__track,
  .theme-toggle__thumb {
    transition: background 0.15s ease, color 0.15s ease;
  }

  .theme-toggle__thumb {
    transition: none;
  }
}
</style>
