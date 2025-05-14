import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Désactiver la vérification ESLint pendant la compilation
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
};

export default nextConfig;
