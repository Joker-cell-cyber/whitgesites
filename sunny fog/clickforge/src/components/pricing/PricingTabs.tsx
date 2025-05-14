"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingTabs() {
  // Simplified pricing tiers
  const pricingPlans = [
    {
      name: "Mini",
      price: 9.99,
      features: [
        "1 section landing page",
        "Mobile responsive",
        "Simple call-to-action",
        "Ad tracking ready",
        "24h delivery"
      ]
    },
    {
      name: "Basic",
      price: 19.50,
      features: [
        "3 sections landing page",
        "Mobile responsive",
        "Conversion tracking setup",
        "Ad pixel integration",
        "Social proof section",
        "48h delivery"
      ]
    },
    {
      name: "Standard",
      price: 29.90,
      features: [
        "5 sections landing page",
        "Mobile responsive",
        "Lead capture optimization",
        "UTM tracking setup",
        "A/B testing ready",
        "Multiple CTAs",
        "72h delivery"
      ],
      popular: true
    },
    {
      name: "Enhanced",
      price: 39.99,
      features: [
        "7 sections landing page",
        "Mobile responsive",
        "Advanced lead forms",
        "Affiliate link integration",
        "Testimonials carousel",
        "Custom thank you page",
        "Ad retargeting setup",
        "4 days delivery"
      ]
    },
    {
      name: "Pro",
      price: 49.90,
      features: [
        "10 sections landing page",
        "Mobile responsive",
        "Multi-step conversion funnel",
        "Sales copywriting",
        "Heat map integration",
        "Conversion optimization",
        "Split testing setup",
        "5 days delivery"
      ]
    },
    {
      name: "Sales",
      price: 59.50,
      features: [
        "12 sections sales page",
        "Mobile responsive",
        "Psychological triggers",
        "Scarcity elements",
        "Social proof integration",
        "Countdown timers",
        "Affiliate dashboard ready",
        "6 days delivery"
      ]
    },
    {
      name: "Premium",
      price: 69.99,
      features: [
        "15 sections landing page",
        "Mobile responsive",
        "Custom animations",
        "Video testimonials",
        "Automated lead nurturing",
        "Exit intent popups",
        "Conversion analytics",
        "7 days delivery"
      ]
    },
    {
      name: "Business",
      price: 79.90,
      features: [
        "Complete business funnel",
        "Lead capture pages",
        "Upsell/downsell pages",
        "Custom illustrations",
        "Integrated payment system",
        "Conversion automation",
        "Full funnel analytics",
        "8 days delivery"
      ]
    },
    {
      name: "E-commerce",
      price: 89.50,
      features: [
        "Product showcase landing",
        "Product detail pages",
        "Checkout optimization",
        "Payment integration",
        "Abandoned cart setup",
        "Trust badges & reviews",
        "Cross-sell functionality",
        "9 days delivery"
      ]
    },
    {
      name: "Event",
      price: 99.99,
      features: [
        "Event landing page",
        "Registration system",
        "Ticket sales integration",
        "Speaker/talent showcase",
        "Schedule builder",
        "Promotional countdown",
        "Post-event access page",
        "10 days delivery"
      ]
    },
    {
      name: "App",
      price: 109.90,
      features: [
        "App promotion landing",
        "Feature showcase",
        "Screenshot gallery",
        "Demo video integration",
        "App store links",
        "Download tracking",
        "Pre-launch list building",
        "12 days delivery"
      ]
    },
    {
      name: "Enterprise",
      price: 119.50,
      features: [
        "Custom affiliate system",
        "Multi-product showcase",
        "Commission tracking",
        "Lead distribution",
        "ROI tracking systems",
        "15 days delivery"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#121212]">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Landing Page Services</h2>
          <p className="text-xl text-gray-400">One-time payment. No hidden fees.</p>
        </motion.div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`bg-[#1a1a1a] border border-gray-800 rounded-xl overflow-hidden ${
                plan.popular ? "ring-2 ring-vid-red-500" : ""
              }`}
            >
              {plan.popular && (
                <div className="bg-vid-red-500 text-white text-center py-1 text-xs font-semibold">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-5">
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold text-white">${plan.price.toFixed(2)}</span>
                </div>
                
                <ul className="space-y-2 mb-5">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-400 flex items-start">
                      <svg className="h-4 w-4 text-vid-red-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  href={`/checkout?package=${encodeURIComponent(plan.name)}&price=${plan.price.toFixed(2)}`}
                  className={`w-full py-2 text-sm font-medium rounded inline-block text-center ${
                    plan.popular 
                      ? "bg-vid-red-500 text-white hover:bg-vid-red-600" 
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                >
                  Select Package
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 