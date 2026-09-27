import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Dev-only: lets you open the dev server from another device on the LAN
  // (phone testing). Next blocks non-localhost origins by default, which
  // shows up as blocked fonts and a failing HMR websocket.
  allowedDevOrigins: ["192.168.1.100"],
};

export default nextConfig;
