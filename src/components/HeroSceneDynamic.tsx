"use client";

import dynamic from "next/dynamic";

// Three.js / R3F cannot run on the server — load client-only
const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => null,
});

export default HeroScene;
