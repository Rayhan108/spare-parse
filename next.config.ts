// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lerirides.nyc3.digitaloceanspaces.com",
      "avatar.iran.liara.run",
      "hatem-s3-bucket.s3.eu-north-1.amazonaws.com", // <-- add this
    ],
  },
  webpack: (config) => {
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (typeof args[0] === "string" && args[0].includes("[antd: compatible]")) {
        return;
      }
      originalWarn(...args);
    };
    return config;
  },
};

export default nextConfig;
