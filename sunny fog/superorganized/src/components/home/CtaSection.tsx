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
    <section className="py-24 relative overflow-hidden bg-white">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-notion-black-50 opacity-30"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-notion-accent-100 opacity-20 rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-notion-accent-50 opacity-20 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="hand-drawn p-8 md:p-12 bg-white"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                  Ready to organize your digital world?
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  Get in touch with our Notion experts and let&apos;s transform your workflow.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-notion-accent-50 border-2 border-black flex items-center justify-center text-black">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-black">Quick Setup</h3>
                      <p className="text-gray-600">Get your workspace ready in days</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-notion-accent-50 border-2 border-black flex items-center justify-center text-black">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-black">Expert Setup</h3>
                      <p className="text-gray-600">Notion specialists with years of experience</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-notion-accent-50 border-2 border-black flex items-center justify-center text-black">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-black">Tailored Solutions</h3>
                      <p className="text-gray-600">Customized to your specific needs</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="hand-drawn-light p-6 bg-white">
                  <h3 className="text-xl font-bold text-black mb-4">Contact Us</h3>
                  
                  {!submitted ? (
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-2 bg-white border-2 border-black rounded-md focus:ring-notion-accent-500 focus:border-notion-accent-500 text-black"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 bg-white border-2 border-black rounded-md focus:ring-notion-accent-500 focus:border-notion-accent-500 text-black"
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                            Service Needed
                          </label>
                          <select
                            id="service"
                            className="w-full px-4 py-2 bg-white border-2 border-black rounded-md focus:ring-notion-accent-500 focus:border-notion-accent-500 text-black"
                            required
                          >
                            <option value="">Select a service</option>
                            <option value="personal">Personal Workspace</option>
                            <option value="team">Team Workspace</option>
                            <option value="business">Business Management</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Message
                          </label>
                          <textarea
                            id="message"
                            rows={4}
                            className="w-full px-4 py-2 bg-white border-2 border-black rounded-md focus:ring-notion-accent-500 focus:border-notion-accent-500 text-black"
                            placeholder="Tell us about your Notion needs"
                            required
                          ></textarea>
                        </div>
                        
                        <button
                          type="submit"
                          className="w-full py-3 px-4 button-hand-drawn text-black font-medium transition-all"
                          disabled={loading}
                        >
                          {loading ? (
                            <span className="flex items-center justify-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </span>
                          ) : (
                            "Send Message"
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-notion-accent-100 border-2 border-black mb-4">
                        <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-black mb-2">Message Sent!</h4>
                      <p className="text-gray-600">
                        Thanks for reaching out. We&apos;ll get back to you at <span className="text-black font-medium">{email}</span> as soon as possible.
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