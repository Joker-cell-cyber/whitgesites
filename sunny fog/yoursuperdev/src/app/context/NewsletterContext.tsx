'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type NewsletterContextType = {
  isNewsletterOpen: boolean;
  openNewsletter: () => void;
  closeNewsletter: () => void;
};

const NewsletterContext = createContext<NewsletterContextType | undefined>(undefined);

export const NewsletterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);
  const [hasShownOnce, setHasShownOnce] = useState(false);

  // Ouvre le popup après 15 secondes si l'utilisateur n'a pas encore interagi avec
  useEffect(() => {
    // On vérifie si le popup a déjà été affiché dans cette session
    const hasSeenPopup = localStorage.getItem('hasSeenNewsletterPopup');
    
    if (!hasSeenPopup && !hasShownOnce) {
      const timer = setTimeout(() => {
        setIsNewsletterOpen(true);
        setHasShownOnce(true);
        // On enregistre que l'utilisateur a vu le popup pendant cette session
        localStorage.setItem('hasSeenNewsletterPopup', 'true');
      }, 15000); // 15 secondes
      
      return () => clearTimeout(timer);
    }
  }, [hasShownOnce]);

  const openNewsletter = () => setIsNewsletterOpen(true);
  const closeNewsletter = () => setIsNewsletterOpen(false);

  return (
    <NewsletterContext.Provider value={{ isNewsletterOpen, openNewsletter, closeNewsletter }}>
      {children}
    </NewsletterContext.Provider>
  );
};

export const useNewsletter = (): NewsletterContextType => {
  const context = useContext(NewsletterContext);
  if (context === undefined) {
    throw new Error('useNewsletter must be used within a NewsletterProvider');
  }
  return context;
}; 