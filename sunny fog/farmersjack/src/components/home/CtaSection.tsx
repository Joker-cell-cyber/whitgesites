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
    <section className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#070c15] to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-plasma-purple-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-toxic-green-500/10 rounded-full filter blur-3xl"></div>
        
        {/* Cyber grid pattern */}
        <div className="absolute inset-0 bg-cyber-grid bg-[length:50px_50px] opacity-5"></div>
        
        {/* Animated scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute inset-x-0 h-[2px] bg-neon-pink-500/50 blur-[1px] animate-scan-line"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="glass-effect p-8 md:p-12 pixel-corners"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="mb-4 flex items-center">
                  <div className="w-2 h-8 bg-neon-pink-500 mr-3"></div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">
                    TACTICAL <span className="neon-text">DEPLOYMENT</span>
                  </h2>
                </div>
                
                <p className="text-gray-300 text-lg mb-6 border-l-2 border-toxic-green-500/50 pl-4">
                  Deploy our elite squad for your gaming domination. Enter mission parameters below.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-to-r from-plasma-purple-600 to-neon-pink-600 flex items-center justify-center text-white rgb-border">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-white">Stealth Protocol</h3>
                      <p className="text-toxic-green-400 font-mono text-sm">TARGET.SELECT → EXECUTE → EXTRACT</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-lg bg-gradient-to-r from-plasma-purple-600 to-neon-pink-600 flex items-center justify-center text-white rgb-border">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-white">Multi-Game Assault</h3>
                      <p className="text-toxic-green-400 font-mono text-sm">WOW • DIABLO4 • RUNESCAPE • DOFUS • EVE</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 hidden md:block">
                  <div className="terminal-frame">
                    <div className="text-toxic-green-500 font-mono text-sm leading-relaxed">
                      <span className="text-neon-pink-400">$</span> <span className="text-white">boosting</span> --status<br/>
                      <span className="text-toxic-green-400">◢ ELITE SQUAD: ONLINE</span><br/>
                      <span className="text-toxic-green-400">◢ SERVERS: OPERATIONAL</span><br/>
                      <span className="text-toxic-green-400">◢ MISSION READINESS: 100%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-[#0c1220] p-6 rounded-xl border border-gray-800 pixel-corners relative">
                  {!submitted ? (
                    <>
                      <div className="absolute top-0 right-0 px-2 py-1 bg-black text-toxic-green-500 text-xs font-mono m-2 border border-toxic-green-500/30 rounded">
                        SECURE_CONNECTION
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                        <svg className="w-5 h-5 mr-2 text-neon-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        MISSION BRIEFING
                      </h3>
                      
                      <div className="loading-bar mb-4"></div>
                      
                      <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                              <span className="w-4 h-4 inline-block bg-toxic-green-500/20 mr-2 text-toxic-green-500 flex items-center justify-center text-[10px]">
                                01
                              </span>
                              AGENT NAME
                            </label>
                            <input
                              type="text"
                              id="name"
                              className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:ring-neon-pink-500 focus:border-neon-pink-500 text-white font-mono"
                              placeholder="CODENAME_ALPHA"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                              <span className="w-4 h-4 inline-block bg-toxic-green-500/20 mr-2 text-toxic-green-500 flex items-center justify-center text-[10px]">
                                02
                              </span>
                              COMMS CHANNEL
                            </label>
                            <input
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:ring-neon-pink-500 focus:border-neon-pink-500 text-white font-mono"
                              placeholder="agent@domain.com"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="game" className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                              <span className="w-4 h-4 inline-block bg-toxic-green-500/20 mr-2 text-toxic-green-500 flex items-center justify-center text-[10px]">
                                03
                              </span>
                              TARGET GAME
                            </label>
                            <select
                              id="game"
                              className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:ring-neon-pink-500 focus:border-neon-pink-500 text-white font-mono appearance-none"
                              required
                            >
                              <option value="">SELECT TARGET</option>
                              <option value="wow">World of Warcraft</option>
                              <option value="diablo">Diablo 4</option>
                              <option value="runescape">Runescape</option>
                              <option value="dofus">Dofus</option>
                              <option value="genshin">Genshin Impact</option>
                              <option value="eve">EVE Online</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="package" className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                              <span className="w-4 h-4 inline-block bg-toxic-green-500/20 mr-2 text-toxic-green-500 flex items-center justify-center text-[10px]">
                                04
                              </span>
                              MISSION TYPE
                            </label>
                            <select
                              id="package"
                              className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:ring-neon-pink-500 focus:border-neon-pink-500 text-white font-mono appearance-none"
                              required
                            >
                              <option value="">SELECT OPERATION</option>
                              <option value="standard">STANDARD (1-8 hours)</option>
                              <option value="premium">PREMIUM (10-30 hours)</option>
                              <option value="elite">ELITE (35-60 hours)</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1 flex items-center">
                              <span className="w-4 h-4 inline-block bg-toxic-green-500/20 mr-2 text-toxic-green-500 flex items-center justify-center text-[10px]">
                                05
                              </span>
                              MISSION PARAMETERS
                            </label>
                            <textarea
                              id="message"
                              rows={3}
                              className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg focus:ring-neon-pink-500 focus:border-neon-pink-500 text-white font-mono"
                              placeholder="Specify target objectives and extraction requirements..."
                              required
                            ></textarea>
                          </div>
                          
                          <button
                            type="submit"
                            className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r from-plasma-purple-600 to-neon-pink-600 text-white font-medium button-glow transition-all ${
                              loading ? "opacity-80" : "hover:shadow-neon-glow hover:-translate-y-0.5"
                            }`}
                            disabled={loading}
                          >
                            {loading ? (
                              <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                DEPLOYING...
                              </span>
                            ) : (
                              <span className="flex items-center justify-center">
                                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                DEPLOY ELITE SQUAD
                              </span>
                            )}
                          </button>
                        </div>
                      </form>
                    </>
                  ) : (
                    <div className="text-center py-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-plasma-purple-600 to-neon-pink-600 mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">MISSION ACTIVATED</h4>
                      <div className="terminal-frame mt-4">
                        <div className="text-toxic-green-500 font-mono text-sm leading-relaxed">
                          <span className="text-neon-pink-400">$</span> <span className="text-white">mission</span> --status<br/>
                          <span className="text-toxic-green-400">◢ MISSION ID: {Math.floor(Math.random() * 100000).toString().padStart(6, '0')}</span><br/>
                          <span className="text-toxic-green-400">◢ STATUS: SQUAD DEPLOYED</span><br/>
                          <span className="text-toxic-green-400">◢ COMMS: <span className="text-white">{email}</span></span>
                        </div>
                      </div>
                    </div>
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