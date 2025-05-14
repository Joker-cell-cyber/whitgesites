"use client";

import { useState, useEffect } from 'react';

interface LegalContentProps {
  type: 'terms' | 'privacy' | 'cookies';
  inPopup?: boolean;
}

const LegalContent = ({ type, inPopup = false }: LegalContentProps) => {
  const [content, setContent] = useState<string>('Loading...');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/legal?type=${type}`);
        const data = await response.json();
        setContent(data.content);
      } catch (error) {
        console.error('Error loading legal content:', error);
        setContent('Failed to load content. Please try again later.');
      }
    };

    fetchContent();
  }, [type]);

  // Adapter les styles selon que le contenu est affiché dans un popup (fond clair) ou sur la page (fond sombre)
  const proseClass = inPopup 
    ? "prose prose-gray max-w-none"  // Style pour les popups (fond clair)
    : "prose prose-invert prose-gray max-w-none"; // Style pour les pages (fond sombre)

  return (
    <article className={proseClass}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default LegalContent; 