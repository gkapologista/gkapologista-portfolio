<template>
  <div class="landing-page">
    <div class="background-effects">
      <div class="grid-pattern"></div>
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-3"></div>
      <div class="code-rain">
        <div
          v-for="n in 15"
          :key="n"
          class="code-column"
          :style="{ left: `${(n - 1) * 6.5}%` }"
        >
          <div
            v-for="i in 15"
            :key="i"
            class="code-line"
            :style="{ animationDelay: codeRainData[n - 1][i - 1].delay }"
          >
            {{ codeRainData[n - 1][i - 1].snippet }}
          </div>
        </div>
      </div>
    </div>

    <!-- Hero Section -->
    <div class="content">
      <div class="text-center q-mb-lg">
        <p class="hero-label">
          {{ displayedLabel
          }}<span
            v-if="cursorTarget === 'label'"
            class="type-cursor"
            aria-hidden="true"
            >_</span
          >
        </p>
        <h1 class="hero-heading">
          {{ displayedHeading
          }}<span
            v-if="cursorTarget === 'heading'"
            class="type-cursor"
            aria-hidden="true"
            >_</span
          >
        </h1>
      </div>

      <div class="btn-wrapper q-mt-lg" :class="{ 'btn-wrapper--visible': showButton }">
        <q-btn
          color="secondary"
          size="lg"
          label="Explore My Work"
          class="explore-btn"
          @click="handleExplore"
          @mouseenter="handleHover"
        />
      </div>

      <!-- Scroll affordance -->
      <div
        class="scroll-indicator"
        :class="{ 'scroll-indicator--hidden': hasScrolled }"
        aria-hidden="true"
      >
        <span class="scroll-indicator__label">// scroll</span>
        <div class="scroll-indicator__track">
          <div class="scroll-indicator__dot"></div>
        </div>
      </div>
    </div>

    <!-- Section bridge: hero → contact -->
    <div class="section-bridge" aria-hidden="true">
      <div class="section-bridge__line"></div>
      <span class="section-bridge__label">[ CONTACT ]</span>
      <div class="section-bridge__line"></div>
    </div>

    <!-- Contact Section -->
    <section class="contact-section" aria-labelledby="contact-heading">
      <div class="contact-content animate-fade-up">
        <h2 id="contact-heading" class="contact-heading">
          Let's Work Together
        </h2>
        <p class="contact-tagline">
          Have a project in mind? I'd love to hear about it.
        </p>

        <a
          href="mailto:gkapologista@gmail.com?subject=Portfolio Inquiry"
          class="contact-btn"
          aria-label="Send email to GK Apologista"
        >
          <q-icon name="email" size="sm" class="q-mr-sm" aria-hidden="true" />
          Get in Touch
        </a>

        <ul class="social-links" aria-label="Social media links">
          <li>
            <a
              href="https://github.com/gkapologista"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              aria-label="Visit GitHub profile"
            >
              <q-icon name="fab fa-github" size="md" aria-hidden="true" />
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/gkapologista"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              aria-label="Visit LinkedIn profile"
            >
              <q-icon name="fab fa-linkedin" size="md" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="footer-content">
        <span class="footer-copyright">© {{ currentYear }} GK Apologista</span>
        <a href="mailto:gkapologista@gmail.com" class="footer-link">
          Contact
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { usePrefetch } from '../composables/usePrefetch';
import { projects } from '../data/projects';

const router = useRouter();
const { prefetchComponent, prefetchImages } = usePrefetch();

const handleExplore = () => {
  router.push('/projects');
};

const handleHover = () => {
  // Prefetch ProjectsPage component
  prefetchComponent(() => import('./ProjectsPage.vue'));

  // Prefetch images for the first 3 projects
  const imageUrls = projects.slice(0, 3).map((p) => p.images[0]);
  prefetchImages(imageUrls);
};

const currentYear = computed(() => new Date().getFullYear());

const hasScrolled = ref(false);
const onScroll = () => {
  if (window.scrollY > 80) hasScrolled.value = true;
};
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', onScroll));

// ── Typewriter ────────────────────────────────────────────────────────────────
const LABEL_TEXT = '< GK APOLOGISTA />';
const HEADING_TEXT = 'Crafting Digital Solutions';

const displayedLabel = ref('');
const displayedHeading = ref('');
const cursorTarget = ref<'label' | 'heading' | 'none'>('label');
const showButton = ref(false);

