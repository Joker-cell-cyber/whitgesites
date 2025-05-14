import React from 'react';

interface CheckoutSummaryProps {
  packageName: string;
  packagePrice: number;
}

export default function CheckoutSummary({ packageName, packagePrice }: CheckoutSummaryProps) {
  return (
    <div className="sticky top-4 border border-gray-800 rounded-lg shadow-lg bg-[--cyber-deep]/80 backdrop-blur-sm p-6">
      <h2 className="text-lg font-medium text-white">Order summary</h2>
      
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-800 pt-4">
          <div className="text-base font-medium text-white">{packageName} Package</div>
          <div className="text-base font-medium text-white">${packagePrice.toFixed(1)}</div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-6 mt-6">
        <div className="flex justify-between text-base font-medium text-white">
          <p>Total</p>
          <p>${packagePrice.toFixed(1)}</p>
        </div>
        <p className="mt-1 text-sm text-gray-400">One-time payment, no recurring charges</p>
      </div>
    </div>
  );
} 