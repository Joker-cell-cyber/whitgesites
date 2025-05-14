"use client";

import { termsContent } from '@/app/legal/terms/terms-content';
import { privacyContent } from '@/app/legal/privacy/privacy-content';
import { cookiesContent } from '@/app/legal/cookies/cookies-content';

interface LegalContentProps {
  type: 'terms' | 'privacy' | 'cookies';
}

const LegalContent = ({ type }: LegalContentProps) => {
  let content = '';
  if (type === 'terms') content = termsContent;
  else if (type === 'privacy') content = privacyContent;
  else if (type === 'cookies') content = cookiesContent;

  return (
    <article className="prose prose-slate max-w-none">
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </article>
  );
};

export default LegalContent; 