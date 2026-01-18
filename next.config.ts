import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  compress: true,
  webpack: (config) => {
    // Ensure webpack resolves from project root, not parent directories
    config.resolve = config.resolve || {};
    config.resolve.modules = [
      path.resolve(__dirname, "node_modules"),
      ...(config.resolve.modules || []),
    ];
    return config;
  },
  turbopack: {
    // Prevent workspace-root lockfile ambiguity warnings in monorepo-like setups
    root: __dirname,
    resolveAlias: {
      // Ensure tailwindcss resolves from project node_modules
      tailwindcss: path.resolve(__dirname, "node_modules/tailwindcss"),
    },
  },
};

export default nextConfig;
