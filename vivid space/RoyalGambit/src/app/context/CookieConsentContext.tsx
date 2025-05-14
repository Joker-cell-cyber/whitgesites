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
  necessary: true,
  preferences: false,
  analytics: false,
  marketing: false
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const CookieConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consents, setConsents] = useState<ConsentOptions>(defaultConsents);
  const [hasConsented, setHasConsented] = useState<boolean>(false);

  // Load saved consent preferences on mount
  useEffect(() => {
    const savedConsents = localStorage.getItem('cookieConsents');
    if (savedConsents) {
      try {
        const parsedConsents = JSON.parse(savedConsents);
        setConsents(parsedConsents);
        setHasConsented(true);
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
        
        // Fall back to default in case of error
        setConsents(defaultConsents);
        setHasConsented(false);
      }
    }
  }, []);

  const updateConsent = (newConsents: Partial<ConsentOptions>) => {
    const updatedConsents = {
      ...consents,
      ...newConsents,
      necessary: true // Always keep necessary cookies enabled
    };
    
    setConsents(updatedConsents);
    setHasConsented(true);
    
    // Save to localStorage
    localStorage.setItem('cookieConsents', JSON.stringify(updatedConsents));
    
    // Here you would typically also update tracking and cookie permissions
    // based on the user's choices
  };

  const resetConsent = () => {
    localStorage.removeItem('cookieConsents');
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