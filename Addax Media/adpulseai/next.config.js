/** @type {import('next').NextConfig} */
const nextConfig = {
  // Désactiver les vérifications ESLint lors du build
  eslint: {
    // Ignorer les problèmes ESLint lors du build
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 