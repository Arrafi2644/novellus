import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow any hostname
        port: "",
        pathname: "**", // allow any path
      },
    ],
  },
  typedRoutes: false,
};

export default nextConfig;
