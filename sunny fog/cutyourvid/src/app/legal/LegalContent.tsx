"use client";

import { useState, useEffect } from 'react';
import { COMPANY } from '../constants/company';
import { termsContent } from './terms/terms-content';
import { privacyContent } from './privacy/privacy-content';
import { cookiesContent } from './cookies/cookies-content';

interface LegalContentProps {
  type: 'terms' | 'privacy' | 'cookies';
}

const LegalContent = ({ type }: LegalContentProps) => {
  const [content, setContent] = useState<string>('Loading...');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        if (type === 'terms') {
          setContent(termsContent);
        } else if (type === 'privacy') {
          setContent(privacyContent);
        } else if (type === 'cookies') {
          setContent(cookiesContent);
        } else {
          setContent('Invalid content type requested.');
        }
      } catch (error) {
        console.error('Error loading legal content:', error);
        setContent('Failed to load content. Please try again later.');
      }
    };

    fetchContent();
  }, [type]);

  return (
    <article className="prose prose-invert prose-lg max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default LegalContent; 