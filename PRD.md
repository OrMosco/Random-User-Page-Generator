# Product Requirements Document (PRD)
## Blueprint Lab — Studio Site

---

## 1. Overview

**Product Name:** Blueprint Lab Studio Site  
**Version:** 1.0  
**Status:** Draft  
**Last Updated:** 2026-05-14

Blueprint Lab is an interactive studio/portfolio site that showcases technical work, 3D design, and programming projects to clients, employers, and collaborators. It communicates design and computational research through pure geometry, systemic transparency, and exposed technical process — rather than polished marketing imagery. The site itself is a demonstration of the creator's methodology and skill.

---

## 2. Goals & Success Metrics

| Goal | Metric |
|------|--------|
| Communicate the studio's research-driven approach | Avg. session duration ≥ 3 min |
| Showcase projects with technical depth | ≥ 5 interactive project case studies at launch |
| Attract job opportunities and client inquiries | ≥ 1 inbound hiring/client contact per month post-launch |
| Demonstrate Three.js / 3D programming skills | ≥ 3 live interactive 3D model showcases at launch |
| Establish a distinct visual identity | Qualitative brand recognition feedback from target audience |
| Perform fast across devices | Lighthouse Performance score ≥ 90 on desktop and mobile |

---

## 3. Target Audience

- **Potential clients & customers** seeking custom tech, design, or software solutions
- **Tech recruiters and hiring managers** in software engineering, frontend, and creative-tech roles
- **Developers and engineers** interested in generative / parametric design and Three.js / WebGL work
- Academic researchers and computational designers
- Tech-forward architecture and product studios
- Potential collaborators and open-source contributors

---

## 4. Visual Language & Aesthetics

### 4.1 Core Concept
**"Blueprint Lab — Modern with a Twist"** — The site looks and feels like a polished, modern web app (smooth transitions, clean layout, dark/light mode) but with an unexpected edge: live, interactive Three.js 3D scenes embedded directly into the UI instead of static images or videos. Visitors should immediately feel the difference between this and a typical portfolio.

### 4.2 The "Twist"
- **3D models replace hero images** — the first thing visitors see is an interactive Three.js scene they can orbit, zoom, and interact with.
- **Scroll-driven 3D transitions** — as users scroll, 3D objects morph, rotate, or assemble in response.
- **Unexpected moments of depth** — mundane UI elements (cards, section dividers) have subtle 3D parallax or geometry layered beneath them.
- **"Under the hood" reveals** — hovering a project card briefly switches from a polished render to its wireframe/edge view, exposing the technical construction.

### 4.3 Object Rendering
- Use **exposed wireframes and edge geometry** (`EdgesGeometry` or R3F `<lineSegments>`) as accent and "reveal" states.
- Primary display can use standard materials (MeshStandardMaterial, MeshPhysicalMaterial) for a polished modern look — the wireframe is the twist, not the baseline.
- Animations should feel fluid and purposeful: eased, spring-physics-based, never jarring.
- Color palette: dark-mode-first with vivid accent colors (e.g., electric blue, neon cyan, or amber) against a near-black background. Light mode inverts to an off-white/cream base with the same accent colors, ensuring contrast and readability in both themes. The toggle button is always visible in the navigation bar.

### 4.4 Typography
- Clean, modern sans-serif for body and headings (e.g., Inter, Geist, or DM Sans).
- Monospace accents for code, labels, and technical callouts — reinforcing the programming angle.
- Large, confident type hierarchy. Generous leading.

### 4.5 Layout
- Full-bleed sections with smooth scroll snapping.
- Grid-based, modular card system for project and skill showcases.
- Responsive: mobile-first layout with an enhanced desktop experience where 3D canvases are fully interactive.

---

## 5. Site Structure & Pages

### 5.1 Home (`/`)
- Full-viewport interactive Three.js / R3F 3D scene as the hero — visitors can orbit and interact with it immediately.
- Scroll-driven animation: 3D objects transform or assemble as the user scrolls through intro sections.
- Bold headline + one-liner value proposition ("I build things on the web — and in 3D.").
- Smooth-scroll navigation to Work, 3D Showcase, and Contact sections.
- **Dark/Light mode toggle button** in the navbar — switches the entire site theme instantly; preference saved to `localStorage`.
- Skills/tech strip: animated ticker or icon grid (React, Three.js, Node, etc.).

### 5.2 Work / Portfolio (`/work`)
- Grid of project cards with polished preview images or looping 3D thumbnails.
- On hover: card flips or transitions to wireframe view (the "twist").
- Filter by type: Web App · 3D / WebGL · Programming · Design.
- Each card links to a detailed project page.

### 5.3 3D Showcase (`/3d`)
- Dedicated gallery of live, interactive Three.js 3D models — the centrepiece of the site's "twist".
- Each showcase item is an embedded R3F canvas the visitor can orbit, zoom, and interact with.
- **Showcase scenes to include at launch (minimum 3):**
  1. **Geometry Explorer** — animated, procedurally generated geometric forms (icosahedra, toruses, knots) with material/wireframe toggle.
  2. **Particle System** — interactive particle field that reacts to mouse movement.
  3. **3D Skills Visualization** — tech stack represented as labeled 3D nodes in a graph/constellation layout.
- Each scene includes a caption, tech used, and a link to source code (GitHub).

### 5.4 Project Detail (`/work/:slug`)
- Full-width 3D model viewer or diagram (orbit controls enabled).
- Project overview, tech stack, problem solved, and outcome.
- Inline code snippets or live demo link.
- "Wireframe mode" toggle to expose the technical construction.
- Related projects footer.

### 5.5 About (`/about`)
- Personal intro: who I am, what I build, what I'm looking for (open to work / freelance).
- Skills taxonomy: Languages · Frameworks · 3D / WebGL · Tools.
- Timeline or experience highlights.
- Download résumé / CV button.

### 5.6 Contact (`/contact`)
- Minimal form: Name, Email, Subject (dropdown: Job Opportunity · Project Inquiry · Collaboration · Other), Message.
- Direct email link and social/GitHub/LinkedIn handles.
- Subtle 3D background animation in the contact section.

---

## 6. Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| F-01 | Interactive 3D canvas on home page using Three.js / R3F | Must Have |
| F-02 | Wireframe/edge rendering mode for all 3D objects | Must Have |
| F-03 | Project filter and search on Work page | Must Have |
| F-04 | Responsive layout (mobile, tablet, desktop) | Must Have |
| F-05 | Dark/Light mode toggle button — persistent, accessible, visible on all pages | Must Have |
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
| Styling | Tailwind CSS with CSS custom properties for dark/light theme tokens |
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
