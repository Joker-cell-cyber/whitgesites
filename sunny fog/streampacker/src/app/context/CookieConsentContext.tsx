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
  updateConsent: (newConsents: ConsentOptions) => void;
  hasConsented: boolean;
};

const defaultConsents: ConsentOptions = {
  necessary: true, // Always true as it's required
  preferences: false,
  analytics: false,
  marketing: false
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consents, setConsents] = useState<ConsentOptions>(defaultConsents);
  const [hasConsented, setHasConsented] = useState<boolean>(false);

  // Load saved consents from localStorage on component mount
  useEffect(() => {
    const savedConsents = localStorage.getItem('cookieConsents');
    if (savedConsents) {
      try {
        const parsedConsents = JSON.parse(savedConsents);
        setConsents(parsedConsents);
        setHasConsented(true);
      } catch (error) {
        console.error('Error parsing saved cookie consents:', error);
      }
    }
  }, []);

  const updateConsent = (newConsents: ConsentOptions) => {
    setConsents(newConsents);
    setHasConsented(true);
    localStorage.setItem('cookieConsents', JSON.stringify(newConsents));
  };

  return (
    <CookieConsentContext.Provider value={{ consents, updateConsent, hasConsented }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
} 