"use client";

import { useCheckout } from "./CheckoutContext";

export default function OrderSummary() {
  const { selectedProduct } = useCheckout();
  
  // Calculate total (equal to product price)
  const total = selectedProduct ? selectedProduct.price : 0;
  
  if (!selectedProduct) {
    return (
      <div className="card-hand-drawn bg-white p-6">
        <h2 className="text-xl font-bold mb-4 text-black">Order Summary</h2>
        <p className="text-gray-600">No product selected</p>
      </div>
    );
  }
  
  return (
    <div className="card-hand-drawn bg-white p-6 sticky top-24">
      <h2 className="text-xl font-bold mb-6 text-black">Order Summary</h2>
      
      {/* Product Details */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="font-medium text-black">{selectedProduct.name}</h3>
            <p className="text-sm text-gray-600">
              {selectedProduct.category && `${selectedProduct.category} Package`}
            </p>
            <p className="text-sm text-gray-600 mt-1">{selectedProduct.description}</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-black">${selectedProduct.price.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      {/* Total Price */}
      <div className="mb-6 space-y-3">
        <div className="flex justify-between font-medium">
          <span className="text-black">Total</span>
          <span className="text-black text-lg">${total.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Guarantee */}
      <div className="bg-notion-black-50 p-4 rounded-md">
        <div className="flex items-start space-x-3">
          <div className="text-notion-accent-600 shrink-0">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">100% Satisfaction Guarantee</p>
            <p className="text-xs text-gray-600 mt-1">
              If you&apos;re not completely satisfied with your Notion setup, we&apos;ll work with you until you are.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 