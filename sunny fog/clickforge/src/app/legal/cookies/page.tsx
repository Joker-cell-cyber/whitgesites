import { Metadata } from 'next';
import LegalContent from '../LegalContent';

export const metadata: Metadata = {
  title: 'Cookie Policy | ClickForge',
  description: 'Our cookie policy explains how we use cookies on the ClickForge website.',
};

export default function CookiesPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <LegalContent type="cookies" />
    </div>
  );
} 