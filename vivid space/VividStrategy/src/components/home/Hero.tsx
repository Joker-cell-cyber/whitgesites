"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { COMPANY } from '@/app/constants/company';
import Image from 'next/image';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative overflow-hidden bg-black py-20 md:py-28 lg:py-32">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-gray-900 to-black z-0">
        <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-500/20 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent"></div>
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:50px_50px] z-0"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center lg:text-left lg:items-start max-w-5xl mx-auto">
          {/* Main heading with reveal animation */}
          <div className="overflow-hidden">
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-2 transform transition-transform duration-1000 ease-out"
              style={{ transform: isVisible ? 'translateY(0)' : 'translateY(100%)' }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400 leading-tight block">
                {COMPANY.name}
              </span>
            </h1>
          </div>
          
          <div className="overflow-hidden">
            <h2 
              className="text-3xl md:text-5xl font-bold text-white mb-8 transform transition-transform duration-1000 delay-100 ease-out"
              style={{ transform: isVisible ? 'translateY(0)' : 'translateY(100%)' }}
            >
              Transform Your Vision Into Reality
            </h2>
          </div>
          
          {/* Gradient divider */}
          <div 
            className="w-24 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded mb-8 transform transition-all duration-1000 delay-300"
            style={{ 
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scaleX(1)' : 'scaleX(0)'
            }}
          ></div>
          
          {/* Description */}
          <p 
            className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl transform transition-all duration-1000 delay-400"
            style={{ 
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            Custom strategies to catalyze your business growth and navigate an ever-changing business environment.
          </p>
          
          {/* CTA buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-5 transform transition-all duration-1000 delay-500"
            style={{ 
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)'
            }}
          >
            <Link 
              href="/pricing" 
              className="px-8 py-4 bg-teal-500 text-black font-bold rounded-full hover:bg-teal-400 transition-all duration-300 text-center"
            >
              Get Started
            </Link>
            <Link 
              href="/pricing" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300 text-center"
            >
              Learn More
            </Link>
          </div>
        </div>
        
        {/* New SVG Illustration */}
        <div 
          className="mt-16 max-w-3xl mx-auto transform transition-all duration-1000 delay-600"
          style={{ 
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(40px)'
          }}
        >
          <div className="relative">
            {/* Glowing effects */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-teal-500/30 rounded-full filter blur-[80px]"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/30 rounded-full filter blur-[80px]"></div>
            
            {/* SVG Illustration */}
            <div className="relative p-1 rounded-2xl overflow-hidden">
              <div className="bg-transparent rounded-xl overflow-hidden">
                <Image
                  src="/images/hero-illustration.svg"
                  alt="Strategic business transformation"
                  width={800}
                  height={500}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Animation styles for additional elements */}
        <style jsx>{`
          @keyframes pulse {
            0% {
              transform: scale(0.8);
              opacity: 0.5;
            }
            50% {
              opacity: 0.3;
            }
            100% {
              transform: scale(1.2);
              opacity: 0;
            }
          }
          
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
        `}</style>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000"
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-3 bg-white/70 rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
} 