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
    <section className="py-24 relative overflow-hidden bg-gray-50">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-100 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-nutrition-green-400/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-carrot-400/10 rounded-full filter blur-3xl"></div>
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
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Start Your Nutrition Journey Today
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  Transform your relationship with food through strategic meal planning and preparation.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-nutrition-green-500 to-carrot-500 flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-800">Save Time & Money</h3>
                      <p className="text-gray-600">Efficient meal planning reduces waste and prep time</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-nutrition-green-500 to-carrot-500 flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-800">Improved Health</h3>
                      <p className="text-gray-600">Nutritionally balanced meals for optimal wellness</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-r from-nutrition-green-500 to-carrot-500 flex items-center justify-center text-white">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-lg font-medium text-gray-800">Expert Guidance</h3>
                      <p className="text-gray-600">Nutritionist-designed meal plans and recipes</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Get My Meal Plan</h3>
                  
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
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-nutrition-green-500 focus:border-nutrition-green-500 text-gray-800"
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
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-nutrition-green-500 focus:border-nutrition-green-500 text-gray-800"
                            placeholder="you@example.com"
                            required
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="planType" className="block text-sm font-medium text-gray-700 mb-1">
                            Meal Plan Type
                          </label>
                          <select
                            id="planType"
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-nutrition-green-500 focus:border-nutrition-green-500 text-gray-800"
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
                          <label htmlFor="dietaryNeeds" className="block text-sm font-medium text-gray-700 mb-1">
                            Dietary Preferences/Restrictions
                          </label>
                          <textarea
                            id="dietaryNeeds"
                            rows={4}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-nutrition-green-500 focus:border-nutrition-green-500 text-gray-800"
                            placeholder="Tell us about your dietary preferences or restrictions"
                            required
                          ></textarea>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            id="newsletter"
                            type="checkbox"
                            className="h-4 w-4 text-nutrition-green-600 focus:ring-nutrition-green-500 border-gray-300 rounded"
                          />
                          <label htmlFor="newsletter" className="ml-2 block text-sm text-gray-600">
                            Subscribe to our free recipes newsletter
                          </label>
                        </div>
                        
                        <button
                          type="submit"
                          className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white font-medium button-glow transition-all ${
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
                            "Get My Meal Plan"
                          )}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-nutrition-green-500 to-carrot-500 mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">You&apos;re All Set!</h4>
                      <p className="text-gray-600">
                        Thanks for signing up. We&apos;ve sent your meal plan details to <span className="text-gray-800 font-medium">{email}</span>. Check your inbox in the next few minutes!
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