"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0f172a] to-[#1e293b]"></div>
        <div className="absolute top-20 right-[10%] w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 left-[5%] w-80 h-80 bg-indigo-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-effect p-8 md:p-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Connect With a <span className="text-gradient-blue">Global Audience</span>?
                </h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start your translation journey today and make your content accessible to millions around the world.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/pricing" 
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium button-glow"
              >
                Get Started
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-3 bg-[#1e293b] border border-indigo-500/30 text-white rounded-lg font-medium hover:bg-[#273549] transition-colors"
              >
                Contact Us
              </Link>
            </div>
            
            <div className="mt-10 flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                <span className="text-gray-300">Fast Turnaround</span>
                    </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                <span className="text-gray-300">Certified Translators</span>
                    </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                <span className="text-gray-300">30+ Languages</span>
              </div>
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                <span className="text-gray-300">100% Satisfaction</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 