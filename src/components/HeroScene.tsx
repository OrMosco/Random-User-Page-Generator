"use client";

import { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────────
   Mouse tracker — ref-based, zero re-renders
───────────────────────────────────────────── */
function useMouseNDCRef() {
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return mouse;
}

/* ─────────────────────────────────────────────
   Central rotating model — TorusKnot + edges
───────────────────────────────────────────── */
function HeroModel({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  const { geo, edgesGeo } = useMemo(() => {
    const g = new THREE.TorusKnotGeometry(1.2, 0.38, 160, 20, 2, 3);
    return { geo: g, edgesGeo: new THREE.EdgesGeometry(g, 15) };
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const t = clock.getElapsedTime();
    const targetX = mouse.current.y * 0.6;
    const targetY = mouse.current.x * 0.8;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY + t * 0.12,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      {/* Solid mesh — subtle, mostly transparent */}
      <mesh geometry={geo}>
        <meshStandardMaterial
          color="#0a0a20"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.45}
        />
      </mesh>

      {/* Edge lines — the "twist" wireframe accent */}
      <lineSegments geometry={edgesGeo}>
        <lineBasicMaterial color="#00aaff" transparent opacity={0.9} />
      </lineSegments>
    </group>
  );
}

/* ─────────────────────────────────────────────
   Floating satellite spheres
───────────────────────────────────────────── */
function Satellites({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo<[number, number, number][]>(
    () => [
      [2.8, 0.4, 0],
      [-2.6, -0.3, 0.5],
      [0.5, 2.4, 0.8],
      [-0.4, -2.5, -0.5],
    ],
    []
  );

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.25 + mouse.current.x * 0.3;
    groupRef.current.rotation.x = mouse.current.y * 0.2;
  });

  return (
    <group ref={groupRef}>
      {positions.map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <octahedronGeometry args={[0.18 + i * 0.04]} />
          <meshStandardMaterial
            color="#00aaff"
            emissive="#0055aa"
            emissiveIntensity={0.6}
            wireframe
          />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────────
   Scene wrapper — handles canvas internals
───────────────────────────────────────────── */
function Scene({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(0, 0, 6);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#00aaff" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#6644ff" />
      <Stars radius={80} depth={40} count={2500} factor={3} fade speed={0.5} />
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.4}>
        <HeroModel mouse={mouse} />
      </Float>
      <Satellites mouse={mouse} />
    </>
  );
}

/* ─────────────────────────────────────────────
   Public component — wraps Canvas
───────────────────────────────────────────── */
export default function HeroScene() {
  const mouse = useMouseNDCRef();

  return (
    <div className="absolute inset-0 w-full h-full" aria-hidden="true">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        camera={{ fov: 55, near: 0.1, far: 200, position: [0, 0, 6] }}
      >
        <Scene mouse={mouse} />
      </Canvas>
    </div>
  );
}
