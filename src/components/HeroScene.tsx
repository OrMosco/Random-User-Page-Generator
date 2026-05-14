"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import ThreeForceGraph from "three-forcegraph";

/* ─────────────────────────────────────────────
   Build a random graph dataset
───────────────────────────────────────────── */
function buildGraphData(nodeCount = 60, linkCount = 80) {
  const GROUPS = 6;
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    id: i,
    group: i % GROUPS,
    val: 1 + Math.random() * 2,
  }));

  const links: { source: number; target: number }[] = [];
  const added = new Set<string>();

  while (links.length < linkCount) {
    const s = Math.floor(Math.random() * nodeCount);
    const t = Math.floor(Math.random() * nodeCount);
    const key = s < t ? `${s}-${t}` : `${t}-${s}`;
    if (s !== t && !added.has(key)) {
      added.add(key);
      links.push({ source: s, target: t });
    }
  }

  return { nodes, links };
}

/* Group → accent colour palette */
const GROUP_COLORS = [
  "#00aaff",
  "#6644ff",
  "#00ffcc",
  "#ff6644",
  "#ffcc00",
  "#ff44aa",
];

/* ─────────────────────────────────────────────
   Public component — raw Three.js + three-forcegraph
───────────────────────────────────────────── */
export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    /* ── renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    /* ── scene / camera / lights ── */
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      el.clientWidth / el.clientHeight,
      0.1,
      3000
    );
    camera.position.set(0, 0, 220);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const ptLight = new THREE.PointLight(0x00aaff, 2, 800);
    ptLight.position.set(100, 100, 100);
    scene.add(ptLight);

    /* ── star field ── */
    const starGeo = new THREE.BufferGeometry();
    const starVerts: number[] = [];
    for (let i = 0; i < 3000; i++) {
      starVerts.push(
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000,
        (Math.random() - 0.5) * 2000
      );
    }
    starGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVerts, 3)
    );
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.7, sizeAttenuation: true })
    );
    scene.add(stars);

    /* ── force graph ── */
    const graphData = buildGraphData(60, 80);

    const Graph = new ThreeForceGraph()
      .graphData(graphData)
      .nodeColor((node) =>
        GROUP_COLORS[((node as { group?: number }).group ?? 0) % GROUP_COLORS.length]
      )
      .nodeOpacity(0.85)
      .nodeResolution(12)
      .linkColor(() => "#ffffff")
      .linkOpacity(0.15)
      .linkWidth(0.4);

    scene.add(Graph);

    /* ── mouse for gentle camera orbit ── */
    const mouse = { x: 0, y: 0 };
    let mousePending = false;
    const onMouseMove = (e: MouseEvent) => {
      if (mousePending) return;
      mousePending = true;
      requestAnimationFrame(() => {
        mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        mousePending = false;
      });
    };
    window.addEventListener("mousemove", onMouseMove);

    /* ── resize handler ── */
    const onResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    /* ── animation loop ── */
    let frameId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      /* slow auto-rotation + mouse tilt */
      Graph.rotation.y = t * 0.06 + mouse.x * 0.4;
      Graph.rotation.x = mouse.y * 0.25;

      Graph.tickFrame();
      renderer.render(scene, camera);
    };
    animate();

    /* ── cleanup ── */
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      /* dispose Three.js resources */
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          const mats = Array.isArray(mesh.material)
            ? mesh.material
            : [mesh.material];
          mats.forEach((m: THREE.Material) => m.dispose());
        }
      });

      renderer.dispose();
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
