/** @type {import('next').NextConfig} */
const nextConfig = {
  // basePath and assetPrefix removed - only use if deploying to a subpath
  // If you need basePath, ensure Vercel project settings match

  typescript: {
    ignoreBuildErrors: true,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
