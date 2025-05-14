/* eslint-disable-next-line */
import React from 'react';
import Link from 'next/link';
import { COMPANY } from '@/app/constants/company';

export function CTASection() {
  // URL for checkout with Standard package
  const standardPackageCheckoutUrl = `/checkout?package=${encodeURIComponent('Standard')}&price=${encodeURIComponent(29.99)}`;
  
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with 3D perspective effect */}
      <div className="absolute inset-0 w-full h-full transform-gpu perspective">
        {/* Gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-orange-600 to-red-700"></div>
        
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-full h-full overflow-hidden">
            {/* Grid pattern */}
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="ctaGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#ctaGrid)" />
            </svg>

            {/* 3D geometric elements */}
            <div className="absolute top-0 right-0 w-full h-full transform rotate-12 translate-x-1/4 translate-y-[-10%] opacity-20">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon points="50,15 100,100 0,100" fill="white" />
              </svg>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-full transform -rotate-12 translate-x-[-50%] translate-y-[20%] opacity-10">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                <polygon points="50,0 100,85 0,85" fill="white" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Animation effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-soft-light opacity-30 animate-blob"></div>
          <div className="absolute right-1/4 -bottom-40 w-96 h-96 bg-red-500 rounded-full mix-blend-soft-light opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute left-1/4 top-1/3 w-72 h-72 bg-orange-500 rounded-full mix-blend-soft-light opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="backdrop-blur-sm rounded-3xl overflow-hidden">
            <div className="p-4 bg-white/10">
              <div className="bg-gradient-to-br from-white/[0.15] to-white/[0.05] rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-md border border-white/10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Text Content */}
                  <div className="text-white">
                    <div className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white font-medium text-sm mb-6">
                      Ready to transform your data strategy?
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                      Ready to Get <span className="text-yellow-300">Your Data?</span>
                    </h2>
                    
                    <p className="text-xl text-white/90 mb-8 font-light">
                      Get started with our professional data services today and bring your data to life with clarity and insight.
                    </p>
                    
                    <div className="space-y-5">
                      {[
                        "Custom solutions tailored to your specific needs",
                        "Flexible pricing options to fit your budget",
                        "Expert support from our data specialists"
                      ].map((item, i) => (
                        <div key={i} className="flex items-start">
                          <div className="flex-shrink-0 mt-1 h-6 w-6 rounded-full bg-yellow-400 flex items-center justify-center">
                            <svg className="h-4 w-4 text-orange-900" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <p className="ml-3 text-white font-medium">{item}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-10 flex flex-col sm:flex-row gap-5">
                      <Link 
                        href="/packages" 
                        className="rounded-full px-8 py-4 bg-white text-orange-700 font-semibold text-center shadow-xl shadow-orange-900/20 hover:bg-yellow-50 transform transition-all hover:scale-105"
                      >
                        View Our Packages
                      </Link>
                      <Link 
                        href={standardPackageCheckoutUrl} 
                        className="rounded-full px-8 py-4 border-2 border-white/30 backdrop-blur-sm text-white font-semibold text-center hover:bg-white/10 transform transition-all hover:scale-105"
                      >
                        Get Started with Standard
                      </Link>
                    </div>
                  </div>
                  
                  {/* Visual Element */}
                  <div className="relative">
                    {/* Glowing effect behind card */}
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-3xl blur-xl opacity-40 transform -rotate-3"></div>
                    
                    {/* Card with code */}
                    <div className="relative bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-white/20 transform rotate-3 hover:rotate-0 transition-transform">
                      <div className="p-6">
                        {/* Browser-like top bar */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 text-xs font-mono">
                            data-extraction.js
                          </div>
                        </div>
                        
                        {/* Code snippet */}
                        <div className="font-mono text-xs overflow-hidden rounded bg-gray-950 p-4 text-gray-300">
                          <pre className="whitespace-pre-wrap">
{`// Sample data extraction code
const dataService = {
  extract: async function(url, options) {
    // Your data extraction solution
    const data = await fetchData(url);
    return processData(data, options);
  },
  format: (data, type) => {
    // Transform to your format
    return formatters[type](data);
  }
};`}
                          </pre>
                        </div>
                        
                        {/* Bottom stats bar */}
                        <div className="mt-4 flex items-center justify-between bg-gray-800/50 p-3 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                              DS
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-semibold text-white">{COMPANY.serviceName}</div>
                              <div className="text-xs text-gray-400">Data Extraction</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
                            <span className="text-green-400 text-xs">Active</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Floating elements around the card */}
                    <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-yellow-300 flex items-center justify-center shadow-lg transform rotate-12">
                      <svg className="h-6 w-6 text-orange-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="absolute top-1/2 -left-4 w-8 h-8 rounded-full bg-red-400 shadow-lg transform -rotate-12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 