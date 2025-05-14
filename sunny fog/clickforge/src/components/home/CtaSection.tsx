"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function CtaSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    business: "",
    requirements: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    <section className="relative py-32 bg-[#0a0a0a]" id="contact">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[rgba(37,99,235,0.07)] to-[rgba(124,58,237,0.07)] rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[rgba(37,99,235,0.02)] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[rgba(124,58,237,0.02)] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Ready for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(37,99,235)] to-[rgb(124,58,237)]">High-Converting</span> Landing Page?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
            >
              Let&apos;s discuss your requirements and create a custom landing page that converts your visitors into customers.
            </motion.p>
          </div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] p-8 md:p-12 rounded-2xl"
          >
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-[rgba(37,99,235,0.1)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-[rgb(37,99,235)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4">Request Received!</h3>
                <p className="text-gray-400 mb-6">We&apos;ll get back to you within 24 hours to discuss your landing page project.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-3 bg-[rgba(255,255,255,0.05)] rounded-lg text-white hover:bg-[rgba(255,255,255,0.1)] transition-colors"
                >
                  Send Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[rgba(124,58,237,0.5)]"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[rgba(124,58,237,0.5)]"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="business" className="block text-sm font-medium text-gray-400 mb-2">Business/Website</label>
                  <input
                    type="text"
                    id="business"
                    name="business"
                    value={formData.business}
                    onChange={handleChange}
                    required
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[rgba(124,58,237,0.5)]"
                    placeholder="Your business name or website"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="requirements" className="block text-sm font-medium text-gray-400 mb-2">Project Requirements</label>
                  <textarea
                    id="requirements"
                    name="requirements"
                    value={formData.requirements}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[rgba(124,58,237,0.5)]"
                    placeholder="Tell us about your project, target audience, and specific requirements..."
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-10 py-4 rounded-lg bg-gradient-to-r from-[rgb(37,99,235)] to-[rgb(124,58,237)] text-white font-medium text-lg hover:shadow-lg hover:shadow-[rgba(124,58,237,0.3)] transition-all duration-300 ${loading ? "opacity-70" : ""}`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : "Request Your Custom Landing Page"}
                  </button>
                </div>
              </form>
            )}
            
            {/* Service highlights */}
            <div className="mt-12 pt-12 border-t border-[rgba(255,255,255,0.05)] grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[rgba(37,99,235,0.1)] flex-shrink-0 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-[rgb(37,99,235)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Quick Turnaround</h3>
                  <p className="text-gray-400">Get your landing page designed and delivered within 7-14 days</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[rgba(37,99,235,0.1)] flex-shrink-0 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-[rgb(37,99,235)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Conversion Focused</h3>
                  <p className="text-gray-400">Designs optimized to convert visitors into leads and customers</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-[rgba(37,99,235,0.1)] flex-shrink-0 flex items-center justify-center mr-4">
                  <svg className="w-5 h-5 text-[rgb(37,99,235)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Fully Customized</h3>
                  <p className="text-gray-400">Tailored to your brand, audience, and specific business goals</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}