'use client';

import React from 'react';
import NewsletterPopup from '@/components/ui/NewsletterPopup';

export default function NewsletterPopupProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <NewsletterPopup />
    </>
  );
} 