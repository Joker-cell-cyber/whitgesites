'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin"></div>
      </div>
    }>
      <NotFoundContent />
    </Suspense>
  );
}

function NotFoundContent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl shadow-2xl border border-pink-500/20 text-center"
      >
        <div className="flex flex-col items-center gap-4">
          <Heart className="h-12 w-12 text-pink-500" />
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-white">Page non trouvée</h1>
          <p className="text-gray-400">La page que vous cherchez n'existe pas ou a été déplacée.</p>
          
          <Link href="/"
            className="mt-4 inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-medium shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300">
            Retour à l'accueil
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 