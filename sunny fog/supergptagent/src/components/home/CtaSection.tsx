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
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0c0c14]"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(0, 195, 245, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 195, 245, 0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        {/* Matrix characters */}
        <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute text-ai-green-500 text-2xl font-mono animate-matrix"
              style={{ 
                left: `${Math.random() * 100}%`, 
                top: `-50px`, 
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 5 + 5}s` 
              }}
            >
              {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ai-blue-500/50 to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="glass-effect cyber-border p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Start Building Your <span className="gradient-text">AI Agent</span> Today
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  Transform your business with custom AI agents tailored to your specific needs.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-ai-blue-500 to-ai-purple-500 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V4l-8-2-8 2v8c0 6 8 10 8 10"></path>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-white">Secure & Private</h3>
                      <p className="text-gray-400">Built with data privacy at its core</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-ai-blue-500 to-ai-purple-500 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 5v14"></path>
                        <path d="M5 12h14"></path>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-white">Easily Customizable</h3>
                      <p className="text-gray-400">No coding required to get started</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-ai-blue-500 to-ai-purple-500 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="6" height="16" x="4" y="4" rx="2"></rect>
                        <rect width="6" height="8" x="14" y="12" rx="2"></rect>
                        <path d="M22 15h-8"></path>
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-white">Cutting-edge LLMs</h3>
                      <p className="text-gray-400">Powered by the latest AI models</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-[#14141e] p-6 rounded-xl border border-ai-blue-500/30">
                  <h3 className="text-xl font-bold text-white mb-4">Get Early Access</h3>
                  
                  {!submitted ? (
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-2 bg-[#0c0c14] border border-gray-700 rounded-lg focus:ring-ai-blue-500 focus:border-ai-blue-500 text-white"
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
                            className="w-full px-4 py-2 bg-[#0c0c14] border border-gray-700 rounded-lg focus:ring-ai-blue-500 focus:border-ai-blue-500 text-white"
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
                            className="w-full px-4 py-2 bg-[#0c0c14] border border-gray-700 rounded-lg focus:ring-ai-blue-500 focus:border-ai-blue-500 text-white"
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
                            className="w-full px-4 py-2 bg-[#0c0c14] border border-gray-700 rounded-lg focus:ring-ai-blue-500 focus:border-ai-blue-500 text-white"
                            placeholder="How do you plan to use your AI agent?"
                            required
                          ></textarea>
                        </div>
                        
                        <button
                          type="submit"
                          className={`w-full py-3 px-4 rounded-lg cyber-border bg-gradient-to-r from-ai-blue-600 to-ai-purple-600 text-white font-medium button-glow transition-all ${
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
                            "Request Access"
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-ai-blue-500 to-ai-purple-500 mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">Request Received!</h4>
                      <p className="text-gray-300">
                        Thanks for your interest in SuperGPTAgent. We&apos;ll be in touch at <span className="text-white font-medium">{email}</span> shortly with access details.
                      </p>
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