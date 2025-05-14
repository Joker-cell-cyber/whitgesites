import React from 'react';
import LegalContent from '../LegalContent';
import { Metadata } from 'next';
import { COMPANY } from '../../constants/company';

export const metadata: Metadata = {
  title: `Cookie Policy | ${COMPANY.serviceName}`,
  description: 'Our Cookie Policy describes how we use cookies and similar technologies on our website.',
};

export default function CookiesPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <div className="prose prose-invert prose-lg max-w-none">
        <LegalContent type="cookies" />
      </div>
    </div>
  );
} 