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
    <section className="relative py-32" id="cta">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050608] to-black"></div>
      
      {/* Poker table felt texture overlay */}
      <div className="absolute inset-0 bg-[url('/images/poker-felt-texture.jpg')] mix-blend-soft-light opacity-30"></div>
      
      {/* Card patterns in background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-poker-royal-700/10 to-transparent rounded-full filter blur-[80px]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-chip-gold-700/10 to-transparent rounded-full filter blur-[80px]"></div>
      </div>
      
      {/* Card suits as decorative elements */}
      <div className="absolute -top-10 right-10 text-[300px] opacity-[0.02] text-white transform -rotate-12">♠</div>
      <div className="absolute -bottom-20 left-10 text-[300px] opacity-[0.02] text-poker-red-700 transform rotate-12">♥</div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-poker-royal-700/20 to-poker-royal-800/20 rounded-full mb-6 backdrop-blur-sm border border-poker-royal-700/20">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-chip-gold-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-chip-gold-500"></span>
                </span>
                <span className="text-sm text-gray-300">Ready to elevate your game?</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-montserrat">
                Improve Your Poker <span className="relative inline-block">
                  <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-chip-gold-400 to-chip-gold-600">Game</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-chip-gold-500/40"></span>
                </span>
              </h2>
              
              <p className="text-gray-300 text-xl max-w-xl mb-8">
                Discover our training programs and resources to develop your poker skills
              </p>
              
              {/* Feature list */}
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-chip-gold-500 flex items-center justify-center text-black mt-1 mr-3">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-300">Personalized coaching for all poker formats</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-chip-gold-500 flex items-center justify-center text-black mt-1 mr-3">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-300">Advanced strategy development with GTO principles</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-chip-gold-500 flex items-center justify-center text-black mt-1 mr-3">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-300">Hand history review and database analysis</p>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <div className="inline-flex items-center border-t border-gray-800 pt-6 mt-8">
                  <div className="flex -space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-poker-royal-600 to-poker-royal-800 flex items-center justify-center text-white font-bold text-sm">A</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-chip-gold-500 to-chip-gold-700 flex items-center justify-center text-white font-bold text-sm">K</div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-poker-red-600 to-poker-red-800 flex items-center justify-center text-white font-bold text-sm">Q</div>
                  </div>
                  <div className="ml-4">
                    <p className="text-white font-medium">Join hundreds of successful players</p>
                    <p className="text-gray-400 text-sm">We've helped players at all levels achieve their goals</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full max-w-md lg:max-w-lg"
            >
              <div className="relative">
                {/* Card glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-poker-royal-700 via-chip-gold-600 to-poker-royal-700 rounded-xl blur opacity-10"></div>
                
                {/* Card content */}
                <div className="relative p-px bg-gradient-to-br from-gray-800 to-black rounded-xl overflow-hidden">
                  <div className="relative bg-gradient-to-br from-gray-900 to-black p-8 rounded-xl backdrop-blur-sm">
                    {!submitted ? (
                      <>
                        <h3 className="text-2xl font-bold text-white mb-6 font-montserrat">Request More Information</h3>
                        
                        <form onSubmit={handleSubmit} className="space-y-5">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                              Your Name
                            </label>
                            <div className="relative">
                              <input
                                type="text"
                                id="name"
                                className="w-full px-5 py-3 bg-gray-900/80 border border-gray-700 rounded-lg focus:ring-chip-gold-500 focus:border-chip-gold-500 text-white"
                                placeholder="John Doe"
                                required
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                              Email Address
                            </label>
                            <div className="relative">
                              <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-5 py-3 bg-gray-900/80 border border-gray-700 rounded-lg focus:ring-chip-gold-500 focus:border-chip-gold-500 text-white"
                                placeholder="you@example.com"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div>
                              <label htmlFor="game-type" className="block text-sm font-medium text-gray-300 mb-1">
                                Game Type
                              </label>
                              <select
                                id="game-type"
                                className="w-full px-5 py-3 bg-gray-900/80 border border-gray-700 rounded-lg focus:ring-chip-gold-500 focus:border-chip-gold-500 text-white appearance-none"
                                required
                              >
                                <option value="">Select a type</option>
                                <option value="cash">Cash Games</option>
                                <option value="tournament">Tournaments</option>
                                <option value="spin">Spin & Go / Expresso</option>
                              </select>
                            </div>
                            
                            <div>
                              <label htmlFor="stake-level" className="block text-sm font-medium text-gray-300 mb-1">
                                Stakes Level
                              </label>
                              <select
                                id="stake-level"
                                className="w-full px-5 py-3 bg-gray-900/80 border border-gray-700 rounded-lg focus:ring-chip-gold-500 focus:border-chip-gold-500 text-white appearance-none"
                                required
                              >
                                <option value="">Select a level</option>
                                <option value="micro">Microstakes</option>
                                <option value="low">Low Stakes</option>
                                <option value="mid">Mid Stakes</option>
                                <option value="high">High Stakes</option>
                              </select>
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                              Your Goals
                            </label>
                            <textarea
                              id="message"
                              rows={4}
                              className="w-full px-5 py-3 bg-gray-900/80 border border-gray-700 rounded-lg focus:ring-chip-gold-500 focus:border-chip-gold-500 text-white"
                              placeholder="Describe your poker experience and what you want to learn"
                              required
                            ></textarea>
                          </div>
                          
                          <button
                            type="submit"
                            className="w-full py-4 px-6 rounded-lg relative overflow-hidden group"
                            disabled={loading}
                          >
                            <span className="absolute inset-0 w-full h-full transition-all duration-300 ease-out bg-gradient-to-r from-chip-gold-500 to-chip-gold-600 group-hover:bg-gradient-to-r group-hover:from-chip-gold-600 group-hover:to-chip-gold-700"></span>
                            <span className="relative flex items-center justify-center text-black font-medium text-lg">
                              {loading ? (
                                <>
                                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Processing...
                                </>
                              ) : (
                                "Request Information"
                              )}
                            </span>
                          </button>
                          
                          <p className="text-xs text-gray-500 text-center mt-4">
                            We typically respond within 24 to 48 hours
                          </p>
                        </form>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <div className="relative mx-auto w-20 h-20 mb-6">
                          {/* Success animation */}
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-chip-gold-500/20 to-chip-gold-600/20 animate-ping"></div>
                          <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-chip-gold-500 to-chip-gold-600 z-10">
                            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        
                        <h4 className="text-2xl font-bold text-white mb-4 font-montserrat">Thank you for your message!</h4>
                        <p className="text-gray-300 mb-6 max-w-md mx-auto">
                          Your request has been received. We will contact you soon with more information about our coaching programs.
                        </p>
                        
                        <button 
                          onClick={() => setSubmitted(false)}
                          className="text-chip-gold-500 hover:text-chip-gold-400 transition-colors font-medium"
                        >
                          Send another request
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Bottom decorative edge */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
    </section>
  );
} 