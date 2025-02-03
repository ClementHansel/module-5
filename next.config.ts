import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.escuelajs.co", // ✅ Allow product images from API
      },
    ],
  },
};

export default nextConfig;
