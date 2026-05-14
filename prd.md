# Product Requirements Document — Studio Site
**Project:** Blueprint Lab — Digital Studio Portfolio  
**Version:** 1.0  
**Date:** 2026-05-14

---

## 1. Overview

A personal/studio portfolio site that presents creative and computational work through the aesthetic of a **digital blueprint laboratory**. The site emphasizes pure geometry, computational logic, and systemic transparency — not decorative rendering. It replaces the existing Random-User-Page-Generator placeholder with a purposeful, design-driven studio presence.

---

## 2. Goals & Objectives

- Establish a distinct visual identity anchored in the "Blueprint Lab" concept.
- Showcase projects, experiments, and research in a structured, explorable format.
- Communicate process and methodology as prominently as final outputs.
- Serve as both a public portfolio and an internal reference/working document.

---

## 3. Visual Language & Aesthetic

### 3.1 Central Concept: Blueprint Lab
The site functions as a **digital drawing laboratory** — a space where design logic is visible, geometry is intentional, and systems are transparent. The aesthetic draws from technical drawing, computational design, and schematic documentation.

### 3.2 Rendering & Object Display
- Avoid photorealistic textures unless they directly serve a research or conceptual purpose.
- Prefer **wireframe meshes** (exposed geometry) and **edge geometry** (`EdgesGeometry` or equivalent) over filled, shaded surfaces.
- 3D objects and generative visuals should reveal their underlying structure.

### 3.3 Color Palette
- Primary: Deep navy / blueprint blue (`#0A1628`, `#1A2F4E`)
- Accent: Cyan / technical white (`#00BFFF`, `#E8F4FD`)
- Grid / Lines: Low-opacity white or pale blue (`rgba(255,255,255,0.15)`)
- Background: Near-black or dark blue-grey

### 3.4 Typography
- Use monospace or geometric sans-serif fonts to reinforce the technical-lab feel.
- Labels, annotations, and captions should mimic technical drawing conventions (uppercase, tight tracking).

### 3.5 Layout
- Grid-based layout with visible structural logic.
- Generous white/dark space; no visual clutter.
- Elements positioned as if plotted on a coordinate system.

---

## 4. Site Structure & Pages

### 4.1 Home / Landing
- Animated or static blueprint grid background.
- Studio name / logo mark.
- Brief one-line statement of practice.
- Entry point to projects and about sections.

### 4.2 Projects / Work
- Gallery or index of projects, each presented as a "case file."
- Each project card: title, discipline tag, year, thumbnail (wireframe/edge-render preferred).
- Filterable by discipline (3D, web, research, generative, etc.).

### 4.3 Project Detail Page
- Full project description: concept, process, outcomes.
- Visuals: wireframes, process screenshots, final renders.
- Technical notes / tools used.
- Optional: embedded interactive 3D viewer (Three.js or similar).

### 4.4 About / Studio
- Short studio/practitioner bio.
- Methodology statement aligned with Blueprint Lab concept.
- Tools & technologies list.

### 4.5 Contact
- Minimal contact form or direct email link.
- Social/professional links (GitHub, LinkedIn, etc.).

---

## 5. Technical Requirements

### 5.1 Stack
- **Frontend:** Vanilla JS, React, or Next.js (to be decided).
- **3D / Generative:** Three.js for any WebGL/3D elements.
- **Styling:** CSS custom properties; no heavy UI frameworks unless justified.
- **Hosting:** GitHub Pages, Vercel, or Netlify.

### 5.2 Performance
- Lighthouse score ≥ 90 on mobile and desktop.
- Lazy-load all heavy assets (3D scenes, high-res images).
- Prefer vector/SVG assets over raster where possible.

### 5.3 Accessibility
- WCAG 2.1 AA minimum compliance.
- Keyboard-navigable.
- Sufficient color contrast even within dark/blueprint palette.

### 5.4 Responsiveness
- Mobile-first design.
- Breakpoints: 375px, 768px, 1280px, 1920px.

---

## 6. Content Guidelines

- All project descriptions written in first person, concise, process-oriented.
- Captions and labels follow technical-drawing conventions: uppercase, precise, no fluff.
- Avoid marketing language; prefer factual, material descriptions.
- Hebrew and English content both supported where relevant (RTL-aware layout).

---

## 7. Out of Scope (v1.0)

- CMS / admin panel (static content only for v1).
- E-commerce or client portal.
- Blog / long-form writing section.
- User authentication.

---

## 8. Success Metrics

- Site loads in < 2s on a mid-range mobile device.
- All projects clearly communicable to a technical reviewer within 30 seconds per card.
- Portfolio is shareable as a single URL with no login required.

---

## 9. Open Questions

- [ ] Final technology stack confirmation (vanilla JS vs React/Next.js).
- [ ] Number of projects to include at launch.
- [ ] Domain name / hosting provider decision.
- [ ] Whether to include an interactive 3D scene on the landing page.
