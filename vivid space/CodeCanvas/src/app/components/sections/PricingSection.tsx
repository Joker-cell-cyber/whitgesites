"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { MagneticButton } from "../ui/MagneticButton";
import Link from "next/link";

interface FeatureItem {
  name: string;
  included: boolean;
  tooltip?: string;
}

interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number;
  features: FeatureItem[];
  isPopular?: boolean;
  callToAction: string;
}

// CodeCanvas Solutions
const pricingTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter Plan",
    description: "Perfect for small businesses or startups.",
    price: 9.99,
    features: [
      { name: "Basic website setup", included: true, tooltip: "Setting up a functional website with a basic structure" },
      { name: "Theme customization", included: true, tooltip: "Adaptation of colors, fonts, and visual elements according to your identity" },
      { name: "Up to 2 pages", included: true, tooltip: "Creation of up to 2 pages for your site" },
      { name: "Basic SEO setup", included: true, tooltip: "Initial optimization for search engines" },
    ],
    callToAction: "Buy Now",
  },
  {
    id: "basic",
    name: "Basic Plan",
    description: "Designed for growing businesses.",
    price: 19.50,
    features: [
      { name: "Custom site design", included: true, tooltip: "Custom design tailored to your brand and industry" },
      { name: "Responsive layout", included: true, tooltip: "Automatic adaptation to all screens (mobile, tablet, computer)" },
      { name: "Up to 4 pages", included: true, tooltip: "Creation of up to 4 pages for your site" },
      { name: "Standard SEO optimization", included: true, tooltip: "Advanced configuration to improve your visibility on search engines" },
      { name: "E-commerce setup", included: true, tooltip: "Setting up a basic online store" },
    ],
    callToAction: "Buy Now",
  },
  {
    id: "pro",
    name: "Pro Plan",
    description: "Ideal for businesses needing advanced features.",
    price: 29.90,
    isPopular: true,
    features: [
      { name: "Advanced web development", included: true, tooltip: "Custom features and optimized architecture" },
      { name: "Custom API development", included: true, tooltip: "Creation of custom programming interfaces for your specific needs" },
      { name: "E-commerce integration", included: true, tooltip: "Complete implementation of an e-commerce solution with secure payment" },
      { name: "Up to 6 pages", included: true, tooltip: "Creation of up to 6 pages for your site" },
      { name: "Performance optimization", included: true, tooltip: "Improvement of loading times and user experience" },
    ],
    callToAction: "Buy Now",
  },
];

