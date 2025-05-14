"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { COMPANY } from "@/lib/company";

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
    <section className="py-24 relative bg-gradient-to-b from-midnight-blue-800 to-midnight-blue-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 w-full h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 overflow-hidden">
              {/* Left Column - Content */}
              <div className="md:col-span-5 p-8 md:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                    TACTICAL <span className="text-teal-500">DEPLOYMENT</span>
                  </h2>
                  
                  <div className="h-1 w-20 bg-gradient-to-r from-teal-600 to-amber-500 mb-6"></div>
                  
                  <p className="text-slate-300 mb-8">
                    Deploy our elite squad for your gaming domination. Enter mission parameters below.
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-900/30 flex items-center justify-center mr-4 border border-teal-500/30">
                        <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Stealth Protocol</h3>
                        <p className="text-teal-400 text-sm">TARGET.SELECT → EXECUTE → EXTRACT</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-amber-900/30 flex items-center justify-center mr-4 border border-amber-500/30">
                        <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-white">Multi-Game Assault</h3>
                        <p className="text-amber-400 text-sm">WOW • DIABLO4 • RUNESCAPE • DOFUS • EVE</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 hidden md:block">
                    <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-700">
                      <div className="text-teal-500 text-sm font-mono leading-relaxed">
                        <span className="text-amber-400">$</span> <span className="text-white">boosting</span> --status<br/>
                        <span className="text-teal-400">◢ ELITE SQUAD: ONLINE</span><br/>
                        <span className="text-teal-400">◢ SERVERS: OPERATIONAL</span><br/>
                        <span className="text-teal-400">◢ MISSION READINESS: 100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Form */}
              <div className="md:col-span-7 bg-slate-800 p-8 md:p-12">
                {!submitted ? (
                  <>
                    <div className="mb-8">
                      <div className="inline-block mb-2 px-3 py-1 bg-teal-600/10 rounded-full text-teal-500 text-sm font-medium">
                        Mission Briefing
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        Ready to Dominate?
                      </h3>
                    </div>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                            AGENT NAME
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
                            placeholder="CODENAME_ALPHA"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                            COMMS CHANNEL
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
                            placeholder="agent@domain.com"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="game" className="block text-sm font-medium text-slate-300 mb-2">
                            TARGET GAME
                          </label>
                          <div className="relative">
                            <select
                              id="game"
                              className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white appearance-none"
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
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                              <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="package" className="block text-sm font-medium text-slate-300 mb-2">
                            MISSION TYPE
                          </label>
                          <div className="relative">
                            <select
                              id="package"
                              className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white appearance-none"
                              required
                            >
                              <option value="">SELECT OPERATION</option>
                              <option value="standard">STANDARD (1-8 hours)</option>
                              <option value="premium">PREMIUM (10-30 hours)</option>
                              <option value="elite">ELITE (35-60 hours)</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                              <svg className="w-4 h-4 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                          MISSION PARAMETERS
                        </label>
                        <textarea
                          id="message"
                          rows={3}
                          className="w-full px-4 py-3 bg-slate-900/80 border border-slate-700 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-white"
                          placeholder="Specify target objectives and extraction requirements..."
                          required
                        ></textarea>
                      </div>
                      
                      <button
                        type="submit"
                        className={`w-full py-4 px-6 rounded-lg bg-gradient-to-r from-teal-600 to-amber-600 text-white font-medium hover:shadow-lg hover:shadow-teal-900/20 transition-all duration-300 ${
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
                    </form>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="w-20 h-20 rounded-full bg-teal-900/30 flex items-center justify-center mb-6 border border-teal-500">
                      <svg className="w-10 h-10 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    
                    <h4 className="text-2xl font-bold text-white mb-4">MISSION ACTIVATED</h4>
                    
                    <div className="w-full max-w-md bg-slate-900 rounded-lg border border-slate-700 p-6 mb-6">
                      <div className="text-teal-500 font-mono text-sm leading-relaxed">
                        <span className="text-amber-400">$</span> <span className="text-white">mission</span> --status<br/>
                        <span className="text-teal-400">◢ MISSION ID: {Math.floor(Math.random() * 100000).toString().padStart(6, '0')}</span><br/>
                        <span className="text-teal-400">◢ STATUS: SQUAD DEPLOYED</span><br/>
                        <span className="text-teal-400">◢ COMMS: <span className="text-white">{email}</span></span>
                      </div>
                    </div>
                    
                    <p className="text-slate-400 text-center">
                      Check your email for mission details and next steps.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 