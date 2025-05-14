"use client";

import { useState, useEffect, ReactNode, useCallback } from 'react';
import { motion } from "framer-motion";

interface LegalPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const LegalPopup = ({ isOpen, onClose, title, children }: LegalPopupProps) => {
  const [isClosing, setIsClosing] = useState(false);
  
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  }, [onClose]);

  // Handle ESC key press to close popup
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300"
         onClick={handleClose}
         style={{ opacity: isClosing ? 0 : 1 }}>
      <motion.div 
        className="relative bg-zinc-900 text-white max-w-4xl w-full max-h-[90vh] rounded-xl shadow-2xl transition-all duration-300 transform overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: isClosing ? 0.95 : 1, opacity: isClosing ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-700">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button 
            className="p-2 rounded-full hover:bg-zinc-700 transition-colors"
            onClick={handleClose}
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] bg-zinc-900">
          {children}
        </div>
        
        <div className="px-6 py-4 border-t border-zinc-700 flex justify-end">
          <button 
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            onClick={handleClose}
          >
            Fermer
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default LegalPopup; 