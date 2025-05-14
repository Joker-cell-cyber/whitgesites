"use client";

import { motion } from "framer-motion";

export default function PricingHero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden bg-book-blue-50">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-book-blue-600/20 rounded-full filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-book-green-500/15 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-book-blue-900">
            Choose Your <span className="gradient-text">Perfect</span> E-Book
          </h1>
          
          <p className="text-xl text-book-blue-700 mb-8 max-w-3xl mx-auto">
            Transparent pricing with packages designed for every need and budget. No hidden fees, just professional e-book writing services.
          </p>

          <div className="flex flex-wrap justify-center gap-4 items-center">
            <a 
              href="#pricing-tabs" 
              className="px-6 py-3 bg-gradient-to-r from-book-blue-600 to-book-green-500 text-white rounded-lg font-medium button-glow"
            >
              View Packages
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-book-blue-100 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-book-blue-500 to-book-green-500 flex items-center justify-center text-white mb-4 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-book-blue-900 mb-2 text-center">Fast Delivery</h3>
              <p className="text-book-blue-700 text-center">Get your e-book in as little as 7 days depending on complexity and length</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-book-blue-100 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-book-blue-500 to-book-green-500 flex items-center justify-center text-white mb-4 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-book-blue-900 mb-2 text-center">Satisfaction Guarantee</h3>
              <p className="text-book-blue-700 text-center">Not satisfied? We&apos;ll revise until you&apos;re happy or give you a full refund</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-book-blue-100 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-book-blue-500 to-book-green-500 flex items-center justify-center text-white mb-4 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-book-blue-900 mb-2 text-center">Expert Writers</h3>
              <p className="text-book-blue-700 text-center">Experienced professionals with years of e-book writing expertise</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 