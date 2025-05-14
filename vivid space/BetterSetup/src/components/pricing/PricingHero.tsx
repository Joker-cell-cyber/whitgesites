"use client";

import { motion } from "framer-motion";

export default function PricingHero() {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 opacity-20 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
            Simple <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">Pricing</span> For Your Notion Workspace
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Transparent pricing with packages designed for individuals, teams and businesses. No hidden fees, just professional Notion workspace setup services.
          </p>

          <div className="flex flex-wrap justify-center gap-4 items-center">
            <a 
              href="#pricing-tabs" 
              className="px-8 py-4 rounded-full font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
            >
              View Packages
            </a>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-2xl border border-gray-800 shadow-xl shadow-indigo-500/5 bg-gradient-to-br from-gray-800/70 to-black/70 backdrop-blur-sm p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600/60 to-purple-600/60 flex items-center justify-center text-white mb-4 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">Quick Setup</h3>
              <p className="text-gray-300 text-center">Get your Notion workspace set up in as little as 48 hours depending on complexity</p>
            </div>
            
            <div className="rounded-2xl border border-gray-800 shadow-xl shadow-indigo-500/5 bg-gradient-to-br from-gray-800/70 to-black/70 backdrop-blur-sm p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600/60 to-fuchsia-600/60 flex items-center justify-center text-white mb-4 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">Satisfaction Guarantee</h3>
              <p className="text-gray-300 text-center">Not happy? We&apos;ll revise until you love your workspace or refund your payment</p>
            </div>
            
            <div className="rounded-2xl border border-gray-800 shadow-xl shadow-indigo-500/5 bg-gradient-to-br from-gray-800/70 to-black/70 backdrop-blur-sm p-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-fuchsia-600/60 to-pink-600/60 flex items-center justify-center text-white mb-4 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">Notion Experts</h3>
              <p className="text-gray-300 text-center">Experienced professionals with years of Notion setup and optimization experience</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 