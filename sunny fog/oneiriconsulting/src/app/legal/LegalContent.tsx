"use client";

import { useState, useEffect } from 'react';

interface LegalContentProps {
  type: 'terms' | 'privacy' | 'cookies';
}

const LegalContent = ({ type }: LegalContentProps) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`/api/legal?type=${type}`);
        
        if (!response.ok) {
          throw new Error(`Failed to load content: ${response.status}`);
        }
        
        const data = await response.json();
        setContent(data.content);
      } catch (error) {
        console.error('Error loading legal content:', error);
        setError('Failed to load content. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContent();
  }, [type]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <article className="prose prose-sm md:prose prose-invert max-w-none text-gray-100">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default LegalContent; 