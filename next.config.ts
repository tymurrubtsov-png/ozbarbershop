import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/ozbarbershop" : "",
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["192.168.178.53", "localhost:3000"],
};

export default nextConfig;
