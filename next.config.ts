import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  experimental: {
    // Enable optimizations as needed
    optimizePackageImports: ["lucide-react"],
  },

  // Output standalone for Docker
  output: "standalone",
};

export default nextConfig;
