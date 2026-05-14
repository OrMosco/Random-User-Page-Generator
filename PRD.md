# Product Requirements Document (PRD)
## Blueprint Lab — Studio Site

---

## 1. Overview

**Product Name:** Blueprint Lab Studio Site  
**Version:** 1.0  
**Status:** Draft  
**Last Updated:** 2026-05-14

Blueprint Lab is an interactive studio/portfolio site that communicates design and computational research through pure geometry, systemic transparency, and exposed technical process — rather than polished marketing imagery. The site itself is a demonstration of the studio's methodology.

---

## 2. Goals & Success Metrics

| Goal | Metric |
|------|--------|
| Communicate the studio's research-driven approach | Avg. session duration ≥ 3 min |
| Showcase projects with technical depth | ≥ 5 interactive project case studies at launch |
| Establish a distinct visual identity | Qualitative brand recognition feedback from target audience |
| Perform fast across devices | Lighthouse Performance score ≥ 90 on desktop and mobile |

---

## 3. Target Audience

- Academic researchers and computational designers
- Tech-forward architecture and product studios
- Developers and engineers interested in generative / parametric design
- Potential collaborators, clients, and hires

---

## 4. Visual Language & Aesthetics

### 4.1 Core Concept
**"Blueprint Lab"** — The site's aesthetic is rooted in pure geometry, computational logic, and systemic transparency. Every visual decision should feel derived from process rather than decoration.

### 4.2 Object Rendering
- Avoid photorealistic textures unless they directly serve research communication.
- Use **exposed wireframes and edge geometry** (e.g., `EdgesGeometry` or R3F's `<lineSegments>`) to reveal structural logic.
- Prefer additive, line-based representations over filled/shaded surfaces.
- Animations should reflect algorithmic or parametric processes — no gratuitous motion.
- Color palette: limited and systematic (e.g., monochrome base with a single accent, or blueprint blue/white on dark).

### 4.3 Typography
- Monospace or geometric sans-serif typefaces preferred (to reinforce the computational aesthetic).
- Type hierarchy should be strict and grid-aligned.
- No decorative typefaces.

### 4.4 Layout
- Grid-based, modular layout system.
- Generous whitespace; density is reserved for data/diagram sections.
- Responsive: mobile-first with a desktop-optimized 3D/canvas experience.

---

## 5. Site Structure & Pages

### 5.1 Home (`/`)
- Full-viewport interactive 3D canvas (Three.js / React Three Fiber).
- Wireframe geometry scene that responds to user cursor/scroll.
- Brief studio tagline overlaid in monospace type.
- Navigation anchors.

### 5.2 Work (`/work`)
- Grid of project cards, each displaying: project name, year, and a looping wireframe thumbnail.
- Filter by discipline (e.g., Computational, Product, Research, Installation).

### 5.3 Project Detail (`/work/:slug`)
- Full-width 3D model or diagram viewer (wireframe/edge mode).
- Research narrative in long-form text alongside diagrammatic visuals.
- Technical stack and process notes exposed inline.
- Related projects footer.

### 5.4 About (`/about`)
- Studio mission and methodology statement.
- Team members with roles.
- Research areas listed as a structured taxonomy.

### 5.5 Lab / Notes (`/lab`)
- Short-form technical posts, experiments, and generative sketches.
- Each post can include an embeddable live canvas or code snippet.

### 5.6 Contact (`/contact`)
- Minimal form: Name, Email, Message, Area of interest.
- Studio location and open-source/research contribution links.

---

## 6. Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| F-01 | Interactive 3D canvas on home page using Three.js / R3F | Must Have |
| F-02 | Wireframe/edge rendering mode for all 3D objects | Must Have |
| F-03 | Project filter and search on Work page | Must Have |
| F-04 | Responsive layout (mobile, tablet, desktop) | Must Have |
| F-05 | Dark mode as default; optional light mode toggle | Should Have |
| F-06 | Live embeddable code sketches in Lab posts | Should Have |
| F-07 | Keyboard navigation and WCAG 2.1 AA accessibility | Must Have |
| F-08 | Contact form with validation and email delivery | Must Have |
| F-09 | CMS integration for Work and Lab content | Should Have |
| F-10 | Open Graph / SEO metadata per page | Must Have |

---

## 7. Non-Functional Requirements

- **Performance:** Initial page load ≤ 2s on broadband; 3D canvas lazily loaded.
- **Accessibility:** WCAG 2.1 AA compliance. All interactive 3D elements have text alternatives.
- **Browser Support:** Latest 2 versions of Chrome, Firefox, Safari, Edge.
- **Hosting:** Static-first deployment (e.g., Vercel / Netlify) with CDN.
- **Analytics:** Privacy-respecting analytics (e.g., Plausible or Fathom), no cookie consent wall.

---

## 8. Technical Stack (Proposed)

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (App Router) |
| 3D Rendering | Three.js via React Three Fiber (R3F) |
| Edge/Wireframe | `EdgesGeometry`, `LineSegments`, `<lineSegments>` in R3F |
| Styling | Tailwind CSS or CSS Modules (systematic, no utility bloat) |
| CMS | Contentlayer (MDX) or Sanity.io |
| Deployment | Vercel |
| Animation | Framer Motion + R3F `useFrame` |

---

## 9. Out of Scope (v1.0)

- E-commerce or client portal
- Real-time collaboration tools
- Native mobile app
- Multi-language / i18n support

---

## 10. Open Questions

1. Will 3D assets be authored in Blender/Rhino and exported as `.glb`, or generated procedurally in-browser?
2. Is a headless CMS required from day one, or will MDX files suffice initially?
3. What is the preferred contact/inquiry routing — direct email, Notion form, or a backend service?
4. Should the Lab section support comments or only be read-only at launch?

---

## 11. Milestones

| Milestone | Target Date | Deliverables |
|-----------|-------------|--------------|
| Design System & Wireframes | Week 2 | Color tokens, type scale, component inventory |
| Home + Work pages | Week 4 | Interactive 3D home, project grid |
| Project Detail + About | Week 6 | Full project viewer, about page |
| Lab + Contact | Week 7 | Lab post template, contact form |
| QA & Accessibility Audit | Week 8 | Bug fixes, a11y pass |
| Launch | Week 9 | Public deployment |

---

## 12. Appendix — Development Guidelines Summary

> Full guidelines are maintained in `DEVELOPMENT_GUIDELINES.md`.

- **Rendering:** Wireframe-first; EdgesGeometry or R3F `<lineSegments>` for all 3D objects.
- **No photorealism** unless it directly serves a research deliverable.
- **Computational transparency:** expose process, parameters, and structure visibly in the UI.
- **Geometry over decoration:** every visual element should be derivable from an algorithm or system.
