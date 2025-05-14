"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import CheckoutForm from '@/components/checkout/CheckoutForm';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [packageName, setPackageName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const packageParam = searchParams.get('package');
    const priceParam = searchParams.get('price');
    
    if (packageParam) {
      setPackageName(packageParam);
    }
    
    if (priceParam) {
      setPrice(parseFloat(priceParam));
    }
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">Checkout</h1>
        
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-white">Order Summary</h2>
            
            <div className="bg-zinc-800 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Package:</span>
                <span className="text-white font-medium">{packageName || 'No package selected'}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Price:</span>
                <span className="text-white font-medium">
                  {price ? `$${price.toFixed(2)} USD` : 'N/A'}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-zinc-700 mt-2">
                <span className="text-gray-300">Total:</span>
                <span className="text-white font-bold">
                  {price ? `$${price.toFixed(2)} USD` : 'N/A'}
                </span>
              </div>
            </div>
          </div>
          
          <CheckoutForm price={price} />
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-xl text-white">Loading checkout...</div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
} 