onMounted(() => {
  // Respect reduced-motion: skip animation, show everything instantly
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    displayedLabel.value = LABEL_TEXT;
    displayedHeading.value = HEADING_TEXT;
    cursorTarget.value = 'none';
    showButton.value = true;
    return;
  }

  const type = (
    text: string,
    target: typeof displayedLabel,
    charMs: number,
    onDone: () => void,
  ) => {
    let i = 0;
    const tick = setInterval(() => {
      target.value = text.slice(0, ++i);
      if (i >= text.length) { clearInterval(tick); onDone(); }
    }, charMs);
  };

  // Wait for initial cursor blink, then start label
  setTimeout(() => {
    type(LABEL_TEXT, displayedLabel, 40, () => {
      // Cursor jumps to heading after a brief pause
      setTimeout(() => {
        cursorTarget.value = 'heading';
        type(HEADING_TEXT, displayedHeading, 50, () => {
          showButton.value = true;
          // Cursor lingers, then disappears
          setTimeout(() => { cursorTarget.value = 'none'; }, 1400);
        });
      }, 220);
    });
  }, 300);
});

const codeSnippets = [
  'const app = createApp({})',
  'function useState() {',
  'async function fetchData() {',
  'export default {',
  'return <div>Hello</div>',
  'useEffect(() => {',
  'props: {',
  'methods: {',
  'computed: {',
  'watch: {',
  'v-for="item in items"',
  'v-if="condition"',
  'v-model="value"',
  'v-bind:class="className"',
  'v-on:click="handleClick"',
  'import { ref } from "vue"',
  'import { computed } from "vue"',
  'import { watch } from "vue"',
  'import { onMounted } from "vue"',
  'import { nextTick } from "vue"',
  'router.push("/")',
  'store.commit("mutation")',
  'store.dispatch("action")',
  'axios.get("/api/data")',
  'await fetch("/api/data")',
  'try {',
  'catch (error) {',
  'finally {',
  'if (condition) {',
  'else {',
  'switch (value) {',
  'case "value":',
  'default:',
  'for (let i = 0; i < 10; i++) {',
  'while (condition) {',
  'do {',
  '} while (condition)',
  'class Component {',
  'extends Component {',
  'implements Interface {',
  'interface Props {',
  'type State = {',
  'enum Status {',
  'const [state, setState] = useState()',
  'useCallback(() => {',
  'useMemo(() => {',
  'useRef(null)',
  'useContext(Context)',
  'createContext()',
  'Provider value={value}',
  'Consumer children={children}',
  'Suspense fallback={<div>}',
  'ErrorBoundary',
  'lazy(() => import("./Component"))',
  'memo(Component)',
  'forwardRef((props, ref) => {',
  'useImperativeHandle',
  'useLayoutEffect',
  'useDebugValue',
  'useReducer',
  'useTransition',
  'useDeferredValue',
  'useId',
  'useSyncExternalStore',
  'useInsertionEffect',
];

// Pre-computed once at setup — prevents Math.random() re-evaluation on every re-render
const codeRainData = Array.from({ length: 15 }, () =>
  Array.from({ length: 15 }, () => ({
    delay: `${Math.random() * 5}s`,
    snippet: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
  }))
);
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: var(--bg-charcoal);
}

.content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1.5rem;
}

.background-effects {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.grid-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(var(--accent-teal) 1px, transparent 1px),
    linear-gradient(90deg, var(--accent-teal) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.1;
  animation: gridMove 20s linear infinite;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.5;
  animation: orbFloat 15s ease-in-out infinite;
}

/* Two teal ambient orbs — raised to visible opacity; grey orb-2 removed (invisible + paint cost) */
.orb-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--accent-teal), transparent 70%);
  top: 20%;
  left: 20%;
  animation-delay: 0s;
  opacity: 0.27;
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, var(--accent-teal), transparent 70%);
  bottom: 20%;
  left: 40%;
  animation-delay: -10s;
  opacity: 0.25;
}

.code-rain {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  pointer-events: none;
  font-family: 'JetBrains Mono', monospace;
}

.code-column {
  position: absolute;
  top: -100%;
  height: 200%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* Safe fallback: any column without an explicit rule stays visible.
     Covers edge cases where column count changes. */
  opacity: 0.2;
}

/* Tier 1 — outer edges: brightest */
.code-column:nth-child(-n + 3),
.code-column:nth-last-child(-n + 3) {
  opacity: 0.55;
}

/* Tier 2 — shoulders: mid-bright */
.code-column:nth-child(4),
.code-column:nth-child(5),
.code-column:nth-last-child(4),
.code-column:nth-last-child(5) {
  opacity: 0.38;
}

