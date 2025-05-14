'use client';

import React from 'react';
import NewsletterPopup from './ui/NewsletterPopup';
import { useNewsletter } from '../context/NewsletterContext';

const NewsletterPopupWrapper: React.FC = () => {
  const { isNewsletterOpen, closeNewsletter } = useNewsletter();

  return <NewsletterPopup isOpen={isNewsletterOpen} onClose={closeNewsletter} />;
};

export default NewsletterPopupWrapper; 