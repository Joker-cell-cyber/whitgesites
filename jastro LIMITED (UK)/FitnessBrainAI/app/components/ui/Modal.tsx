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
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-[90%] max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl bg-white border border-[#A590DC]/30 shadow-2xl"
          >
            {/* Header avec effet de dégradé */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-[#F5F2FC] to-white border-b border-[#A590DC]/20">
              <div className="px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#2A303D]">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-[#A590DC]/10 flex items-center justify-center text-[#2A303D] hover:bg-[#A590DC]/20 transition-all duration-200 hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Contenu avec défilement */}
            <div className="overflow-y-auto max-h-[calc(85vh-4rem)]">
              <div className="px-6 py-6 text-[#414B5A] space-y-6 bg-white">
                {children}
              </div>
            </div>

            {/* Effet de gradient en bas pour indiquer le défilement */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 