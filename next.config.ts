import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  // Use SWC minifier instead of Terser (50% less RAM)
  swcMinify: true,

  experimental: {
    // Optimize package imports to reduce bundle size
    optimizePackageImports: ["lucide-react"],

    // CRITICAL: Disable parallel webpack workers to save memory
    webpackBuildWorker: false,
  },

  // Output standalone for Docker
  output: "standalone",

  // Webpack optimization for limited memory
  webpack: (config, { isServer }) => {
    // Limit parallelization to reduce memory spikes
    config.parallelism = 1;

    // Disable cache in Docker builds (saves RAM, cache not reusable)
    config.cache = false;

    // Optimize memory usage in production builds
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;
