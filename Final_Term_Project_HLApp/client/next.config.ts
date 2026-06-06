import type { NextConfig } from "next";
import { dirname } from "path";
import { fileURLToPath } from "url";

const clientRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: clientRoot,
  devIndicators: false,
  allowedDevOrigins: ["localhost", "127.0.0.1"]
};

export default nextConfig;
