"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

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
    <section className="py-32 relative overflow-hidden isolate" id="contact">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(25,25,30,1)_0%,rgba(10,10,15,1)_100%)]"></div>
        <div className="absolute inset-0 opacity-30 mix-blend-soft-light">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-50"></div>
        </div>
      </div>
      
      {/* Animated gradient blobs */}
      <div className="absolute -top-80 -left-20 w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-[#8A2BE2]/10 to-[#FF1493]/5 blur-[120px] animate-blob"></div>
      <div className="absolute -bottom-80 -right-20 w-[45rem] h-[45rem] rounded-full bg-gradient-to-br from-[#FF1493]/5 to-[#8A2BE2]/10 blur-[120px] animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/3 w-[35rem] h-[35rem] rounded-full bg-gradient-to-br from-[#8A2BE2]/5 to-[#FF1493]/10 blur-[120px] animate-blob animation-delay-4000"></div>
      
      {/* Mesh grid background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
      
      {/* Fine grain overlay */}
      <svg className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_center,white,transparent)]">
        <defs>
          <pattern id="fine-grain" width="200" height="200" x="50%" y="0" patternUnits="userSpaceOnUse">
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" strokeWidth="0" fill="url(#fine-grain)" />
      </svg>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Glass card container */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card relative overflow-hidden rounded-3xl backdrop-blur-md border border-white/10 bg-white/5"
          >
            {/* Highlight edges */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
              <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
            </div>

            <div className="relative p-6 md:p-10 lg:p-14 overflow-hidden">
              {/* Content grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
                {/* Left column - Text */}
                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    Ready to Accelerate Your 
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#8A2BE2] to-[#FF1493] ml-2">Career Journey?</span>
                  </h2>
                  
                  <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                    Let our experts guide you to professional success with personalized career preparation services.
                  </p>
                  
                  <div className="space-y-6">
                    {/* Benefit cards */}
                    {[
                      {
                        title: "Personalized Approach",
                        description: "Tailored to your career goals",
                        icon: (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )
                      },
                      {
                        title: "Industry Experts",
                        description: "Coaches with proven success",
                        icon: (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )
                      },
                      {
                        title: "Proven Results",
                        description: "Thousands of successful clients",
                        icon: (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        )
                      }
                    ].map((benefit, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        className="flex items-start"
                      >
                        <div className="flex-shrink-0 h-10 w-10 rounded-xl bg-gradient-to-br from-[#8A2BE2] to-[#FF1493] flex items-center justify-center text-white">
                          {benefit.icon}
                        </div>
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-white">{benefit.title}</h3>
                          <p className="text-gray-400">{benefit.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Right column - Form */}
                <div>
                  <div className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
                    
                    {!submitted ? (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-[#8A2BE2] focus:border-[#8A2BE2] text-white placeholder-gray-500"
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
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-[#8A2BE2] focus:border-[#8A2BE2] text-white placeholder-gray-500"
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-[#8A2BE2] focus:border-[#8A2BE2] text-white placeholder-gray-500"
                            placeholder={COMPANY.phone}
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-1">
                            Service Needed
                          </label>
                          <select
                            id="service"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-[#8A2BE2] focus:border-[#8A2BE2] text-white"
                            required
                          >
                            <option value="" className="bg-gray-900">Select a service</option>
                            <option value="resume" className="bg-gray-900">Resume/CV</option>
                            <option value="interview" className="bg-gray-900">Interview Prep</option>
                            <option value="application" className="bg-gray-900">Application Coaching</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                            Your Goals
                          </label>
                          <textarea
                            id="message"
                            rows={4}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-[#8A2BE2] focus:border-[#8A2BE2] text-white placeholder-gray-500"
                            placeholder="Tell us about your career goals and how we can help"
                            required
                          ></textarea>
                        </div>
                        
                        <button
                          type="submit"
                          className="group relative w-full overflow-hidden py-3.5 rounded-lg text-white font-medium transition-all duration-300"
                          disabled={loading}
                        >
                          <div className="absolute inset-0 w-full h-full transition-all duration-300 group-hover:scale-105 bg-gradient-to-r from-[#8A2BE2] to-[#FF1493]"></div>
                          <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-white"></div>
                          <span className="relative flex items-center justify-center">
                            {loading ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                              </>
                            ) : "Get Started"}
                          </span>
                        </button>
                      </form>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center py-8"
                      >
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-[#8A2BE2] to-[#FF1493] mb-6">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3">Message Sent!</h4>
                        <p className="text-gray-300 mb-6">
                          Thanks for reaching out. A career advisor will contact you at <span className="text-white font-medium">{email}</span> within 24 hours.
                        </p>
                        <button 
                          onClick={() => setSubmitted(false)}
                          className="inline-flex items-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors border border-white/10 text-white text-sm"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                          </svg>
                          Send another message
                        </button>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Custom animation styles */}
      <style jsx global>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.95);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 15s infinite;
        }
      `}</style>
    </section>
  );
} 