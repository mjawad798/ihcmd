import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enables static HTML export
  trailingSlash: true, // Ensures all routes end with a slash (important for static export)

  // Configure image handling
  images: {
    unoptimized: true, // Required for static export since `next/image` doesn’t optimize images in export mode
  },

};

export default nextConfig;
