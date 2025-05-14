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
    <section className="py-32 relative overflow-hidden isolation">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Dark mesh gradient */}
        <div className="absolute inset-0 bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-black via-slate-950 to-zinc-900"></div>
        
        {/* Geometric patterns */}
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNCA2aC00djJoNHYtMnptMC0xMGgtNHYyaDR2LTJ6bTYgNmgtMnY0aDJ2LTR6Ii8+PC9nPjwvZz48L3N2Zz4K')]"></div>
        
        {/* Dynamic blobs */}
        <div className="absolute top-0 -left-10 w-72 h-72 bg-gradient-to-br from-fuchsia-700/30 to-transparent rounded-full filter blur-[80px] mix-blend-overlay opacity-70 animate-blob"></div>
        <div className="absolute bottom-0 right-20 w-96 h-96 bg-gradient-to-tr from-red-700/20 to-orange-600/20 rounded-full filter blur-[120px] mix-blend-overlay opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -top-10 right-10 w-72 h-72 bg-gradient-to-br from-rose-700/20 to-amber-500/20 rounded-full filter blur-[80px] mix-blend-overlay opacity-60 animate-blob animation-delay-4000"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-0 opacity-20"
      >
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern"></div>
        
        {/* Scan line effect */}
        <div className="absolute h-[2px] w-full bg-gradient-to-r from-transparent via-red-500/50 to-transparent top-1/3 left-0 animate-scan-fast"></div>
        <div className="absolute h-[2px] w-full bg-gradient-to-r from-transparent via-red-500/30 to-transparent top-2/3 left-0 animate-scan-slow"></div>
      </motion.div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-3xl shadow-[0_0_40px_rgba(255,50,50,0.1)] p-8 md:p-14 overflow-hidden relative"
          >
            {/* Glow effect */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-red-600/40 to-amber-600/40 rounded-full filter blur-[80px]"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-gradient-to-tr from-red-600/20 to-transparent rounded-full filter blur-[80px]"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative">
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                  Don&apos;t miss the opportunity to elevate your videos
                </h2>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Get in touch with our video editing team and let&apos;s discuss your project needs.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-r from-red-700 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-red-700/30">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-white">Fast Turnaround</h3>
                      <p className="text-gray-400 mt-1">Get your edited videos back quickly</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-r from-red-700 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-red-700/30">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-white">Professional Quality</h3>
                      <p className="text-gray-400 mt-1">Expert editors with years of experience</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-r from-red-700 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-red-700/30">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-xl font-bold text-white">Custom Solutions</h3>
                      <p className="text-gray-400 mt-1">Tailored to your specific needs</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="relative z-10 backdrop-blur-lg bg-black/40 p-8 rounded-2xl border border-white/10 shadow-2xl shadow-red-600/10">
                  <h3 className="text-2xl font-bold text-white mb-5">Contact Us</h3>
                  
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-red-500 rounded-xl focus:ring-1 focus:ring-red-500 text-white placeholder:text-gray-500 transition-all duration-200"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-red-500 rounded-xl focus:ring-1 focus:ring-red-500 text-white placeholder:text-gray-500 transition-all duration-200"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                          Service Needed
                        </label>
                        <select
                          id="service"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-red-500 rounded-xl focus:ring-1 focus:ring-red-500 text-white appearance-none custom-select transition-all duration-200"
                          required
                        >
                          <option value="" className="bg-zinc-900">Select a service</option>
                          <option value="short" className="bg-zinc-900">Short-Form Content</option>
                          <option value="long" className="bg-zinc-900">Long-Form Content</option>
                          <option value="advertising" className="bg-zinc-900">Advertising Videos</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-red-500 rounded-xl focus:ring-1 focus:ring-red-500 text-white placeholder:text-gray-500 transition-all duration-200"
                          placeholder="Tell us about your project"
                          required
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        className={`w-full py-4 px-6 rounded-xl relative overflow-hidden group ${
                          loading ? "bg-gray-700" : "bg-gradient-to-r from-red-600 to-rose-700"
                        }`}
                        disabled={loading}
                      >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-600 to-rose-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></span>
                        <span className="absolute inset-0 w-full h-full flex items-center justify-center text-white font-semibold tracking-wide group-hover:scale-105 transition-transform duration-300">
                          {loading ? (
                            <div className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </div>
                          ) : (
                            "Send Message"
                          )}
                        </span>
                      </button>
                    </form>
                  ) : (
                    <div className="py-10">
                      <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-600 to-rose-600 flex items-center justify-center shadow-lg shadow-red-600/30">
                          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-4 text-center">Message Sent!</h4>
                      <p className="text-gray-300 text-center">
                        Thanks for reaching out. We&apos;ll get back to you at <span className="text-red-400 font-medium">{email}</span> as soon as possible.
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-br from-red-500/10 to-orange-500/10 blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-gradient-to-tr from-red-600/20 to-rose-600/20 blur-xl"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Custom styles */}
      <style jsx>{`
        .custom-select {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23ef4444' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.75rem center;
          background-repeat: no-repeat;
          background-size: 1.5em 1.5em;
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.2);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.8);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-scan-fast {
          animation: scan 2s linear infinite;
        }
        
        .animate-scan-slow {
          animation: scan 3s linear infinite;
        }
        
        @keyframes scan {
          from {
            transform: translateY(0px);
          }
          to {
            transform: translateY(100vh);
          }
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </section>
  );
} 