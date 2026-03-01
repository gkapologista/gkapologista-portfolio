<template>
  <div class="landing-page">
    <div class="background-effects">
      <div class="grid-pattern"></div>
      <div class="glow-orb orb-1"></div>
      <div class="glow-orb orb-2"></div>
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
            :style="{ animationDelay: `${Math.random() * 5}s` }"
          >
            {{ getRandomCode() }}
          </div>
        </div>
      </div>
    </div>

    <!-- Hero Section -->
    <div class="content">
      <div class="text-center q-mb-lg animate-fade-up">
        <h1 class="text-h2 q-mb-md" style="color: var(--text-primary)">
          Crafting Digital Solutions with GK Apologista
        </h1>
      </div>

      <q-btn
        color="secondary"
        size="lg"
        label="Explore My Work"
        class="q-mt-lg explore-btn animate-fade-up-delayed"
        @click="handleExplore"
        @mouseenter="handleHover"
      />
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
          <q-icon name="email" size="sm" class="q-mr-sm" />
          Get in Touch
        </a>

        <div class="social-links" role="list" aria-label="Social media links">
          <a
            href="https://github.com/gkapologista"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            aria-label="Visit GitHub profile"
            role="listitem"
          >
            <q-icon name="fab fa-github" size="md" />
          </a>
          <a
            href="https://linkedin.com/in/gkapologista"
            target="_blank"
            rel="noopener noreferrer"
            class="social-link"
            aria-label="Visit LinkedIn profile"
            role="listitem"
          >
            <q-icon name="fab fa-linkedin" size="md" />
          </a>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="footer-content">
        <span class="footer-copyright">© {{ currentYear }} GK Apologista</span>
        <div class="footer-links">
          <a href="mailto:gkapologista@gmail.com" class="footer-link"
            >Contact</a
          >
          <span class="footer-divider">•</span>
          <a
            href="https://github.com/gkapologista"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            <q-icon name="fab fa-github" size="xs" class="q-mr-xs" />
            GitHub
          </a>
          <span class="footer-divider">•</span>
          <a
            href="https://linkedin.com/in/gkapologista"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link"
          >
            <q-icon name="fab fa-linkedin" size="xs" class="q-mr-xs" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
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

const getRandomCode = () => {
  return codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
};
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

/* Orbs dimmed for Cyberpunk contrast */
.orb-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, var(--accent-teal), transparent 70%);
  top: 20%;
  left: 20%;
  animation-delay: 0s;
  opacity: 0.15;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, var(--bg-grey), transparent 70%);
  top: 50%;
  right: 20%;
  animation-delay: -5s;
  opacity: 0.1;
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, var(--accent-teal), transparent 70%);
  bottom: 20%;
  left: 40%;
  animation-delay: -10s;
  opacity: 0.15;
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
  opacity: 0;
}

.code-column:nth-child(-n + 5),
.code-column:nth-last-child(-n + 5) {
  opacity: 0.7;
}

.code-column:nth-child(6),
.code-column:nth-last-child(6) {
  opacity: 0.5;
}

.code-column:nth-child(7),
.code-column:nth-last-child(7) {
  opacity: 0.3;
}

.code-column:nth-child(8),
.code-column:nth-last-child(8) {
  opacity: 0.1;
}

.code-line {
  color: var(--accent-teal);
  font-size: 0.9rem;
  animation: codeFall 4s linear infinite;
  text-shadow: 0 0 5px var(--accent-teal);
  white-space: nowrap;
  opacity: 0.7;
}

.text-h2 {
  font-family: 'JetBrains Mono', monospace;
  font-size: 3.5rem;
  line-height: 1.3;
  font-weight: 700;
  letter-spacing: -0.02em;
  max-width: 700px;
  margin: 0 auto;
  color: var(--accent-teal);
  text-transform: uppercase;
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
  transition: all 0.3s ease;
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
  transition: 0.5s;
}

.explore-btn:hover::before {
  left: 100%;
}

.explore-btn:hover {
  transform: translateY(-2px);
  box-shadow: 4px 4px 0px rgba(0, 0, 0, 0.5);
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
  transition: all 0.3s ease;
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
  transition: all 0.3s ease;
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

.footer-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
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

.footer-divider {
  color: rgba(255, 255, 255, 0.3);
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
</style>
