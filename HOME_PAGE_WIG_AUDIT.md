# HomePage.vue — Web Interface Guidelines Audit Checklist

> Last updated: 2025-12-31 — 12 / 14 items resolved

## Animation / `prefers-reduced-motion`

- [x] **Add CSS `prefers-reduced-motion` block** — `.grid-pattern`, `.glow-orb`, `.code-line`, `.type-cursor`, `.scroll-indicator`, and `.scroll-indicator__dot` animations all run for reduced-motion users; the JS guard in `onMounted` only covers the typewriter/button — add a `@media (prefers-reduced-motion: reduce)` block that disables all decorative CSS animations
- [x] **Guard `.animate-fade-up-stagger`** — unused class still defines an animation with no reduced-motion fallback; add guard or remove

## `transition: all` → explicit properties

- [x] **`.explore-btn`** — `transition: all 0.3s ease` → `transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease`
- [x] **`.contact-btn`** — `transition: all 0.3s ease` → `transition: transform 0.3s ease, box-shadow 0.3s ease`
- [x] **`.social-link`** — `transition: all 0.3s ease` → `transition: transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease, color 0.3s ease`
- [x] **`.explore-btn::before`** — `transition: 0.5s` missing property name → `transition: left 0.5s`

## Accessibility — Decorative Icons

- [x] **Email icon in contact button (`:95`)** — `<q-icon name="email">` inside `<a>` with text label; add `aria-hidden="true"` to the icon
- [x] **GitHub icon (`:108`)** — `<q-icon name="fab fa-github">` inside labelled `<a>`; add `aria-hidden="true"`
- [x] **LinkedIn icon (`:119`)** — `<q-icon name="fab fa-linkedin">` inside labelled `<a>`; add `aria-hidden="true"`

## Accessibility — Heading & Zoom

- [x] **Typewriter `<h1>` accessible name (`:38`)** — heading starts empty on mount; add `aria-label="Crafting Digital Solutions"` so screen readers announce a stable name immediately
- [x] **`user-scalable=no` / `maximum-scale=1` in `index.html`** — disables pinch-zoom; WCAG 1.4.4 failure — remove both attributes from the viewport meta tag

## Typography — Curly Quotes

- [ ] **`:84` `Let's Work Together`** — straight apostrophe `'` → curly `'`
- [ ] **`:87` `I'd love to hear about it`** — straight apostrophe `'` → curly `'`

## Misc

- [ ] **`<span class="footer-copyright">` (`:129`)** — non-semantic wrapper around static text; use `<p>` or `<small>` instead
