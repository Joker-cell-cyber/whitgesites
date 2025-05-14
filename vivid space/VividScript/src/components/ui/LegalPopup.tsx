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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-vid-blue-900 bg-opacity-30 backdrop-blur-sm transition-opacity duration-300"
         onClick={handleClose}
         style={{ opacity: isClosing ? 0 : 1 }}>
      <div 
        className={`relative bg-white max-w-4xl w-full max-h-[90vh] rounded-xl shadow-lg transition-all duration-300 transform overflow-hidden border border-vid-white-300 glass-effect ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-vid-white-300">
          <h2 className="text-xl font-bold text-vid-blue-900 heading-font">{title}</h2>
          <button 
            className="p-2 rounded-full hover:bg-vid-white-200 transition-colors"
            onClick={handleClose}
            aria-label="Close">
            <XMarkIcon className="h-6 w-6 text-vid-blue-400 hover:text-vid-blue-700" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] text-vid-blue-800">
          {children}
        </div>
        
        <div className="px-6 py-4 border-t border-vid-white-300 flex justify-end">
          <button 
            className="px-4 py-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-vid-blue-400 focus:ring-offset-2 focus:ring-offset-white button-glow heading-font"
            onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalPopup; 