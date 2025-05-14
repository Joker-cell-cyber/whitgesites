"use client";

import { motion } from "framer-motion";

export default function PricingSection() {
  // Define pricing tiers for e-book writing
  const pricingTiers = [
      {
      name: "Basic E-Book",
        price: 9.99,
      wordCount: "5,000 words",
      description: "A concise e-book perfect for short guides or introductory topics",
        features: [
        "Professional writing",
        "1 revision round",
        "Delivered as plain text"
        ],
      notIncluded: [
        "Formatting",
        "Proofreading"
        ],
        delivery: "7 days"
      },
      {
      name: "Standard E-Book",
      price: 19.50,
      wordCount: "10,000 words",
      description: "A comprehensive e-book with more detailed content coverage",
        features: [
        "Professional writing",
        "1 revision round",
        "Delivered as text or Markdown"
      ],
      notIncluded: [
        "Formatting",
        "Research"
        ],
      delivery: "10 days",
      popular: true
    },
      {
      name: "Premium E-Book",
        price: 29.90,
      wordCount: "15,000 words",
      description: "A thorough e-book with well-organized content",
        features: [
        "Professional writing",
        "Basic proofreading",
        "2 revision rounds",
        "Delivered as text, Markdown, or HTML"
      ],
      notIncluded: [
        "Research",
        "Design elements"
        ],
      delivery: "14 days"
      },
      {
      name: "Enhanced E-Book",
        price: 59.50,
      wordCount: "15,000 words",
      description: "Complete e-book package with basic formatting",
        features: [
        "Professional writing",
        "Standard proofreading",
        "2 revision rounds",
        "Simple chapter structure",
        "Delivered in HTML and Markdown"
      ],
      notIncluded: [
        "Research",
        "Cover design"
        ],
      delivery: "18 days"
      },
      {
      name: "Professional E-Book",
        price: 89.50,
      wordCount: "20,000 words",
      description: "Extended e-book with quality formatting",
        features: [
        "Professional writing",
        "Expert proofreading",
        "3 revision rounds",
        "Basic formatting",
        "Delivered as HTML and Markdown"
      ],
      notIncluded: [
        "Research",
        "Design elements"
        ],
      delivery: "21 days"
      },
      {
      name: "Enterprise E-Book",
        price: 119.50,
      wordCount: "Custom length",
      description: "Custom-length e-book for businesses and authors",
        features: [
        "Professional writing",
        "Expert proofreading",
        "3 revision rounds",
        "Standard formatting",
        "Delivered in HTML and Markdown"
      ],
      notIncluded: [
        "Research",
        "Advanced design"
        ],
      delivery: "Custom timeline"
      }
  ];

  return (
    <section className="py-20 bg-book-blue-50" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-book-blue-900">
              Our <span className="gradient-text">Pricing</span> Packages
            </h2>
            <p className="text-book-blue-700 text-lg">
              Choose the perfect package for your e-book project. All packages include professional writing by our team.
            </p>
          </motion.div>
        </div>

        {/* Pricing grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`card-hover rounded-xl overflow-hidden relative ${
                tier.popular ? "ring-2 ring-book-yellow-500 ring-offset-2 ring-offset-book-blue-50" : ""
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0">
                  <div className="bg-book-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    POPULAR
                  </div>
                </div>
              )}
              
              <div className="p-6">
                {/* Header */}
                <div className="mb-5">
                  <h3 className="text-xl font-bold text-book-blue-900">{tier.name}</h3>
                  <div className="mt-2 flex items-baseline">
                    <span className="text-3xl font-bold text-book-blue-800">${tier.price}</span>
                    <span className="ml-1 text-book-blue-600">/project</span>
                  </div>
                  <div className="mt-1 text-book-blue-700">
                    {tier.wordCount}
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-book-blue-700 mb-5">
                  {tier.description}
                </p>
                
                {/* Features */}
                <div className="mb-3">
                  <div className="text-sm font-medium text-book-blue-900 mb-2">What&apos;s included:</div>
                  <ul className="space-y-2">
                    {tier.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-start">
                        <svg className="h-5 w-5 text-book-green-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-book-blue-800 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Not included */}
                {tier.notIncluded && (
                  <div className="mb-5">
                    <div className="text-sm font-medium text-book-blue-900 mb-2">Not included:</div>
                    <ul className="space-y-2">
                      {tier.notIncluded.map((item, nidx) => (
                        <li key={nidx} className="flex items-start">
                          <svg className="h-5 w-5 text-book-blue-400 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-book-blue-600 text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Delivery */}
                <div className="text-sm text-book-blue-700 mb-6">
                  <span className="font-medium text-book-blue-900">Delivery:</span> {tier.delivery}
                </div>
                
                {/* CTA */}
                <a 
                  href="/contact"
                  className={`block w-full py-3 px-4 text-center rounded-lg font-medium transition-colors ${
                    tier.popular
                      ? "bg-gradient-to-r from-book-blue-600 to-book-green-500 text-white"
                      : "bg-book-blue-100 text-book-blue-800 hover:bg-book-blue-200"
                  }`}
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 max-w-3xl mx-auto"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm border border-book-blue-100">
            <h3 className="text-xl font-bold text-book-blue-900 mb-3">Need a Custom Package?</h3>
            <p className="text-book-blue-700 mb-4">
              For custom word counts, special topics, or additional services not listed above, please contact us for a personalized quote.
            </p>
            <a 
              href="/contact"
              className="inline-flex items-center text-book-blue-600 hover:text-book-blue-800 font-medium"
            >
              <span>Contact for Custom Requests</span>
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 