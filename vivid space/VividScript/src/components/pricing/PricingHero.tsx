"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function PricingHero() {
  return (
    <section className="relative pt-32 pb-16 bg-vid-white-100">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-vid-blue-900 heading-font">
            Video Script Pricing
          </h1>
          
          <p className="text-xl text-vid-blue-800 mb-8 max-w-3xl mx-auto">
            Our packages adapted to all video formats for content creators.
          </p>

          <div className="flex flex-wrap justify-center gap-4 items-center">
            <a 
              href="#pricing-tabs" 
              className="px-6 py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-colors button-glow heading-font"
            >
              View Packages
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 