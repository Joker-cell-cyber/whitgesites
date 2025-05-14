'use client';

import { motion } from 'framer-motion';

export default function DashboardLoading() {
  return (
    <div className="p-8">
      {/* En-tête du dashboard avec animation */}
      <div className="mb-8">
        <div className="h-8 w-64 bg-gray-700 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-96 bg-gray-700/50 rounded animate-pulse"></div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20">
            <div className="h-4 w-24 bg-gray-700 rounded animate-pulse mb-4"></div>
            <div className="h-8 w-16 bg-gray-700 rounded animate-pulse"></div>
            <div className="mt-4 w-full h-2 bg-gray-700 rounded-full"></div>
            <div className="h-3 w-32 bg-gray-700/50 rounded animate-pulse mt-4"></div>
          </div>
        ))}
      </div>

      {/* Actions rapides et achats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Actions rapides */}
        <div className="md:col-span-2 bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20">
          <div className="h-6 w-48 bg-gray-700 rounded animate-pulse mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-12 w-full bg-gray-700 rounded animate-pulse"></div>
            <div className="h-12 w-full bg-gray-700/50 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Acheter des tokens */}
        <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20">
          <div className="h-6 w-48 bg-gray-700 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-full bg-gray-700/50 rounded animate-pulse mb-6"></div>
          <div className="h-12 w-full bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Informations sur le plan */}
      <div className="bg-black/40 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20">
        <div className="h-6 w-64 bg-gray-700 rounded animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="h-6 w-48 bg-gray-700 rounded animate-pulse mb-4"></div>
            <div className="h-4 w-full bg-gray-700/50 rounded animate-pulse mb-4"></div>
            <div className="h-4 w-3/4 bg-gray-700/50 rounded animate-pulse"></div>
          </div>
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-purple-500/20">
            <div className="h-5 w-48 bg-gray-700 rounded animate-pulse mb-4"></div>
            <div className="h-4 w-full bg-gray-700/50 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 