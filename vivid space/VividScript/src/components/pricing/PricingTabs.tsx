"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function PricingTabs() {
  // Define pricing tiers for content script writing
  const contentScriptPlans = [
    {
      name: "Package 1",
      price: 9.99,
      length: "Up to 3 min",
      features: [
        "1 video script",
        "1 revision",
        "24-hour delivery"
      ]
    },
    {
      name: "Package 2",
      price: 19.50,
      length: "Up to 5 min",
      features: [
        "1 video script",
        "2 revisions",
        "48-hour delivery"
      ]
    },
    {
      name: "Package 3",
      price: 29.90,
      length: "Up to 7 min",
      features: [
        "1 video script",
        "2 revisions",
        "48-hour delivery"
      ]
    },
    {
      name: "Package 4",
      price: 39.99,
      length: "Up to 10 min",
      popular: true,
      features: [
        "1 video script",
        "3 revisions",
        "72-hour delivery"
      ]
    },
    {
      name: "Package 5",
      price: 49.90,
      length: "Up to 12 min",
      features: [
        "1 video script",
        "3 revisions",
        "72-hour delivery"
      ]
    },
    {
      name: "Package 6",
      price: 59.50,
      length: "Up to 15 min",
      features: [
        "1 video script",
        "3 revisions",
        "96-hour delivery"
      ]
    },
    {
      name: "Package 7",
      price: 69.99,
      length: "Up to 20 min",
      features: [
        "1 video script",
        "Unlimited revisions",
        "96-hour delivery"
      ]
    },
    {
      name: "Package 8",
      price: 79.90,
      length: "Up to 25 min",
      features: [
        "1 video script",
        "Unlimited revisions",
        "96-hour delivery"
      ]
    },
    {
      name: "Package 9",
      price: 89.50,
      length: "Up to 30 min",
      features: [
        "1 video script",
        "Unlimited revisions",
        "120-hour delivery"
      ]
    },
    {
      name: "Package 10",
      price: 99.99,
      length: "Up to 40 min",
      features: [
        "1 video script",
        "Unlimited revisions",
        "120-hour delivery"
      ]
    },
    {
      name: "Package 11",
      price: 109.90,
      length: "Up to 50 min",
      features: [
        "1 video script",
        "Unlimited revisions",
        "120-hour delivery"
      ]
    },
    {
      name: "Package 12",
      price: 119.50,
      length: "Custom duration",
      features: [
        "1 video script",
        "Unlimited revisions",
        "Custom delivery"
      ]
    }
  ];

  return (
    <section className="py-20 bg-vid-white-100" id="pricing-tabs">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-vid-blue-900 heading-font">
              Video Script Pricing
            </h2>
            <p className="text-vid-blue-800 text-lg">
              Quality video scripts for content creators at all levels
            </p>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {contentScriptPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-lg overflow-hidden relative border glass-effect ${
                plan.popular 
                  ? 'border-accent shadow-lg' 
                  : 'border-vid-white-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-accent text-white text-center text-xs py-1 font-medium">
                  POPULAR
                </div>
              )}
              
              <div className={`p-6 ${plan.popular ? 'pt-8' : ''}`}>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-vid-blue-900 heading-font">{plan.name}</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent">${plan.price.toFixed(2)}</div>
                  </div>
                </div>
                
                <div className="bg-vid-blue-100 text-vid-blue-800 px-3 py-1 rounded-full text-sm inline-block mb-4">
                  {plan.length}
                </div>
                
                <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-vid-blue-700 flex items-start">
                      <svg className="h-5 w-5 text-vid-blue-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                
                <a 
                  href={`/checkout?package=${index + 1}&name=${encodeURIComponent(plan.name)}&price=${plan.price}&length=${encodeURIComponent(plan.length)}`}
                  className={`block text-center py-3 rounded-lg font-medium transition-colors heading-font ${
                    plan.popular 
                      ? 'bg-accent hover:bg-accent-hover text-white button-glow' 
                      : 'bg-vid-blue-700 hover:bg-vid-blue-600 text-white border border-vid-blue-600'
                  }`}
                >
                  Order Now
                </a>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <p className="text-vid-blue-700 mb-6">
            Need a custom video script? Contact us for a personalized quote.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center text-vid-blue-400 hover:text-vid-blue-500 font-medium transition-colors"
          >
            <span>Contact Us</span>
            <svg className="ml-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 