"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type PricingCategory = "personal" | "team" | "business";

// Define the type for pricing plans
interface PricingPlan {
  name: string;
  price: number;
  description: string;
  features: string[];
  delivery: string;
  popular?: boolean;
}

export default function PricingTabs() {
  const [selectedCategory, setSelectedCategory] = useState<PricingCategory>("personal");

  // Define pricing plans matching the home page
  const pricingPlans = {
    personal: [
      {
        name: "Starter",
        price: 9.99,
        description: "Perfect for beginners who need a simple personal Notion workspace",
        features: [
          "Personal dashboard",
          "Basic note organization",
          "Simple task management",
          "1 template included"
        ],
        delivery: "48 hours"
      },
      {
        name: "Basic",
        price: 19.50,
        description: "Essential Notion setup for personal productivity and organization",
        features: [
          "Custom home dashboard",
          "Note-taking system",
          "Task & project tracking",
          "3 templates included"
        ],
        delivery: "48 hours",
        popular: true
      },
      {
        name: "Standard",
        price: 29.90,
        description: "Comprehensive personal system with integrated workflows",
        features: [
          "Advanced dashboard setup",
          "Connected databases",
          "Custom note templates",
          "5 templates included"
        ],
        delivery: "72 hours"
      },
      {
        name: "Plus",
        price: 39.99,
        description: "Enhanced personal workspace with advanced organization",
        features: [
          "Multi-database integrations",
          "Custom relation structures",
          "Progress tracking",
          "7 templates included"
        ],
        delivery: "72 hours"
      },
      {
        name: "Premium",
        price: 49.90,
        description: "Feature-rich personal system for maximum productivity",
        features: [
          "Advanced filtering systems",
          "Custom formula creation",
          "Habit & goal tracking",
          "10 templates included"
        ],
        delivery: "96 hours"
      }
    ],
    team: [
      {
        name: "Team Starter",
        price: 59.50,
        description: "Basic workspace setup for small teams up to 5 people",
        features: [
          "Team home dashboard",
          "Shared database setup",
          "Basic team wiki",
          "3 team templates"
        ],
        delivery: "4 days"
      },
      {
        name: "Team Standard",
        price: 69.99,
        description: "Collaborative workspace for teams up to 10 people",
        features: [
          "Team directory",
          "Project management system",
          "Meeting note templates",
          "5 team templates"
        ],
        delivery: "5 days",
        popular: true
      },
      {
        name: "Team Plus",
        price: 79.90,
        description: "Enhanced team workspace with advanced collaboration features",
        features: [
          "Comprehensive wiki system",
          "Task assignment workflows",
          "Document management",
          "7 team templates"
        ],
        delivery: "6 days"
      }
    ],
    business: [
      {
        name: "Business Starter",
        price: 89.50,
        description: "Basic business operations workspace for small businesses",
        features: [
          "Client management system",
          "Project tracking",
          "Basic invoice tracking",
          "Standard operating procedures"
        ],
        delivery: "7 days"
      },
      {
        name: "Business Standard",
        price: 99.99,
        description: "Comprehensive business management system",
        features: [
          "CRM with client portal",
          "Project & resource management",
          "Invoice & payment tracking",
          "Business metrics dashboard"
        ],
        delivery: "8 days"
      },
      {
        name: "Business Plus",
        price: 109.90,
        description: "Advanced business workspace with integrated workflows",
        features: [
          "Full business operations system",
          "Automated workflows",
          "Financial tracking tools",
          "Employee onboarding system"
        ],
        delivery: "9 days"
      },
      {
        name: "Enterprise",
        price: 119.50,
        description: "Complete enterprise solution for complex organizations",
        features: [
          "Multi-department integration",
          "Enterprise knowledge management",
          "Advanced automation workflows",
          "Custom data visualization"
        ],
        delivery: "10 days",
        popular: true
      }
    ]
  };
  
  // Helper function to create checkout URL with product details
  const createCheckoutUrl = (plan: PricingPlan) => {
    const params = new URLSearchParams({
      name: plan.name,
      price: plan.price.toFixed(2),
      description: plan.description,
      category: selectedCategory
    });
    
    return `/checkout?${params.toString()}`;
  };
  
  const activePricingPlans = pricingPlans[selectedCategory];

  return (
    <section className="py-20 bg-white" id="pricing-tabs">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Choose Your <span className="hand-drawn-accent">Perfect</span> Notion Setup
            </h2>
          <p className="text-xl text-gray-600">
            Select the package that best fits your needs and scale. All packages include personalized setup and support.
            </p>
        </div>

        {/* Category Tabs */}
        <div className="max-w-md mx-auto mb-12 grid grid-cols-3 gap-4 bg-notion-black-100 p-2 rounded-lg">
            <button
            onClick={() => setSelectedCategory("personal")}
            className={`py-3 px-4 rounded-md font-medium transition-all text-sm md:text-base ${
              selectedCategory === "personal"
                ? "bg-notion-accent-500 text-white"
                : "bg-transparent text-gray-600 hover:text-black"
              }`}
            >
            Personal
            </button>
            <button
            onClick={() => setSelectedCategory("team")}
            className={`py-3 px-4 rounded-md font-medium transition-all text-sm md:text-base ${
              selectedCategory === "team"
                ? "bg-notion-accent-500 text-white"
                : "bg-transparent text-gray-600 hover:text-black"
              }`}
            >
            Team
            </button>
            <button
            onClick={() => setSelectedCategory("business")}
            className={`py-3 px-4 rounded-md font-medium transition-all text-sm md:text-base ${
              selectedCategory === "business"
                ? "bg-notion-accent-500 text-white"
                : "bg-transparent text-gray-600 hover:text-black"
              }`}
            >
            Business
            </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activePricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`relative bg-white card-hand-drawn ${
                plan.popular
                  ? "border-notion-accent-500"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-notion-accent-500 text-white text-center text-xs py-1 font-medium">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-black">{plan.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-black">${plan.price.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">one-time</div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-5">
                  {plan.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start text-sm">
                      <svg className="h-5 w-5 text-notion-accent-600 mr-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                
                <div className="text-sm flex items-center justify-between mb-6 pb-6 border-t border-gray-200 pt-4">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-notion-accent-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">Delivery in {plan.delivery}</span>
                  </div>
                </div>
                
                <a 
                  href={createCheckoutUrl(plan)}
                  className="block text-center py-2.5 rounded-lg font-medium transition-colors button-hand-drawn"
                >
                  Choose Plan
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 