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
    <section className="py-24 relative overflow-hidden felt-texture" id="cta">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#080a0c] to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-felt-700/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chip-gold-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat">
              Improve Your Poker <span className="gradient-text">Game</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Discover our training programs and resources to develop your poker skills
            </p>
          </motion.div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-8 items-start"
          >
            {/* Contact Form */}
            <div className="bg-felt-900/60 backdrop-blur-sm p-6 rounded-xl border border-felt-800/50">
              <h3 className="text-xl font-bold text-white mb-4 font-montserrat">Request More Information</h3>
              
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 bg-felt-800/80 border border-felt-700/50 rounded-lg focus:ring-chip-gold-500 focus:border-chip-gold-500 text-white"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2 bg-felt-800/80 border border-felt-700/50 rounded-lg focus:ring-chip-gold-500 focus:border-chip-gold-500 text-white"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="game-type" className="block text-sm font-medium text-gray-300 mb-1">
                        Game Type
                      </label>
                      <select
                        id="game-type"
                        className="w-full px-4 py-2 bg-felt-800/80 border border-felt-700/50 rounded-lg focus:ring-chip-gold-500 focus:border-chip-gold-500 text-white"
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
                        className="w-full px-4 py-2 bg-felt-800/80 border border-felt-700/50 rounded-lg focus:ring-chip-gold-500 focus:border-chip-gold-500 text-white"
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
                      className="w-full px-4 py-2 bg-felt-800/80 border border-felt-700/50 rounded-lg focus:ring-chip-gold-500 focus:border-chip-gold-500 text-white"
                      placeholder="Describe your poker experience and what you want to learn"
                      required
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r from-felt-700 to-felt-900 text-white font-medium button-glow transition-all ${
                      loading ? "opacity-80" : "hover:shadow-lg hover:-translate-y-0.5"
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      "Request Information"
                    )}
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center">
                    We typically respond within 24 to 48 hours
                  </p>
                </form>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-felt-700 to-chip-gold-500 mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 font-montserrat">Thank you for your message!</h4>
                  <p className="text-gray-400 mb-6">
                    Your request has been received. We will contact you soon with more information.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 