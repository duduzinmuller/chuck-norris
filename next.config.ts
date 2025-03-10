import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.chucknorris.io",
      },
    ],
  },
};

export default nextConfig;
