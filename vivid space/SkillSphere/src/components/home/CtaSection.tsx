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
    <section className="py-24 relative">
      {/* Cyberpunk background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10"></div>
        
        {/* Animated orbital elements */}
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full border border-indigo-600/10 animate-spin-slow"></div>
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full border border-cyan-500/10 animate-spin-reverse"></div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-indigo-600/30 rounded-full animate-pulse-glow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-cyan-500/30 rounded-full animate-pulse-glow"></div>
        
        {/* Gradient backgrounds */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-slate-900/0 via-indigo-900/5 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-900/0 via-cyan-900/5 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Cyberpunk frame border elements */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-indigo-600/20 rounded-xl blur-md"></div>
            <div className="absolute inset-0 rounded-xl border border-indigo-600/30"></div>
            <div className="absolute -top-3 left-10 w-20 h-6 bg-slate-900 border-t border-l border-r border-cyan-500/30 rounded-t-lg"></div>
            
            <div className="relative bg-slate-900/90 backdrop-blur-md p-8 md:p-12 rounded-xl shadow-2xl overflow-hidden">
              {/* Diagonal dividing lines */}
              <div className="absolute top-0 right-0 w-40 h-40">
                <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-cyan-500/40 to-transparent"></div>
                <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-cyan-500/40 to-transparent"></div>
                <div className="absolute top-0 right-0 w-20 h-px bg-gradient-to-l from-indigo-600/40 to-transparent transform translate-y-10"></div>
                <div className="absolute top-0 right-0 w-px h-20 bg-gradient-to-b from-indigo-600/40 to-transparent transform -translate-x-10"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-40 h-40">
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-cyan-500/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-px h-full bg-gradient-to-t from-cyan-500/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-20 h-px bg-gradient-to-r from-indigo-600/40 to-transparent transform -translate-y-10"></div>
                <div className="absolute bottom-0 left-0 w-px h-20 bg-gradient-to-t from-indigo-600/40 to-transparent transform translate-x-10"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div className="space-y-6">
                  <div className="inline-block">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                      <div className="font-mono text-xs tracking-wider text-cyan-500 uppercase">Ready to level up</div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] text-white leading-tight">
                      Ready to take your gaming to the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-600">next level</span>?
                    </h2>
                  </div>
                  
                  <p className="text-gray-300 text-lg font-['Space_Grotesk']">
                    Connect with our expert coaches and start your journey to becoming a better player today.
                  </p>
                  
                  <div className="space-y-5 pt-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-600/20 border border-indigo-600/30 flex items-center justify-center text-cyan-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-white font-['Montserrat']">Personalized Coaching</h3>
                        <p className="text-gray-300 font-['Space_Grotesk']">Customized training for your skill level</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-600/20 border border-indigo-600/30 flex items-center justify-center text-cyan-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-white font-['Montserrat']">Pro-Level Strategies</h3>
                        <p className="text-gray-300 font-['Space_Grotesk']">Learn techniques used by top players</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-indigo-600/20 border border-indigo-600/30 flex items-center justify-center text-cyan-500">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-white font-['Montserrat']">Flexible Scheduling</h3>
                        <p className="text-gray-300 font-['Space_Grotesk']">Book sessions that fit your availability</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="bg-slate-800/80 border border-indigo-600/20 rounded-lg p-6 md:p-8 backdrop-blur-sm">
                    <div className="flex items-center justify-between pb-6 mb-6 border-b border-indigo-600/20">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse mr-2"></div>
                        <h3 className="text-xl font-bold text-white font-['Montserrat']">Request Coaching</h3>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
                        <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
                        <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
                      </div>
                    </div>
                    
                    {!submitted ? (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2 font-['Space_Grotesk']">
                            Your Name
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              id="name"
                              className="w-full px-4 py-3 bg-slate-900/90 border border-indigo-600/30 focus:border-cyan-500/50 rounded-md focus:ring-1 focus:ring-cyan-500/50 text-white font-['Space_Grotesk'] placeholder-gray-500"
                              placeholder="John Doe"
                              required
                            />
                            <div className="absolute top-0 right-0 h-full w-10 flex items-center justify-center text-indigo-600/50">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2 font-['Space_Grotesk']">
                            Email Address
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-4 py-3 bg-slate-900/90 border border-indigo-600/30 focus:border-cyan-500/50 rounded-md focus:ring-1 focus:ring-cyan-500/50 text-white font-['Space_Grotesk'] placeholder-gray-500"
                              placeholder="you@example.com"
                              required
                            />
                            <div className="absolute top-0 right-0 h-full w-10 flex items-center justify-center text-indigo-600/50">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="game" className="block text-sm font-medium text-gray-300 mb-2 font-['Space_Grotesk']">
                            Game
                          </label>
                          <div className="relative">
                            <select
                              id="game"
                              className="w-full px-4 py-3 bg-slate-900/90 border border-indigo-600/30 focus:border-cyan-500/50 rounded-md focus:ring-1 focus:ring-cyan-500/50 text-white font-['Space_Grotesk'] appearance-none"
                              required
                            >
                              <option value="">Select your game</option>
                              <option value="fortnite">Fortnite</option>
                              <option value="cod">Call of Duty</option>
                              <option value="lol">League of Legends</option>
                              <option value="tft">Teamfight Tactics</option>
                              <option value="csgo">CS:GO</option>
                              <option value="fifa">FIFA</option>
                              <option value="rocketleague">Rocket League</option>
                              <option value="other">Other</option>
                            </select>
                            <div className="absolute top-0 right-0 h-full w-10 flex items-center justify-center text-indigo-600/50 pointer-events-none">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2 font-['Space_Grotesk']">
                            Your Goals
                          </label>
                          <textarea
                            id="message"
                            rows={4}
                            className="w-full px-4 py-3 bg-slate-900/90 border border-indigo-600/30 focus:border-cyan-500/50 rounded-md focus:ring-1 focus:ring-cyan-500/50 text-white font-['Space_Grotesk'] placeholder-gray-500"
                            placeholder="Tell us about your current rank and what you want to improve"
                            required
                          ></textarea>
                        </div>
                        
                        <div className="pt-2">
                          <button
                            type="submit"
                            className={`relative w-full overflow-hidden group ${
                              loading ? "cursor-not-allowed opacity-80" : "cursor-pointer"
                            }`}
                            disabled={loading}
                          >
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-lg blur opacity-70 group-hover:opacity-100 transition duration-200"></div>
                            <div className="relative px-6 py-3.5 bg-slate-900 rounded-lg leading-none flex items-center justify-center space-x-4">
                              {loading ? (
                                <span className="flex items-center text-cyan-500 font-['Montserrat'] font-medium">
                                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                  </svg>
                                  Processing...
                                </span>
                              ) : (
                                <span className="text-cyan-500 group-hover:text-white transition duration-200 font-['Montserrat'] font-medium">
                                  Request Coaching
                                </span>
                              )}
                            </div>
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="text-center py-8 px-4">
                        <div className="relative mx-auto w-20 h-20 mb-6">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-indigo-600/20 animate-pulse"></div>
                          <div className="absolute inset-1 rounded-full bg-slate-900 flex items-center justify-center">
                            <svg className="w-10 h-10 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3 font-['Montserrat']">Request Sent!</h4>
                        <p className="text-gray-300 font-['Space_Grotesk']">
                          Thanks for reaching out. We&apos;ll get back to you at <span className="text-cyan-500 font-medium">{email}</span> as soon as possible.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 