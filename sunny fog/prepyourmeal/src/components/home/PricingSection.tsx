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
    <section className="py-24 bg-gray-50" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Choose the perfect meal plan that fits your nutritional needs and budget
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col items-center mb-12">
          <div className="inline-flex p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setSelectedCategory('starter')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'starter'
                  ? 'bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Starter Packs
            </button>
            <button
              onClick={() => setSelectedCategory('standard')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'standard'
                  ? 'bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Standard Packs
            </button>
            <button
              onClick={() => setSelectedCategory('complete')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'complete'
                  ? 'bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Complete Packs
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingCategories[selectedCategory].map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`card-hover flex flex-col rounded-xl overflow-hidden ${
                tier.popular ? "lg:scale-105 relative z-10" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white text-xs font-bold uppercase py-1 px-3 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <div className="p-6 bg-white flex-grow">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{tier.name}</h3>
                  <div className="flex items-baseline mt-2">
                    <span className="text-3xl font-bold text-gray-900">${tier.price}</span>
                    <span className="ml-1 text-gray-500">one-time</span>
                  </div>
                  <p className="mt-2 text-gray-600">{tier.description}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 bg-nutrition-green-100 rounded-full flex items-center justify-center mr-3">
                      <svg className="h-4 w-4 text-nutrition-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Delivery</div>
                      <div className="font-medium text-gray-800">{tier.delivery}</div>
                    </div>
                  </div>
                
                  <ul className="mt-6 space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="h-5 w-5 text-nutrition-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                        <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                </div>
              </div>
              
              <div className="p-6 bg-gray-50 border-t border-gray-200">
                <Link 
                  href={`/checkout?plan=${encodeURIComponent(tier.name)}&price=${tier.price}&category=${selectedCategory}`}
                  className={`w-full py-3 px-4 rounded-lg font-medium text-center inline-block transition-colors ${
                    tier.popular
                      ? "bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white button-glow"
                      : "bg-gray-200 hover:bg-gray-300 text-gray-800"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Need a custom solution?</h3>
            <p className="text-gray-600 mb-8">
              Contact our nutrition team for custom meal planning services tailored to your specific needs, health goals, and dietary preferences.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white rounded-lg font-medium button-glow"
            >
              Request Custom Quote
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 