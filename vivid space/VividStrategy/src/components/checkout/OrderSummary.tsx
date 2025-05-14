"use client";

import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function OrderSummary() {
  const searchParams = useSearchParams();
  const planTitle = searchParams.get('plan') || 'Professional Plan';
  const planPrice = searchParams.get('price') || '59.30';
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm sticky top-32">
      <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Order Summary</h2>
      
      {/* Selected Plan */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-800 dark:text-gray-200 font-medium">{planTitle}</span>
          <span className="text-gray-900 dark:text-white font-medium">${planPrice}</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Monthly subscription
        </p>
      </div>
      
      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
      
      {/* Total */}
      <div className="pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-900 dark:text-white">Total</span>
          <span className="text-xl font-bold text-gray-900 dark:text-white">${planPrice}</span>
        </div>
      </div>
      
      {/* Security Notice */}
      <div className="mt-6 text-center">
        <div className="flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Secure checkout
        </div>
      </div>
    </div>
  );
} 