"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { COMPANY } from "../../app/constants/company";

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
    <section className="py-32 relative overflow-hidden isolate">
      {/* Background with dynamic blur and animated elements */}
      <div className="absolute inset-0 -z-10 bg-[#030014]">
        {/* Ambient glow effect */}
        <div className="absolute top-1/4 right-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute bottom-1/3 left-1/2 translate-x-1/2 w-[600px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] opacity-40"></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(125, 211, 252, 0.2)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 40 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full bg-white/10"
              style={{ 
                width: `${Math.random() * 4 + 1}px`, 
                height: `${Math.random() * 4 + 1}px`,
                top: `${Math.random() * 100}%`, 
                left: `${Math.random() * 100}%`,
                animation: `float-particle ${Math.random() * 30 + 20}s linear infinite`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="relative">
            {/* Glowing border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-slow"></div>
            
            <div className="relative rounded-2xl overflow-hidden backdrop-blur-sm bg-black/40 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-blue-600/5 to-black/0"></div>
              
              <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Left content column */}
                <div className="p-10 lg:p-12 flex flex-col h-full justify-center">
                  <div className="max-w-xl">
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-4xl md:text-5xl font-bold tracking-tight mb-6"
                    >
                      Start Building Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-sky-400">AI Agent</span> Today
                    </motion.h2>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="text-gray-300 text-lg mb-10 leading-relaxed"
                    >
                      Transform your business with custom AI agents tailored to your specific needs.
                    </motion.p>
                    
                    <div className="space-y-5">
                      {[
                        {
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 22s8-4 8-10V4l-8-2-8 2v8c0 6 8 10 8 10"></path>
                            </svg>
                          ),
                          title: "Secure & Private",
                          description: "Built with data privacy at its core"
                        },
                        {
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 5v14"></path>
                              <path d="M5 12h14"></path>
                            </svg>
                          ),
                          title: "Easily Customizable",
                          description: "No coding required to get started"
                        },
                        {
                          icon: (
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect width="6" height="16" x="4" y="4" rx="2"></rect>
                              <rect width="6" height="8" x="14" y="12" rx="2"></rect>
                              <path d="M22 15h-8"></path>
                            </svg>
                          ),
                          title: "Cutting-edge LLMs",
                          description: "Powered by the latest AI models"
                        }
                      ].map((feature, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                          className="flex items-center group"
                        >
                          <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500/20 to-blue-500/20 border border-white/5 backdrop-blur-sm flex items-center justify-center text-sky-400 group-hover:text-white group-hover:border-white/20 transition duration-300">
                            {feature.icon}
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Right form column with floating effect */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 to-blue-900/30"></div>
                  <div className="relative p-10 lg:p-12 h-full">
                    <div className="max-w-md mx-auto">
                      <h3 className="text-2xl font-bold text-white mb-6">Get Early Access</h3>
                      
                      {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-5">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                              Your Name
                            </label>
                            <input
                              type="text"
                              id="name"
                              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-white placeholder-gray-500 transition duration-200"
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
                              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-white placeholder-gray-500 transition duration-200"
                              placeholder="you@example.com"
                              required
                            />
                          </div>
                          
                          <div>
                            <label htmlFor="agent_type" className="block text-sm font-medium text-gray-300 mb-1">
                              Agent Type
                            </label>
                            <select
                              id="agent_type"
                              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-white transition duration-200"
                              required
                            >
                              <option value="">Select agent type</option>
                              <option value="customer_support">Customer Support</option>
                              <option value="data_analysis">Data Analysis</option>
                              <option value="content_creation">Content Creation</option>
                              <option value="custom">Custom Solution</option>
                            </select>
                          </div>
                          
                          <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                              Tell us about your use case
                            </label>
                            <textarea
                              id="message"
                              rows={4}
                              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent text-white placeholder-gray-500 transition duration-200"
                              placeholder="How do you plan to use your AI agent?"
                              required
                            ></textarea>
                          </div>
                          
                          <button
                            type="submit"
                            className={`w-full py-4 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-500 hover:to-blue-500 text-white font-semibold transition-all duration-300 ${
                              loading ? "opacity-80" : "hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:scale-[1.02]"
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
                              "Request Access"
                            )}
                          </button>
                        </form>
                      ) : (
                        <div className="py-10 text-center">
                          <div className="relative w-20 h-20 mx-auto mb-6">
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 animate-pulse-slow"></div>
                            <div className="absolute inset-1 rounded-full bg-black/60 flex items-center justify-center">
                              <svg className="w-10 h-10 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          </div>
                          <h4 className="text-2xl font-bold text-white mb-3">Request Received!</h4>
                          <p className="text-gray-300 max-w-md mx-auto">
                            Thanks for your interest in {COMPANY.serviceName}. We&apos;ll be in touch at <span className="text-sky-400 font-medium">{email}</span> shortly with access details.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 