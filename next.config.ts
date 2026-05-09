import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const isVercel = process.env.VERCEL === "1";

const nextConfig: NextConfig = {
  ...(isVercel ? {} : { output: "export" }),
  basePath: (isProd && !isVercel) ? "/ozbarbershop" : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: (isProd && !isVercel) ? "/ozbarbershop" : "",
  },
  images: {
    loader: "custom",
    loaderFile: "./imageLoader.ts",
  },
  allowedDevOrigins: ["192.168.178.53", "localhost:3000"],
};

export default nextConfig;