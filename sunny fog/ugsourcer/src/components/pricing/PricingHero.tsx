"use client";

import { motion } from "framer-motion";

export default function PricingHero() {
  return (
    <section className="pt-24 pb-16 bg-white" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-ug-gray-900">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-xl text-ug-gray-600 max-w-2xl mx-auto">
              Choose the right package to connect with authentic UGC creators for your brand. No hidden fees, no commitments.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            <div className="inline-flex items-center bg-ug-blue-50 rounded-full px-4 py-2 text-ug-blue-600">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>One-time payment</span>
            </div>
            
            <div className="inline-flex items-center bg-ug-blue-50 rounded-full px-4 py-2 text-ug-blue-600">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>No monthly fees</span>
            </div>
            
            <div className="inline-flex items-center bg-ug-blue-50 rounded-full px-4 py-2 text-ug-blue-600">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>Quality guarantee</span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-4 bg-ug-blue-50 rounded-lg inline-flex items-center gap-3 text-ug-gray-700 mb-6">
              <svg className="w-6 h-6 text-ug-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Not sure which package is right for you? <a href="/contact" className="text-ug-blue-600 hover:text-ug-blue-700 font-medium">Contact us</a> for a personalized recommendation.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 