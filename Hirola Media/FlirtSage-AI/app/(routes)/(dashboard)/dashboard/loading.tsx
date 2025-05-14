'use client';

import { motion } from 'framer-motion';

export default function DashboardLoading() {
  return (
    <div className="p-8">
      {/* En-tête du dashboard avec animation */}
      <div className="mb-8">
        <div className="h-8 w-64 bg-yfc-cream-700/70 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-96 bg-yfc-cream-700/40 rounded animate-pulse"></div>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-yfc-cream-50/40 backdrop-blur-xl rounded-xl p-6 border border-yfc-gold-200/30">
            <div className="h-4 w-24 bg-yfc-cream-300 rounded animate-pulse mb-4"></div>
            <div className="h-8 w-16 bg-yfc-cream-400 rounded animate-pulse"></div>
            <div className="mt-4 w-full h-2 bg-yfc-cream-300 rounded-full"></div>
            <div className="h-3 w-32 bg-yfc-cream-300/50 rounded animate-pulse mt-4"></div>
          </div>
        ))}
      </div>

      {/* Actions rapides et achats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Actions rapides */}
        <div className="md:col-span-2 bg-yfc-cream-50/40 backdrop-blur-xl rounded-xl p-6 border border-yfc-gold-200/30">
          <div className="h-6 w-48 bg-yfc-cream-400 rounded animate-pulse mb-6"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-12 w-full bg-yfc-cream-300 rounded animate-pulse"></div>
            <div className="h-12 w-full bg-yfc-cream-200/70 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Acheter des tokens */}
        <div className="bg-yfc-cream-50/40 backdrop-blur-xl rounded-xl p-6 border border-yfc-gold-200/30">
          <div className="h-6 w-48 bg-yfc-cream-400 rounded animate-pulse mb-2"></div>
          <div className="h-4 w-full bg-yfc-cream-300/50 rounded animate-pulse mb-6"></div>
          <div className="h-12 w-full bg-yfc-gold-300/70 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Informations sur le plan */}
      <div className="bg-yfc-cream-50/40 backdrop-blur-xl rounded-xl p-6 border border-yfc-gold-200/30">
        <div className="h-6 w-64 bg-yfc-cream-400 rounded animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="h-6 w-48 bg-yfc-cream-400 rounded animate-pulse mb-4"></div>
            <div className="h-4 w-full bg-yfc-cream-300/50 rounded animate-pulse mb-4"></div>
            <div className="h-4 w-3/4 bg-yfc-cream-300/50 rounded animate-pulse"></div>
          </div>
          <div className="bg-gradient-to-r from-yfc-gold-400/10 to-yfc-gold-200/10 rounded-lg p-4 border border-yfc-gold-300/20">
            <div className="h-5 w-48 bg-yfc-cream-400 rounded animate-pulse mb-4"></div>
            <div className="h-4 w-full bg-yfc-cream-300/50 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 