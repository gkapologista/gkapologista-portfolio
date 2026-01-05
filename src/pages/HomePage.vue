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
        <h1 class="text-h2 text-white q-mb-md">
          Crafting Digital Solutions with GK Apologista
        </h1>
      </div>

      <q-btn
        color="secondary"
        size="lg"
        label="Explore My Work"
        class="q-mt-lg explore-btn animate-fade-up-delayed"
        @click="navigateToProjects"
      />
    </div>

    <!-- Contact Section -->
    <section class="contact-section" aria-labelledby="contact-heading">
      <div class="contact-content animate-fade-up">
        <h2 id="contact-heading" class="contact-heading">Let's Work Together</h2>
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
          <a href="mailto:gkapologista@gmail.com" class="footer-link">Contact</a>
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

const router = useRouter();
const navigateToProjects = () => router.push('/projects');
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
  background-color: #0f0f13;
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
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.05) 1px,
      transparent 1px
    ),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.3;
  animation: gridMove 20s linear infinite;
}

.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.5;
  animation: orbFloat 15s ease-in-out infinite;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(106, 30, 85, 0.8), transparent 70%);
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(58, 28, 50, 0.8), transparent 70%);
  top: 50%;
  right: 20%;
  animation-delay: -5s;
}

.orb-3 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(26, 26, 29, 0.8), transparent 70%);
  bottom: 20%;
  left: 40%;
  animation-delay: -10s;
}

.code-rain {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  pointer-events: none;
  font-family: 'Fira Code', 'Consolas', monospace;
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
  color: rgba(0, 255, 170, 0.5);
  font-size: 0.9rem;
  animation: codeFall 4s linear infinite;
  text-shadow: 0 0 5px rgba(0, 255, 170, 0.5);
  white-space: nowrap;
  opacity: 0.7;
}

.text-h2 {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 3.5rem;
  line-height: 1.3;
  font-weight: 700;
  letter-spacing: -0.02em;
  max-width: 700px;
  margin: 0 auto;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  background: linear-gradient(to right, #ffffff, #e0e0e0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.explore-btn {
  font-family: 'Outfit', sans-serif;
  font-weight: 500;
  letter-spacing: 0.02em;
  padding: 0.75rem 2rem;
  font-size: 1rem;
  background-color: var(--q-secondary) !important;
  color: white !important;
  border: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;
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
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: 0.5s;
}

.explore-btn:hover::before {
  left: 100%;
}

.explore-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 30px rgba(58, 28, 50, 0.6);
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
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 3rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.contact-heading {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  background: linear-gradient(to right, #ffffff, #e0e0e0);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.contact-tagline {
  font-family: 'Outfit', sans-serif;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: var(--q-secondary);
  border-radius: 0.75rem;
  text-decoration: none;
  transition: all 0.3s ease;
  margin-bottom: 2rem;
}

.contact-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(106, 30, 85, 0.4);
}

.contact-btn:focus-visible {
  outline: 3px solid rgba(255, 255, 255, 0.8);
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
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.social-link:focus-visible {
  outline: 3px solid rgba(255, 255, 255, 0.8);
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
  font-family: 'Outfit', sans-serif;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-link {
  display: inline-flex;
  align-items: center;
  font-family: 'Outfit', sans-serif;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
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
