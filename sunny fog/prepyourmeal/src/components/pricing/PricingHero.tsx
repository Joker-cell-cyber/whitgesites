"use client";

import { motion } from "framer-motion";

export default function PricingHero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden bg-gray-50">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-nutrition-green-600/20 rounded-full filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-carrot-500/15 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-800">
            Choose Your <span className="gradient-text">Perfect</span> Meal Plan
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Nutritionist-designed meal plans with transparent one-time pricing. Select the plan that fits your lifestyle and dietary needs.
          </p>

          <div className="flex flex-wrap justify-center gap-4 items-center">
            <a 
              href="#pricing-tabs" 
              className="px-6 py-3 bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white rounded-lg font-medium button-glow"
            >
              View Meal Plans
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-nutrition-green-500 to-carrot-500 flex items-center justify-center text-white mb-4 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Instant Access</h3>
              <p className="text-gray-600 text-center">Get your meal plan delivered immediately after purchase</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-nutrition-green-500 to-carrot-500 flex items-center justify-center text-white mb-4 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Nutritionist Designed</h3>
              <p className="text-gray-600 text-center">All meal plans are created by certified nutrition professionals</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-nutrition-green-500 to-carrot-500 flex items-center justify-center text-white mb-4 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">Customizable Plans</h3>
              <p className="text-gray-600 text-center">Adaptable to your dietary preferences and restrictions</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 