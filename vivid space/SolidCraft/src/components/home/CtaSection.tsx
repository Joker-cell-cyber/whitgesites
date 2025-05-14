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
    <section className="relative py-24 md:py-32 bg-[#fff8e9]" id="contact">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c35a38]/10 to-transparent"></div>
        <svg className="absolute right-0 top-0 w-full h-full opacity-5" width="100%" height="100%" preserveAspectRatio="none">
          <pattern id="diagonalHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="10" stroke="#c35a38" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
        </svg>
        
        {/* Floating shapes */}
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#0d7682]/5"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-[#c35a38]/5"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center mb-4 px-4 py-1.5 rounded-full text-sm bg-[#c35a38]/10 text-[#c35a38]"
            >
              Get Started Today
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-fraunces text-[#3b332b]"
            >
              Ready for a <span className="relative inline-block">
                <span className="relative z-10 text-[#c35a38]">High-Converting</span>
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-[#ffb75e]/30 -z-10 -rotate-1"></span>
              </span> Landing Page?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-[#3b332b]/70 max-w-3xl mx-auto mb-12"
            >
              Let&apos;s discuss your requirements and create a custom landing page that converts your visitors into customers.
            </motion.p>
          </div>

          {/* Contact Form Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden bg-white shadow-xl border border-[#c35a38]/10"
          >
            {/* Card Header */}
            <div className="bg-gradient-to-r from-[#c35a38]/5 to-[#0d7682]/5 p-8 md:p-10 border-b border-[#c35a38]/10">
              <h3 className="text-2xl font-bold font-fraunces text-[#3b332b] mb-2">Tell us about your project</h3>
              <p className="text-[#3b332b]/70">Fill out the form below and we'll get back to you within 24 hours</p>
            </div>
            
            {/* Form Content */}
            <div className="p-8 md:p-10">
              {submitted ? (
                <div className="py-8 text-center">
                  <div className="w-20 h-20 mx-auto bg-[#c35a38]/10 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-[#c35a38]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-fraunces text-[#3b332b]">Request Received!</h3>
                  <p className="text-[#3b332b]/70 mb-6">We&apos;ll get back to you within 24 hours to discuss your landing page project.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-[#c35a38]/10 rounded-full text-[#c35a38] hover:bg-[#c35a38]/20 transition-colors font-medium"
                  >
                    Send Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-[#3b332b]">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#f9f5f0] border border-[#c35a38]/10 rounded-lg focus:ring-2 focus:ring-[#c35a38]/30 focus:outline-none transition-colors placeholder-[#3b332b]/40"
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-[#3b332b]">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-[#f9f5f0] border border-[#c35a38]/10 rounded-lg focus:ring-2 focus:ring-[#c35a38]/30 focus:outline-none transition-colors placeholder-[#3b332b]/40"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="business" className="text-sm font-medium text-[#3b332b]">Business/Website</label>
                    <input
                      type="text"
                      id="business"
                      name="business"
                      value={formData.business}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-[#f9f5f0] border border-[#c35a38]/10 rounded-lg focus:ring-2 focus:ring-[#c35a38]/30 focus:outline-none transition-colors placeholder-[#3b332b]/40"
                      placeholder="Your business name or website"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="requirements" className="text-sm font-medium text-[#3b332b]">Project Requirements</label>
                    <textarea
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-[#f9f5f0] border border-[#c35a38]/10 rounded-lg focus:ring-2 focus:ring-[#c35a38]/30 focus:outline-none transition-colors placeholder-[#3b332b]/40"
                      placeholder="Tell us about your project, target audience, and specific requirements..."
                    ></textarea>
                  </div>
                  
                  <div className="!mt-8 flex justify-center">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`px-8 py-4 bg-[#c35a38] hover:bg-[#a2482d] text-white font-medium rounded-full shadow-lg shadow-[#c35a38]/20 transition-all duration-300 ${loading ? "opacity-70" : "transform hover:-translate-y-1"}`}
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
            </div>
          </motion.div>
          
          {/* Service highlight cards */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md border border-[#0d7682]/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-full bg-[#0d7682]/10 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#0d7682]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 font-fraunces text-[#3b332b]">Quick Turnaround</h3>
              <p className="text-[#3b332b]/70">Get your landing page designed and delivered within 7-14 days</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-md border border-[#c35a38]/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-full bg-[#c35a38]/10 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#c35a38]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 font-fraunces text-[#3b332b]">Conversion Focused</h3>
              <p className="text-[#3b332b]/70">Designs optimized to convert visitors into leads and customers</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-md border border-[#ffb75e]/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-full bg-[#ffb75e]/10 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-[#ffb75e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 font-fraunces text-[#3b332b]">Fully Customized</h3>
              <p className="text-[#3b332b]/70">Tailored to your brand, audience, and specific business goals</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}