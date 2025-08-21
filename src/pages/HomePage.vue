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
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const navigateToProjects = () => router.push('/projects');

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
</style>
