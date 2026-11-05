import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // All placeholders in public/ are trusted first-party SVG files.
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",

    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],

  },
};

export default nextConfig;
