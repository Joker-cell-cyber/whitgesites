/** @type {import('next').NextConfig} */
const nextConfig = {
  // Désactiver les vérifications ESLint lors du build
  eslint: {
    // Ignorer les problèmes ESLint lors du build
    ignoreDuringBuilds: true,
  },
  // Ignorer les erreurs de type lors du build
  typescript: {
    // Ignorer les problèmes de type lors du build
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig; 