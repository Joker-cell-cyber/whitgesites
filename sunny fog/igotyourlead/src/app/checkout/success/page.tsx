"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function CheckoutSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-lead-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-lead-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Thank You for Your Order!
          </h1>
          
          <p className="text-xl text-gray-300 mb-6">
            Your purchase was successful and is being processed.
          </p>
        </motion.div>
        
        <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-4 text-white">What Happens Next?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left mb-6">
            <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-800/50">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-lead-blue-500/20 text-lead-blue-500 mb-3">
                <span className="text-xl font-bold">1</span>
              </div>
              <h3 className="font-bold text-white mb-2">Check Your Email</h3>
              <p className="text-gray-400 text-sm">
                We&apos;ve sent you a confirmation email with your order details and receipt.
              </p>
            </div>
            
            <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-800/50">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-lead-blue-500/20 text-lead-blue-500 mb-3">
                <span className="text-xl font-bold">2</span>
              </div>
              <h3 className="font-bold text-white mb-2">Order Processing</h3>
              <p className="text-gray-400 text-sm">
                Our team will process your order and prepare your lead package for delivery.
              </p>
            </div>
            
            <div className="p-4 rounded-lg border border-zinc-800 bg-zinc-800/50">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-lead-blue-500/20 text-lead-blue-500 mb-3">
                <span className="text-xl font-bold">3</span>
              </div>
              <h3 className="font-bold text-white mb-2">Delivery</h3>
              <p className="text-gray-400 text-sm">
                You&apos;ll receive your leads according to the delivery timeframe specified in your order.
              </p>
            </div>
          </div>
          
          <div className="bg-zinc-800 p-4 rounded-lg mb-6">
            <h3 className="font-bold text-white mb-2">Order Support</h3>
            <p className="text-gray-400 mb-2">
              If you have any questions about your order, please contact our support team:
            </p>
            <p className="text-lead-blue-500">{COMPANY.email}</p>
            <p className="text-lead-blue-500">{COMPANY.phone}</p>
          </div>
        </div>
        
        <div className="flex justify-center gap-4">
          <Link 
            href="/"
            className="px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
} 