/* Tier 3 — center columns (6–10 with 15 cols): subtle but visible.
   Base opacity handles these; rule is explicit for clarity. */
.code-column:nth-child(6),
.code-column:nth-child(7),
.code-column:nth-child(8),
.code-column:nth-last-child(6),
.code-column:nth-last-child(7),
.code-column:nth-last-child(8) {
  opacity: 0.2;
}

.code-line {
  color: var(--accent-teal);
  font-size: 0.9rem;
  animation: codeFall 4s linear infinite;
  text-shadow: 0 0 5px var(--accent-teal);
  white-space: nowrap;
  opacity: 0.7;
}

.hero-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.8rem;
  letter-spacing: 0.28em;
  color: var(--accent-teal);
  text-transform: uppercase;
  margin: 0 0 0.9rem;
  opacity: 0.75;
}

.hero-heading {
  font-family: 'JetBrains Mono', monospace;
  font-size: 3.5rem;
  line-height: 1.15;
  font-weight: 700;
  letter-spacing: -0.02em;
  max-width: 700px;
  margin: 0 auto;
  color: var(--text-white);
  text-transform: uppercase;
}

.type-cursor {
  display: inline-block;
  color: var(--accent-teal);
  font-weight: 300;
  animation: cursorBlink 0.55s step-end infinite;
  margin-left: 1px;
}

@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}

.btn-wrapper {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.5s ease, transform 0.5s ease;
  pointer-events: none;
}

.btn-wrapper--visible {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.explore-btn {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  background-color: var(--accent-teal) !important;
  color: var(--bg-charcoal) !important;
  border: 1px solid var(--accent-teal);
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease;
  position: relative;
  overflow: hidden;
  border-radius: 0;
  text-transform: uppercase;
}

.explore-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transition: left 0.5s;
  z-index: 1;
}

/* Scanline CRT overlay — flashes on hover */
.explore-btn::after {
  content: '';
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 3px,
    rgba(0, 0, 0, 0.14) 3px,
    rgba(0, 0, 0, 0.14) 4px
  );
  opacity: 0;
  pointer-events: none;
  z-index: 2;
}

.explore-btn:hover::before {
  left: 100%;
}

.explore-btn:hover::after {
  animation: scanFlash 0.4s ease forwards;
}

.explore-btn:hover {
  animation: btnGlitch 0.4s steps(1, end) forwards;
}

@keyframes btnGlitch {
  0% {
    transform: translateY(0) translateX(0);
    box-shadow: none;
  }
  12% {
    transform: translateY(-3px) translateX(-3px);
    box-shadow:
      3px 0 0 rgba(255, 20, 80, 0.65),
      -3px 0 0 rgba(0, 240, 215, 0.65);
  }
  25% {
    transform: translateY(-2px) translateX(3px);
    box-shadow:
      -4px 0 0 rgba(255, 20, 80, 0.5),
      4px 0 0 rgba(0, 240, 215, 0.5);
  }
  40% {
    transform: translateY(-3px) translateX(-1px);
    box-shadow:
      2px 0 0 rgba(255, 20, 80, 0.3),
      -2px 0 0 rgba(0, 240, 215, 0.3);
  }
  60% {
    transform: translateY(-2px) translateX(1px);
    box-shadow:
      1px 0 0 rgba(255, 20, 80, 0.15),
      -1px 0 0 rgba(0, 240, 215, 0.15);
  }
  100% {
    transform: translateY(-2px) translateX(0);
    box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.5);
  }
}

@keyframes scanFlash {
  0%   { opacity: 0; }
  15%  { opacity: 0.75; }
  50%  { opacity: 0.4; }
  100% { opacity: 0; }
}

.animate-fade-up {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.8s ease forwards;
}

.animate-fade-up-delayed {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeUp 0.8s ease forwards 0.3s;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gridMove {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(50px);
  }
}

@keyframes orbFloat {
  0%,
  100% {
    transform: translate(0, 0);
  }

  25% {
    transform: translate(50px, 50px);
  }

  50% {
    transform: translate(0, 100px);
  }

  75% {
    transform: translate(-50px, 50px);
  }
}

@keyframes codeFall {
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  90% {
    opacity: 1;
  }

  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}

/* Scroll Indicator */
.scroll-indicator {
  position: absolute;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  opacity: 0;
  animation: scrollIndicatorFadeIn 0.6s ease forwards 1.4s;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.scroll-indicator--hidden {
  opacity: 0 !important;
}

.scroll-indicator__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: var(--accent-teal);
  opacity: 0.6;
  text-transform: lowercase;
}

