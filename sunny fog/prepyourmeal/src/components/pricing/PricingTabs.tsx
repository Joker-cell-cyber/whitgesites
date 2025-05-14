"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type MealPlanCategory = "starter" | "standard" | "complete";

export default function PricingTabs() {
  const [selectedCategory, setSelectedCategory] = useState<MealPlanCategory>("starter");

  // Simplified meal plan tiers focusing on deliverables
  const pricingCategories = {
    starter: [
      {
        name: "Basic",
        price: 9.99,
        deliverables: [
          "5 unique recipes",
          "Basic nutrition info",
          "Simple grocery list"
        ],
        delivery: "Instant access"
      },
      {
        name: "Standard",
        price: 19.50,
        deliverables: [
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
        deliverables: [
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
        deliverables: [
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
        deliverables: [
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
        deliverables: [
          "20 unique recipes",
          "Basic nutrition info",
          "Simple grocery lists"
        ],
        delivery: "Instant access"
      },
      {
        name: "Essential",
        price: 49.90,
        deliverables: [
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
        deliverables: [
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
        deliverables: [
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
        deliverables: [
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
        deliverables: [
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
        deliverables: [
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
        deliverables: [
          "120 unique recipes",
          "Complete nutrition analysis",
          "Multiple diet specializations",
          "Seasonal menu adaptations"
        ],
        delivery: "Instant access"
      }
    ]
  };
  
  const activePricingPlans = pricingCategories[selectedCategory];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Transparent Pricing, Incredible Value
            </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the meal plan that best fits your lifestyle and nutritional goals.
            </p>
        </div>

        {/* Category Selection */}
        <div className="flex justify-center mb-10 mt-12">
          <div className="inline-flex p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setSelectedCategory('starter')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'starter'
                  ? 'bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Starter Packs
            </button>
            <button
              onClick={() => setSelectedCategory('standard')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'standard'
                  ? 'bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Standard Packs
            </button>
            <button
              onClick={() => setSelectedCategory('complete')}
              className={`px-6 py-3 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === 'complete'
                  ? 'bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Complete Packs
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          key={selectedCategory} // This forces a re-render when category changes
        >
          {activePricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`rounded-xl overflow-hidden shadow-lg bg-white border h-full flex flex-col ${
                plan.popular ? 'border-carrot-500 ring-2 ring-carrot-500/20' : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="bg-gradient-to-r from-nutrition-green-600 to-carrot-500 text-white text-center text-xs py-1 font-medium">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-gray-900">${plan.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-500 ml-1">one-time</span>
                  </div>
                </div>
                
                <ul className="space-y-3 my-6 flex-grow">
                  {plan.deliverables.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-nutrition-green-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-nutrition-green-500 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-600">Delivery: {plan.delivery}</span>
                  </li>
                </ul>
                
                <Link
                  href={`/checkout?plan=${plan.name}&price=${plan.price}&category=${selectedCategory}`}
                  className={`w-full px-4 py-3 text-center text-white font-medium rounded-md ${
                    plan.popular
                      ? 'bg-gradient-to-r from-nutrition-green-600 to-carrot-500 hover:from-nutrition-green-700 hover:to-carrot-600 shadow-md'
                      : 'bg-gray-800 hover:bg-gray-900'
                  } transition-colors duration-200`}
                >
                  Choose {plan.name}
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 