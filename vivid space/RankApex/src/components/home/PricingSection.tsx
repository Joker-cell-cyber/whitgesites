"use client";

import { motion } from "framer-motion";
import BoostPricingPackages from "../pricing/BoostPricingPackages";

export default function PricingSection() {
  return (
    <section className="py-24 bg-[#09110f] relative overflow-hidden" id="pricing">
      <div className="absolute inset-0 bg-grid opacity-5"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rank-emerald-500/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
              <span className="inline-block relative">
                <span className="gradient-text">Boosting Services</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 400 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 3C1 3 119.6 1 200 3C279.4 5 399 3 399 3" stroke="url(#paint0_linear)" strokeWidth="4" strokeLinecap="round"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="1" y1="3" x2="399" y2="3" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#36CE90" stopOpacity="0"/>
                      <stop offset="0.5" stopColor="#36CE90"/>
                      <stop offset="1" stopColor="#FF7B10" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
            </h2>
            <p className="text-gray-400 mt-6 max-w-lg mx-auto">Choose from our selection of professional boosting packages, designed for every rank and skill level. Guaranteed results with complete security.</p>
          </motion.div>
        </div>

        {/* Show boost pricing packages component */}
        <BoostPricingPackages />
      </div>
    </section>
  );
} 