"use client";

import { motion } from "framer-motion";

export default function PricingHero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-[#6441A4]/20 rounded-full filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-[#00FFFF]/15 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Choose Your <span className="gradient-text">Perfect</span> Stream Package
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Professional overlay packages designed to elevate your stream. Transparent pricing with no hidden fees, just premium quality visuals.
          </p>

          <div className="flex flex-wrap justify-center gap-4 items-center">
            <a 
              href="#pricing" 
              className="px-6 py-3 bg-gradient-to-r from-[#6441A4] to-[#00FFFF] text-white rounded-lg font-medium button-glow"
            >
              View Packages
            </a>
            <a 
              href="#comparison" 
              className="px-6 py-3 bg-gray-800 text-white rounded-lg font-medium border border-gray-700 hover:bg-gray-700 transition-colors"
            >
              Compare Plans
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0b0b1e]/80 backdrop-blur p-6 rounded-xl border border-gray-800/50">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6441A4] to-[#00FFFF] flex items-center justify-center text-white mb-4 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">Fast Turnaround</h3>
              <p className="text-gray-400 text-center">Get your stream overlays back in as little as 3 days depending on complexity</p>
            </div>
            
            <div className="bg-[#0b0b1e]/80 backdrop-blur p-6 rounded-xl border border-gray-800/50">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6441A4] to-[#00FFFF] flex items-center justify-center text-white mb-4 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">Satisfaction Guarantee</h3>
              <p className="text-gray-400 text-center">Not happy? We&apos;ll revise your overlays until you love them or refund your payment</p>
            </div>
            
            <div className="bg-[#0b0b1e]/80 backdrop-blur p-6 rounded-xl border border-gray-800/50">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6441A4] to-[#00FFFF] flex items-center justify-center text-white mb-4 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">Platform Compatible</h3>
              <p className="text-gray-400 text-center">All our overlays work with Twitch, Kick, YouTube, DLive and most streaming platforms</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 