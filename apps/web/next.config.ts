import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Next 15 app router is default; keep minimal experimental flags
  }
};

export default nextConfig;
