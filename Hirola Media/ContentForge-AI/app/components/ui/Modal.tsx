'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay avec flou */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ocrf-anthracite-900/80 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-[90%] max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl bg-ocrf-anthracite-900 border border-ocrf-gold-500/20 shadow-2xl"
          >
            {/* Effet de lumière décoratif */}
            <div className="absolute -left-20 -top-20 w-40 h-40 bg-ocrf-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -right-20 -bottom-20 w-40 h-40 bg-ocrf-copper-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            {/* Header avec effet de flou */}
            <div className="sticky top-0 z-10 bg-ocrf-anthracite-900/95 backdrop-blur-xl border-b border-ocrf-gold-500/20">
              <div className="px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-ocrf-gold-300 to-ocrf-copper-400">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-ocrf-anthracite-800/80 flex items-center justify-center text-ocrf-brown-300 hover:text-ocrf-gold-300 border border-ocrf-gold-500/10 hover:border-ocrf-gold-500/30 transition-all duration-200 hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Contenu avec défilement */}
            <div className="overflow-y-auto max-h-[calc(85vh-4rem)] scrollbar-thin scrollbar-thumb-ocrf-gold-500/20 scrollbar-track-ocrf-anthracite-800/30">
              <div className="px-6 py-6 text-ocrf-brown-200 space-y-6">
                {children}
              </div>
            </div>

            {/* Effet de gradient en bas pour indiquer le défilement */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-ocrf-anthracite-900 to-transparent pointer-events-none"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 