// All available pricing tiers
const allPricingTiers: PricingTier[] = [
  ...pricingTiers,
  {
    id: "advanced",
    name: "Advanced Plan",
    description: "A higher tier for businesses seeking enhanced features.",
    price: 39.99,
    features: [
      { name: "Custom theme enhancements", included: true, tooltip: "Advanced customization with unique visual elements" },
      { name: "Advanced SEO strategies", included: true, tooltip: "Advanced optimization techniques for better ranking" },
      { name: "E-commerce optimization", included: true, tooltip: "Improved performance and shopping experience" },
      { name: "Up to 7 pages", included: true, tooltip: "Creation of up to 7 pages for your site" },
      { name: "Loading speed improvement", included: true, tooltip: "Optimization for reduced loading times" },
    ],
    callToAction: "Buy Now",
  },
  {
    id: "professional",
    name: "Professional Plus Plan",
    description: "Designed for businesses requiring professional features.",
    price: 49.90,
    features: [
      { name: "Advanced custom design elements", included: true, tooltip: "Unique visual components and sophisticated animations" },
      { name: "Mobile-first optimization", included: true, tooltip: "Development primarily designed for mobile devices" },
      { name: "Advanced e-commerce tracking", included: true, tooltip: "Detailed analytics tools for your online store" },
      { name: "Up to 8 pages", included: true, tooltip: "Creation of up to 8 pages for your site" },
      { name: "Custom API integration", included: true, tooltip: "Connection with other services and applications" },
    ],
    callToAction: "Buy Now",
  },
  {
    id: "premium",
    name: "Premium Plan",
    description: "For businesses seeking custom, high-performance solutions.",
    price: 59.50,
    features: [
      { name: "Web application development", included: true, tooltip: "Creation of complete web applications with advanced features" },
      { name: "Scalable architecture", included: true, tooltip: "Technical structure adapted to the growth of your business" },
      { name: "Up to 9 pages", included: true, tooltip: "Creation of up to 9 pages for your site" },
      { name: "Advanced SEO and performance", included: true, tooltip: "Advanced optimization and referencing strategies" },
      { name: "Database optimization", included: true, tooltip: "Design and optimization for maximum performance" },
      { name: "Security enhancement", included: true, tooltip: "Implementation of enhanced security protocols" },
    ],
    callToAction: "Buy Now",
  },
  {
    id: "enterprise",
    name: "Enterprise Plan",
    description: "Complete package for large companies.",
    price: 69.99,
    features: [
      { name: "Full-stack development", included: true, tooltip: "Complete front-end and back-end development" },
      { name: "Multi-language support", included: true, tooltip: "Site available in multiple languages" },
      { name: "Up to 10 pages", included: true, tooltip: "Creation of up to 10 pages for your site" },
      { name: "Custom CMS development", included: true, tooltip: "Custom content management system" },
      { name: "CI/CD integration", included: true, tooltip: "Continuous deployment and automated integration" },
      { name: "Comprehensive analytics", included: true, tooltip: "Complete suite of analysis and reporting tools" },
    ],
    callToAction: "Buy Now",
  },
  {
    id: "elite",
    name: "Elite Plan",
    description: "Designed for businesses requiring scalable, future-ready solutions.",
    price: 79.90,
    features: [
      { name: "Custom web application design", included: true, tooltip: "Fully customized user interface" },
      { name: "Scalable server architecture", included: true, tooltip: "Infrastructure adapted to growth and traffic spikes" },
      { name: "Enhanced security protocols", included: true, tooltip: "Advanced protection against threats and vulnerabilities" },
      { name: "Up to 11 pages", included: true, tooltip: "Creation of up to 11 pages for your site" },
      { name: "Advanced e-commerce analytics", included: true, tooltip: "Detailed tracking of conversions and customer behavior" },
    ],
    callToAction: "Buy Now",
  },
  {
    id: "ultimate",
    name: "Ultimate Plan",
    description: "For businesses wanting to implement cutting-edge technologies.",
    price: 89.50,
    features: [
      { name: "Progressive application development", included: true, tooltip: "Installable web application that works offline" },
      { name: "AI and machine learning integration", included: true, tooltip: "Intelligent features based on machine learning" },
      { name: "Up to 12 pages", included: true, tooltip: "Creation of up to 12 pages for your site" },
      { name: "Cloud hosting configuration", included: true, tooltip: "Setup and management of cloud hosting" },
      { name: "Advanced security features", included: true, tooltip: "Enterprise-level security solutions" },
      { name: "Detailed analytics and reporting", included: true, tooltip: "Custom dashboards and automated reports" },
    ],
    callToAction: "Buy Now",
  },
  {
    id: "executive",
    name: "Executive Plan",
    description: "The ultimate package for businesses using the latest innovations.",
    price: 99.99,
    features: [
      { name: "AI-based user analytics", included: true, tooltip: "Predictive analysis and advanced user segmentation" },
      { name: "Blockchain integration", included: true, tooltip: "Blockchain technology for secure transactions" },
      { name: "Continuous cloud hosting management", included: true, tooltip: "Continuous monitoring and optimization" },
      { name: "Up to 13 pages", included: true, tooltip: "Creation of up to 13 pages for your site" },
      { name: "Advanced security protocols", included: true, tooltip: "Sophisticated protection measures against cyber threats" },
    ],
    callToAction: "Buy Now",
  },
  {
    id: "vip",
    name: "VIP Plan",
    description: "Premium package for businesses requiring ongoing and hands-on support.",
    price: 109.90,
    features: [
      { name: "End-to-end custom solutions", included: true, tooltip: "Fully customized development according to your exact requirements" },
      { name: "Dedicated development team", included: true, tooltip: "Professionals exclusively assigned to your project" },
      { name: "Up to 15 pages", included: true, tooltip: "Creation of up to 15 pages for your site" },
      { name: "Continuous support and maintenance", included: true, tooltip: "Permanent assistance and regular updates" },
      { name: "Priority response and resolution", included: true, tooltip: "Accelerated processing of your requests and issues" },
      { name: "Regular updates and improvements", included: true, tooltip: "Constant evolution of your platform" },
    ],
    callToAction: "Buy Now",
  },
  {
    id: "premium-plus",
    name: "Premium Plus Plan",
    description: "Ultimate experience with premium service and exclusive features.",
    price: 119.50,
    features: [
      { name: "Enterprise-grade infrastructure", included: true, tooltip: "High-performance infrastructure with maximum availability" },
      { name: "24/7 dedicated support", included: true, tooltip: "Round-the-clock technical support" },
      { name: "Unlimited pages", included: true, tooltip: "No limit on the number of pages" },
      { name: "Custom AI-powered features", included: true, tooltip: "Integration of advanced AI features tailored to your needs" },
      { name: "Advanced security audits", included: true, tooltip: "Regular security audits and vulnerability assessments" },
      { name: "Premium performance optimization", included: true, tooltip: "Advanced optimizations for exceptional performance" },
    ],
    callToAction: "Buy Now",
  },
];

