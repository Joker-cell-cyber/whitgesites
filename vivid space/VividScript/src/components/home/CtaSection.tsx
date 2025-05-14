"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function CtaSection() {
  return (
    <section className="py-24 bg-vid-blue-50" id="cta">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 md:p-12 rounded-lg shadow-md glass-effect"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-vid-blue-900 heading-font">
              Need a Video Script?
            </h2>
            <p className="text-xl text-vid-blue-800 mb-8 max-w-2xl mx-auto">
              Professional scripts to boost your audience engagement and grow your channel.
            </p>
            <div className="flex justify-center items-center">
              <a 
                href="/pricing" 
                className="px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-lg font-medium transition-colors text-center min-w-[200px] button-glow heading-font"
              >
                View Pricing
              </a>
            </div>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-vid-blue-100 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-vid-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-vid-blue-900 font-medium heading-font">Fast Delivery</div>
                    <div className="text-vid-blue-700 text-sm">Optimized timelines</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-vid-blue-100 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-vid-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-vid-blue-900 font-medium heading-font">Expert Writers</div>
                    <div className="text-vid-blue-700 text-sm">Professional quality</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-vid-blue-100 flex items-center justify-center mr-4">
                    <svg className="w-6 h-6 text-vid-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="text-vid-blue-900 font-medium heading-font">Secure Process</div>
                    <div className="text-vid-blue-700 text-sm">Confidential service</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 