import { Metadata } from 'next';
import LegalContent from './LegalContent';

export const metadata: Metadata = {
  title: 'Terms & Conditions - Oneiric Consulting',
  description: 'Terms and conditions for using Oneiric Consulting services.',
};

export default function LegalPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
            Terms & Conditions
          </h1>
          
          <div className="bg-gray-800 rounded-2xl p-8 shadow-lg">
            <LegalContent type="terms" />
          </div>
        </div>
      </div>
    </div>
  );
} 