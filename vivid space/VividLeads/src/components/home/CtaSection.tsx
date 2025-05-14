"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CtaSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#0a0a0a] opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-vivid-purple-900/20 to-vivid-amber-900/20"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        
        {/* Geometric patterns */}
        <svg width="100%" height="100%" className="absolute top-0 left-0 opacity-5">
          <pattern id="cta-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" fill="url(#cta-gradient)"></rect>
          </pattern>
          <defs>
            <linearGradient id="cta-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9333ea" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#cta-pattern)"></rect>
        </svg>
        
        {/* Animated blur spots */}
        <div className="absolute -left-12 top-1/3 w-80 h-80 bg-vivid-purple-600/30 rounded-full opacity-30 mix-blend-screen blur-[80px]"></div>
        <div className="absolute -right-12 bottom-1/4 w-80 h-80 bg-vivid-amber-600/30 rounded-full opacity-30 mix-blend-screen blur-[80px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Left column: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <div className="space-y-6">
              <div className="inline-block rounded-lg px-3 py-1 bg-vivid-purple-900/40 border border-vivid-purple-700/20 text-sm text-vivid-purple-300 font-medium">
                Start Growing Today
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Boost your growth with <span className="gradient-text">high-quality leads</span>
              </h2>
              <p className="text-xl text-gray-300">
                Contact our lead generation experts and start converting more prospects into customers.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-vivid-purple-600/20 to-vivid-amber-500/20 border border-vivid-purple-500/10 backdrop-blur-md p-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-vivid-purple-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Verified Quality</h3>
                  <p className="text-gray-400">Multiple verification steps ensure every lead meets our strict quality standards.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-vivid-purple-600/20 to-vivid-amber-500/20 border border-vivid-purple-500/10 backdrop-blur-md p-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-vivid-amber-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Secure Delivery</h3>
                  <p className="text-gray-400">All lead data is delivered through secure channels with end-to-end encryption.</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-vivid-purple-600/20 to-vivid-amber-500/20 border border-vivid-purple-500/10 backdrop-blur-md p-3 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-vivid-purple-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z" />
                    <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z" />
                    <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Customizable Formats</h3>
                  <p className="text-gray-400">Receive leads in your preferred format - CSV, Excel, direct CRM integration, and more.</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right column: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-vivid-purple-500 to-vivid-amber-500 rounded-2xl opacity-75 blur-lg"></div>
            <div className="relative bg-gray-900 rounded-2xl shadow-xl overflow-hidden h-full">
              <div className="px-6 py-8 sm:p-10 sm:pb-8">
                <div className="flex justify-between items-center pb-6 mb-8 border-b border-gray-800">
                  <h3 className="text-2xl font-bold text-white">Get Started</h3>
                  <div className="flex items-center">
                    <span className="flex items-center h-6 px-3 rounded-full text-xs font-semibold bg-gradient-to-r from-vivid-purple-600 to-vivid-amber-500 text-white">
                      Premium
                    </span>
                  </div>
                </div>
                
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name
                      </label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="name"
                          className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-vivid-purple-500 focus:border-vivid-purple-500 block w-full pl-10 p-3"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-vivid-purple-500 focus:border-vivid-purple-500 block w-full pl-10 p-3"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                        Lead Type Needed
                      </label>
                      <div className="relative rounded-lg shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
                          </svg>
                        </div>
                        <select
                          id="service"
                          className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-vivid-purple-500 focus:border-vivid-purple-500 block w-full pl-10 p-3 pr-7 appearance-none"
                          required
                        >
                          <option value="">Select lead type</option>
                          <option value="b2b">B2B Leads</option>
                          <option value="b2c">B2C Leads</option>
                          <option value="industry">Industry-Specific Leads</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Your Requirements
                      </label>
                      <div className="relative rounded-lg shadow-sm">
                        <textarea
                          id="message"
                          rows={4}
                          className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg focus:ring-vivid-purple-500 focus:border-vivid-purple-500 block w-full p-3"
                          placeholder="Tell us about your specific lead requirements"
                          required
                        ></textarea>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 w-full h-full transition-all duration-300 bg-gradient-to-r from-vivid-purple-600 via-vivid-purple-700 to-vivid-amber-600 group-hover:scale-102"></div>
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-vivid-purple-600 to-vivid-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                        <span className="relative flex items-center justify-center text-white font-medium py-3 px-4 rounded-lg">
                          {loading ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </span>
                          ) : (
                            <span className="flex items-center">
                              Get Started Now
                              <svg className="ml-2 -mr-1 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </span>
                          )}
                        </span>
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="w-16 h-16 mb-6 relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-vivid-purple-500 to-vivid-amber-500 animate-pulse blur-md opacity-70"></div>
                      <div className="relative bg-gradient-to-r from-vivid-purple-500 to-vivid-amber-500 rounded-full w-full h-full flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-2">Request Received!</h4>
                    <p className="text-gray-300 max-w-md">
                      Thanks for reaching out. Our lead generation expert will contact you at <span className="text-white font-medium">{email}</span> shortly.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="px-6 pt-4 pb-8 bg-gray-900 border-t border-gray-800">
                <div className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-vivid-purple-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-gray-400">Your information is secure and encrypted</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 