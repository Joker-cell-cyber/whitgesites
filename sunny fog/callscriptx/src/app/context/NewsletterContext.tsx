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

  // Open popup after 15 seconds if the user hasn't interacted yet
  useEffect(() => {
    // Check if popup has already been shown in this session
    const hasSeenPopup = localStorage.getItem('hasSeenNewsletterPopup');
    
    if (!hasSeenPopup && !hasShownOnce) {
      const timer = setTimeout(() => {
        setIsNewsletterOpen(true);
        setHasShownOnce(true);
        // Save that user has seen the popup in this session
        localStorage.setItem('hasSeenNewsletterPopup', 'true');
      }, 15000); // 15 seconds
      
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