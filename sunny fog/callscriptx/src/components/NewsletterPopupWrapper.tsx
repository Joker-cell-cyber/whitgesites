'use client';

import React from 'react';
import NewsletterPopup from './ui/NewsletterPopup';
import { useNewsletter } from '@/app/context/NewsletterContext';

const NewsletterPopupWrapper: React.FC = () => {
  const { isNewsletterOpen, closeNewsletter } = useNewsletter();
  
  return (
    <NewsletterPopup isOpen={isNewsletterOpen} onClose={closeNewsletter} />
  );
};

export default NewsletterPopupWrapper; 