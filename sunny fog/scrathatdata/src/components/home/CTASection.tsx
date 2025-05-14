/* eslint-disable-next-line */
import React from 'react';
import Link from 'next/link';
import { COMPANY } from '@/app/constants/company';

export function CTASection() {
  // URL for checkout with Standard package
  const standardPackageCheckoutUrl = `/checkout?package=${encodeURIComponent('Standard')}&price=${encodeURIComponent(29.99)}`;
  
  return (
    <section className="py-16 md:py-24 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-dark/90 opacity-90"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full -translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" fill="white" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <div className="container relative mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-white mb-12 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Your Data?
            </h2>
            <p className="text-lg mb-8 text-white/90 max-w-lg">
              Get started with our professional web scraping services today and unlock valuable insights from web data.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-primary-light" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-white font-medium">Custom solutions tailored to your specific needs</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-primary-light" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-white font-medium">Flexible pricing options to fit your budget</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <svg className="h-5 w-5 text-primary-light" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-white font-medium">Expert support from our data specialists</p>
                </div>
              </div>
            </div>
            
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link 
                href="/packages" 
                className="rounded-md bg-white px-6 py-3.5 text-sm font-semibold text-primary shadow-sm hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                View Our Packages
              </Link>
              <Link 
                href={standardPackageCheckoutUrl} 
                className="rounded-md bg-primary-dark px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-darker transition-all duration-300 transform hover:scale-105"
              >
                Get Started with Standard
              </Link>
            </div>
          </div>
          
          {/* Illustration/Image */}
          <div className="w-full md:w-1/2 pl-0 md:pl-12">
            <div className="relative">
              {/* SVG Illustration */}
              <div className="bg-white rounded-xl shadow-2xl p-6 relative z-10 transform transition-transform hover:scale-105">
                <div className="p-4 bg-gray-50 rounded-lg mb-4">
                  <div className="flex space-x-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="font-mono text-xs text-gray-800 bg-white p-4 rounded border border-gray-200">
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
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                      SD
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-bold text-gray-900">{COMPANY.serviceName}</div>
                      <div className="text-xs text-gray-500">Your Data Solution</div>
                    </div>
                  </div>
                  <div className="bg-primary text-white text-xs py-1 px-3 rounded-full font-medium">
                    Ready
                  </div>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 w-24 h-24 bg-primary-light/30 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 transform -translate-x-1/4 translate-y-1/4 w-32 h-32 bg-primary/20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 