"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 pb-32 overflow-hidden bg-gradient-to-br from-gray-900 via-violet-950 to-gray-900" id="home">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 opacity-30 mix-blend-lighten bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjIwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDIwIDAgTCAwIDAgTCAwIDIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIiAvPjwvc3ZnPg==')]"></div>
        
        {/* Shimmering effects */}
        <motion.div
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-1/3 left-1/4 w-1/3 h-1/3 rounded-full bg-gradient-to-r from-fuchsia-600/20 to-purple-600/20 blur-[150px]"
        />
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
          className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-[100px]"
        />
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-3 space-y-8"
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-white/10 text-violet-300 backdrop-blur-md border border-white/10">
              <span className="flex h-2 w-2 rounded-full bg-violet-400 animate-pulse mr-2"></span>
              UGC Creator Sourcing Platform
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter">
              <span className="text-white">Connect with the </span>
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-pink-400">
                Perfect UGC Creators
              </span>
              <span className="text-white"> for Your </span>
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Brand</span>
                <motion.svg 
                  className="absolute bottom-0 left-0 w-full h-[0.2em]"
                  viewBox="0 0 200 8" 
                  preserveAspectRatio="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <path 
                    d="M0,0 C50,5 80,5 200,0" 
                    stroke="url(#gradient)" 
                    strokeWidth="6" 
                    fill="none"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#34D399" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300/90 max-w-2xl">
              Find authentic creators who understand your audience and scale your content production efficiently.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/pricing" 
                className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-full font-medium transform hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-violet-900/30 hover:shadow-xl hover:shadow-violet-900/40 text-center"
              >
                View Packages
              </Link>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-2 relative"
          >
            <div className="relative z-10">
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 via-fuchsia-600/20 to-pink-600/20 rounded-2xl blur-md"></div>
              
              <div className="relative rounded-xl overflow-hidden border border-white/10 backdrop-blur-sm p-6 bg-white/5">
                <div className="aspect-video relative overflow-hidden flex items-center justify-center">
                  {/* Creative SVG Illustration */}
                  <svg className="w-full h-full" viewBox="0 0 900 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Background Elements */}
                    <circle cx="450" cy="300" r="200" fill="url(#circleGradient)" fillOpacity="0.2" />
                    <circle cx="450" cy="300" r="150" stroke="url(#circleStrokeGradient)" strokeWidth="2" strokeDasharray="10 5" />
                    
                    {/* Content Creation Icons */}
                    <g className="content-creation-elements">
                      {/* Camera */}
                      <motion.g
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                      >
                        <rect x="380" y="250" width="140" height="100" rx="10" fill="#4c1d95" />
                        <rect x="400" y="230" width="100" height="20" rx="5" fill="#6d28d9" />
                        <circle cx="450" cy="300" r="30" fill="#2563eb" />
                        <circle cx="450" cy="300" r="15" fill="#1e3a8a" />
                        <rect x="500" y="270" width="10" height="10" rx="2" fill="#ec4899" />
                      </motion.g>
                      
                      {/* Phone */}
                      <motion.g
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      >
                        <rect x="250" y="250" width="80" height="150" rx="10" fill="#4338ca" />
                        <rect x="260" y="270" width="60" height="100" rx="2" fill="#1e3a8a" />
                        <circle cx="290" cy="390" r="10" fill="#312e81" stroke="#6366f1" strokeWidth="1" />
                      </motion.g>
                      
                      {/* Laptop */}
                      <motion.g
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.7 }}
                      >
                        <rect x="550" y="280" width="120" height="80" rx="5" fill="#4338ca" />
                        <rect x="560" y="290" width="100" height="60" rx="2" fill="#1e3a8a" />
                        <rect x="530" y="360" width="160" height="10" rx="2" fill="#312e81" />
                      </motion.g>
                      
                      {/* Floating Elements */}
                      <motion.g
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, 5, 0]
                        }}
                        transition={{ 
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <path d="M550 180 L570 200 L590 180 L570 160 Z" fill="#ec4899" />
                        <circle cx="350" cy="200" r="15" fill="#8b5cf6" />
                        <rect x="500" y="400" width="20" height="20" rx="4" fill="#3b82f6" />
                      </motion.g>
                      
                      {/* Floating Video/Image Icons */}
                      <motion.g
                        animate={{ 
                          y: [0, 10, 0],
                          rotate: [0, -5, 0]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      >
                        <rect x="300" y="150" width="50" height="40" rx="5" fill="#8b5cf6" fillOpacity="0.6" />
                        <rect x="450" y="420" width="40" height="40" rx="5" fill="#ec4899" fillOpacity="0.6" />
                        <rect x="600" y="180" width="40" height="50" rx="5" fill="#3b82f6" fillOpacity="0.6" />
                      </motion.g>
                      
                      {/* Connection Lines */}
                      <path d="M290 320 Q370 260 450 300 Q530 340 610 320" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="5 5" />
                    </g>

                    {/* Gradients */}
                    <defs>
                      <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c026d3" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                      <linearGradient id="circleStrokeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="50%" stopColor="#ec4899" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -right-6 top-1/4 p-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 rotate-3 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center text-white shadow-inner shadow-white/10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">Pre-Vetted</div>
                  <div className="text-gray-300 text-sm">Quality Creators</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -left-6 bottom-1/4 p-3 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 -rotate-6 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white shadow-inner shadow-white/10">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white font-medium">Quick Match</div>
                  <div className="text-gray-300 text-sm">Fast Turnaround</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 