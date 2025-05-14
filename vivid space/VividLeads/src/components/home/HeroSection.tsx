"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden" id="home">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-[#070707]"></div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-radial from-vivid-purple-900/20 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-radial from-vivid-amber-900/20 via-transparent to-transparent" style={{ transform: 'translate(75%, 25%)' }}></div>
        </div>
        
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')" }}></div>
        
        {/* Subtle grid */}
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.05) 1px, transparent 1px)', 
          backgroundSize: '60px 60px' 
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center">
          {/* Animated badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-12 px-4 py-1.5 rounded-full bg-gray-900/60 backdrop-blur-md border border-gray-800"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-vivid-purple-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-vivid-purple-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-300">Industry-Leading Lead Generation</span>
          </motion.div>
          
          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold text-center max-w-5xl mb-8"
          >
            <span className="block">Convert Prospects Into</span>
            <span className="relative inline-block">
              <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-vivid-purple-400 to-vivid-amber-400">High-Value Leads</span>
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-vivid-purple-500 to-vivid-amber-500 rounded-full"></span>
            </span>
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-xl text-gray-400 text-center max-w-3xl mb-12"
          >
            Using advanced data technology and human verification, we deliver high-intent, qualified leads
            that are 5x more likely to convert than standard lead sources.
          </motion.p>
          
          {/* CTA and Secondary action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link 
              href="/#pricing" 
              className="group relative inline-flex overflow-hidden rounded-full p-[2px]"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#a855f7_0%,#f59e0b_50%,#a855f7_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 px-9 py-4 text-lg font-medium text-white backdrop-blur-3xl">
                View Pricing
              </span>
            </Link>
            <Link 
              href="/#services" 
              className="group flex items-center gap-2 text-lg font-medium text-gray-300 hover:text-white transition-colors"
            >
              <span>Explore Services</span>
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 