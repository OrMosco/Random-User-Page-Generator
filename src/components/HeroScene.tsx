"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import ThreeForceGraph from "three-forcegraph";
import { projects } from "@/data/projects";

/* ─────────────────────────────────────────────
   Typed graph node that extends the force-graph
   internal node shape.
───────────────────────────────────────────── */
interface GraphNode {
  id: number;
  slug: string;
  title: string;
  tags: string[];
  color: string;
  val: number;
  /* populated by three-forcegraph after simulation */
  x?: number;
  y?: number;
  z?: number;
}

/* ─────────────────────────────────────────────
   Build graph where nodes = projects and edges
   connect projects that share at least one tag.
───────────────────────────────────────────── */
function buildProjectGraph() {
  const nodes: GraphNode[] = projects.map((p) => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    tags: p.tags,
    color: p.color,
    val: 2 + p.tags.length,
  }));

  const links: { source: number; target: number }[] = [];
  const added = new Set<string>();

  for (let i = 0; i < projects.length; i++) {
    for (let j = i + 1; j < projects.length; j++) {
      const shared = projects[i].tags.filter((t) =>
        projects[j].tags.includes(t)
      );
      if (shared.length > 0) {
        const key = `${i}-${j}`;
        if (!added.has(key)) {
          added.add(key);
          links.push({ source: i, target: j });
        }
      }
    }
  }

  return { nodes, links };
}

