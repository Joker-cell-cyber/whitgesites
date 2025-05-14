"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type MealPlanCategory = "starter" | "standard" | "complete";

export default function PricingSection() {
  const [selectedCategory, setSelectedCategory] = useState<MealPlanCategory>("starter");

  // Define pricing tiers
  const pricingCategories = {
    starter: [
      {
        name: "Basic",
        price: 9.99,
        description: "Simple meal prep guide for beginners",
        features: [
          "5 unique recipes",
          "Basic nutrition info",
          "Simple grocery list"
        ],
        delivery: "Instant access"
      },
      {
        name: "Standard",
        price: 19.50,
        description: "Complete meal planning for individuals",
        features: [
          "7 unique recipes",
          "Detailed nutrition breakdown",
          "Organized grocery list",
          "Basic meal prep guide"
        ],
        delivery: "Instant access",
        popular: true
      },
      {
        name: "Advanced",
        price: 29.90,
        description: "Advanced meal planning with custom macros",
        features: [
          "10 unique recipes",
          "Complete nutrition analysis",
          "Smart grocery list",
          "Multiple diet options",
          "Detailed meal prep guides"
        ],
        delivery: "Instant access"
      },
      {
        name: "Pro",
        price: 39.99,
        description: "Targeted meal planning for weight management",
        features: [
          "7 family-sized recipes",
          "Kid-friendly options",
          "Age-appropriate nutrition info",
          "Batch cooking guides",
          "Budget-friendly shopping list"
        ],
        delivery: "Instant access"
      },
      {
        name: "Ultimate",
        price: 49.90,
        description: "Personalized plan for specific dietary needs",
        features: [
          "Personalized meal selection",
          "Custom dietary profile",
          "Allergy management",
          "Unlimited substitutions"
        ],
        delivery: "24 hours after profile completion"
      }
    ],
    standard: [
      {
        name: "Starter",
        price: 29.90,
        description: "Simple family meal planning for 4-6 people",
        features: [
          "20 unique recipes",
          "Basic nutrition info",
          "Simple grocery lists"
        ],
        delivery: "Instant access"
      },
      {
        name: "Essential",
        price: 49.90,
        description: "Comprehensive meal planning for families",
        features: [
          "30 unique recipes",
          "Detailed nutrition breakdown",
          "Weekly grocery lists",
          "Multiple diet options"
        ],
        delivery: "Instant access",
        popular: true
      },
      {
        name: "Plus",
        price: 69.99,
        description: "Advanced meal planning for active families",
        features: [
          "40 unique recipes",
          "Complete nutrition analysis",
          "Multiple diet specializations",
          "Comprehensive prep guides"
        ],
        delivery: "Instant access"
      },
      {
        name: "Premium",
        price: 89.50,
        description: "Customized meal planning for larger families",
        features: [
          "30 family-sized recipes",
          "Age-appropriate nutrition info",
          "Batch cooking guides",
          "Budget-friendly shopping lists"
        ],
        delivery: "Instant access"
      },
      {
        name: "Master",
        price: 119.50,
        description: "Full-service family nutrition program",
        features: [
          "Personalized meal selection",
          "Custom dietary profile",
          "Allergy management",
          "Unlimited substitutions"
        ],
        delivery: "48 hours after profile completion"
      }
    ],
    complete: [
      {
        name: "Basic Collection",
        price: 69.99,
        description: "Targeted nutrition for athletes and active individuals",
        features: [
          "60 unique recipes",
          "Basic nutrition info",
          "Simple grocery lists",
          "Seasonal recipe adjustments"
        ],
        delivery: "Instant access"
      },
      {
        name: "Gourmet Collection",
        price: 99.99,
        description: "Specialized plans for health conditions",
        features: [
          "90 unique recipes",
          "Detailed nutrition breakdown",
          "Weekly grocery lists",
          "Multiple diet options"
        ],
        delivery: "Instant access",
        popular: true
      },
      {
        name: "Chef's Collection",
        price: 119.50,
        description: "Premium nutritional guidance",
        features: [
          "120 unique recipes",
          "Complete nutrition analysis",
          "Multiple diet specializations",
          "Seasonal menu adaptations"
        ],
        delivery: "Instant access"
      }
    ]
  };
  
  return (
    <section className="py-24 relative overflow-hidden bg-gray-900" id="pricing">
      {/* Background decorations */}
      <div className="absolute top-0 w-full h-40 bg-gradient-to-b from-purple-500/10 to-transparent"></div>
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-turquoise-500/10 to-transparent"></div>
      <div className="absolute top-1/3 left-0 w-20 h-40 bg-purple-500/20 rounded-r-full blur-xl"></div>
      <div className="absolute top-2/3 right-0 w-20 h-40 bg-turquoise-500/20 rounded-l-full blur-xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Simple, Transparent <span className="text-turquoise-400">Pricing</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Choose the perfect meal plan that fits your nutritional needs and budget
            </p>
          </motion.div>
        </div>

        <div className="flex justify-center mb-12 relative">
          <div className="inline-flex p-1 bg-gray-800 rounded-xl">
            <button
              onClick={() => setSelectedCategory('starter')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedCategory === 'starter'
                  ? 'bg-gradient-to-r from-turquoise-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Starter Packs
            </button>
            <button
              onClick={() => setSelectedCategory('standard')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedCategory === 'standard'
                  ? 'bg-gradient-to-r from-turquoise-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Standard Packs
            </button>
            <button
              onClick={() => setSelectedCategory('complete')}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedCategory === 'complete'
                  ? 'bg-gradient-to-r from-turquoise-500 to-purple-500 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Complete Packs
            </button>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {pricingCategories[selectedCategory].slice(0, 3).map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col relative overflow-hidden ${
                tier.popular ? "lg:scale-105 z-10" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 z-20">
                  <div className="bg-gradient-to-r from-turquoise-500 to-purple-500 text-white text-xs font-bold uppercase py-1.5 px-4 rotate-45 transform translate-x-5 -translate-y-3 shadow-md">
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className={`rounded-2xl overflow-hidden flex flex-col h-full border ${
                tier.popular 
                  ? "border-turquoise-400 shadow-xl shadow-turquoise-500/10" 
                  : "border-gray-700 shadow-gray-900/40"
              } bg-gray-800 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl`}>
                <div className={`p-8 flex-1 ${tier.popular ? "bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900" : ""}`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                      <p className="text-gray-400 mt-2 h-12">{tier.description}</p>
                    </div>
                    {index % 3 === 0 && (
                      <div className="h-16 w-16 rounded-full flex items-center justify-center bg-purple-500/20">
                        <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                    )}
                    {index % 3 === 1 && (
                      <div className="h-16 w-16 rounded-full flex items-center justify-center bg-turquoise-500/20">
                        <svg className="w-8 h-8 text-turquoise-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    )}
                    {index % 3 === 2 && (
                      <div className="h-16 w-16 rounded-full flex items-center justify-center bg-pink-500/20">
                        <svg className="w-8 h-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-8 flex items-baseline">
                    <span className="text-4xl font-extrabold text-white">${tier.price.toFixed(2)}</span>
                    <span className="ml-2 text-gray-400">/package</span>
                  </div>
                  
                  <div className="mt-8 space-y-4">
                    {tier.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center ${
                          tier.popular ? "bg-turquoise-500/30 text-turquoise-300" : "bg-gray-700 text-gray-300"
                        } mr-3`}>
                          <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="px-8 pb-8 pt-4">
                  <div className="text-gray-400 text-sm mb-4 flex items-center">
                    <svg className="h-5 w-5 text-turquoise-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>{tier.delivery}</span>
                  </div>
                  
                  <Link
                    href={`/checkout?plan=${tier.name}&price=${tier.price}&category=${selectedCategory}`}
                    className={`w-full flex items-center justify-center py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                      tier.popular
                        ? "bg-gradient-to-r from-turquoise-500 to-purple-500 text-white hover:shadow-lg hover:shadow-turquoise-500/20"
                        : "bg-gray-700 text-white hover:bg-gray-600"
                    }`}
                  >
                    Get Started
                    <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {pricingCategories[selectedCategory].length > 3 && (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {pricingCategories[selectedCategory].slice(3).map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index + 3) * 0.1 }}
                className="flex flex-col relative overflow-hidden"
              >
                <div className="rounded-2xl overflow-hidden flex flex-col h-full border border-gray-700 bg-gray-800 shadow-gray-900/40 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-2xl">
                  <div className="p-8 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                        <p className="text-gray-400 mt-2">{tier.description}</p>
                      </div>
                      <div className="h-16 w-16 rounded-full flex items-center justify-center bg-gray-700">
                        <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex items-baseline">
                      <span className="text-4xl font-extrabold text-white">${tier.price.toFixed(2)}</span>
                      <span className="ml-2 text-gray-400">/package</span>
                    </div>
                    
                    <div className="mt-8 space-y-4">
                      {tier.features.map((feature, fIndex) => (
                        <div key={fIndex} className="flex items-start">
                          <div className="flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center bg-gray-700 text-gray-300 mr-3">
                            <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="px-8 pb-8 pt-4">
                    <div className="text-gray-400 text-sm mb-4 flex items-center">
                      <svg className="h-5 w-5 text-turquoise-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>{tier.delivery}</span>
                    </div>
                    
                    <Link
                      href={`/checkout?plan=${tier.name}&price=${tier.price}&category=${selectedCategory}`}
                      className="w-full flex items-center justify-center py-3 px-4 bg-gray-700 text-white rounded-xl font-medium transition-all duration-300 hover:bg-gray-600"
                    >
                      Get Started
                      <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-300 text-lg">
            Need a custom solution? <Link href="/contact" className="text-turquoise-400 hover:text-turquoise-300 border-b border-transparent hover:border-turquoise-300 transition-colors duration-300">Contact us</Link> for personalized nutrition planning.
          </p>
        </motion.div>
      </div>
    </section>
  );
} 