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
    <article className="prose prose-lg max-w-none text-gray-900 bg-white p-8 rounded-lg shadow-lg">
      <style jsx global>{`
        .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
          color: #1e3a8a !important;
        }
        .prose p, .prose li, .prose ul, .prose ol {
          color: #1f2937 !important;
        }
        .prose a {
          color: #2563eb !important;
        }
        .prose strong {
          color: #111827 !important;
        }
      `}</style>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default LegalContent; 