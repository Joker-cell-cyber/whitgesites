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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300"
         onClick={handleClose}
         style={{ opacity: isClosing ? 0 : 1 }}>
      <div 
        className={`relative bg-white max-w-4xl w-full max-h-[90vh] hand-drawn transition-all duration-300 transform overflow-hidden ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-black">{title}</h2>
          <button 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={handleClose}
            aria-label="Close">
            <XMarkIcon className="h-6 w-6 text-gray-500 hover:text-black" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] text-gray-700">
          {children}
        </div>
        
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button 
            className="px-4 py-2 text-black rounded-lg transition-colors focus:outline-none button-hand-drawn"
            onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalPopup; 