import React from 'react';
import { Check } from '@/components/icons/Check';
import Link from 'next/link';

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  isPopular?: boolean;
  ctaText?: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  title,
  description,
  price,
  features,
  isPopular = false,
  ctaText = 'Get Started',
}) => {
  // Create checkout URL with plan details as parameters
  const checkoutUrl = `/checkout?plan=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}`;
  
  return (
    <div className={`relative rounded-2xl border ${isPopular ? 'border-purple-600 shadow-lg' : 'border-gray-200 dark:border-gray-800'} p-6 flex flex-col h-full`}>
      {isPopular && (
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">{description}</p>
      
      <div className="mt-4 flex items-baseline text-gray-900 dark:text-white">
        <span className="text-5xl font-extrabold tracking-tight">${price}</span>
      </div>
      
      <ul className="mt-6 space-y-4 flex-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 flex-shrink-0 text-green-500" />
            <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link
        href={checkoutUrl}
        className={`mt-8 w-full inline-flex justify-center py-3 px-4 rounded-xl ${
          isPopular 
            ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:opacity-90'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
        } text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
      >
        {ctaText}
      </Link>
    </div>
  );
};

export default PricingCard; 