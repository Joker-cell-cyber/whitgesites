"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingSection() {
  const [selectedCategory, setSelectedCategory] = useState<'resume' | 'interview' | 'application'>('resume');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
  
  const getPricingTypeColor = (type: 'resume' | 'interview' | 'application') => {
    switch (type) {
      case 'resume':
        return 'rgba(138, 43, 226, 1)'; // Purple
      case 'interview':
        return 'rgba(255, 20, 147, 1)'; // Pink
      case 'application':
        return 'rgba(0, 191, 255, 1)'; // Blue
    }
  };
  
  const getCurrentColor = () => getPricingTypeColor(selectedCategory);

  return (
    <section className="py-24 relative overflow-hidden" id="pricing">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#080808]"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-80 mix-blend-soft-light"></div>
        
        {/* Radial gradient in background */}
        <div 
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full lg:w-2/3 aspect-square rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, ${getPricingTypeColor(selectedCategory)}30 0%, transparent 70%)`
          }}
        ></div>
        
        {/* Mesh grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your Career <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(to right, ${getCurrentColor()}, rgba(255, 20, 147, 1))` }}>Investment</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Find the perfect package to match your professional development needs and budget
          </p>
        </motion.div>

        {/* Category Selector */}
        <div className="flex flex-wrap justify-center mb-12">
          <div className="p-1.5 bg-gray-900/80 backdrop-blur-sm rounded-full flex">
            {(['resume', 'interview', 'application'] as const).map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {selectedCategory === category && (
                  <motion.div 
                    layoutId="categoryIndicator"
                    className="absolute inset-0 rounded-full z-0"
                    style={{ background: `linear-gradient(to right, ${getPricingTypeColor(category)}, rgba(255, 20, 147, 0.8))` }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">
                  {category === 'resume' ? 'Resume/CV' : 
                   category === 'interview' ? 'Interviews' : 
                   'Applications'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Container */}
        <div 
          ref={containerRef}
          className="flex overflow-x-auto pb-10 snap-x snap-mandatory hide-scrollbar"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <div className="flex gap-5 px-4 w-max mx-auto">
            {activePricing.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="pricing-card-container snap-center"
                style={{ 
                  minWidth: containerWidth > 1024 ? containerWidth / 4 - 20 : 
                         containerWidth > 768 ? containerWidth / 3 - 20 : 
                         containerWidth > 640 ? containerWidth / 2 - 20 : 
                         containerWidth - 30,
                  maxWidth: 320
                }}
              >
                <div 
                  className="relative h-full"
                >
                  {/* Card background without hover effects */}
                  <div 
                    className="absolute inset-0 rounded-2xl shadow-lg"
                    style={{ 
                      background: tier.popular
                        ? `linear-gradient(145deg, rgba(20,20,20,0.6), rgba(30,30,30,0.6))`
                        : `linear-gradient(145deg, rgba(15,15,15,0.4), rgba(25,25,25,0.4))`,
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      borderTop: `1px solid ${getCurrentColor()}30`,
                      borderLeft: `1px solid ${getCurrentColor()}20`,
                      borderRight: `1px solid transparent`,
                      borderBottom: `1px solid transparent`
                    }}
                  />
                  
                  {/* Popular badge */}
                  {tier.popular && (
                    <div 
                      className="absolute -top-3 right-4 px-3 py-1 text-xs font-bold rounded-full z-10"
                      style={{ 
                        background: `linear-gradient(to right, ${getCurrentColor()}, rgba(255, 20, 147, 1))`,
                        boxShadow: `0 0 20px ${getCurrentColor()}70` 
                      }}
                    >
                      Most Popular
                    </div>
                  )}
                  
                  {/* Card Content */}
                  <div className="relative z-10 p-6 h-full flex flex-col">
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-white mb-1">{tier.name}</h3>
                      <div className="text-gray-400 text-sm mb-4">{tier.description}</div>
                      
                      <div className="flex items-end">
                        <div 
                          className="text-3xl font-bold"
                          style={{ color: getCurrentColor() }}
                        >
                          ${tier.price}
                        </div>
                        <div className="text-gray-400 ml-1 pb-1">/ service</div>
                      </div>
                      
                      {/* Tier info badges */}
                      <div className="flex flex-wrap gap-2 mt-4">
                        <div className="px-2 py-1 bg-gray-800 rounded-md text-xs text-gray-300">
                          {tier.complexity}
                        </div>
                        <div className="px-2 py-1 bg-gray-800 rounded-md text-xs text-gray-300">
                          {tier.duration}
                        </div>
                        <div className="px-2 py-1 bg-gray-800 rounded-md text-xs text-gray-300">
                          {tier.delivery}
                        </div>
                      </div>
                    </div>
                    
                    {/* Divider */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-6"></div>
                    
                    {/* Features */}
                    <div className="space-y-3 flex-grow mb-8">
                      {tier.features.map((feature, fidx) => (
                        <div key={fidx} className="flex items-start">
                          <div 
                            className="flex-shrink-0 w-5 h-5 rounded-full mr-2 flex items-center justify-center mt-0.5"
                            style={{ background: `linear-gradient(to right, ${getCurrentColor()}, rgba(255, 20, 147, 0.8))` }}
                          >
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* CTA button */}
                    <div className="mt-auto">
                      <Link
                        href={`/checkout?name=${encodeURIComponent(tier.name)}&price=${tier.price}&category=${encodeURIComponent(selectedCategory === 'resume' ? 'Resume/CV Services' : selectedCategory === 'interview' ? 'Interview Services' : 'Application Services')}`}
                        className={`w-full py-3 rounded-xl font-medium text-sm relative flex items-center justify-center ${
                          tier.popular ? 'text-white' : 'text-gray-100'
                        }`}
                        style={{
                          background: tier.popular
                            ? `linear-gradient(to right, ${getCurrentColor()}, rgba(255, 20, 147, 0.8))` 
                            : 'rgba(30, 30, 30, 0.6)',
                          border: tier.popular 
                            ? 'none' 
                            : `1px solid ${getCurrentColor()}50`
                        }}
                      >
                        <span className="relative z-10">{tier.popular ? 'Get Started' : 'Select Package'}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Custom arrow indicators for mobile */}
        <div className="flex justify-center mt-2 lg:hidden">
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-500"></div>
            <div className="w-2 h-2 rounded-full bg-gray-700"></div>
            <div className="w-2 h-2 rounded-full bg-gray-700"></div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-16 max-w-2xl mx-auto"
        >
          <p className="text-gray-400 mb-6">
            Need a custom solution? We offer personalized packages tailored to your specific career goals.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 text-white font-medium hover:bg-white/10 transition-all"
          >
            <span>Contact for Custom Package</span>
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Custom CSS for special effects */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
} 