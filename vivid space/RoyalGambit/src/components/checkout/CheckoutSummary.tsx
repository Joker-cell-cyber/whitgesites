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