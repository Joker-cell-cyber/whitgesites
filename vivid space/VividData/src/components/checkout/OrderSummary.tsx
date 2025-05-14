import React from 'react';

interface OrderSummaryProps {
  packageData: {
    name: string;
    price: number;
  };
}

export function OrderSummary({ packageData }: OrderSummaryProps) {
  const { name, price } = packageData;
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <h2 className="text-xl font-semibold mb-4 pb-2 border-b text-gray-900">Order Summary</h2>
      
      <div className="mb-6">
        <div className="flex justify-between items-center py-3 border-b">
          <span className="text-gray-700 font-medium">Package:</span>
          <span className="text-gray-900 font-medium">{name}</span>
        </div>
        
        <div className="py-3">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700">Price:</span>
            <span className="text-gray-900">${price.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex justify-between items-center py-3 border-t">
          <span className="text-gray-900 font-semibold">Total:</span>
          <span className="text-primary text-xl font-bold">${price.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0 mt-1">
            <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-gray-700 text-sm">One-time payment, no subscription</p>
          </div>
        </div>
        
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0 mt-1">
            <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-gray-700 text-sm">Secure payment processing</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-1">
            <svg className="h-5 w-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-gray-700 text-sm">Dedicated customer support</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          Need help? <a href="/contact" className="text-primary hover:underline">Contact our support team</a>
        </p>
      </div>
    </div>
  );
} 