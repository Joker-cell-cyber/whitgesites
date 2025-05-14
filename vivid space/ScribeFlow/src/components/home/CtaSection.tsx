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
    <section className="py-28 relative overflow-hidden" id="contact">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-scribe-indigo-50 to-white"></div>
        
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] rounded-full border border-scribe-indigo-100 opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full border border-scribe-indigo-100 opacity-30"></div>
        
        {/* Blurred spots */}
        <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-scribe-turquoise-100/30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-scribe-amber-100/30 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl overflow-hidden shadow-xl bg-white border border-scribe-indigo-100 backdrop-blur-md"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left side - Content */}
              <div className="bg-gradient-to-br from-scribe-indigo-600 to-scribe-turquoise-600 p-10 lg:p-12 text-white relative overflow-hidden">
                {/* Abstract shape backgrounds */}
                <div className="absolute top-0 left-0 right-0 bottom-0 opacity-10">
                  <div className="absolute top-[10%] left-[10%] w-[300px] h-[300px] border-2 border-white rounded-full"></div>
                  <div className="absolute bottom-[10%] right-[10%] w-[200px] h-[200px] border-2 border-white rounded-full"></div>
                  <div className="absolute top-[40%] right-[5%] w-[100px] h-[100px] border-2 border-white rounded-full"></div>
                </div>
              
                <div className="relative">
                  <span className="inline-block mb-3 py-1 px-3 rounded-full text-xs font-medium bg-white/10 text-white backdrop-blur-sm">
                    Start Writing
                  </span>
                  
                  <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                    Turn Your Ideas into <br />Professional E-Books
                  </h2>
                  
                  <p className="text-white/90 text-lg mb-8 max-w-md">
                    Connect with our writing team and start your journey to becoming a published author.
                  </p>
                  
                  <div className="space-y-5">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center bg-white/20">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold">Professional Writers</h3>
                        <p className="text-white/80 text-sm">Expert authors with industry experience</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center bg-white/20">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold">Publication Ready</h3>
                        <p className="text-white/80 text-sm">Formatted for all major platforms</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center bg-white/20">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="font-semibold">Satisfaction Guaranteed</h3>
                        <p className="text-white/80 text-sm">Revisions until you&apos;re happy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right side - Form */}
              <div className="p-10 lg:p-12">
                <h3 className="text-2xl font-bold text-scribe-indigo-900 mb-6">Start Your E-Book Project</h3>
                
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-scribe-indigo-700 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 rounded-lg bg-scribe-indigo-50/50 border border-scribe-indigo-100 focus:ring-2 focus:ring-scribe-indigo-500 focus:border-scribe-indigo-300 text-scribe-indigo-900"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-scribe-indigo-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-scribe-indigo-50/50 border border-scribe-indigo-100 focus:ring-2 focus:ring-scribe-indigo-500 focus:border-scribe-indigo-300 text-scribe-indigo-900"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-scribe-indigo-700 mb-1">
                        E-Book Type
                      </label>
                      <select
                        id="service"
                        className="w-full px-4 py-3 rounded-lg bg-scribe-indigo-50/50 border border-scribe-indigo-100 focus:ring-2 focus:ring-scribe-indigo-500 focus:border-scribe-indigo-300 text-scribe-indigo-900"
                        required
                      >
                        <option value="">Select a type</option>
                        <option value="business">Business & Professional</option>
                        <option value="educational">Educational & How-To</option>
                        <option value="fiction">Fiction & Creative</option>
                        <option value="memoir">Memoir & Biography</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-scribe-indigo-700 mb-1">
                        Tell Us About Your Project
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 rounded-lg bg-scribe-indigo-50/50 border border-scribe-indigo-100 focus:ring-2 focus:ring-scribe-indigo-500 focus:border-scribe-indigo-300 text-scribe-indigo-900"
                        placeholder="Share your e-book idea and any specific requirements"
                        required
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500 text-white font-medium transition-all duration-300 ${
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
                          Sending...
                        </span>
                      ) : (
                        "Get Started"
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 px-4"
                  >
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500 mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-scribe-indigo-900 mb-3">Thank You!</h4>
                    <p className="text-scribe-indigo-700 mb-3">
                      We've received your message and will get back to you soon at:
                    </p>
                    <p className="text-scribe-indigo-900 font-semibold">{email}</p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 