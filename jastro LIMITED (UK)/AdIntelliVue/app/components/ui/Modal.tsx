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
            className="relative w-[90%] max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl bg-[#4F4639] border border-[#8A9D58]/20 shadow-2xl"
          >
            {/* Header avec effet de flou */}
            <div className="sticky top-0 z-10 bg-[#4F4639]/95 backdrop-blur-xl border-b border-[#8A9D58]/20">
              <div className="px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#E8DFC7]">
                  {title}
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-[#5F7138]/20 flex items-center justify-center text-[#E8DFC7]/60 hover:text-[#E8DFC7] hover:bg-[#5F7138]/40 transition-all duration-200 hover:scale-110"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Contenu avec défilement */}
            <div className="overflow-y-auto max-h-[calc(85vh-4rem)]">
              <div className="px-6 py-6 text-[#E8DFC7]/80 space-y-6">
                {children}
              </div>
            </div>

            {/* Effet de gradient en bas pour indiquer le défilement */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#4F4639] to-transparent pointer-events-none"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 