.scroll-indicator__track {
  width: 1px;
  height: 40px;
  background: linear-gradient(
    to bottom,
    var(--accent-teal) 0%,
    transparent 100%
  );
  position: relative;
  overflow: hidden;
}

.scroll-indicator__dot {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--accent-teal);
  box-shadow: 0 0 6px var(--accent-teal);
  animation: scrollDotFall 1.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes scrollIndicatorFadeIn {
  from { opacity: 0; transform: translateX(-50%) translateY(8px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
}

@keyframes scrollDotFall {
  0%   { top: -6px; opacity: 0; }
  15%  { opacity: 1; }
  85%  { opacity: 1; }
  100% { top: calc(100% + 6px); opacity: 0; }
}

/* Section Bridge */
.section-bridge {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 0 3rem;
}

.section-bridge__line {
  flex: 1;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    var(--accent-teal) 30%,
    var(--accent-teal) 70%,
    transparent
  );
  opacity: 0.35;
}

.section-bridge__label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.22em;
  color: var(--accent-teal);
  opacity: 0.55;
  white-space: nowrap;
  text-transform: uppercase;
}

/* Contact Section */
.contact-section {
  position: relative;
  z-index: 3;
  padding: 4rem 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.contact-content {
  text-align: center;
  max-width: 500px;
  background: var(--bg-grey);
  border-radius: 4px;
  padding: 3rem;
  border: 1px solid var(--accent-teal);
  box-shadow: 8px 8px 0px rgba(0, 0, 0, 0.3);
}

.contact-heading {
  font-family: 'JetBrains Mono', monospace;
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--accent-teal);
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.contact-tagline {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  color: var(--text-white);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 1rem;
  font-weight: 600;
  color: var(--bg-charcoal);
  background: var(--accent-teal);
  border-radius: 2px;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-bottom: 2rem;
  text-transform: uppercase;
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.5);
}

.contact-btn:focus-visible {
  outline: 2px solid var(--accent-teal);
  outline-offset: 4px;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.social-links li {
  display: contents;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 2px;
  background: var(--bg-grey);
  color: var(--text-white);
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease;
  border: 1px solid var(--accent-teal);
}

.social-link:hover {
  background: var(--accent-teal);
  color: var(--bg-charcoal);
  transform: translateY(-2px);
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.5);
}

.social-link:focus-visible {
  outline: 2px solid var(--accent-teal);
  outline-offset: 4px;
}

/* Footer */
.site-footer {
  position: relative;
  z-index: 3;
  padding: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-copyright {
  font-family: 'JetBrains Mono', sans-serif;
  font-size: 0.875rem;
  color: rgba(238, 238, 238, 0.5);
}


.footer-link {
  display: inline-flex;
  align-items: center;
  font-family: 'JetBrains Mono', sans-serif;
  font-size: 0.875rem;
  color: var(--accent-teal);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: #fff;
}

.footer-link:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 2px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .contact-section {
    padding: 3rem 1rem;
  }

  .contact-content {
    padding: 2rem;
  }

  .contact-heading {
    font-size: 2rem;
  }

  .contact-tagline {
    font-size: 1rem;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }
}

/* ── prefers-reduced-motion ─────────────────────────────────────────────────
   Disable all decorative CSS animations for users who prefer reduced motion.
   The JS guard in onMounted already handles the typewriter + button reveal;
   this block covers everything else.
   ────────────────────────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  /* Background grid stays visible but static */
  .grid-pattern {
    animation: none;
  }

  /* Orbs stay in place */
  .glow-orb {
    animation: none;
  }

  /* Code rain is purely motion-dependent — hide it entirely */
  .code-rain {
    display: none;
  }

  /* Fade-up utilities: skip to final visible state */
  .animate-fade-up,
  .animate-fade-up-delayed {
    animation: none;
    opacity: 1;
    transform: none;
  }

  /* Cursor: stop blinking, keep it visible as a static underscore */
  .type-cursor {
    animation: none;
    opacity: 1;
  }

  /* Scroll indicator: appear immediately, suppress dot fall */
  .scroll-indicator {
    animation: none;
    opacity: 1;
    transform: translateX(-50%);
  }

  .scroll-indicator__dot {
    animation: none;
    opacity: 0; /* static dot without animation serves no purpose */
  }

  /* Explore button hover: skip glitch jitter and scanline flash */
  .explore-btn:hover {
    animation: none;
    transform: translateY(-2px);
    box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.5);
  }

  .explore-btn:hover::after {
    animation: none;
  }
}
</style>
