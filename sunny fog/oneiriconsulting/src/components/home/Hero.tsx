"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { COMPANY } from '@/app/constants/company';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [particleElements, setParticleElements] = useState<React.ReactElement[]>([]);

  useEffect(() => {
    setIsVisible(true);
    
    // Generate animated particles for the background
    const particles = Array.from({ length: 30 }, (_, i) => {
      const size = Math.random() * 10 + 5;
      const animationDuration = Math.random() * 20 + 10;
      const delay = Math.random() * 5;
      const initialX = Math.random() * 100;
      const initialY = Math.random() * 100;
      
      return (
        <div 
          key={i}
          className="absolute rounded-full bg-indigo-600/10 dark:bg-indigo-400/10"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${initialY}%`,
            left: `${initialX}%`,
            animation: `float ${animationDuration}s infinite ease-in-out`,
            animationDelay: `${delay}s`,
            opacity: Math.random() * 0.5 + 0.1
          }}
        />
      );
    });
    
    setParticleElements(particles);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-indigo-50 dark:from-gray-900 dark:to-indigo-950 pt-16 md:pt-20 lg:pt-24">
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(20px);
          }
          75% {
            transform: translateY(-30px) translateX(-10px);
          }
        }
      `}</style>
      
      {particleElements}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 py-20">
          <div className={`lg:w-1/2 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500 dark:from-indigo-400 dark:to-blue-300">
                {COMPANY.name}
              </span>
              <br />
              <span className="text-gray-900 dark:text-white">
                Transform Your Vision Into Reality
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
              Custom strategies to catalyze your business growth and navigate an ever-changing business environment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/pricing" className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium shadow-lg shadow-indigo-600/20 hover:bg-indigo-700 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-600/30 hover:-translate-y-1">
                Get Started
              </Link>
              <Link href="/about" className="px-6 py-3 rounded-lg bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                Learn More
              </Link>
            </div>
          </div>
          
          <div className={`lg:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl transform rotate-6"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-2xl">
                <Image 
                  src="/images/hero-illustration.svg" 
                  alt={`${COMPANY.name} - Business Strategy Consultancy`}
                  width={600} 
                  height={400}
                  className="w-full h-auto rounded-xl"
                  priority
                />
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 dark:bg-yellow-500 rounded-full blur-2xl opacity-60"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-600 dark:bg-indigo-500 rounded-full blur-2xl opacity-60"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 