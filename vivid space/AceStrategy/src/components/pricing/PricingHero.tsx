"use client";

import { motion } from "framer-motion";

export default function PricingHero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-poker-royal-600/20 rounded-full filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-chip-gold-500/15 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-playfair">
            Choose Your <span className="gradient-text">Perfect</span> Coaching Package
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto font-raleway">
            Transparent pricing with packages designed for every skill level. No hidden fees, just professional poker coaching services.
          </p>

          <div className="flex flex-wrap justify-center gap-4 items-center">
            <a 
              href="#pricing-tabs" 
              className="px-6 py-3 bg-gradient-to-r from-poker-royal-700 to-poker-royal-800 text-white rounded-lg font-medium button-glow"
            >
              View Packages
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 