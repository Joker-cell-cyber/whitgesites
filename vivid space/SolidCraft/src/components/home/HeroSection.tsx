"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section className="relative py-28 overflow-hidden bg-[#fff8e9]">
      {/* Abstract background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#c35a38]/5 to-[#c35a38]/0"></div>
        <div className="absolute -bottom-40 -left-40 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-[#0d7682]/5 to-[#0d7682]/0"></div>
        
        <svg className="absolute w-full h-full opacity-20" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path 
            d="M0,30 Q20,20 40,25 T80,15 T100,30 V100 H0 Z" 
            fill="none" 
            stroke="#c35a38" 
            strokeWidth="0.2"
            strokeDasharray="1,1"
          />
          <path 
            d="M0,50 Q25,40 50,45 T100,35" 
            fill="none" 
            stroke="#0d7682" 
            strokeWidth="0.2"
            strokeDasharray="1,1"
          />
        </svg>
        
        <motion.div 
          className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-[#ffb75e]/5"
          animate={{
            x: mousePosition.x * 0.02,
            y: mousePosition.y * 0.02,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 50 }}
        />
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Text content - Takes 3 columns on large screens */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="lg:col-span-3"
          >
            <div className="inline-flex items-center mb-6 px-4 py-1.5 rounded-full text-sm bg-[#c35a38]/10 text-[#c35a38]">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 17L20 12L15 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4 12H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Professional Landing Page Design Service
            </div>
            
            <h1 className="font-fraunces text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-[#3b332b] leading-tight">
              Custom 
              <div className="relative inline-block mx-3">
                <span className="relative z-10 text-[#c35a38]">Landing Pages</span>
                <div className="absolute -bottom-1 left-0 w-full h-3 bg-[#ffb75e]/30 -z-10 -rotate-1"></div>
              </div>
              That Convert
            </h1>

            <p className="text-xl text-[#3b332b]/80 mb-10 leading-relaxed max-w-xl">
              We design high-converting landing pages tailored to your business needs.
              Expert design, quick turnaround, no monthly subscriptions.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 items-center">
              <Link 
                href="/pricing" 
                className="px-8 py-4 rounded-full bg-[#c35a38] hover:bg-[#a2482d] text-white font-medium transition-all duration-300 shadow-lg shadow-[#c35a38]/20 text-center"
              >
                View Our Packages
              </Link>
              
              <div className="flex items-center text-[#3b332b]/70 font-medium">
                <svg className="w-5 h-5 mr-2 text-[#0d7682]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                No subscription required
              </div>
            </div>
          </motion.div>
          
          {/* Visual showcase - Takes 2 columns on large screens */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-2 relative"
          >
            <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl shadow-[#c35a38]/10">
              {/* Browser mockup */}
              <div className="absolute inset-0 bg-white rounded-2xl overflow-hidden border border-[#c35a38]/10">
                <div className="h-8 bg-[#f5f5f5] border-b border-gray-200 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#c35a38]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffb75e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#0d7682]"></div>
                  </div>
                  <div className="mx-auto w-56 h-5 rounded-full bg-[#f0f0f0]"></div>
                </div>
                
                <div className="p-6">
                  <div className="w-full h-8 bg-[#f0f0f0] rounded-lg mb-6"></div>
                  <div className="flex flex-col space-y-2 mb-6">
                    <div className="w-3/4 h-3 bg-[#f0f0f0] rounded"></div>
                    <div className="w-full h-3 bg-[#f0f0f0] rounded"></div>
                    <div className="w-5/6 h-3 bg-[#f0f0f0] rounded"></div>
                  </div>
                  <div className="w-32 h-10 rounded-lg bg-[#c35a38]"></div>
                  
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="aspect-video bg-[#f0f0f0] rounded"></div>
                    <div className="aspect-video bg-[#f0f0f0] rounded"></div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-1/2 -right-6 transform -translate-y-1/2 w-12 h-12 rounded-full bg-[#0d7682] opacity-80"></div>
              <div className="absolute -bottom-4 left-1/3 w-8 h-8 rounded-full bg-[#ffb75e] opacity-80"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-[#c35a38]/5 mix-blend-overlay"></div>
            </div>
            
            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 py-2 px-4 bg-white rounded-lg shadow-xl"
            >
              <div className="flex items-center">
                <svg className="w-5 h-5 text-[#c35a38] mr-2" viewBox="0 0 24 24" fill="none">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm font-medium text-[#3b332b]">Converts Visitors</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Service highlights - redesigned as cards with icon and text */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="bg-white rounded-2xl p-5 shadow-lg shadow-[#c35a38]/5 border border-[#c35a38]/10 flex flex-col items-center transition-transform hover:transform hover:-translate-y-1 duration-300">
            <div className="w-12 h-12 rounded-full bg-[#c35a38]/10 flex items-center justify-center mb-3">
              <span className="text-[#c35a38] font-bold">100%</span>
            </div>
            <p className="text-[#3b332b] text-sm text-center font-medium">Custom Design</p>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-lg shadow-[#0d7682]/5 border border-[#0d7682]/10 flex flex-col items-center transition-transform hover:transform hover:-translate-y-1 duration-300">
            <div className="w-12 h-12 rounded-full bg-[#0d7682]/10 flex items-center justify-center mb-3">
              <span className="text-[#0d7682] font-bold">1-15</span>
            </div>
            <p className="text-[#3b332b] text-sm text-center font-medium">Day Delivery</p>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-lg shadow-[#ffb75e]/5 border border-[#ffb75e]/10 flex flex-col items-center transition-transform hover:transform hover:-translate-y-1 duration-300">
            <div className="w-12 h-12 rounded-full bg-[#ffb75e]/10 flex items-center justify-center mb-3">
              <span className="text-[#ffb75e] font-bold">3</span>
            </div>
            <p className="text-[#3b332b] text-sm text-center font-medium">Revision Rounds</p>
          </div>
          
          <div className="bg-white rounded-2xl p-5 shadow-lg shadow-[#c35a38]/5 border border-[#c35a38]/10 flex flex-col items-center transition-transform hover:transform hover:-translate-y-1 duration-300">
            <div className="w-12 h-12 rounded-full bg-[#c35a38]/10 flex items-center justify-center mb-3">
              <span className="text-[#c35a38] font-bold">1</span>
            </div>
            <p className="text-[#3b332b] text-sm text-center font-medium">Flat-Rate Fee</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 