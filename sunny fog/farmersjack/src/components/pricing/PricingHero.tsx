"use client";

import { motion } from "framer-motion";

export default function PricingHero() {
  return (
    <section className="relative pt-28 pb-16 overflow-hidden bg-[#070b14]">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-toxic-green-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-neon-pink-500/15 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="inline-block px-3 py-1 mb-4 bg-black/30 border border-toxic-green-500/30 rounded text-toxic-green-500 text-xs font-mono">
              RESOURCE_ALLOCATION
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 glitch-text">
              SELECT YOUR <span className="text-toxic-green-500">MISSION</span> PACKAGE
            </h1>
            
            <p className="text-lg text-gray-400 mb-8 max-w-3xl mx-auto font-mono border-l-2 border-toxic-green-500/20 pl-4 text-left">
              Our elite operators are standing by to execute your precise gaming objectives. 
              Select from our tiered mission packages or request a custom deployment for your specific needs.
            </p>

            <div className="flex flex-wrap justify-center gap-4 items-center">
              <a 
                href="#pricing-tabs" 
                className="px-6 py-3 bg-gradient-to-r from-toxic-green-600 to-toxic-green-800 text-white rounded-lg font-medium pixel-corners font-mono"
              >
                VIEW TACTICAL OPTIONS
              </a>
              <a 
                href="/contact" 
                className="px-6 py-3 bg-[#0c1220] text-white rounded-lg font-medium border border-gray-700 hover:bg-[#121a2c] transition-colors pixel-corners font-mono"
              >
                REQUEST CUSTOM MISSION
              </a>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#0c1220] p-6 rounded-xl border border-gray-800 pixel-corners relative"
            >
              <div className="absolute top-0 right-0 px-2 py-1 bg-black/50 text-toxic-green-500 text-xs font-mono m-2 border border-toxic-green-500/30 rounded">
                PROTOCOL_01
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-toxic-green-900/30 to-toxic-green-700/10 flex items-center justify-center mb-4 mx-auto border border-toxic-green-500/20">
                <svg className="w-6 h-6 text-toxic-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">RAPID DEPLOYMENT</h3>
              <p className="text-gray-400 text-center font-mono text-sm">Mission completion in as little as 24 hours depending on operational complexity</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#0c1220] p-6 rounded-xl border border-gray-800 pixel-corners relative"
            >
              <div className="absolute top-0 right-0 px-2 py-1 bg-black/50 text-neon-pink-500 text-xs font-mono m-2 border border-neon-pink-500/30 rounded">
                PROTOCOL_02
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-pink-900/30 to-neon-pink-700/10 flex items-center justify-center mb-4 mx-auto border border-neon-pink-500/20">
                <svg className="w-6 h-6 text-neon-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">100% MISSION SUCCESS</h3>
              <p className="text-gray-400 text-center font-mono text-sm">Guaranteed results or full tactical refund with our satisfaction protocol</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#0c1220] p-6 rounded-xl border border-gray-800 pixel-corners relative"
            >
              <div className="absolute top-0 right-0 px-2 py-1 bg-black/50 text-plasma-purple-500 text-xs font-mono m-2 border border-plasma-purple-500/30 rounded">
                PROTOCOL_03
              </div>
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-plasma-purple-900/30 to-plasma-purple-700/10 flex items-center justify-center mb-4 mx-auto border border-plasma-purple-500/20">
                <svg className="w-6 h-6 text-plasma-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 text-center">ELITE OPERATORS</h3>
              <p className="text-gray-400 text-center font-mono text-sm">Veteran gaming specialists with 5+ years experience in tactical gaming operations</p>
            </motion.div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-block px-2 py-1 bg-black/50 border border-gray-800 rounded text-xs font-mono text-gray-500">
              <span className="inline-block w-2 h-2 bg-toxic-green-500 rounded-full mr-1 animate-pulse"></span>
              SYSTEM.OPERATIONAL
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 