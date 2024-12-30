import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    SECRET_JWT: process.env.SECRET_JWT
  }
};

export default nextConfig;
