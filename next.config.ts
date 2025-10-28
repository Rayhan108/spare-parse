// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   images: {
//     domains: [
//       'lerirides.nyc3.digitaloceanspaces.com',
//       'avatar.iran.liara.run', // add this
//     ],
//   },
// };

// export default nextConfig;



import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "lerirides.nyc3.digitaloceanspaces.com",
      "avatar.iran.liara.run",
    ],
  },
  webpack: (config) => {
    // 👇 Patch to suppress the AntD React 19 compatibility warning
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (
        typeof args[0] === "string" &&
        args[0].includes("[antd: compatible]")
      ) {
        return; // skip the warning
      }
      originalWarn(...args);
    };
    return config;
  },
};

export default nextConfig;
