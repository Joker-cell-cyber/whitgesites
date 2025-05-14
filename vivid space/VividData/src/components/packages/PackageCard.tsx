import React from 'react';
import Link from 'next/link';

interface PackageProps {
  packageData: {
    price: number;
    name: string;
    description: string;
    features: string[];
    popular: boolean;
  }
}

export function PackageCard({ packageData }: PackageProps) {
  const { price, name, description, features, popular } = packageData;
  
  // Create checkout URL with package data
  const checkoutUrl = `/checkout?package=${encodeURIComponent(name)}&price=${encodeURIComponent(price)}`;
  
  return (
    <div className={`relative rounded-xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
      popular ? 'border-2 border-primary shadow-xl' : 'border border-gray-200 shadow-md'
    }`}>
      {popular && (
        <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
          Popular
        </div>
      )}
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-950">{name}</h3>
        </div>
        
        <div className="mt-4 flex items-baseline text-gray-950">
          <span className="text-3xl font-extrabold tracking-tight">${price}</span>
          <span className="ml-1 text-xl font-semibold"></span>
          <span className="ml-2 text-sm text-black font-medium">one-time payment</span>
        </div>
        
        <p className="text-black mb-6">{description}</p>
        
        <div className="border-t border-gray-100 pt-4 mb-6">
          <ul className="space-y-3">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <svg className="h-5 w-5 text-primary mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-black">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Link 
          href={checkoutUrl} 
          className={`block w-full text-center py-2 px-4 rounded-md transition duration-300 transform hover:scale-105 ${
            popular 
              ? 'bg-primary text-white hover:bg-primary-dark' 
              : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
          }`}
        >
          Order Now
        </Link>
      </div>
    </div>
  );
} 