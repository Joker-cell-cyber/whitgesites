"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

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
    <section className="relative py-32 overflow-hidden bg-gradient-to-b from-[#090d1a] to-[#08080f]">
      {/* Abstract background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1200 800" className="absolute opacity-10">
          <defs>
            <linearGradient id="ctaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1e87f0" />
              <stop offset="100%" stopColor="#ff9d00" />
            </linearGradient>
          </defs>
          <path
            d="M0,0 C400,100 800,50 1200,200 L1200,800 L0,800 Z"
            fill="url(#ctaGradient)"
            className="opacity-30"
          />
          <path
            d="M0,200 C300,100 600,300 1200,150 L1200,800 L0,800 Z"
            fill="url(#ctaGradient)"
            className="opacity-20"
          />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Take Your <span className="text-beat-gold-500">Music Production</span><br />
              to the Next Level?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get in touch with our coaching team and let&apos;s discuss your learning goals.
            </p>
          </motion.div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-black/30 backdrop-blur-sm border border-gray-800/60 rounded-3xl overflow-hidden shadow-2xl shadow-beat-purple-900/20">
            <div className="grid grid-cols-1 lg:grid-cols-5">
              {/* Left panel - contact form */}
              <div className="p-8 lg:p-10 lg:col-span-3 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-beat-purple-500 to-beat-gold-500 z-10"></div>
                <div className="relative z-10">
                  {!submitted ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold text-white mb-6">Contact Our Team</h3>
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1.5">
                              Your Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              className="w-full px-4 py-3 bg-black/40 border border-gray-700 focus:border-beat-purple-500 focus:ring-1 focus:ring-beat-purple-500 rounded-lg text-white"
                              placeholder="John Doe"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1.5">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-4 py-3 bg-black/40 border border-gray-700 focus:border-beat-purple-500 focus:ring-1 focus:ring-beat-purple-500 rounded-lg text-white"
                              placeholder="you@example.com"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="service" className="block text-sm font-medium text-gray-400 mb-1.5">
                              Experience Level
                            </label>
                            <select
                              id="service"
                              className="w-full px-4 py-3 bg-black/40 border border-gray-700 focus:border-beat-purple-500 focus:ring-1 focus:ring-beat-purple-500 rounded-lg text-white appearance-none"
                              required
                            >
                              <option value="">Select your level</option>
                              <option value="beginner">Beginner</option>
                              <option value="intermediate">Intermediate</option>
                              <option value="advanced">Advanced</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="interest" className="block text-sm font-medium text-gray-400 mb-1.5">
                              Primary Interest
                            </label>
                            <select
                              id="interest"
                              className="w-full px-4 py-3 bg-black/40 border border-gray-700 focus:border-beat-purple-500 focus:ring-1 focus:ring-beat-purple-500 rounded-lg text-white appearance-none"
                              required
                            >
                              <option value="">Select your interest</option>
                              <option value="beatmaking">Beat Composition</option>
                              <option value="sounddesign">Sound Design</option>
                              <option value="mixing">Mixing & Mastering</option>
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1.5">
                            Your Message
                          </label>
                          <textarea
                            id="message"
                            rows={4}
                            className="w-full px-4 py-3 bg-black/40 border border-gray-700 focus:border-beat-purple-500 focus:ring-1 focus:ring-beat-purple-500 rounded-lg text-white"
                            placeholder="Tell us about your goals and what you'd like to learn"
                            required
                          ></textarea>
                        </div>
                        
                        <button
                          type="submit"
                          className={`w-full py-3 px-6 rounded-lg bg-beat-purple-500 hover:bg-beat-purple-600 text-white font-medium transition-all shadow-lg shadow-beat-purple-500/20 ${
                            loading ? "opacity-80" : ""
                          }`}
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </span>
                          ) : (
                            "Book a Session"
                          )}
                        </button>
                        
                        <p className="text-xs text-gray-400 text-center mt-4">
                          Or contact us directly at{" "}
                          <a 
                            href={`mailto:${COMPANY.email}`} 
                            className="text-beat-gold-400 hover:text-beat-gold-300 transition-colors"
                          >
                            {COMPANY.email}
                          </a>
                        </p>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="text-center py-16 px-4"
                    >
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-beat-purple-500/20 border border-beat-purple-500/30 mb-6">
                        <svg className="w-10 h-10 text-beat-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-3">Message Sent!</h4>
                      <p className="text-gray-300 text-lg max-w-md mx-auto">
                        Thanks for reaching out. We&apos;ll get back to you at <span className="text-beat-gold-400 font-medium">{email}</span> as soon as possible.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
              
              {/* Right panel - features */}
              <div className="lg:col-span-2 bg-beat-purple-900/20 p-8 lg:p-10 relative">
                <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-transparent to-beat-purple-900/20 transform -translate-x-full hidden lg:block"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-8">Why Choose Us</h3>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-beat-gold-500/20 border border-beat-gold-500/30 flex items-center justify-center">
                        <svg className="w-6 h-6 text-beat-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Personalized Approach</h3>
                        <p className="text-gray-400 mt-1">Coaching tailored to your skill level</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-beat-gold-500/20 border border-beat-gold-500/30 flex items-center justify-center">
                        <svg className="w-6 h-6 text-beat-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Experienced Coaches</h3>
                        <p className="text-gray-400 mt-1">Learn from industry professionals</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-beat-gold-500/20 border border-beat-gold-500/30 flex items-center justify-center">
                        <svg className="w-6 h-6 text-beat-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">Practical Techniques</h3>
                        <p className="text-gray-400 mt-1">Learn skills you can apply immediately</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-12 border-t border-gray-800 pt-8">
                    <h4 className="text-lg font-semibold text-white mb-4">Contact Information</h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-beat-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <a href={`mailto:${COMPANY.email}`} className="hover:text-beat-gold-400 transition-colors">
                          {COMPANY.email}
                        </a>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-beat-gold-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span>{COMPANY.phone}</span>
                      </li>
                    </ul>
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