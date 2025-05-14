import React from "react";

interface OrderSummaryProps {
  packageName: string;
  packagePrice: number;
}

export default function OrderSummary({ packageName, packagePrice }: OrderSummaryProps) {
  // The total is simply the package price without additional taxes
  const total = packagePrice;
  
  return (
    <div className="bg-[#14141e] p-6 rounded-xl shadow-lg border border-gray-800 sticky top-24">
      <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
      
      <div className="p-4 bg-[#0a0a14] rounded-lg mb-6">
        <h4 className="font-medium text-white">{packageName}</h4>
        <p className="text-sm text-gray-400 mt-1">One-time service package</p>
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-400">Price</span>
          <span className="text-white">${packagePrice.toFixed(2)}</span>
        </div>
        <div className="h-px bg-gray-800 my-2"></div>
        <div className="flex justify-between font-medium">
          <span className="text-white">Total</span>
          <span className="text-white text-xl">${total.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="text-xs text-gray-500">
        <p className="mb-2">By completing your purchase you agree to our <a href="/legal/terms" className="text-ai-blue-400 hover:underline">Terms of Service</a>.</p>
        <p>Your package will be activated after payment confirmation.</p>
      </div>
    </div>
  );
} 