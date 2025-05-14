'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import LegalModal from '@/app/components/legal/LegalModal';
import { legalContent } from '@/app/legal-pages/legal';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { termsContent } from '@/app/legal-pages/terms';

type LegalType = 'terms' | 'privacy' | 'legal' | 'refund';

// Types pour les contenus légaux
interface LegalContentItem {
  title: string;
  text: string;
}

interface LegalContentData {
  title: string;
  content: LegalContentItem[];
}

interface LegalContextType {
  openLegalModal: (type: LegalType) => void;
  closeLegalModal: () => void;
  legal: LegalContentData;
  privacy: LegalContentData;
  refund: LegalContentData;
  terms: LegalContentData;
  getLegalTextContent: (type: LegalType) => string;
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

  // Fonction pour formater le contenu en texte
  const getLegalTextContent = (type: LegalType): string => {
    const contents = {
      legal: legalContent,
      privacy: privacyContent,
      refund: refundContent,
      terms: termsContent
    };
    
    return contents[type].content.map(section => `${section.title}\n${section.text}`).join('\n\n');
  };

  return (
    <LegalContext.Provider
      value={{
        openLegalModal,
        closeLegalModal,
        legal: legalContent,
        privacy: privacyContent,
        refund: refundContent,
        terms: termsContent,
        getLegalTextContent
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