/* ─────────────────────────────────────────────
   Public component
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
    let targetCameraZ = 220;

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const ptLight = new THREE.PointLight(0x00aaff, 2.5, 1000);
    ptLight.position.set(100, 100, 100);
    scene.add(ptLight);
    const ptLight2 = new THREE.PointLight(0xff44aa, 1.5, 800);
    ptLight2.position.set(-120, -80, 80);
    scene.add(ptLight2);

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
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.6,
        sizeAttenuation: true,
      })
    );
    scene.add(stars);

    /* ── tooltip DOM element ── */
    const tooltip = document.createElement("div");
    tooltip.style.cssText = [
      "position:absolute",
      "background:rgba(0,0,0,0.88)",
      "color:#fff",
      "padding:5px 12px",
      "border-radius:6px",
      "font-family:monospace",
      "font-size:11px",
      "letter-spacing:0.06em",
      "pointer-events:none",
      "display:none",
      "z-index:10",
      "white-space:nowrap",
      "border:1px solid rgba(255,255,255,0.18)",
    ].join(";");
    el.appendChild(tooltip);

    /* ── project graph ── */
    const graphData = buildProjectGraph();
    const raycaster = new THREE.Raycaster();

    const Graph = new ThreeForceGraph()
      .graphData(graphData)
      .nodeThreeObject((node: unknown) => {
        const n = node as GraphNode;
        const size = 5 + n.tags.length * 1.4;
        const geo = new THREE.SphereGeometry(size, 24, 24);
        const mat = new THREE.MeshPhongMaterial({
          color: new THREE.Color(n.color),
          emissive: new THREE.Color(n.color),
          emissiveIntensity: 0.3,
          shininess: 80,
          transparent: true,
          opacity: 0.92,
        });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.userData.slug = n.slug;
        mesh.userData.title = n.title;
        return mesh;
      })
      .linkColor(() => "rgba(255,255,255,0.35)")
      .linkOpacity(0.5)
      .linkWidth(1.2);

    scene.add(Graph);

    /* ── HTML label layer ── */
    const labelContainer = document.createElement("div");
    labelContainer.style.cssText =
      "position:absolute;inset:0;pointer-events:none;z-index:4;";
    el.appendChild(labelContainer);

    const labelEls: HTMLDivElement[] = [];
    projects.forEach((p) => {
      const lbl = document.createElement("div");
      lbl.textContent = p.title;
      lbl.style.cssText = [
        "position:absolute",
        "font-family:monospace",
        "font-size:9px",
        "letter-spacing:0.1em",
        `color:${p.color}`,
        "white-space:nowrap",
        "transform:translate(-50%,-140%)",
        "pointer-events:none",
        "text-shadow:0 0 10px currentColor",
        "opacity:0",
        "transition:opacity 0.3s",
        "text-transform:uppercase",
      ].join(";");
      labelContainer.appendChild(lbl);
      labelEls.push(lbl);
    });

    /* ── mouse tracking + hover raycasting ── */
    const mouse = { x: 0, y: 0 };

    /** Convert a MouseEvent to normalised device coordinates relative to the canvas. */
    const getCanvasNDC = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      return new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
    };

    const onMouseMove = (e: MouseEvent) => {
      /* camera orbit uses window-normalised coords */
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(getCanvasNDC(e), camera);
      const hits = raycaster.intersectObjects(Graph.children, true);

      let hitTitle: string | null = null;
      for (const hit of hits) {
        let obj: THREE.Object3D | null = hit.object;
        while (obj) {
          if (obj.userData.slug) {
            hitTitle = obj.userData.title as string;
            break;
          }
          obj = obj.parent;
        }
        if (hitTitle) break;
      }

      const rect = el.getBoundingClientRect();
      if (hitTitle) {
        renderer.domElement.style.cursor = "pointer";
        tooltip.style.display = "block";
        tooltip.style.left = `${e.clientX - rect.left + 14}px`;
        tooltip.style.top = `${e.clientY - rect.top - 10}px`;
        tooltip.textContent = `↗ ${hitTitle}`;
      } else {
        renderer.domElement.style.cursor = "default";
        tooltip.style.display = "none";
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    /* ── click → navigate to project page ── */
    const onClick = (e: MouseEvent) => {
      raycaster.setFromCamera(getCanvasNDC(e), camera);
      const hits = raycaster.intersectObjects(Graph.children, true);

      for (const hit of hits) {
        let obj: THREE.Object3D | null = hit.object;
        while (obj) {
          if (obj.userData.slug) {
            window.location.href = `/projects/${obj.userData.slug}`;
            return;
          }
          obj = obj.parent;
        }
      }
    };
    el.addEventListener("click", onClick);

    /* ── scroll → camera zoom out (RAF-batched) ── */
    let scrollRafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(scrollRafId);
      scrollRafId = requestAnimationFrame(() => {
        const progress = Math.min(window.scrollY / window.innerHeight, 1);
        targetCameraZ = 220 + progress * 320;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    /* ── resize ── */
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
    const projVec = new THREE.Vector3();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      /* smooth scroll-based zoom */
      camera.position.z += (targetCameraZ - camera.position.z) * 0.06;

      /* slow auto-rotation + mouse tilt */
      Graph.rotation.y = t * 0.05 + mouse.x * 0.3;
      Graph.rotation.x = mouse.y * 0.2;

      Graph.tickFrame();
      renderer.render(scene, camera);

      /* update HTML labels (after render so matrixWorld is current) */
      const gd = Graph.graphData() as unknown as { nodes: GraphNode[] };
      gd.nodes.forEach((node, i) => {
        const lbl = labelEls[i];
        if (!lbl || node.x === undefined) return;

        projVec.set(node.x, node.y ?? 0, node.z ?? 0);
        projVec.applyMatrix4(Graph.matrixWorld);
        const dist = camera.position.distanceTo(projVec);
        projVec.project(camera);

        const x = (projVec.x * 0.5 + 0.5) * el.clientWidth;
        const y = (-projVec.y * 0.5 + 0.5) * el.clientHeight;
        const visible = projVec.z < 1 && dist < 450;
        lbl.style.opacity = visible ? "1" : "0";
        lbl.style.left = `${x}px`;
        lbl.style.top = `${y}px`;
      });
    };
    animate();

    /* ── cleanup ── */
    return () => {
      cancelAnimationFrame(frameId);
      cancelAnimationFrame(scrollRafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      el.removeEventListener("click", onClick);

      if (el.contains(tooltip)) el.removeChild(tooltip);
      if (el.contains(labelContainer)) el.removeChild(labelContainer);

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
      role="region"
      aria-label="Interactive project graph — click a node to explore a project"
    />
  );
}
