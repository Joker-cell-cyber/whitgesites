"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type ScriptCategory = "cold" | "closing" | "follow";

// Category icons
const ColdCallIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 5C3 3.89543 3.89543 3 5 3H8.28L9.228 7.493C9.36 8.034 9.06943 8.59056 8.542 8.85L6.285 9.981C7.27581 12.141 8.85862 13.7236 11.019 14.715L12.15 12.458C12.4094 11.9306 12.966 11.64 13.507 11.772L18 12.72V16C18 17.1046 17.1046 18 16 18H15C8.37258 18 3 12.6274 3 6V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClosingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11M8 11C6.89543 11 6 11.8954 6 13V19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V13C18 11.8954 17.1046 11 16 11M8 11H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FollowUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7C3 5.89543 3.89543 5 5 5H19C20.1046 5 21 5.89543 21 7V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 7L12 13L21 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function PricingTabs() {
  const [selectedCategory, setSelectedCategory] = useState<ScriptCategory>("cold");

  // Define pricing tiers with more logical progression
  const pricingCategories = {
    cold: [
      {
        name: "Basic",
        price: 9.99,
        description: "Essential cold calling script for beginners",
        features: [
          "Script template (up to 300 words)",
          "Basic introduction",
          "Simple value proposition",
          "1 revision round"
        ],
        delivery: "24 hours"
      },
      {
        name: "Standard",
        price: 19.50,
        description: "Complete cold calling script with objection handling",
        features: [
          "Customized script (up to 500 words)",
          "Attention-grabbing opener",
          "Basic objection handling",
          "2 revision rounds"
        ],
        delivery: "48 hours",
        popular: true
      },
      {
        name: "Premium",
        price: 29.90,
        description: "Advanced cold calling script for improved conversions",
        features: [
          "Professionally crafted script (up to 700 words)",
          "Psychology-based opening",
          "Advanced objection handling",
          "Qualifying questions sequence",
          "3 revision rounds"
        ],
        delivery: "72 hours"
      },
      {
        name: "Enterprise",
        price: 39.99,
        description: "Comprehensive cold calling framework with multiple scenarios",
        features: [
          "Complete script system with multiple paths",
          "Relationship-building techniques",
          "Decision-maker reaching strategies",
          "Advanced qualification methodology",
          "Unlimited revisions"
        ],
        delivery: "96 hours"
      }
    ],
    closing: [
      {
        name: "Basic",
        price: 49.90,
        description: "Fundamental closing script for standard situations",
        features: [
          "Basic closing template",
          "Value proposition framework",
          "Simple objection handling",
          "1 revision round"
        ],
        delivery: "24 hours"
      },
      {
        name: "Standard",
        price: 59.50,
        description: "Enhanced closing script with persuasive techniques",
        features: [
          "Customized closing sequence",
          "FOMO techniques",
          "Value-based justification",
          "2 revision rounds"
        ],
        delivery: "48 hours",
        popular: true
      },
      {
        name: "Premium",
        price: 69.99,
        description: "Advanced script with multiple closing techniques",
        features: [
          "Multiple closing strategies",
          "Advanced objection handling",
          "Negotiation frameworks",
          "Success stories integration",
          "3 revision rounds"
        ],
        delivery: "72 hours"
      },
      {
        name: "Enterprise",
        price: 79.90,
        description: "Comprehensive closing system for complex sales",
        features: [
          "Complete closing system",
          "Urgency creation tactics",
          "Psychological triggers",
          "Advanced negotiation techniques",
          "Unlimited revisions"
        ],
        delivery: "96 hours"
      }
    ],
    follow: [
      {
        name: "Basic",
        price: 89.50,
        description: "Simple follow-up sequence for prospect nurturing",
        features: [
          "3-touch sequence",
          "Email templates",
          "Call scripts",
          "1 revision round"
        ],
        delivery: "24 hours"
      },
      {
        name: "Standard",
        price: 99.99,
        description: "Professional multi-channel follow-up system",
        features: [
          "5-touch sequence",
          "Multi-channel approach",
          "Value-adding check-ins",
          "2 revision rounds"
        ],
        delivery: "48 hours",
        popular: true
      },
      {
        name: "Premium",
        price: 109.90,
        description: "Advanced nurturing sequence for long sales cycles",
        features: [
          "7-touch sequence",
          "Re-engagement strategies",
          "Objection anticipation",
          "Advanced timing methodology",
          "3 revision rounds"
        ],
        delivery: "72 hours"
      },
      {
        name: "Enterprise",
        price: 119.50,
        description: "Comprehensive long-term nurturing system",
        features: [
          "12-touch sequence over 90 days",
          "Personalization framework",
          "Decision-maker engagement strategies",
          "Multi-channel integration (call, email, SMS, social)",
          "Unlimited revisions"
        ],
        delivery: "96 hours"
      }
    ]
  };
  
  const activePricingPlans = pricingCategories[selectedCategory];

  return (
    <section className="py-20 relative overflow-hidden" id="pricing-tabs">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-cs-blue-50/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-cs-blue-500/5 to-cs-navy-500/5 rounded-full transform translate-x-1/4 translate-y-1/4 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-cs-blue-50 text-cs-navy-700 border border-cs-blue-200 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-cs-blue-500 mr-2"></span>
              Choose Your Package
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cs-navy-900">
              Find the Perfect <span className="gradient-text">Script Package</span> for Your Needs
            </h2>
            <p className="text-cs-navy-700 text-lg mb-8">
              Select the category that matches your sales needs and choose a package that fits your requirements.
            </p>
            
            {/* Category selector */}
            <div className="inline-flex bg-white p-1 rounded-xl shadow-md border border-cs-blue-100 mb-8">
              <button
                onClick={() => setSelectedCategory('cold')}
                className={`px-5 py-3 rounded-lg text-sm font-medium transition-all flex items-center ${
                  selectedCategory === 'cold' 
                    ? 'bg-cs-blue-50 text-cs-blue-700' 
                    : 'text-cs-navy-600 hover:text-cs-navy-800 hover:bg-cs-blue-50/30'
                }`}
              >
                <span className={`mr-2 ${selectedCategory === 'cold' ? 'text-cs-blue-600' : 'text-cs-navy-400'}`}>
                  <ColdCallIcon />
                </span>
                Cold Call Scripts
              </button>
              <button
                onClick={() => setSelectedCategory('closing')}
                className={`px-5 py-3 rounded-lg text-sm font-medium transition-all flex items-center ${
                  selectedCategory === 'closing' 
                    ? 'bg-cs-blue-50 text-cs-blue-700' 
                    : 'text-cs-navy-600 hover:text-cs-navy-800 hover:bg-cs-blue-50/30'
                }`}
              >
                <span className={`mr-2 ${selectedCategory === 'closing' ? 'text-cs-blue-600' : 'text-cs-navy-400'}`}>
                  <ClosingIcon />
                </span>
                Closing Scripts
              </button>
              <button
                onClick={() => setSelectedCategory('follow')}
                className={`px-5 py-3 rounded-lg text-sm font-medium transition-all flex items-center ${
                  selectedCategory === 'follow' 
                    ? 'bg-cs-blue-50 text-cs-blue-700' 
                    : 'text-cs-navy-600 hover:text-cs-navy-800 hover:bg-cs-blue-50/30'
                }`}
              >
                <span className={`mr-2 ${selectedCategory === 'follow' ? 'text-cs-blue-600' : 'text-cs-navy-400'}`}>
                  <FollowUpIcon />
                </span>
                Follow-Up Sequences
              </button>
            </div>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
              className={`rounded-xl overflow-hidden shadow-md bg-white border ${
                plan.popular ? 'border-cs-blue-500 shadow-lg' : 'border-cs-blue-100'
              }`}
            >
              {plan.popular && (
                <div className="bg-cs-blue-500 text-white text-center text-xs py-1 font-medium">
                  MOST POPULAR
                </div>
              )}
              
              <div className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-cs-navy-900">{plan.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="text-3xl font-bold text-cs-navy-900">${plan.price.toFixed(2)}</div>
                    <div className="text-sm text-cs-navy-600">one-time</div>
                  </div>
                </div>
                
                <p className="text-cs-navy-700 text-sm mb-6">
                  {plan.description}
                </p>
                
                <div className="border-t border-cs-blue-100 mb-6 pt-6">
                  <div className="text-sm font-semibold text-cs-navy-800 mb-3">What's included:</div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="text-cs-navy-700 text-sm flex items-start">
                        <svg className="h-5 w-5 text-cs-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center text-sm text-cs-navy-700 mb-6">
                  <svg className="h-5 w-5 text-cs-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Delivery: {plan.delivery}</span>
                </div>
                
                <a 
                  href={`/checkout?name=${encodeURIComponent(plan.name)}&price=${plan.price}&category=${selectedCategory}&description=${encodeURIComponent(plan.description)}&features=${encodeURIComponent(JSON.stringify(plan.features))}`}
                  className={`block text-center py-3 rounded-lg font-medium transition-colors ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-cs-blue-600 to-cs-navy-600 text-white shadow-md hover:shadow-lg' 
                      : 'bg-cs-blue-50 text-cs-blue-700 hover:bg-cs-blue-100'
                  }`}
                >
                  Select Package
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-20 text-center max-w-3xl mx-auto">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-cs-blue-50 to-white border border-cs-blue-100 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 transform translate-x-8 -translate-y-20">
              <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
                <circle cx="80" cy="80" r="80" fill="#3A6FFF" />
              </svg>
            </div>
            
            <div className="absolute bottom-0 left-0 w-32 h-32 transform -translate-x-8 translate-y-10">
              <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
                <circle cx="64" cy="64" r="64" fill="#4F66A3" />
              </svg>
            </div>
            
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-cs-navy-900 mb-3">Need a Custom Solution?</h3>
              <p className="text-cs-navy-700 mb-5 max-w-xl mx-auto">
                We offer custom enterprise packages for sales teams and larger organizations with specific requirements. Contact us to create a tailored script package for your unique needs.
              </p>
              <a 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 font-medium text-white bg-gradient-to-r from-cs-blue-600 to-cs-navy-600 rounded-lg hover:shadow-lg transition-shadow"
              >
                Contact Us For Custom Pricing
                <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 