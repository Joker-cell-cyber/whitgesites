"use client";

import { motion } from "framer-motion";

export default function PricingHero() {
  return (
    <section className="pt-28 pb-16 relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gray-100 rounded-bl-[100px] opacity-10"></div>
        <div className="absolute top-[10%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-gray-200 mix-blend-multiply filter blur-[120px] opacity-10 animate-slow-float"></div>
        <div className="absolute bottom-[10%] left-[5%] w-[35vw] h-[35vw] rounded-full bg-gray-200 mix-blend-multiply filter blur-[100px] opacity-10 animate-slow-float-delay"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-cs-navy-900">
              Transparent <span className="gradient-text">Pricing</span> for Sales Success
          </h1>
          
            <p className="text-xl text-cs-navy-700 mb-8 max-w-3xl mx-auto">
              Select from our range of professional sales script packages designed to boost your conversion rates and drive more sales.
          </p>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
            <a 
              href="#pricing-tabs" 
                className="px-6 py-3 rounded-lg bg-white border border-gray-200 text-cs-navy-900 font-medium hover:shadow-lg transition-shadow"
            >
                View Pricing
            </a>
            <a 
                href="/contact" 
                className="px-6 py-3 rounded-lg bg-gray-100 text-cs-navy-900 border border-gray-200 font-medium hover:bg-gray-200 transition-colors"
            >
                Contact Sales
            </a>
          </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl border border-gray-200 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-cs-navy-900 mb-4 mx-auto">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-cs-navy-900 mb-2 text-center">Custom Scripts</h3>
                <p className="text-cs-navy-700 text-center">Professionally written and tailored to your specific sales needs</p>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-gray-200 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-cs-navy-900 mb-4 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
                <h3 className="text-xl font-bold text-cs-navy-900 mb-2 text-center">Fast Delivery</h3>
                <p className="text-cs-navy-700 text-center">Get your sales scripts quickly with our priority delivery system</p>
            </div>
            
              <div className="bg-white p-6 rounded-xl border border-gray-200 backdrop-blur-sm">
                <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-cs-navy-900 mb-4 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
                <h3 className="text-xl font-bold text-cs-navy-900 mb-2 text-center">Proven Results</h3>
                <p className="text-cs-navy-700 text-center">Scripts crafted using proven sales methodologies that convert</p>
              </div>
            </div>
          </motion.div>
          </div>
      </div>
    </section>
  );
} 