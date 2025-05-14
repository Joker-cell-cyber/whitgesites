"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative py-32 overflow-hidden bg-gray-950 text-white">
      {/* Abstract background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-flow-green-900/30 via-transparent to-flow-teal-900/20"></div>
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="url(#grid-pattern)" />
        </svg>
        <defs>
          <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-flow-green-600/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-flow-teal-600/10 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left content */}
          <div className={`lg:w-1/2 space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}`}>
            {/* Pill label */}
            <div className="inline-block py-1.5 px-4 bg-gray-800/80 border border-flow-green-500/30 rounded-full backdrop-blur-sm">
              <span className="text-flow-green-400 font-medium">
                Make.com & Zapier Specialists
              </span>
            </div>
            
            {/* Main heading with split design */}
            <h1 className="text-6xl md:text-7xl font-black leading-tight">
              <div className="flex flex-col">
                <span>Custom</span>
                <span className="text-flow-green-400">Automation</span>
                <span>Services</span>
              </div>
            </h1>
            
            {/* Subtitle with animated underline */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-xl">
              We build one-time custom automations that connect your apps 
              <span className="relative inline-block mx-1">
                <span className="relative z-10">and streamline</span>
                <span className="absolute bottom-0.5 left-0 right-0 h-2 bg-flow-green-500/20 -z-10"></span>
              </span> your business processes.
            </p>
            
            {/* CTA buttons with modern style */}
            <div className="flex flex-col sm:flex-row gap-5 pt-4">
              <Link
                href="/pricing"
                className="group relative px-8 py-4 bg-flow-green-500 rounded-md overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-full bg-flow-teal-500 group-hover:translate-x-0"></span>
                <span className="relative flex items-center justify-center text-white font-semibold">
                  View Services
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </Link>
              <Link
                href="/contact"
                className="group px-8 py-4 bg-transparent border border-flow-green-500 text-flow-green-400 rounded-md hover:bg-flow-green-500/10 transition-colors"
              >
                <span className="flex items-center justify-center font-semibold">
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          
          {/* Right visual */}
          <div className={`lg:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}`}>
            <div className="relative bg-gray-900/80 backdrop-blur-md rounded-lg p-8 border border-gray-800">
              {/* Connection lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="100%" height="100%" className="absolute inset-0">
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(34 197 94)" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="rgb(20 184 166)" stopOpacity="0.3" />
                    </linearGradient>
                  </defs>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <line 
                      key={i}
                      x1="50%" 
                      y1="50%" 
                      x2={`${30 + (i * 14)}%`} 
                      y2={`${20 + (i * 12)}%`} 
                      stroke="url(#gradient)" 
                      strokeWidth="2"
                    />
                  ))}
                </svg>
              </div>
              
              {/* Apps grid */}
              <div className="grid grid-cols-3 gap-6 relative z-10">
                {[
                  { name: 'Messaging', icon: '💬', color: 'border-purple-500/30 bg-purple-500/5' },
                  { name: 'Search', icon: '🔍', color: 'border-blue-500/30 bg-blue-500/5' },
                  { name: 'Task Mgmt', icon: '📋', color: 'border-teal-500/30 bg-teal-500/5' },
                  { name: 'Projects', icon: '📱', color: 'border-red-500/30 bg-red-500/5' },
                  { name: 'E-commerce', icon: '🛒', color: 'border-green-500/30 bg-green-500/5' },
                  { name: 'Analytics', icon: '📊', color: 'border-orange-500/30 bg-orange-500/5' },
                ].map((app, index) => (
                  <div key={index} className="group">
                    <div className={`aspect-square rounded-lg flex flex-col items-center justify-center ${app.color} border transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-${app.color.split('-')[1]}/10`}>
                      <div className="text-3xl mb-2">{app.icon}</div>
                      <span className="text-xs font-medium text-gray-300">{app.name}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Center connector */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-flow-green-500 rounded-full flex items-center justify-center shadow-lg shadow-flow-green-500/20 border-2 border-gray-800 z-20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            
            {/* What we automate section */}
            <div className="mt-8 grid grid-cols-4 gap-3">
              {[
                { name: "Form Processing", icon: "📋" },
                { name: "Data Syncing", icon: "🔄" },
                { name: "Order Management", icon: "🛒" },
                { name: "Document Creation", icon: "📄" },
              ].map((item, index) => (
                <div key={index} className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-md p-3 text-center hover:bg-gray-800/50 transition-colors">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <h3 className="text-xs font-medium text-gray-300">{item.name}</h3>
                </div>
              ))}
            </div>
            
            {/* Stats */}
            <div className="mt-8 flex justify-between items-center bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-md p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-flow-green-400">100+</p>
                <p className="text-xs text-gray-400">Integrations</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-flow-green-400">24/7</p>
                <p className="text-xs text-gray-400">Automation</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-flow-green-400">99%</p>
                <p className="text-xs text-gray-400">Reliability</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 