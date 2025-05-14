import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Disable ESLint during build
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        {
          key: 'X-Robots-Tag',
          value: 'noindex, nofollow',
        },
      ],
    }];
  },
  images: {
    domains: ['images.unsplash.com'],
  },
};

export default nextConfig;
