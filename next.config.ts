import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  experimental: {
    // Optimize heavy imports to reduce the final bundle size
    optimizePackageImports: ["lucide-react"],
  },

  // CRITICAL FOR THE VPS: 
  // Generates the ultra-lightweight version of the app, isolating only what is necessary.
  output: "standalone",

  // 💡 Webpack Note: 
  // We removed `webpackBuildWorker: false` and the `parallelism` limits.
  // Now that GitHub Actions compiles the code, Next.js can use all 
  // the available memory and CPU in the cloud to finish the build extremely fast.
};

export default nextConfig;