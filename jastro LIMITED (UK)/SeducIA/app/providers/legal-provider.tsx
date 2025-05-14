'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { legalContent } from '@/app/legal-pages/legal';
import { privacyContent } from '@/app/legal-pages/privacy';
import { refundContent } from '@/app/legal-pages/refund';
import { termsContent } from '@/app/legal-pages/terms';
import { useLegal as useExistingLegal } from '@/app/context/legal-context';

// Types pour les contenus légaux
interface LegalContentItem {
  title: string;
  text: string;
}

interface LegalContentData {
  title: string;
  content: LegalContentItem[];
}

// Type du contexte
interface LegalContextType {
  legal: LegalContentData;
  privacy: LegalContentData;
  refund: LegalContentData;
  terms: LegalContentData;
  getLegalTextContent: (type: 'legal' | 'privacy' | 'refund' | 'terms') => string;
}

// Création du contexte
const LegalContext = createContext<LegalContextType | undefined>(undefined);

// Provider
export function LegalProvider({ children }: { children: ReactNode }) {
  // On utilise le contexte existant pour les actions (open/close modal)
  const existingLegalContext = useExistingLegal();
  
  // Fonction pour formater le contenu en texte
  const getLegalTextContent = (type: 'legal' | 'privacy' | 'refund' | 'terms'): string => {
    const contents = {
      legal: legalContent,
      privacy: privacyContent,
      refund: refundContent,
      terms: termsContent
    };
    
    return contents[type].content.map(section => `${section.title}\n${section.text}`).join('\n\n');
  };
  
  // Valeur du contexte
  const contextValue: LegalContextType = {
    legal: legalContent,
    privacy: privacyContent,
    refund: refundContent,
    terms: termsContent,
    getLegalTextContent
  };
  
  // On retourne simplement les enfants car le provider existant est déjà utilisé
  return <>{children}</>;
}

// Hook pour utiliser le contexte
export function useLegal() {
  // On utilise le contexte existant qui est déjà configuré
  return useExistingLegal();
} 