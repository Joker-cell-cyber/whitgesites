"use client";

import { useState, useEffect, ReactNode, useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-md transition-opacity duration-300"
         onClick={handleClose}
         style={{ opacity: isClosing ? 0 : 1 }}>
      <div 
        className={`relative bg-card-bg max-w-4xl w-full max-h-[90vh] rounded-xl shadow-2xl transition-all duration-300 transform overflow-hidden border border-rank-emerald-800/20 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-rank-emerald-900/20 bg-card-accent">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <span className="w-1.5 h-6 bg-gradient-to-b from-rank-emerald-400 to-rank-orange-400 rounded-full mr-3"></span>
            {title}
          </h2>
          <button 
            className="p-2 rounded-full hover:bg-rank-emerald-900/30 transition-colors"
            onClick={handleClose}
            aria-label="Close">
            <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-white" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] text-gray-300">
          {children}
        </div>
        
        <div className="px-6 py-4 border-t border-rank-emerald-900/20 flex justify-end bg-card-accent/50">
          <button 
            className="px-6 py-2.5 rounded-lg text-white button-apex focus:outline-none focus:ring-2 focus:ring-rank-emerald-500/50 focus:ring-offset-2 focus:ring-offset-card-bg"
            onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalPopup; 