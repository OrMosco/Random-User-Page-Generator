export interface Project {
  id: number;
  slug: string;
  title: string;
  tags: string[];
  year: string;
  desc: string;
  color: string;
}

export const projects: Project[] = [
  {
    id: 0,
    slug: "3d-geometry-explorer",
    title: "3D Geometry Explorer",
    tags: ["Three.js", "R3F", "WebGL"],
    year: "2025",
    desc: "Interactive parametric geometry viewer with wireframe / solid toggle and real-time parameter controls. Users can tweak subdivision levels, twist, bevel, and displacement on-the-fly and export the resulting mesh as glTF.",
    color: "#00aaff",
  },
  {
    id: 1,
    slug: "particle-field",
    title: "Particle Field",
    tags: ["Three.js", "GLSL", "Canvas"],
    year: "2025",
    desc: "50,000-particle system driven by simplex noise, reacting to mouse input in real time. Each particle's velocity is computed on the GPU via a custom GLSL compute pass, achieving 60 fps on mid-range hardware.",
    color: "#6644ff",
  },
  {
    id: 2,
    slug: "blueprint-dashboard",
    title: "Blueprint Dashboard",
    tags: ["React", "TypeScript", "D3"],
    year: "2024",
    desc: "Data visualisation dashboard with animated SVG charts and live WebSocket feeds. Supports time-range selection, drill-down views, and CSV/JSON export. Built with D3 v7 and a custom React hook layer.",
    color: "#00ffcc",
  },
  {
    id: 3,
    slug: "procedural-city",
    title: "Procedural City",
    tags: ["Three.js", "Procedural", "R3F"],
    year: "2024",
    desc: "Algorithmically generated low-poly cityscape with dynamic lighting and fog. Building footprints, road networks, and population density are all seeded from a single integer, making every scene reproducible and shareable.",
    color: "#ff6644",
  },
  {
    id: 4,
    slug: "neural-viz",
    title: "Neural Net Visualiser",
    tags: ["React", "D3", "Canvas", "TypeScript"],
    year: "2024",
    desc: "Interactive visualisation of neural network forward- and back-propagation. Activations pulse in real time as you feed in sample data, and gradients flow backwards showing exactly which weights changed and by how much.",
    color: "#ffcc00",
  },
  {
    id: 5,
    slug: "shader-playground",
    title: "Shader Playground",
    tags: ["WebGL", "GLSL", "Canvas"],
    year: "2023",
    desc: "Browser-based GLSL fragment shader editor with live preview, built-in uniform controls (sliders, colour pickers, audio FFT), and a curated library of starter shaders — no build step required.",
    color: "#ff44aa",
  },
  {
    id: 6,
    slug: "realtime-collab",
    title: "Realtime Collab Board",
    tags: ["React", "TypeScript", "Node.js", "WebSocket"],
    year: "2023",
    desc: "Multiplayer whiteboard with cursor sync, live drawing tools, sticky notes, and persistent rooms. The Node.js / Socket.io backend broadcasts operational transforms so edits never conflict.",
    color: "#44ffaa",
  },
  {
    id: 7,
    slug: "terrain-generator",
    title: "Terrain Generator",
    tags: ["Three.js", "R3F", "Procedural", "WebGL"],
    year: "2023",
    desc: "Real-time terrain generation using multi-octave Perlin noise with hydraulic erosion simulation and dynamic level-of-detail. Export flythrough videos directly from the browser via the MediaRecorder API.",
    color: "#ff9944",
  },
];
