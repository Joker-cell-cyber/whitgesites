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
    <section className="py-32 relative overflow-hidden">
      {/* Background Elements - Reimagined */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#060c18]"></div>
        
        {/* Diagonal lines pattern */}
        <div className="absolute inset-0 opacity-20" 
          style={{
            backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "4rem 4rem"
          }}>
        </div>
        
        {/* Accent color areas */}
        <div className="absolute -top-80 -left-20 w-[40rem] h-[40rem] rounded-full bg-chess-purple-900/20 mix-blend-screen filter blur-[100px]"></div>
        <div className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] rounded-full bg-chess-gold-900/15 mix-blend-screen filter blur-[80px]"></div>
        
        {/* Horizontal rule */}
        <div className="absolute left-0 right-0 top-40 h-px bg-gradient-to-r from-transparent via-chess-gold-500/30 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative rounded-[2rem] overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Content Column */}
              <div className="px-8 py-16 md:py-20 md:pl-16 md:pr-8 bg-gradient-to-br from-[#0c1630] to-[#0c0e1a] relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-chess-gold-500/5 rounded-full filter blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-chess-purple-500/5 rounded-full filter blur-lg"></div>
                
                <div className="max-w-md">
                  <div className="inline-flex items-center px-3 py-1 border border-chess-gold-500/20 rounded-full mb-6 bg-chess-gold-500/5">
                    <span className="w-2 h-2 rounded-full bg-chess-gold-500 mr-2"></span>
                    <span className="text-xs font-medium text-chess-gold-500 uppercase tracking-wider">Begin Your Chess Journey</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                    Start your journey to chess mastery today
                  </h2>
                  
                  <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                    Connect with our expert coaches and take your chess skills to the next level with personalized training.
                  </p>
                  
                  <div className="space-y-8">
                    <motion.div 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      <div className="flex-shrink-0 mr-5">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-chess-blue-500/10 to-chess-blue-500/5 border border-chess-blue-500/20 flex items-center justify-center text-chess-blue-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-white mb-1">ELO Rating Improvement</h3>
                        <p className="text-gray-400">Measurable progress in your chess rating</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.2 }}
                    >
                      <div className="flex-shrink-0 mr-5">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-chess-purple-500/10 to-chess-purple-500/5 border border-chess-purple-500/20 flex items-center justify-center text-chess-purple-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-white mb-1">Personalized Training</h3>
                        <p className="text-gray-400">Customized lessons for your skill level</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.3 }}
                    >
                      <div className="flex-shrink-0 mr-5">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-chess-gold-500/10 to-chess-gold-500/5 border border-chess-gold-500/20 flex items-center justify-center text-chess-gold-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-white mb-1">Strategic Thinking</h3>
                        <p className="text-gray-400">Development of core chess thinking skills</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
              
              {/* Form Column */}
              <div className="bg-[#0a0d15] px-8 py-16 md:py-20 md:pr-16 md:pl-8 relative">
                <div className="absolute -top-20 -right-20 w-40 h-40 opacity-20 bg-chess-gold-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 opacity-10 bg-chess-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
                
                <div className="max-w-md ml-auto">
                  <h3 className="text-2xl font-bold text-white mb-8">Get Started Today</h3>
                  
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-chess-gold-500 focus:border-chess-gold-500 text-white placeholder-gray-500"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-chess-gold-500 focus:border-chess-gold-500 text-white placeholder-gray-500"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="experience" className="block text-sm font-medium text-gray-400 mb-2">
                          Chess Experience
                        </label>
                        <select
                          id="experience"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-chess-gold-500 focus:border-chess-gold-500 text-white appearance-none"
                          required
                          style={{ 
                            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23f0b54f' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                            backgroundPosition: "right 0.5rem center",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "1.5em 1.5em",
                            paddingRight: "2.5rem"
                          }}
                        >
                          <option value="">Select your level</option>
                          <option value="beginner">Beginner (0-1200 ELO)</option>
                          <option value="intermediate">Intermediate (1200-1800 ELO)</option>
                          <option value="advanced">Advanced (1800+ ELO)</option>
                          <option value="unknown">Not sure / Don&apos;t know my ELO</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                          Your Goals
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-1 focus:ring-chess-gold-500 focus:border-chess-gold-500 text-white placeholder-gray-500"
                          placeholder="Tell us about your chess goals and expectations"
                          required
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        className="relative overflow-hidden w-full py-4 px-6 rounded-lg bg-chess-gold-500 hover:bg-chess-gold-400 text-gray-900 font-medium transition-all duration-300 group"
                        disabled={loading}
                      >
                        <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out transform translate-x-0 -skew-x-12 bg-white opacity-10 group-hover:skew-x-12 group-hover:translate-x-full"></span>
                        <span className="absolute bottom-0 left-0 right-0 h-1 bg-white opacity-20"></span>
                        {loading ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-900" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          "Request Free Consultation"
                        )}
                      </button>
                    </form>
                  ) : (
                    <motion.div 
                      className="text-center py-12"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-chess-gold-500 to-chess-gold-400 mb-6">
                        <svg className="w-8 h-8 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-4">Thank You!</h4>
                      <p className="text-gray-400 text-lg">
                        We&apos;ll contact you at <span className="text-white font-medium">{email}</span> within 24 hours to discuss your chess journey.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 