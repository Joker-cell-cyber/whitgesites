"use client";

import { useState, useEffect } from 'react';

interface LegalContentProps {
  type: 'terms' | 'privacy' | 'cookies';
}

const LegalContent = ({ type }: LegalContentProps) => {
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

  return (
    <article className="prose prose-lg max-w-none text-black">
      <div 
        className="text-black [&>*]:text-black [&_p]:text-black [&_h2]:text-black [&_h3]:text-black [&_h4]:text-black [&_li]:text-black [&_a]:text-black [&_a]:underline"
        dangerouslySetInnerHTML={{ __html: content }} 
      />
    </article>
  );
};

export default LegalContent; 