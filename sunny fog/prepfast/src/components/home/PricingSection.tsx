"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingSection() {
  const [selectedCategory, setSelectedCategory] = useState<'resume' | 'interview' | 'application'>('resume');

  // Define pricing tiers
  const pricingCategories = {
    resume: [
      {
        name: "Basic",
        price: 9.99,
        duration: "2-3 days",
        complexity: "Basic",
        description: "Resume review with basic feedback",
        features: [
          "Formatting review",
          "Spelling & grammar check",
          "Basic content suggestions",
          "Email delivery"
        ],
        delivery: "48 hours"
      },
      {
        name: "Standard",
        price: 19.50,
        duration: "3-4 days",
        complexity: "Standard",
        description: "Resume rewrite with ATS optimization",
        features: [
          "ATS-friendly formatting",
          "Keyword optimization",
          "Achievement highlighting",
          "1 revision round"
        ],
        delivery: "72 hours",
        popular: true
      },
      {
        name: "Premium",
        price: 29.90,
        duration: "4-5 days",
        complexity: "Advanced",
        description: "Comprehensive resume & LinkedIn profile",
        features: [
          "Complete resume rewrite",
          "LinkedIn profile optimization",
          "Industry-specific keywords",
          "2 revision rounds"
        ],
        delivery: "96 hours"
      },
      {
        name: "Enhanced",
        price: 39.99,
        duration: "5-6 days",
        complexity: "Advanced+",
        description: "Resume, LinkedIn & cover letter package",
        features: [
          "Tailored resume & cover letter",
          "LinkedIn profile optimization",
          "Targeted keyword strategy",
          "3 revision rounds"
        ],
        delivery: "5 days"
      },
      {
        name: "Ultra",
        price: 49.90,
        duration: "6-7 days",
        complexity: "Complex",
        description: "Executive resume package with personal branding",
        features: [
          "Executive-level content",
          "Personal branding strategy",
          "Digital presence optimization",
          "Unlimited revisions"
        ],
        delivery: "7 days"
      }
    ],
    interview: [
      {
        name: "Basic",
        price: 59.50,
        duration: "30 min",
        complexity: "Basic",
        description: "30-min mock interview with feedback",
        features: [
          "30-min practice interview",
          "Basic feedback report",
          "Common question preparation",
          "Email follow-up tips"
        ],
        delivery: "Scheduled session"
      },
      {
        name: "Standard",
        price: 69.99,
        duration: "1 hour",
        complexity: "Standard",
        description: "1-hour interview coaching session",
        features: [
          "60-min deep dive interview",
          "Detailed feedback report",
          "Body language coaching",
          "Response strategy tips"
        ],
        delivery: "Scheduled session",
        popular: true
      },
      {
        name: "Enhanced",
        price: 79.90,
        duration: "1.5 hours",
        complexity: "Advanced",
        description: "Interview preparation with industry expert",
        features: [
          "Industry-specific interview",
          "Technical question preparation",
          "Expert insights and tips",
          "30-day email support"
        ],
        delivery: "Scheduled session"
      },
      {
        name: "Premium",
        price: 99.99,
        duration: "3 sessions",
        complexity: "Advanced+",
        description: "3 mock interviews with detailed feedback",
        features: [
          "Three 45-min practice interviews",
          "Progressive difficulty levels",
          "Video recording & analysis",
          "Interview strategy guide"
        ],
        delivery: "3 scheduled sessions"
      },
      {
        name: "Expert",
        price: 109.90,
        duration: "Full package",
        complexity: "Professional",
        description: "Comprehensive interview strategy",
        features: [
          "Resume-to-interview alignment",
          "Salary negotiation coaching",
          "Industry expert consultation",
          "60-day email support"
        ],
        delivery: "Multiple sessions"
      },
      {
        name: "Ultra",
        price: 119.50,
        duration: "Complete program",
        complexity: "Complex",
        description: "Complete interview mastery program",
        features: [
          "Full interview preparation",
          "Executive presence coaching",
          "Stress interview simulation",
          "90-day coaching support"
        ],
        delivery: "Comprehensive program"
      }
    ],
    application: [
      {
        name: "Basic",
        price: 29.90,
        duration: "2-3 days",
        complexity: "Basic",
        description: "Application review",
        features: [
          "Document review",
          "Basic formatting advice",
          "Clarity improvements",
          "1 revision round"
        ],
        delivery: "48 hours"
      },
      {
        name: "Standard",
        price: 49.90,
        duration: "3-5 days",
        complexity: "Standard",
        description: "Application strategy & guidance",
        features: [
          "Strategic application plan",
          "Document optimization",
          "Submission timeline",
          "2 revision rounds"
        ],
        delivery: "4 days",
        popular: true
      },
      {
        name: "Enhanced",
        price: 59.50,
        duration: "5-7 days",
        complexity: "Advanced",
        description: "Personal statement/cover letter writing",
        features: [
          "Custom personal statement",
          "Achievement highlighting",
          "Goal alignment strategy",
          "3 revision rounds"
        ],
        delivery: "5 days"
      },
      {
        name: "Professional",
        price: 89.50,
        duration: "7-10 days",
        complexity: "Advanced+",
        description: "Full application consultation",
        features: [
          "Complete application review",
          "Personal statement writing",
          "Reference management",
          "Interview preparation tips"
        ],
        delivery: "7 days"
      },
      {
        name: "Premium",
        price: 119.50,
        duration: "10-14 days",
        complexity: "Professional",
        description: "End-to-end application support",
        features: [
          "Complete document preparation",
          "Application submission assistance",
          "Follow-up strategy",
          "Preliminary interview coaching"
        ],
        delivery: "10 days"
      }
    ]
  };

  const activePricing = pricingCategories[selectedCategory];

  return (
    <section className="py-20 bg-[#0a0a0a]" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Pricing</span> Plans
            </h2>
            <p className="text-gray-400 text-lg">
              Explore our range of career preparation packages designed to help you achieve your professional goals.
            </p>
          </motion.div>
        </div>

        {/* Pricing Category Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-gray-800 rounded-lg">
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedCategory === 'resume'
                  ? 'bg-gradient-to-r from-[#0078D7] to-[#00B2A9] text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setSelectedCategory('resume')}
            >
              Resume/CV Packages
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedCategory === 'interview'
                  ? 'bg-gradient-to-r from-[#0078D7] to-[#00B2A9] text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setSelectedCategory('interview')}
            >
              Interview Packages
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                selectedCategory === 'application'
                  ? 'bg-gradient-to-r from-[#0078D7] to-[#00B2A9] text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
              onClick={() => setSelectedCategory('application')}
            >
              Application Packages
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {activePricing.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden ${
                tier.popular
                  ? 'border-2 border-[#00B2A9]'
                  : 'border border-gray-800'
              }`}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-[#0078D7] to-[#00B2A9] text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              
              <div className="p-6 bg-[#111111]">
                <h3 className="text-xl font-semibold text-white mb-1">{tier.name}</h3>
                <div className="text-sm text-gray-400 mb-4">{tier.complexity} • {tier.duration}</div>
                
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">${tier.price.toFixed(2)}</span>
                </div>
                
                <p className="text-gray-300 mb-6">{tier.description}</p>
                
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start">
                      <svg className="h-5 w-5 text-[#00B2A9] mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="text-sm text-gray-400 mb-6">
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-[#0078D7] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Delivery: {tier.delivery}
                  </div>
                </div>
                
                <Link 
                  href={`/checkout?name=${encodeURIComponent(tier.name)}&price=${tier.price}&category=${encodeURIComponent(selectedCategory)}`}
                  className="w-full py-3 px-4 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 inline-block text-center"
                >
                  Get Started
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-10 text-center text-gray-500 text-sm">
          <p>All services are delivered online via email, chat or video consultation.</p>
        </div>
      </div>
    </section>
  );
} 