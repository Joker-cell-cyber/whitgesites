"use client";

import { motion } from "framer-motion";

export default function BoostPricingHero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 -left-20 w-96 h-96 bg-purple-600/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Competitive Game <span className="gradient-text">Boosting</span> Packages
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            Choose the perfect boosting package to climb the ranks in your favorite competitive games
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center items-center gap-3"
          >
            <div className="flex items-center text-sm md:text-base text-gray-300">
              <div className="w-4 h-4 mr-2 rounded-full bg-green-500"></div>
              <span>Pro players</span>
            </div>
            
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
            
            <div className="flex items-center text-sm md:text-base text-gray-300">
              <div className="w-4 h-4 mr-2 rounded-full bg-blue-500"></div>
              <span>24/7 support</span>
            </div>
            
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
            
            <div className="flex items-center text-sm md:text-base text-gray-300">
              <div className="w-4 h-4 mr-2 rounded-full bg-purple-500"></div>
              <span>VPN protection</span>
            </div>
            
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
            
            <div className="flex items-center text-sm md:text-base text-gray-300">
              <div className="w-4 h-4 mr-2 rounded-full bg-yellow-500"></div>
              <span>Fast delivery</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 