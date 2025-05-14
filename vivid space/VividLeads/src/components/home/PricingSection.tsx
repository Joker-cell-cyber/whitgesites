"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingSection() {
  const [selectedCategory, setSelectedCategory] = useState<'b2b' | 'b2c' | 'industry'>('b2b');

  // Define pricing tiers for lead generation
  const pricingCategories = {
    b2b: [
      {
        name: "Starter B2B",
        price: 9.99,
        quantity: "25 Leads",
        quality: "Basic",
        description: "Entry-level B2B leads for small businesses",
        features: [
          "Email addresses",
          "Company names",
          "Basic industry classification",
          "CSV delivery format"
        ],
        delivery: "Instant Access"
      },
      {
        name: "Pro B2B",
        price: 19.50,
        quantity: "30 Leads",
        quality: "Standard",
        description: "Quality B2B leads with enhanced verification",
        features: [
          "Email & phone verification",
          "Company size information",
          "Job titles included",
          "Basic lead scoring"
        ],
        delivery: "Instant Access",
        popular: true
      },
      {
        name: "Business B2B",
        price: 29.90,
        quantity: "40 Leads",
        quality: "Premium",
        description: "Comprehensive B2B leads for growing businesses",
        features: [
          "Decision-maker contacts",
          "Company revenue data",
          "Intent signals included",
          "Email & phone verification"
        ],
        delivery: "Instant Access"
      },
      {
        name: "Enterprise B2B",
        price: 39.99,
        quantity: "50 Leads",
        quality: "Premium+",
        description: "High-value B2B leads for targeted campaigns",
        features: [
          "Complete contact profiles",
          "Buying intent signals",
          "Technology stack data",
          "Company growth indicators"
        ],
        delivery: "Instant Access"
      }
    ],
    b2c: [
      {
        name: "Basic Consumer",
        price: 49.90,
        quantity: "75 Leads",
        quality: "Basic",
        description: "Entry-level consumer leads for direct marketing",
        features: [
          "Email addresses",
          "Basic demographics",
          "Geographic targeting",
          "CSV delivery format"
        ],
        delivery: "Instant Access"
      },
      {
        name: "Standard Consumer",
        price: 59.50,
        quantity: "100 Leads",
        quality: "Standard",
        description: "Qualified consumer leads with verification",
        features: [
          "Email & phone verification",
          "Detailed demographics",
          "Interest categories",
          "Purchase intent indicators"
        ],
        delivery: "Instant Access",
        popular: true
      },
      {
        name: "Premium Consumer",
        price: 69.99,
        quantity: "125 Leads",
        quality: "Premium",
        description: "High-quality consumer leads with detailed profiles",
        features: [
          "Complete contact profiles",
          "Psychographic data",
          "Purchase history indicators",
          "Multi-channel contact options"
        ],
        delivery: "Instant Access"
      },
      {
        name: "Elite Consumer",
        price: 79.90,
        quantity: "150 Leads",
        quality: "Premium+",
        description: "Elite consumer leads with conversion potential",
        features: [
          "High-intent purchase signals",
          "Lifestyle & behavioral data",
          "Income brackets",
          "Previous purchase patterns"
        ],
        delivery: "Instant Access"
      }
    ],
    industry: [
      {
        name: "Healthcare Focus",
        price: 89.50,
        quantity: "40 Leads",
        quality: "Industry-Specific",
        description: "Specialized leads for healthcare products and services",
        features: [
          "Healthcare facility contacts",
          "Provider specialties",
          "Regulatory compliance verified",
          "Department targeting"
        ],
        delivery: "Instant Access"
      },
      {
        name: "Financial Services",
        price: 99.99,
        quantity: "35 Leads",
        quality: "Industry-Specific",
        description: "Tailored leads for financial services providers",
        features: [
          "Financial decision-makers",
          "AUM data where available",
          "Service categories needed",
          "Compliance-verified contacts"
        ],
        delivery: "Instant Access",
        popular: true
      },
      {
        name: "Technology Sector",
        price: 109.90,
        quantity: "45 Leads",
        quality: "Industry-Specific",
        description: "Specialized leads for technology products and services",
        features: [
          "IT decision-makers",
          "Current tech stack data",
          "Budget cycle information",
          "Project timeline indicators"
        ],
        delivery: "Instant Access"
      },
      {
        name: "Manufacturing Focus",
        price: 119.50,
        quantity: "40 Leads",
        quality: "Industry-Specific+",
        description: "Premium leads for manufacturing and industrial services",
        features: [
          "Production decision-makers",
          "Facility size and capacity",
          "Current supplier information",
          "Expansion/upgrade plans"
        ],
        delivery: "Instant Access"
      }
    ]
  };
  
  const activePricingPlans = pricingCategories[selectedCategory];

  return (
    <section className="py-20 relative overflow-hidden" id="pricing">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute -top-20 right-0 w-96 h-96 bg-lead-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#111827] to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Choose the perfect lead package for your business needs with our simple one-time purchase options. No subscriptions, no hidden fees.
          </p>
        </div>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setSelectedCategory('b2b')}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all ${selectedCategory === 'b2b' 
              ? 'bg-gradient-to-r from-lead-blue-600 to-lead-green-500 text-white shadow-lg' 
              : 'bg-gray-800 text-gray-400 hover:text-gray-300'}`}
          >
            B2B Leads
          </button>
          <button
            onClick={() => setSelectedCategory('b2c')}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all ${selectedCategory === 'b2c' 
              ? 'bg-gradient-to-r from-lead-blue-600 to-lead-green-500 text-white shadow-lg' 
              : 'bg-gray-800 text-gray-400 hover:text-gray-300'}`}
          >
            B2C Leads
          </button>
          <button
            onClick={() => setSelectedCategory('industry')}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all ${selectedCategory === 'industry' 
              ? 'bg-gradient-to-r from-lead-blue-600 to-lead-green-500 text-white shadow-lg' 
              : 'bg-gray-800 text-gray-400 hover:text-gray-300'}`}
          >
            Industry-Specific
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activePricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={`relative rounded-xl overflow-hidden border ${plan.popular 
                ? 'bg-gradient-to-b from-[#1F2937] to-[#111827] border-lead-blue-500/50 shadow-glow-blue' 
                : 'bg-[#1F2937] border-gray-800'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-lead-blue-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                </div>
              )}
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{plan.name}</h3>
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-sm text-gray-400">$</span>
                    <span className="text-4xl font-bold text-white">{plan.price.toFixed(2)}</span>
                    <span className="ml-1 text-gray-400 text-sm">USD</span>
                  </div>
                  <p className="text-gray-400 mt-1 text-sm">{plan.quantity} · {plan.quality}</p>
                </div>
                
                <p className="text-gray-300 mb-6 text-sm">{plan.description}</p>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg className="w-5 h-5 text-lead-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-auto">
                  <Link
                    href={`/checkout?package=${plan.name}&price=${plan.price}`}
                    className="block w-full py-3 px-4 rounded-lg text-center font-medium transition-all bg-lead-blue-600 hover:bg-lead-blue-700 text-white"
                  >
                    Purchase Now
                  </Link>
                  <div className="text-center mt-3 text-xs text-gray-500">
                    <p>{plan.delivery} · Secure Payment</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-6">Need a custom lead solution? Contact our team for personalized packages.</p>
          <Link 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 border border-gray-700 rounded-lg text-white font-medium hover:bg-gray-800 transition-colors"
          >
            Contact for Custom Package
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 