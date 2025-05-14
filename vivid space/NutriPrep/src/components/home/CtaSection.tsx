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
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-turquoise-500 opacity-20"></div>
        <div className="absolute left-0 top-0 w-80 h-80 bg-purple-500 opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gray-800 rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gray-800 rounded-full"></div>
        <div className="absolute right-1/4 top-1/3 w-6 h-6 bg-turquoise-500 rounded-full"></div>
        <div className="absolute left-1/4 bottom-1/3 w-8 h-8 bg-purple-500 rounded-full"></div>
        <div className="absolute left-1/3 top-1/4 w-4 h-4 bg-white rounded-full"></div>
        <div className="absolute right-1/3 bottom-1/4 w-4 h-4 bg-white rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5 flex flex-col justify-center"
          >
            <div className="mb-8">
              <div className="w-16 h-1 bg-turquoise-500 mb-6"></div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Start Your Nutrition Journey Today
              </h2>
              <p className="text-gray-300 text-xl leading-relaxed mb-8">
                Transform your relationship with food through strategic meal planning and preparation.
              </p>
            </div>
            
            <div className="space-y-5">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-turquoise-500/10 border border-turquoise-500/30 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-turquoise-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Save Time & Money</h3>
                  <p className="text-gray-400">Efficient meal planning reduces waste and prep time</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-purple-500/10 border border-purple-500/30 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Improved Health</h3>
                  <p className="text-gray-400">Nutritionally balanced meals for optimal wellness</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-gray-700 border border-gray-600 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Expert Guidance</h3>
                  <p className="text-gray-400">Nutritionist-designed meal plans and recipes</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-7 md:col-start-6"
          >
            <div className="relative">
              <div className="absolute inset-0 -m-6 bg-gradient-to-br from-turquoise-500 to-purple-500 rounded-xl transform rotate-1 opacity-20"></div>
              <div className="relative bg-gray-900 p-8 md:p-10 rounded-xl border border-gray-800">
                <h3 className="text-2xl font-bold text-white mb-6">Get My Meal Plan</h3>
                
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500 text-white placeholder-gray-500"
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
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500 text-white placeholder-gray-500"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="planType" className="block text-sm font-medium text-gray-300 mb-1">
                        Meal Plan Type
                      </label>
                      <select
                        id="planType"
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500 text-white placeholder-gray-500"
                        required
                      >
                        <option value="">Select a meal plan</option>
                        <option value="basic">Basic Meal Plan</option>
                        <option value="standard">Standard Meal Plan</option>
                        <option value="premium">Premium Meal Plan</option>
                        <option value="family">Family Meal Plan</option>
                        <option value="custom">Custom Diet Plan</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="dietaryNeeds" className="block text-sm font-medium text-gray-300 mb-1">
                        Dietary Preferences/Restrictions
                      </label>
                      <textarea
                        id="dietaryNeeds"
                        rows={4}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-turquoise-500 focus:border-turquoise-500 text-white placeholder-gray-500"
                        placeholder="Tell us about your dietary preferences or restrictions"
                        required
                      ></textarea>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="newsletter"
                        type="checkbox"
                        className="h-4 w-4 text-turquoise-600 focus:ring-turquoise-500 border-gray-700 rounded bg-gray-800"
                      />
                      <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-300">
                        Subscribe to our free recipes newsletter
                      </label>
                    </div>
                    
                    <button
                      type="submit"
                      className={`w-full py-4 px-6 rounded-lg bg-gradient-to-r from-turquoise-500 to-purple-500 text-white font-bold text-lg transition-all ${
                        loading ? "opacity-80" : "hover:shadow-lg hover:translate-y-0.5"
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
                        "Get My Meal Plan"
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 text-center">
                    <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-turquoise-500 to-purple-500 mb-6">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-white mb-4">You&apos;re All Set!</h4>
                    <p className="text-gray-300">
                      Thanks for signing up. We&apos;ve sent your meal plan details to <span className="text-turquoise-400 font-medium">{email}</span>. Check your inbox in the next few minutes!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 