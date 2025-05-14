"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md mx-auto"
    >
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="text-2xl font-bold text-cs-navy-900 mb-2">Payment Successful!</h2>
      <p className="text-cs-navy-700 mb-6">
        Your order has been successfully processed. You will receive an email confirmation shortly.
      </p>
      
      <div className="flex flex-col space-y-3">
        <Link 
          href="/"
          className="py-2 px-4 bg-cs-blue-50 text-cs-blue-700 rounded-lg hover:bg-cs-blue-100 transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </motion.div>
  );
} 