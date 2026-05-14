import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Random-User-Page-Generator",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
