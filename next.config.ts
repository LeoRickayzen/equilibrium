import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Only use basePath in production (for GitHub Pages)
  // In development, basePath is empty so localhost:3000 works
  basePath: process.env.NODE_ENV === "production" ? "/equilibrium" : "",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