// Compact version for the home page
export function HomePagePricingSection() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  
  return (
    <section className="py-24 bg-[#0A0A0A] overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full bg-indigo-900/5 blur-3xl"></div>
        <div className="absolute -bottom-[200px] -left-[200px] w-[600px] h-[600px] rounded-full bg-indigo-900/5 blur-3xl"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="space-y-16">
          {/* Header with rotated box */}
          <div className="flex items-center justify-center mb-16 relative">
            <div className="h-px w-24 bg-indigo-500/50 absolute left-0 top-1/2 hidden md:block"></div>
            <div className="h-px w-24 bg-indigo-500/50 absolute right-0 top-1/2 hidden md:block"></div>
            
            <div className="relative px-8 py-10">
              <div className="absolute inset-0 border-2 border-indigo-500/30 rotate-3"></div>
              <div className="absolute inset-0 border-2 border-indigo-500/30 -rotate-3"></div>
              
              <div className="text-center space-y-3 relative">
                <span className="text-sm font-mono uppercase tracking-wider text-indigo-500">
                  Pricing
                </span>
                
                <span className="block text-sm font-mono bg-indigo-900/30 text-indigo-300 px-3 py-1 border border-indigo-500/20">
                  No subscription required
                </span>
                
                <h2 className="text-3xl font-extrabold text-white">
                  Simple, transparent pricing
                </h2>
                
                <p className="text-zinc-400">
                  Choose the plan that suits your needs - no subscriptions
                </p>
              </div>
            </div>
          </div>
          
          {/* Pricing cards in a new layout */}
          <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-4">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`md:w-1/3 h-full ${tier.isPopular ? 'md:-mt-4' : ''}`}
              >
                <div 
                  className={`h-full relative ${
                    tier.isPopular 
                      ? 'border-2 border-indigo-500 bg-gradient-to-b from-indigo-900/20 to-black' 
                      : 'border border-zinc-800 bg-gradient-to-b from-zinc-900/30 to-black'
                  }`}
                >
                  {tier.isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold uppercase py-1 px-3">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="p-8 flex flex-col h-full">
                    <div className="mb-6">
                      <h3 className={`text-xl font-bold ${tier.isPopular ? 'text-indigo-400' : 'text-white'}`}>
                        {tier.name}
                      </h3>
                      
                      <div className="h-px w-12 bg-indigo-500/30 my-3"></div>
                      
                      <p className="text-zinc-400 text-sm mb-4">
                        {tier.description}
                      </p>
                      
                      <div className="flex items-baseline mb-6">
                        <span className="text-3xl font-extrabold text-white">${tier.price}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3 mb-8 flex-grow">
                      {tier.features.map((feature) => (
                        <div 
                          key={feature.name}
                          className="flex items-start group"
                          onMouseEnter={() => setHoveredFeature(feature.name)}
                          onMouseLeave={() => setHoveredFeature(null)}
                        >
                          {feature.included ? (
                            <>
                              <span className="text-indigo-500 mr-2">✓</span>
                              <span className="text-zinc-300">{feature.name}</span>
                            </>
                          ) : (
                            <>
                              <span className="text-zinc-700 mr-2">✕</span>
                              <span className="text-zinc-600">{feature.name}</span>
                            </>
                          )}
                          
                          {feature.tooltip && hoveredFeature === feature.name && (
                            <div className="absolute z-10 left-0 bottom-full mb-2 w-64 p-3 bg-zinc-800 rounded-none border border-indigo-500/20 text-xs text-zinc-300">
                              {feature.tooltip}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <Link 
                      href={`/checkout?plan=${tier.id}&name=${encodeURIComponent(tier.name)}&price=${tier.price}&description=${encodeURIComponent(tier.description)}`}
                      className={`block w-full ${
                        tier.isPopular
                          ? 'bg-indigo-500 hover:bg-indigo-600 text-white' 
                          : 'bg-transparent hover:bg-zinc-800 text-white border border-indigo-500/30'
                      } py-3 text-center font-mono tracking-wider text-sm transition-colors duration-200`}
                    >
                      {tier.callToAction}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* View all plans link */}
          <div className="text-center">
            <Link href="/services#pricing" className="inline-block border-b border-indigo-500 text-indigo-400 hover:text-indigo-300 transition-colors font-mono text-sm">
              View all plans →
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

// Full pricing section for the services page
export function PricingSection() {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);
  const [selectedTiers, setSelectedTiers] = useState<PricingTier[]>(pricingTiers);
  const [showAllPlans, setShowAllPlans] = useState(false);
  
  const handleTogglePlans = () => {
    setShowAllPlans(prev => !prev);
    setSelectedTiers(prev => prev.length === pricingTiers.length ? allPricingTiers : pricingTiers);
  };
  
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-black to-zinc-950">
      <Container>
        <div className="space-y-16">
          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-purple-600/20 to-pink-500/20 text-purple-300 border border-purple-500/20">
                Pricing
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <span className="inline-block px-4 py-1.5 text-sm font-medium rounded-full bg-green-600/20 text-green-300 border border-green-500/30">
                No subscription required
              </span>
            </motion.div>
            
            <motion.h2
              className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Simple, transparent pricing
            </motion.h2>
            
            <motion.p
              className="text-zinc-400 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Choose the plan that suits your needs - no subscriptions
            </motion.p>
          </div>
          
          {/* Toggle for all plans */}
          <div className="flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-zinc-900/50 p-1 rounded-lg inline-flex"
            >
              <button
                onClick={handleTogglePlans}
                className={`px-4 py-2 rounded ${!showAllPlans ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'} transition-colors duration-200`}
              >
                Popular Plans
              </button>
              <button
                onClick={handleTogglePlans}
                className={`px-4 py-2 rounded ${showAllPlans ? 'bg-purple-600 text-white' : 'text-zinc-400 hover:text-white'} transition-colors duration-200`}
              >
                All Plans
              </button>
            </motion.div>
          </div>
          
          {/* Pricing grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {selectedTiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * index }}
              >
                <Card
                  variant={tier.isPopular ? "gradient" : "glass"}
                  className={`h-full flex flex-col ${tier.isPopular ? 'border-2 border-purple-500/50' : ''}`}
                >
                  <div className="p-6 flex flex-col h-full">
                    {tier.isPopular && (
                      <Badge className="self-start mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        Most Popular
                      </Badge>
                    )}
                    
                    <h3 className="text-xl font-bold text-white">
                      {tier.name}
                    </h3>
                    
                    <p className="text-zinc-400 mt-2 mb-4">
                      {tier.description}
                    </p>
                    
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-white">${tier.price}</span>
                    </div>
                    
                    <ul className="space-y-3 mb-8 flex-grow">
                      {tier.features.map((feature) => (
                        <li 
                          key={feature.name}
                          className="flex items-start"
                          onMouseEnter={() => setHoveredFeature(feature.name)}
                          onMouseLeave={() => setHoveredFeature(null)}
                        >
                          <div className="flex-shrink-0 w-5 h-5 mt-0.5">
                            {feature.included ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-zinc-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                          <div className="ml-2 relative group">
                            <p className={`text-${feature.included ? 'zinc-300' : 'zinc-500'}`}>
                              {feature.name}
                            </p>
                            
                            {feature.tooltip && hoveredFeature === feature.name && (
                              <div className="absolute z-10 left-0 bottom-full mb-2 w-64 p-3 bg-zinc-800 rounded-lg shadow-lg text-xs text-zinc-300 transition-opacity duration-300">
                                {feature.tooltip}
                                <div className="absolute -bottom-1 left-4 w-2 h-2 bg-zinc-800 transform rotate-45"></div>
                              </div>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
                        tier.isPopular
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                          : 'bg-zinc-800 text-white hover:bg-zinc-700'
                      }`}
                    >
                      <Link
                        href={`/checkout?plan=${tier.id}&name=${encodeURIComponent(tier.name)}&price=${tier.price}&description=${encodeURIComponent(tier.description)}`}
                        className="w-full h-full flex items-center justify-center"
                      >
                        {tier.callToAction}
                      </Link>
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* CTA */}
          <motion.div
            className="bg-gradient-to-r from-zinc-900 to-black rounded-2xl p-8 md:p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Need a custom solution?
              </h3>
              <p className="text-zinc-400 mb-6">
                Contact us to discuss your specific requirements and get a personalized quote
              </p>
              <Link href="/contact">
                <MagneticButton
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/20"
                >
                  Contact us
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </MagneticButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
} 