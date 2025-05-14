"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CtaSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

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
    <section className="py-32 relative overflow-hidden" id="contact">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#1a1a22] to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1a1a22] to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="absolute w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full filter blur-[100px]"></div>
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-turquoise-500/20 rounded-full filter blur-[100px]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: "spring" }}
            className="relative"
          >
            {/* Card background with border effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-turquoise-500/30 rounded-2xl blur-md"></div>
            
            {/* Main card */}
            <div className="relative bg-[#1a1a24]/90 backdrop-blur-sm p-10 md:p-14 rounded-2xl border border-gray-800/50 shadow-xl overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -right-28 -top-28 w-56 h-56 bg-blue-500/10 rounded-full pointer-events-none"></div>
              <div className="absolute -left-28 -bottom-28 w-56 h-56 bg-turquoise-500/10 rounded-full pointer-events-none"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="inline-block mb-6">
                    <div className="h-1 w-10 bg-blue-500 inline-block mr-2"></div>
                    <div className="h-1 w-5 bg-turquoise-500 inline-block"></div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-display leading-tight">
                    Ready to Create Your <span className="gradient-text">Perfect Video</span>?
                  </h2>
                  <p className="text-gray-300 text-lg mb-8">
                    Get in touch with our video editing team and let&apos;s discuss your project needs.
                  </p>
                  
                  <div className="space-y-5">
                    {[
                      { title: "Fast Turnaround", desc: "Get your edited videos back quickly" },
                      { title: "Professional Quality", desc: "Expert editors with years of experience" },
                      { title: "Custom Solutions", desc: "Tailored to your specific needs" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="mt-1 flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-turquoise-500 flex items-center justify-center text-white">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-white font-display">{item.title}</h3>
                          <p className="text-gray-300 text-sm">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="relative z-20">
                  {/* Form card with glass effect */}
                  <div className="glass-effect border border-gray-800/50 p-8 rounded-xl relative shadow-lg z-10">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-turquoise-500/20 rounded-xl blur opacity-0 pointer-events-none transition duration-300"></div>
                    
                    <h3 className="text-xl font-bold text-white mb-6 font-display">Contact Us</h3>
                    
                    {!submitted ? (
                      <form onSubmit={handleSubmit} className="space-y-5 relative z-20">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5 font-accent">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#22222c]/80 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-turquoise-500/50 focus:border-turquoise-500 text-white relative z-10"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1.5 font-accent">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#22222c]/80 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-turquoise-500/50 focus:border-turquoise-500 text-white relative z-10"
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1.5 font-accent">
                            Service Needed
                          </label>
                          <select
                            id="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#22222c]/80 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-turquoise-500/50 focus:border-turquoise-500 text-white relative z-10"
                            required
                          >
                            <option value="">Select a service</option>
                            <option value="short">Short-Form Content</option>
                            <option value="long">Long-Form Content</option>
                            <option value="advertising">Advertising Videos</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1.5 font-accent">
                            Your Message
                          </label>
                          <textarea
                            id="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-4 py-3 bg-[#22222c]/80 border border-gray-700/50 rounded-lg focus:ring-2 focus:ring-turquoise-500/50 focus:border-turquoise-500 text-white relative z-10"
                            placeholder="Tell us about your project"
                            required
                          ></textarea>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-4">
                          <button
                            type="submit"
                            className={`flex-1 py-3.5 px-4 rounded-lg text-white font-medium font-accent transition-all duration-300 relative z-10 ${
                              loading 
                                ? "bg-blue-600/80" 
                                : "bg-gradient-to-r from-blue-600 to-turquoise-500 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
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
                              "Send Message"
                            )}
                          </button>
                          
                          <Link 
                            href="/pricing"
                            className="flex-1 py-3.5 px-4 rounded-lg text-white font-medium font-accent transition-all duration-300 bg-gradient-to-r from-turquoise-600 to-blue-500 hover:shadow-lg hover:shadow-turquoise-500/20 hover:-translate-y-0.5 text-center relative z-10"
                          >
                            View Pricing
                          </Link>
                        </div>
                      </form>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-8 relative z-20"
                      >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-turquoise-500 mb-5">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3 font-display">Message Received!</h4>
                        <p className="text-gray-300 mb-6">
                          Thanks for reaching out. We&apos;ll get back to you at <span className="text-white font-medium">{formData.email}</span> as soon as possible.
                        </p>
                        <Link 
                          href="/pricing"
                          className="py-3 px-6 rounded-lg text-white font-medium font-accent transition-all duration-300 bg-gradient-to-r from-blue-600 to-turquoise-500 hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-0.5"
                        >
                          View Our Packages
                        </Link>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(to right, #3b82f6, #14b8a6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        
        .glass-effect {
          background: rgba(26, 26, 36, 0.7);
          backdrop-filter: blur(10px);
        }
      `}</style>
    </section>
  );
} 