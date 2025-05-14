/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Désactiver ESLint pendant la construction de production
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 