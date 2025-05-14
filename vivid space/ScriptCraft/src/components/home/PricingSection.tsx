"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Custom SVG illustrations
const PricingDecorator = () => (
  <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute -top-20 -right-20 opacity-20 z-0">
    <circle cx="200" cy="200" r="150" stroke="#3A6FFF" strokeWidth="2" strokeDasharray="10 5" />
    <circle cx="200" cy="200" r="100" stroke="#3A6FFF" strokeWidth="2" strokeDasharray="10 5" />
    <circle cx="200" cy="200" r="50" stroke="#3A6FFF" strokeWidth="2" strokeDasharray="10 5" />
    <path d="M200 50V350" stroke="#3A6FFF" strokeWidth="2" strokeDasharray="10 5" />
    <path d="M50 200H350" stroke="#3A6FFF" strokeWidth="2" strokeDasharray="10 5" />
    <path d="M120 120L280 280" stroke="#3A6FFF" strokeWidth="2" strokeDasharray="10 5" />
    <path d="M120 280L280 120" stroke="#3A6FFF" strokeWidth="2" strokeDasharray="10 5" />
  </svg>
);

// Category icons
const ColdCallIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 5C3 3.89543 3.89543 3 5 3H8.28L9.228 7.493C9.36 8.034 9.06943 8.59056 8.542 8.85L6.285 9.981C7.27581 12.141 8.85862 13.7236 11.019 14.715L12.15 12.458C12.4094 11.9306 12.966 11.64 13.507 11.772L18 12.72V16C18 17.1046 17.1046 18 16 18H15C8.37258 18 3 12.6274 3 6V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClosingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
  </svg>
);

const FollowUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function PricingSection() {
  const [selectedCategory, setSelectedCategory] = useState<'cold' | 'closing' | 'follow'>('cold');

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

  // Visual elements for each plan
  const renderVisualElements = (price: number) => {
    const getBarHeight = (value: number) => {
      // Normalize height based on price range
      return 15 + (value / 120) * 50;
    };
    
    return (
      <div className="absolute -right-2 -top-2 opacity-10 h-16 w-16 overflow-hidden">
        {[0, 1, 2, 3, 4].map((i) => (
          <div 
            key={i} 
            className="absolute bg-cs-blue-600" 
            style={{
              height: `${getBarHeight(price)}px`,
              width: '4px',
              bottom: '0',
              left: `${i * 6}px`,
              borderRadius: '2px 2px 0 0',
              transform: `translateY(${Math.sin(i * 0.8) * 5}px)`,
              opacity: 0.5 + (i * 0.1)
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-28 pb-16 relative overflow-hidden bg-gradient-to-b from-white to-cs-blue-50">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-cs-blue-100 rounded-bl-[100px] opacity-50"></div>
          <div className="absolute top-[10%] right-[5%] w-[40vw] h-[40vw] rounded-full bg-cs-blue-100 mix-blend-multiply filter blur-[120px] opacity-60 animate-slow-float"></div>
          <div className="absolute bottom-[10%] left-[5%] w-[35vw] h-[35vw] rounded-full bg-cs-navy-100 mix-blend-multiply filter blur-[100px] opacity-50 animate-slow-float-delay"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-cs-navy-900">
                Professional <span className="gradient-text">Sales Script</span> Packages
              </h1>
              
              <p className="text-xl text-cs-navy-700 mb-8 max-w-3xl mx-auto">
                Transparent pricing with packages designed for every sales need. Choose from cold calling scripts, closing scripts, and follow-up sequences to boost your conversion rates.
              </p>

              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl border border-cs-blue-100 shadow-lg">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cs-blue-500 to-cs-navy-500 flex items-center justify-center text-white mb-4 mx-auto">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-cs-navy-900 mb-2 text-center">24-96 Hours Delivery</h3>
                  <p className="text-cs-navy-700 text-center">Get your scripts quickly with our expedited delivery option</p>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-cs-blue-100 shadow-lg">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cs-blue-500 to-cs-navy-500 flex items-center justify-center text-white mb-4 mx-auto">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-cs-navy-900 mb-2 text-center">Expert Copywriters</h3>
                  <p className="text-cs-navy-700 text-center">Scripts crafted by professional sales copywriters with proven results</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 relative overflow-hidden bg-white" id="pricing">
        {/* Background wave */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -bottom-20 w-full">
            <svg width="100%" height="320" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
              <path d="M0 160L60 186.7C120 213 240 267 360 272C480 277 600 235 720 213.3C840 192 960 192 1080 213.3C1200 235 1320 277 1380 298.7L1440 320V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V160Z" fill="#F97316"/>
            </svg>
          </div>
          <div className="absolute left-1/4 top-1/4 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
          <div className="absolute right-1/4 bottom-1/4 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-orange-50 text-orange-700 border border-orange-200 mb-4">
                <span className="flex h-2 w-2 rounded-full bg-orange-500 mr-2"></span>
                Choose Your Package
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cs-navy-900">
                Find the Perfect <span className="gradient-text">Script Package</span> for Your Needs
              </h2>
              <p className="text-cs-navy-700 text-lg mb-8">
                Select the category that matches your sales needs and choose a package that fits your requirements.
              </p>
              
              {/* Category selector */}
              <div className="inline-flex bg-white p-1 rounded-xl shadow-md border border-orange-100 mb-8">
            <button
                  onClick={() => setSelectedCategory('cold')}
                  className={`px-5 py-3 rounded-lg text-sm font-medium transition-all flex items-center ${
                    selectedCategory === 'cold' 
                      ? 'bg-orange-50 text-orange-700' 
                      : 'text-cs-navy-600 hover:text-cs-navy-800 hover:bg-orange-50/30'
                  }`}
                >
                  <span className={`mr-2 ${selectedCategory === 'cold' ? 'text-orange-600' : 'text-cs-navy-400'}`}>
                    <ColdCallIcon />
                  </span>
                  Cold Call Scripts
            </button>
            <button
                  onClick={() => setSelectedCategory('closing')}
                  className={`px-5 py-3 rounded-lg text-sm font-medium transition-all flex items-center ${
                    selectedCategory === 'closing' 
                      ? 'bg-orange-50 text-orange-700' 
                      : 'text-cs-navy-600 hover:text-cs-navy-800 hover:bg-orange-50/30'
                  }`}
                >
                  <span className={`mr-2 ${selectedCategory === 'closing' ? 'text-orange-600' : 'text-cs-navy-400'}`}>
                    <ClosingIcon />
                  </span>
                  Closing Scripts
            </button>
            <button
                  onClick={() => setSelectedCategory('follow')}
                  className={`px-5 py-3 rounded-lg text-sm font-medium transition-all flex items-center ${
                    selectedCategory === 'follow' 
                      ? 'bg-orange-50 text-orange-700' 
                      : 'text-cs-navy-600 hover:text-cs-navy-800 hover:bg-orange-50/30'
                  }`}
                >
                  <span className={`mr-2 ${selectedCategory === 'follow' ? 'text-orange-600' : 'text-cs-navy-400'}`}>
                    <FollowUpIcon />
                  </span>
                  Follow-Up Scripts
            </button>
          </div>
            </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activePricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-xl overflow-hidden ${
                  plan.popular ? 'transform lg:-translate-y-4 shadow-xl' : 'shadow-lg'
                }`}
              >
                {/* Pricing Decorator */}
                <div className="absolute right-0 top-0 opacity-10 z-0 overflow-hidden h-20 w-20">
                  <PricingDecorator />
                </div>
                
                {/* Visual bars */}
                {renderVisualElements(plan.price)}
                
                <div className={`p-6 bg-white h-full flex flex-col relative z-10 ${
                  plan.popular ? 'border-2 border-orange-500' : 'border border-orange-200'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold px-4 py-1 rounded-full">
                      MOST POPULAR
                    </div>
                  )}
                  
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-cs-navy-900 mb-2">{plan.name}</h3>
                    {plan.popular && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-500">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" />
                      </svg>
                    )}
                  </div>
                  
                  <div className="my-4 pb-4 border-b border-orange-100">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-cs-navy-900">${plan.price.toFixed(2)}</span>
                      <span className="text-cs-navy-600 ml-1 text-sm">one-time</span>
                  </div>
                    <p className="text-cs-navy-700 mt-2">{plan.description}</p>
                </div>
                
                  <div className="space-y-3 mb-6 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                        <span className="text-cs-navy-700 text-sm">{feature}</span>
                      </div>
                  ))}
                
                    <div className="flex items-start pt-2">
                      <svg className="w-5 h-5 text-orange-500 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                      <span className="text-cs-navy-700 text-sm">Delivery in {plan.delivery}</span>
                  </div>
                </div>
                
                  <a 
                    href={`/checkout?name=${encodeURIComponent(plan.name)}&price=${plan.price}&description=${encodeURIComponent(plan.description)}&features=${encodeURIComponent(JSON.stringify(plan.features))}`}
                    className={`block text-center w-full py-3 rounded-lg font-medium relative overflow-hidden group ${
                      plan.popular 
                        ? 'bg-white border border-gray-300 text-cs-navy-900 hover:shadow-lg transition-shadow' 
                        : 'bg-gray-50 text-cs-navy-700 hover:bg-gray-100 transition-colors'
                    }`}
                  >
                    <span className="relative z-10">Get Started</span>
                    {plan.popular && (
                      <span className="absolute top-0 left-0 w-full h-full bg-gray-100 opacity-0 group-hover:opacity-10 transition-opacity"></span>
                    )}
                  </a>
              </div>
            </motion.div>
          ))}
        </div>
        
          <div className="mt-20 text-center max-w-3xl mx-auto">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-white border border-orange-100 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 transform translate-x-8 -translate-y-20">
                <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
                  <circle cx="80" cy="80" r="80" fill="#F97316" />
                </svg>
              </div>
              
              <div className="absolute bottom-0 left-0 w-32 h-32 transform -translate-x-8 translate-y-10">
                <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
                  <circle cx="64" cy="64" r="64" fill="#EA580C" />
                </svg>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-cs-navy-900 mb-3">Need a Custom Solution?</h3>
                <p className="text-cs-navy-700 mb-5 max-w-xl mx-auto">
                  We offer custom enterprise packages for sales teams and larger organizations with specific requirements. Contact us to create a tailored script package for your unique needs.
                </p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center px-6 py-3 font-medium text-cs-navy-900 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow"
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
    </>
  );
} 