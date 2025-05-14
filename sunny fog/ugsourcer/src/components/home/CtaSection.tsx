"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CtaSection() {
  // Removed unused state variables and handleSubmit function since they're not being used
  // in the current implementation of the component

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-white to-ug-blue-50">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-[10%] w-72 h-72 bg-ug-blue-100/30 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/4 right-[5%] w-64 h-64 bg-ug-blue-100/20 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-ug-gray-200"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ug-gray-900">
                Ready to Find Your Perfect <span className="gradient-text">UGC Creators?</span>
                </h2>
              <p className="text-ug-gray-600 text-lg max-w-2xl mx-auto">
                Connect with authentic content creators who understand your brand and can create engaging content that resonates with your audience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-ug-blue-50 p-6 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-ug-blue-100 flex items-center justify-center text-ug-blue-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                <h3 className="text-lg font-semibold mb-2 text-ug-gray-900">Quick Turnaround</h3>
                <p className="text-ug-gray-700">Get matched with vetted creators within days, not weeks.</p>
                    </div>
              
              <div className="bg-ug-blue-50 p-6 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-ug-blue-100 flex items-center justify-center text-ug-blue-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-ug-gray-900">Quality Guaranteed</h3>
                <p className="text-ug-gray-700">All creators are pre-vetted for content quality and reliability.</p>
              </div>
              
              <div className="bg-ug-blue-50 p-6 rounded-xl">
                <div className="w-12 h-12 rounded-full bg-ug-blue-100 flex items-center justify-center text-ug-blue-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                        </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-ug-gray-900">Seamless Process</h3>
                <p className="text-ug-gray-700">From creator selection to final deliverables - we make it easy.</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/pricing" 
                className="px-8 py-4 bg-gradient-to-r from-ug-blue-600 to-ug-blue-500 text-white rounded-lg font-medium text-center button-glow"
              >
                View Pricing Plans
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-white text-ug-blue-600 border border-ug-blue-200 rounded-lg font-medium text-center hover:bg-ug-blue-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 