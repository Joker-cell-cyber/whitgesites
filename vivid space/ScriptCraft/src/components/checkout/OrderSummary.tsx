"use client";

import { motion } from "framer-motion";

type OrderSummaryProps = {
  productName: string;
  productPrice: number;
  productDescription?: string;
  features?: string[];
};

export default function OrderSummary({
  productName,
  productPrice,
  productDescription,
  features,
}: OrderSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-6 h-fit sticky top-24"
    >
      <h2 className="text-xl font-bold text-cs-navy-900 mb-4">Order Summary</h2>
      
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium text-cs-navy-800">{productName}</h3>
          <span className="text-lg font-bold text-cs-navy-900">${productPrice.toFixed(2)}</span>
        </div>
        {productDescription && (
          <p className="text-sm text-cs-navy-600 mb-3">{productDescription}</p>
        )}
        
        {features && features.length > 0 && (
          <div className="mt-3">
            <h4 className="text-sm font-medium text-cs-navy-700 mb-2">Includes:</h4>
            <ul className="space-y-1">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start text-sm">
                  <svg className="w-4 h-4 text-cs-blue-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-cs-navy-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="flex justify-between items-center font-bold">
        <span className="text-cs-navy-900">Total</span>
        <span className="text-xl text-cs-navy-900">${productPrice.toFixed(2)}</span>
      </div>
      
      <div className="mt-6 text-sm text-cs-navy-600">
        <div className="flex items-center mb-2">
          <svg className="w-4 h-4 text-cs-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Secure checkout</span>
        </div>
        <div className="flex items-center">
          <svg className="w-4 h-4 text-cs-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Fast delivery</span>
        </div>
      </div>
    </motion.div>
  );
} 