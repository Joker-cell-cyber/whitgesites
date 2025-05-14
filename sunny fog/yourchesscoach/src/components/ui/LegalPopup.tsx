"use client";

import { useState, useEffect, ReactNode, useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface LegalPopupProps {
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const LegalPopup = ({ onClose, children, title = "Legal Information" }: LegalPopupProps) => {
  const [isClosing, setIsClosing] = useState(false);
  
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);
  
  // Close on escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [handleClose]);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
      onClick={handleClose}>
      <div 
        className={`relative bg-[#1a1a1a] max-w-4xl w-full max-h-[90vh] rounded-xl shadow-2xl transition-all duration-300 transform overflow-hidden border border-vid-red-800/20 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
        onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button 
            className="p-2 rounded-full hover:bg-gray-800 transition-colors"
            onClick={handleClose}
            aria-label="Close">
            <XMarkIcon className="h-6 w-6 text-gray-400 hover:text-white" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] text-gray-300">
          {children}
        </div>
        
        <div className="px-6 py-4 border-t border-gray-800 flex justify-end">
          <button 
            className="px-4 py-2 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-vid-red-500 focus:ring-offset-2 focus:ring-offset-gray-900 button-glow"
            onClick={handleClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LegalPopup; 