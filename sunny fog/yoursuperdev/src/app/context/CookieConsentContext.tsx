'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type ConsentOptions = {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
};

type CookieConsentContextType = {
  consents: ConsentOptions;
  updateConsent: (newConsents: Partial<ConsentOptions>) => void;
  hasConsented: boolean;
  resetConsent: () => void;
};

const defaultConsents: ConsentOptions = {
  necessary: true, // Toujours activé
  preferences: false,
  analytics: false,
  marketing: false
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consents, setConsents] = useState<ConsentOptions>(defaultConsents);
  const [hasConsented, setHasConsented] = useState<boolean>(false);

  // Charger les préférences enregistrées
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    
    if (savedConsent) {
      try {
        if (savedConsent === 'all') {
          setConsents({
            necessary: true,
            preferences: true,
            analytics: true,
            marketing: true
          });
        } else if (savedConsent === 'necessary') {
          setConsents(defaultConsents);
        } else {
          const parsedConsents = JSON.parse(savedConsent);
          if (parsedConsents && typeof parsedConsents === 'object') {
            setConsents(prev => ({
              ...prev,
              ...parsedConsents
            }));
          }
        }
        setHasConsented(true);
      } catch (error) {
        console.error('Error parsing saved consent:', error);
      }
    }
  }, []);

  const updateConsent = (newConsents: Partial<ConsentOptions>) => {
    const updatedConsents = { ...consents, ...newConsents };
    setConsents(updatedConsents);
    
    // Simuler l'enregistrement des préférences
    localStorage.setItem('cookieConsent', JSON.stringify(updatedConsents));
    setHasConsented(true);
  };

  const resetConsent = () => {
    localStorage.removeItem('cookieConsent');
    setConsents(defaultConsents);
    setHasConsented(false);
  };

  return (
    <CookieConsentContext.Provider value={{ consents, updateConsent, hasConsented, resetConsent }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = (): CookieConsentContextType => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}; 