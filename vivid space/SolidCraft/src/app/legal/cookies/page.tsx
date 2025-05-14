import { Metadata } from 'next';
import LegalContent from '../LegalContent';

export const metadata: Metadata = {
  title: 'Cookie Policy | SolidCraft',
  description: 'Our cookie policy explains how we use cookies on the SolidCraft website.',
};

export default function CookiesPage() {
  return (
    <div className="bg-[#fff8e9] text-[#3b332b] pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 font-fraunces">Cookie Policy</h1>
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <LegalContent type="cookies" />
          </div>
        </div>
      </div>
    </div>
  );
} 