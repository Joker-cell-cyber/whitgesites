import { Metadata } from 'next';
import PricingSection from '@/components/home/PricingSection';
import { COMPANY } from '../constants/company';

export const metadata: Metadata = {
  title: `Coaching Plans & Pricing | ${COMPANY.serviceName}`,
  description: 'Explore our chess coaching packages designed to improve your strategic thinking and gameplay at every level.',
};

export default function PricingPage() {
  return (
    <div className="pt-24 pb-12 bg-[#070e1b]">
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
          Chess Coaching <span className="gradient-text">Pricing</span>
        </h1>
        <p className="text-gray-400 text-center max-w-3xl mx-auto">
          Invest in your chess improvement with our specialized coaching packages.
          Choose the plan that matches your current level and specific needs.
        </p>
      </div>
      
      <PricingSection />
    </div>
  );
} 