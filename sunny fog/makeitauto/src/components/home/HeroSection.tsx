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
    <section className="relative pt-24 pb-40 overflow-hidden bg-gradient-to-br from-make-purple-50 via-white to-make-blue-50">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-72 h-72 bg-make-purple-200 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-make-blue-200 rounded-full blur-3xl opacity-15 animate-pulse-slow"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-make-purple-100 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-20 right-0 w-72 h-72 bg-make-blue-100 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
        
        <div className="absolute top-1/4 left-1/4 w-12 h-12 bg-make-purple-300 rounded-full animate-float opacity-40"></div>
        <div className="absolute top-1/3 right-1/3 w-8 h-8 bg-make-blue-300 rounded-full animate-float-delay opacity-50"></div>
        <div className="absolute bottom-1/3 left-1/2 w-16 h-16 bg-gradient-to-br from-make-purple-300 to-make-blue-300 rounded-lg rotate-12 animate-float-slow opacity-40"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 relative z-10">
            {/* Pill label */}
            <div className={`inline-block py-1.5 px-4 rounded-full bg-white shadow-sm border border-make-purple-100 mb-6 transform transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <span className="bg-gradient-to-r from-make-purple-600 to-make-blue-600 bg-clip-text text-transparent font-medium">
                Make.com & Zapier Specialists
              </span>
            </div>
            
            {/* Heading with gradient and animation */}
            <h1 className={`text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <span className="inline-block">Custom </span>
              <span className="inline-block bg-gradient-to-r from-make-purple-500 via-make-purple-600 to-make-blue-500 bg-clip-text text-transparent">Automation</span>
              <span className="inline-block"> Services</span>
            </h1>
            
            {/* Subtitle with animation */}
            <p className={`text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              We build one-time custom automations that connect your apps 
              <span className="relative inline-block mx-1">
                <span className="relative z-10">and streamline</span>
                <span className="absolute bottom-0.5 left-0 right-0 h-3 bg-make-purple-100 opacity-50 -z-10 rounded-sm"></span>
              </span> your business processes.
            </p>
            
            {/* CTA buttons with animation */}
            <div className={`flex flex-col sm:flex-row gap-5 justify-center items-center transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <Link
                href="/pricing"
                className="group relative px-8 py-4 text-white font-medium bg-gradient-to-r from-make-purple-500 to-make-purple-600 rounded-xl hover:from-make-purple-600 hover:to-make-purple-700 transition-all shadow-lg shadow-make-purple-200/30 overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  View Services
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="absolute inset-0 h-full w-full bg-gradient-to-r from-make-blue-400 to-make-blue-500 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100 -z-0"></span>
              </Link>
              <Link
                href="/contact"
                className="group px-8 py-4 text-make-purple-700 font-medium bg-white border border-make-purple-200 rounded-xl hover:bg-make-purple-50 transition-all shadow-md"
              >
                <span className="flex items-center">
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>

          {/* App integration visual component with animation */}
          <div className={`relative mx-auto mb-16 max-w-4xl transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="relative bg-white/40 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/50">
              <div className="absolute inset-0 bg-gradient-to-r from-make-purple-100/10 to-make-blue-100/10 rounded-2xl"></div>
              
              <div className="flex flex-wrap justify-center gap-8 md:gap-12 relative z-10">
                {[
                  { name: 'Messaging', icon: '💬', color: 'from-purple-500/10 to-purple-500/20', delay: '0' },
                  { name: 'Search', icon: '🔍', color: 'from-blue-500/10 to-blue-500/20', delay: '100' },
                  { name: 'Task Mgmt', icon: '📋', color: 'from-teal-500/10 to-teal-500/20', delay: '200' },
                  { name: 'Projects', icon: '📱', color: 'from-red-500/10 to-red-500/20', delay: '300' },
                  { name: 'E-commerce', icon: '🛒', color: 'from-green-500/10 to-green-500/20', delay: '400' },
                  { name: 'Analytics', icon: '📊', color: 'from-orange-500/10 to-orange-500/20', delay: '500' },
                ].map((app, index) => (
                  <div key={index} className={`group flex flex-col items-center transition-all hover:-translate-y-1 duration-300 delay-${app.delay}`}>
                    <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center bg-gradient-to-br ${app.color} shadow-lg border border-white/50 group-hover:shadow-xl transition-all duration-300`}>
                      <div className="text-3xl md:text-4xl">
                        {app.icon}
                      </div>
                    </div>
                    <span className="mt-3 font-medium text-gray-800">{app.name}</span>
                    
                    {/* Connecting lines between apps */}
                    {index < 5 && (
                      <div className="absolute w-16 md:w-20 h-0.5 bg-gradient-to-r from-make-purple-300 to-make-blue-300 transform rotate-45 opacity-60"></div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Center connector visual */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-make-purple-500 to-make-blue-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Features showcase */}
          <div className={`py-10 px-8 bg-white rounded-3xl shadow-xl max-w-5xl mx-auto overflow-hidden relative transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="absolute top-0 right-0 w-40 h-40 bg-make-purple-100 rounded-full -mr-20 -mt-20 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-make-blue-100 rounded-full -ml-20 -mb-20 opacity-50"></div>
            
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800 relative z-10">
              What We <span className="relative inline-block px-1">
                <span className="relative z-10 bg-gradient-to-r from-make-purple-500 to-make-purple-600 bg-clip-text text-transparent">Automate</span>
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-make-purple-100 -z-10 rounded-sm"></span>
              </span> For You
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative z-10">
              {[
                { name: "Form Processing", icon: "📋" },
                { name: "Data Syncing", icon: "🔄" },
                { name: "Order Management", icon: "🛒" },
                { name: "Document Creation", icon: "📄" },
                { name: "Lead Routing", icon: "🎯" },
                { name: "API Connections", icon: "🔌" },
                { name: "Email Notifications", icon: "📧" },
                { name: "Workflow Approvals", icon: "✅" },
              ].map((item, index) => (
                <div key={index} className="group text-center p-4 rounded-xl hover:bg-make-purple-50 transition-all duration-300">
                  <div className="text-4xl md:text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                  <h3 className="text-sm md:text-base font-medium text-gray-800">{item.name}</h3>
                </div>
              ))}
            </div>
            
            {/* Add a simple stats highlight */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-make-purple-500 to-make-blue-500 bg-clip-text text-transparent">100+</p>
                  <p className="text-sm text-gray-600 mt-1">Integrations</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-make-purple-500 to-make-blue-500 bg-clip-text text-transparent">24/7</p>
                  <p className="text-sm text-gray-600 mt-1">Automation</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-make-purple-500 to-make-blue-500 bg-clip-text text-transparent">99%</p>
                  <p className="text-sm text-gray-600 mt-1">Reliability</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 