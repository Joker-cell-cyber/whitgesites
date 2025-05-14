/** @type {import('next').NextConfig} */
const nextConfig = {
  // Désactiver les vérifications ESLint lors du build
  eslint: {
    // Ignorer les problèmes ESLint lors du build
    ignoreDuringBuilds: true,
  },
  // Configuration pour corriger les problèmes de chargement CSS
  experimental: {
    optimizeCss: false,
  },
  // Désactiver le polling en développement pour éviter les boucles infinies
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        poll: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig; 