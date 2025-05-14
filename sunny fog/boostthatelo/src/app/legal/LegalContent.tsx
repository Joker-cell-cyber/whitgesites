"use client";

import { useState, useEffect } from 'react';
import { COMPANY } from '../constants/company';
import { termsContent } from './terms/terms-content';
import { privacyContent } from './privacy/privacy-content';
import { cookiesContent } from './cookies/cookies-content';

interface LegalContentProps {
  title?: string;
  content?: string;
  type: 'terms' | 'privacy' | 'cookies';
}

const LegalContent = ({ title, content, type }: LegalContentProps) => {
  const [displayContent, setDisplayContent] = useState<string>('Loading...');
  
  useEffect(() => {
    // If content is provided directly, use it
    if (content) {
      setDisplayContent(content);
      return;
    }
    
    // Otherwise load content based on type
    try {
      if (type === 'terms') {
        setDisplayContent(termsContent);
      } else if (type === 'privacy') {
        setDisplayContent(privacyContent);
      } else if (type === 'cookies') {
        setDisplayContent(cookiesContent);
      } else {
        setDisplayContent('Invalid content type requested.');
      }
    } catch (error) {
      console.error('Error loading legal content:', error);
      setDisplayContent('Failed to load content. Please try again later.');
    }
  }, [type, content]);

  return (
    <article className="prose prose-invert prose-lg max-w-none">
      {title && <h1>{title}</h1>}
      <div dangerouslySetInnerHTML={{ __html: displayContent }} />
    </article>
  );
};

export default LegalContent; 