"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CtaSection() {
  // Removed unused state variables and handleSubmit function since they're not being used
  // in the current implementation of the component

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-950 to-blue-950">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(120,0,200,0.2),transparent_40%)]"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_70%_60%,rgba(0,120,255,0.2),transparent_40%)]"></div>
        <div className="absolute w-full h-full opacity-30 mix-blend-lighten bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEzIDEzTDEgMU0xIDEzTDEzIDEiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIwLjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4=')]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Glowing border effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 p-1 blur-xl opacity-70"></div>
            
            <div className="relative backdrop-blur-xl bg-slate-900/60 rounded-3xl p-10 md:p-14 border border-slate-700/50 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-blue-500/20 blur-2xl"></div>
              <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-purple-500/20 blur-2xl"></div>
              
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                  Ready to Find Your Perfect <span className="relative">UGC Creators?</span>
                </h2>
                <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto mb-6"></div>
                <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                  Connect with authentic content creators who understand your brand and can create engaging content that resonates with your audience.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-slate-800/60 border border-slate-700/50 p-6 rounded-2xl backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-cyan-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">Quick Turnaround</h3>
                  <p className="text-slate-300">Get matched with vetted creators within days, not weeks.</p>
                </div>
                
                <div className="bg-slate-800/60 border border-slate-700/50 p-6 rounded-2xl backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">Quality Guaranteed</h3>
                  <p className="text-slate-300">All creators are pre-vetted for content quality and reliability.</p>
                </div>
                
                <div className="bg-slate-800/60 border border-slate-700/50 p-6 rounded-2xl backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white mb-4 shadow-lg shadow-indigo-500/30">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">Seamless Process</h3>
                  <p className="text-slate-300">From creator selection to final deliverables - we make it easy.</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link 
                  href="/pricing" 
                  className="px-10 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-medium text-center shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 transform hover:-translate-y-1 transition-all duration-300"
                >
                  View Pricing Plans
                </Link>
                <Link 
                  href="/contact" 
                  className="px-10 py-4 bg-transparent text-white border border-slate-600 rounded-full font-medium text-center hover:bg-white/5 hover:border-slate-500 transform hover:-translate-y-1 transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 