'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import LegalModal from '@/app/components/legal/LegalModal';

type LegalType = 'terms' | 'privacy' | 'legal' | 'refund';

interface LegalContextType {
  openLegalModal: (type: LegalType) => void;
  closeLegalModal: () => void;
}

const LegalContext = createContext<LegalContextType | undefined>(undefined);

export function useLegal(): LegalContextType {
  const context = useContext(LegalContext);
  if (!context) {
    throw new Error('useLegal must be used within a LegalProvider');
  }
  return context;
}

interface LegalProviderProps {
  children: ReactNode;
}

export function LegalProvider({ children }: LegalProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLegalType, setCurrentLegalType] = useState<LegalType>('terms');

  const openLegalModal = (type: LegalType) => {
    setCurrentLegalType(type);
    setIsModalOpen(true);
  };

  const closeLegalModal = () => {
    setIsModalOpen(false);
  };

  return (
    <LegalContext.Provider
      value={{
        openLegalModal,
        closeLegalModal,
      }}
    >
      {children}
      <LegalModal 
        isOpen={isModalOpen} 
        onClose={closeLegalModal} 
        legalType={currentLegalType} 
      />
    </LegalContext.Provider>
  );
} 