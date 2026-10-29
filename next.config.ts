import type { NextConfig } from "next";

// GitHub Pages serves the site from /<repo-name>. The deploy workflow passes
// the right prefix through PAGES_BASE_PATH; locally the site lives at the root.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
