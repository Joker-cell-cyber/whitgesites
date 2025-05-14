"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Industries for the portfolio section
const industries = [
  {
    id: "technology",
    name: "Technology",
    description: "High-growth tech companies across SaaS, fintech, and emerging technologies.",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Medical practices, healthcare providers, and health technology companies.",
    image: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1951&q=80",
  },
  {
    id: "finance",
    name: "Finance",
    description: "Financial services including banking, insurance, and wealth management.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1302&q=80",
  },
  {
    id: "education",
    name: "Education",
    description: "Educational institutions, ed-tech, and professional training services.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description: "Industrial manufacturing, supply chain, and production companies.",
    image: "https://images.unsplash.com/photo-1529310399831-ed472b81d589?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80",
  },
  {
    id: "retail",
    name: "Retail",
    description: "Retail businesses from e-commerce to brick-and-mortar operations.",
    image: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1301&q=80",
  }
];

export default function PortfolioSection() {
  const [activeIndustry, setActiveIndustry] = useState(industries[0]);
  const [isHovering, setIsHovering] = useState<boolean | string>(false);
  
  return (
    <section id="portfolio" className="py-24 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Abstract shapes */}
        <svg className="absolute bottom-0 left-0 w-full h-1/2 text-vivid-purple-900/5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 250L720 500L1440 250V500H0V250Z" fill="currentColor"/>
        </svg>
        
        <div className="absolute top-0 right-0 -mr-24 -mt-24 w-72 h-72 bg-vivid-amber-900/5 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 -ml-24 w-72 h-72 bg-vivid-purple-900/5 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="inline-block px-4 py-1 rounded-full bg-vivid-purple-900/20 text-vivid-purple-400 text-sm font-medium">
              Industries Served
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-6">
            Lead Generation for <span className="gradient-text">Every Industry</span>
          </h2>
          <p className="text-gray-400 text-lg">
            We serve businesses across various industries with specialized lead generation solutions.
          </p>
        </motion.div>
        
        {/* Industries Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {industries.map((industry, index) => (
            <motion.button
              key={industry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`relative px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeIndustry.id === industry.id
                  ? 'text-white'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/70'
              }`}
              onClick={() => setActiveIndustry(industry)}
              onMouseEnter={() => setIsHovering(industry.id)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {activeIndustry.id === industry.id && (
                <motion.div
                  layoutId="activeIndustry"
                  className="absolute inset-0 bg-gradient-to-r from-vivid-purple-600 to-vivid-amber-500 rounded-full -z-10"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              {isHovering === industry.id && activeIndustry.id !== industry.id && (
                <motion.div
                  layoutId="hoverIndustry"
                  className="absolute inset-0 bg-gray-800/70 rounded-full -z-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              {industry.name}
            </motion.button>
          ))}
        </div>
        
        {/* Featured Industry */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            key={activeIndustry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* Image column */}
            <div className="lg:col-span-7 relative order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-vivid-purple-500 to-vivid-amber-500 opacity-70 blur-sm rounded-2xl"></div>
                <div className="relative aspect-video overflow-hidden rounded-2xl">
                  <Image
                    src={activeIndustry.image}
                    alt={activeIndustry.name}
                    className="object-cover w-full h-full transform transition-transform duration-700 hover:scale-105"
                    width={800}
                    height={450}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent"></div>
                </div>
              </div>
              
              {/* Decorative patterns */}
              <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-vivid-purple-500/10 rounded-full filter blur-xl"></div>
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-vivid-amber-500/10 rounded-full filter blur-xl"></div>
            </div>
            
            {/* Content column */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col justify-center">
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl font-bold mb-3 flex items-center gap-3">
                    <span className="inline-block w-8 h-8 rounded-full bg-gradient-to-r from-vivid-purple-500 to-vivid-amber-500"></span>
                    {activeIndustry.name}
                  </h3>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    {activeIndustry.description}
                  </p>
                </div>
                
                {/* Industry-specific lead features */}
                <div className="space-y-4 mt-8">
                  <h4 className="text-lg font-semibold text-white">Our {activeIndustry.name} Lead Packages Include:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-vivid-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-vivid-purple-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300">Industry-specific qualification criteria</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-vivid-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-vivid-purple-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300">Specialized data enrichment</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-vivid-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-vivid-purple-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300">Regulatory compliance verification</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-vivid-purple-500/20 flex items-center justify-center flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-vivid-purple-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <span className="text-gray-300">Industry-tailored lead scoring</span>
                    </li>
                  </ul>
                </div>
                
                <div className="pt-6">
                  <a 
                    href="#pricing" 
                    className="inline-flex items-center text-vivid-purple-400 hover:text-vivid-purple-300 transition-colors group"
                  >
                    <span className="mr-2">View Pricing</span>
                    <svg 
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 