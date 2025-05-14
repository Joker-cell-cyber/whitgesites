"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { COMPANY } from "../../app/constants/company";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden" id="home">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-gradient-to-tr from-scribe-indigo-900/5 to-scribe-amber-500/5"></div>
        
        {/* Animated background elements */}
        <div className="absolute left-0 top-0 w-1/2 h-1/2 bg-gradient-to-br from-scribe-turquoise-400/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute right-0 bottom-0 w-1/2 h-1/2 bg-gradient-to-tl from-scribe-amber-500/10 to-transparent rounded-full blur-3xl"></div>
        
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-0 w-full h-full">
            {/* Honeycomb pattern */}
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <pattern id="honeycomb" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(2)">
                <path d="M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100" stroke="currentColor" fill="none"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#honeycomb)" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 max-w-2xl"
          >
            <div className="inline-flex items-center space-x-2 mb-8 py-2 px-4 rounded-full bg-white/30 backdrop-blur-sm border border-scribe-indigo-100/50 shadow-sm">
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500 animate-pulse"></div>
              <span className="text-sm font-medium text-scribe-indigo-800">
                Professional E-Book Writing Services
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold mb-8 leading-tight text-scribe-indigo-950">
              <span className="block">Transform Your</span>
              <span className="relative">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-scribe-indigo-600 via-scribe-turquoise-500 to-scribe-indigo-500 bg-size-200 animate-gradient">
                  Ideas into Books
                </span>
                <span className="absolute -bottom-3 md:-bottom-4 left-0 w-full h-3 md:h-4">
                  <svg className="w-full h-full" viewBox="0 0 400 12" fill="none">
                    <path d="M3 9C50 1 150 -3 250 3C350 9 397 9 397 9" 
                          stroke="url(#paintLine)" strokeWidth="5" strokeLinecap="round"/>
                    <defs>
                      <linearGradient id="paintLine" x1="0" y1="0" x2="400" y2="0" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFB429" stopOpacity="0.3"/>
                        <stop offset="0.5" stopColor="#FFB429" stopOpacity="0.8"/>
                        <stop offset="1" stopColor="#FFB429" stopOpacity="0.3"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
              </span>
            </h1>
            
            <p className="text-xl text-scribe-indigo-700 mb-10 max-w-lg leading-relaxed">
              From business guides to fiction stories – we bring your vision to life with professional writing expertise.
            </p>
            
            <Link 
              href="/#pricing" 
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500 px-8 py-4 inline-flex items-center text-white font-medium hover:shadow-lg transition-all duration-300"
            >
              <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></span>
              <span className="relative z-10">See Our Packages</span>
              <svg className="ml-2 w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
          
          {/* Image content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex-1 max-w-xl perspective"
          >
            <div className="relative preserve-3d">
              {/* 3D book effect */}
              <div className="relative preserve-3d book transform transition-all duration-500 hover:rotate-y-[15deg]">
                <div className="absolute top-0 bottom-0 left-0 w-[30px] spine bg-gradient-to-r from-scribe-indigo-800 to-scribe-indigo-600 origin-left rotate-y-90 shadow-lg"></div>
                <div className="absolute top-0 right-0 bottom-0 left-0 pages bg-white transform translate-z-[0.5px] origin-left"></div>
                <div className="book-cover rounded-r-md rounded-b-md shadow-2xl overflow-hidden backface-hidden">
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                      alt="Open book with pen"
                      width={1000}
                      height={1333}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-scribe-indigo-900/70 to-transparent flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-scribe-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating particles */}
              <div className="absolute -right-8 top-5 w-28 h-28 rounded-full bg-gradient-to-br from-scribe-amber-100 to-scribe-amber-300/50 animate-float-slow"></div>
              <div className="absolute -left-10 bottom-10 w-20 h-20 rounded-full bg-gradient-to-tr from-scribe-turquoise-100 to-scribe-turquoise-300/50 animate-float"></div>
              
              {/* Floating cards */}
              <motion.div 
                className="absolute -right-10 top-8 p-4 bg-white rounded-xl shadow-lg backdrop-blur-sm border border-scribe-indigo-50 z-20"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-scribe-indigo-50 to-scribe-indigo-100 flex items-center justify-center text-scribe-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-scribe-indigo-900 font-medium">Fast Delivery</div>
                    <div className="text-scribe-indigo-600 text-sm">Quick Turnaround</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -left-12 bottom-8 p-4 bg-white rounded-xl shadow-lg backdrop-blur-sm border border-scribe-indigo-50 z-20"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-gradient-to-br from-scribe-indigo-50 to-scribe-indigo-100 flex items-center justify-center text-scribe-indigo-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-scribe-indigo-900 font-medium">Professional Writers</div>
                    <div className="text-scribe-indigo-600 text-sm">Expert Team</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-gradient {
          animation: gradient 8s ease infinite;
        }
        
        .bg-size-200 {
          background-size: 200% 200%;
        }
        
        .perspective {
          perspective: 2000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .book {
          width: 100%;
          height: 100%;
        }
        
        .book-cover {
          width: 100%;
          transform: translateZ(15px);
        }
        
        .spine {
          transform: rotateY(90deg) translateZ(-15px);
        }
        
        .pages {
          transform: translateZ(14px);
        }
        
        .rotate-y-90 {
          transform: rotateY(90deg);
        }
        
        .rotate-y-\[15deg\] {
          transform: rotateY(15deg);
        }
      `}</style>
    </section>
  );
} 