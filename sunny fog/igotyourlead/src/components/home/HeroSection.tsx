"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16" id="home">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-lead-blue-600/20 rounded-full filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 left-[5%] w-80 h-80 bg-lead-green-500/15 rounded-full filter blur-3xl"></div>
        <div className="absolute top-40 left-[30%] w-64 h-64 bg-gradient-to-r from-lead-blue-600/10 to-lead-green-600/10 rounded-full filter blur-2xl animate-float"></div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-gray-800/80 text-gray-300 backdrop-blur-sm border border-gray-700">
              <span className="flex h-2 w-2 rounded-full bg-lead-blue-500 mr-2"></span>
              Premium Lead Generation Service
            </div>
            
            <h1 className="responsive-heading text-4xl md:text-5xl font-bold">
              Turn <span className="gradient-text">Prospects</span> Into <span className="relative">
                <span className="relative z-10">Qualified</span>
                <svg className="absolute bottom-0 left-0 w-full h-[0.2em] text-lead-blue-600/30" viewBox="0 0 200 8" preserveAspectRatio="none">
                  <path d="M0,0 C50,5 80,5 200,0" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span> Leads
            </h1>
            
            <p className="text-xl text-gray-300 md:text-2xl leading-relaxed">
              From B2B decision-makers to high-intent consumers - we deliver verified leads that grow your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/#pricing" 
                className="px-6 py-3 bg-gradient-to-r from-lead-blue-600 to-lead-green-500 text-white rounded-lg font-medium button-glow text-center"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-800 bg-[#1a1a1a]">
              <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-lead-blue-900/60 to-lead-green-900/60">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:bg-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-lead-blue-600 translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <Image
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                  alt="Business growth chart"
                  className="w-full h-full object-cover"
                  width={1000}
                  height={667}
                />
              </div>
              
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br from-lead-blue-500 to-lead-green-500 rounded-full filter blur-xl opacity-50"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -right-6 top-1/4 p-3 bg-[#1e1e1e] rounded-lg shadow-lg border border-gray-800 rotate-3 animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-lead-blue-500 to-lead-green-500 rounded-lg flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">High ROI</div>
                  <div className="text-gray-400 text-sm">Verified Leads</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -left-6 bottom-1/4 p-3 bg-[#1e1e1e] rounded-lg shadow-lg border border-gray-800 -rotate-6 animate-float-delay">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-lead-blue-500 to-lead-green-500 rounded-lg flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">Quality Verified</div>
                  <div className="text-gray-400 text-sm">100% Authentic</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 