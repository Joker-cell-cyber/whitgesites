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
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#0a1628] to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-chess-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chess-gold-500/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="glass-effect p-8 md:p-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Start your journey to chess mastery today
                </h2>
                <p className="text-gray-300 text-lg mb-6">
                  Connect with our expert coaches and take your chess skills to the next level with personalized training.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-chess-blue-500 to-chess-gold-500 flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-white">ELO Rating Improvement</h3>
                      <p className="text-gray-400">Measurable progress in your chess rating</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-chess-blue-500 to-chess-gold-500 flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-white">Personalized Training</h3>
                      <p className="text-gray-400">Customized lessons for your skill level</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-chess-blue-500 to-chess-gold-500 flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-white">Strategic Thinking</h3>
                      <p className="text-gray-400">Development of core chess thinking skills</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-[#0e2250] p-6 rounded-xl border border-gray-800">
                  <h3 className="text-xl font-bold text-white mb-4">Get Started Today</h3>
                  
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
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-chess-blue-500 focus:border-chess-blue-500 text-white"
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
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-chess-blue-500 focus:border-chess-blue-500 text-white"
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-1">
                            Chess Experience
                          </label>
                          <select
                            id="experience"
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-chess-blue-500 focus:border-chess-blue-500 text-white"
                            required
                          >
                            <option value="">Select your level</option>
                            <option value="beginner">Beginner (0-1200 ELO)</option>
                            <option value="intermediate">Intermediate (1200-1800 ELO)</option>
                            <option value="advanced">Advanced (1800+ ELO)</option>
                            <option value="unknown">Not sure / Don&apos;t know my ELO</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">
                            Your Goals
                          </label>
                          <textarea
                            id="message"
                            rows={4}
                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-chess-blue-500 focus:border-chess-blue-500 text-white"
                            placeholder="Tell us about your chess goals and expectations"
                            required
                          ></textarea>
                        </div>
                        
                        <button
                          type="submit"
                          className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r from-chess-blue-600 to-chess-gold-500 text-white font-medium button-glow transition-all ${
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
                            "Request Free Consultation"
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-chess-blue-500 to-chess-gold-500 mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2">Thank You!</h4>
                      <p className="text-gray-300">
                        We&apos;ll contact you at <span className="text-white font-medium">{email}</span> within 24 hours to discuss your chess journey.
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