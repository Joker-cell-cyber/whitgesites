/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'source.unsplash.com',
      'via.placeholder.com',
      'picsum.photos'
    ],
  },
};

module.exports = nextConfig; 