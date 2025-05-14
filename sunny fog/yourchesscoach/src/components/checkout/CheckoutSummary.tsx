"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useProduct } from "@/components/context/ProductContext";

export default function CheckoutSummary() {
  const { selectedProduct } = useProduct();
  
  if (!selectedProduct) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-[#0e2250] rounded-xl p-6 shadow-xl"
      >
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
        <p className="text-gray-400">No product selected. Please go back to the pricing page.</p>
        <div className="mt-4">
          <Link 
            href="/pricing" 
            className="text-blue-400 hover:text-blue-300 underline"
          >
            Return to pricing
          </Link>
        </div>
      </motion.div>
    );
  }
  
  // Le prix total est simplement le prix du produit, sans taxe additionnelle
  const total = selectedProduct.price;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-[#0e2250] rounded-xl p-6 shadow-xl sticky top-24"
    >
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
      
      <div className="space-y-4">
        <div className="border-b border-[#1e3a6e] pb-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-lg">{selectedProduct.name}</h3>
              <p className="text-gray-400 text-sm">{selectedProduct.duration}</p>
              {selectedProduct.level && (
                <p className="text-gray-400 text-sm">{selectedProduct.level}</p>
              )}
            </div>
            <span className="font-medium">${selectedProduct.price.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="space-y-2 border-b border-[#1e3a6e] pb-4">
          <div className="flex justify-between">
            <span className="text-gray-400">Subtotal</span>
            <span>${selectedProduct.price.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        {/* One-time payment badge */}
        <div className="mt-3 py-2 px-3 bg-green-900/30 border border-green-700 rounded-lg flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-green-400 font-medium">One-time payment</span>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400 flex items-center justify-center">
            <ShieldCheckIcon className="w-5 h-5 mr-1 text-green-500" />
            Secure checkout
          </p>
        </div>
        
        <div className="mt-4 bg-[#081326] p-4 rounded-lg">
          <p className="text-sm text-gray-400 mb-2">
            Have a question about your order?
          </p>
          <Link 
            href="/contact" 
            className="text-blue-400 hover:text-blue-300 text-sm underline"
          >
            Contact our support team
          </Link>
        </div>
      </div>
    </motion.div>
  );
} 