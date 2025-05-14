"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

type LeadCategory = "all" | "b2b" | "b2c" | "industry" | "saas";

interface PotentialResult {
  id: number;
  title: string;
  industry: string;
  description: string;
  potentialOutcomes: {
    leads: string;
    conversion: string;
    potential: string;
  };
  strategy: string;
  targetAudience: string;
  image: string;
  categories: LeadCategory[];
}

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<LeadCategory>("all");

  const potentialResults: PotentialResult[] = [
    {
      id: 1,
      title: "Tech & SaaS Lead Generation",
      industry: "Technology & SaaS",
      description: "Our targeted lead generation approach for tech companies focuses on connecting with IT decision-makers and technology buyers.",
      potentialOutcomes: {
        leads: "High-quality decision-maker contacts",
        conversion: "Improved meeting request rates",
        potential: "Shortened sales cycles"
      },
      strategy: "We identify companies with matching tech stacks and recent buying signals to deliver leads with higher conversion potential.",
      targetAudience: "IT Managers, CTOs, CIOs, and Technology Procurement Teams",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=600&auto=format",
      categories: ["b2b", "saas"]
    },
    {
      id: 2,
      title: "Financial Services Lead Acquisition",
      industry: "Financial Services",
      description: "Our financial services lead strategy helps connect advisors and financial institutions with qualified prospects.",
      potentialOutcomes: {
        leads: "Pre-qualified investor prospects",
        conversion: "Higher consultation booking rates",
        potential: "Increased client acquisition"
      },
      strategy: "We source high-value prospects with verified financial criteria matching your ideal customer profile.",
      targetAudience: "High-net-worth individuals, Business owners, and Corporate Financial Officers",
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?q=80&w=600&auto=format",
      categories: ["b2c", "industry"]
    },
    {
      id: 3,
      title: "Manufacturing Sector Connections",
      industry: "Manufacturing",
      description: "Our industrial lead generation connects manufacturers with procurement managers and decision-makers in target industries.",
      potentialOutcomes: {
        leads: "Industry-specific purchasing contacts",
        conversion: "Increased RFQ opportunities",
        potential: "Expanded supplier relationships"
      },
      strategy: "We identify companies with relevant procurement needs and connect you with the right decision-makers.",
      targetAudience: "Procurement Managers, Operations Directors, and Supply Chain Executives",
      image: "https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?q=80&w=600&auto=format",
      categories: ["b2b", "industry"]
    },
    {
      id: 4,
      title: "Healthcare Provider Solutions",
      industry: "Healthcare",
      description: "Our healthcare lead generation connects medical suppliers and service providers with decision-makers in healthcare facilities.",
      potentialOutcomes: {
        leads: "Verified healthcare provider contacts",
        conversion: "Higher demo and presentation rates",
        potential: "Compliance-ready lead information"
      },
      strategy: "We prioritize regulatory compliance and decision-maker verification in our healthcare lead sourcing process.",
      targetAudience: "Hospital Administrators, Practice Managers, and Department Heads",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format",
      categories: ["b2b", "industry"]
    },
    {
      id: 5,
      title: "Consumer Products & E-commerce",
      industry: "E-commerce & Retail",
      description: "Our consumer lead generation focuses on matching D2C brands with their ideal customers and prospects.",
      potentialOutcomes: {
        leads: "Demographically targeted consumer profiles",
        conversion: "Improved initial purchase rates",
        potential: "Higher customer value potential"
      },
      strategy: "We segment consumer audiences based on buying patterns, interests, and demographic profiles to maximize relevance.",
      targetAudience: "Consumers with matching demographic and interest profiles",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=600&auto=format",
      categories: ["b2c"]
    },
    {
      id: 6,
      title: "SaaS & Software Solutions",
      industry: "Software & Technology",
      description: "Our SaaS lead generation approach targets potential trial users and software purchasers with high conversion potential.",
      potentialOutcomes: {
        leads: "Pre-qualified software purchasers",
        conversion: "Higher trial activations",
        potential: "Improved demo-to-client conversion"
      },
      strategy: "We target prospects based on technology usage patterns and identified pain points relevant to your solution.",
      targetAudience: "Software Purchasers, Department Heads, and IT Decision-makers",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=600&auto=format",
      categories: ["b2b", "saas"]
    }
  ];

  const getFilteredResults = () => {
    if (activeCategory === "all") {
      return potentialResults;
    }
    return potentialResults.filter(result => result.categories.includes(activeCategory));
  };

  const handleCategoryChange = (category: LeadCategory) => {
      setActiveCategory(category);
  };

  return (
    <section className="py-20 bg-[#111827]" id="potential-results">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What to <span className="gradient-text">Expect</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Here&apos;s how our premium lead generation services can help different industries achieve their business goals
            </p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === "all"
                ? "bg-gradient-to-r from-lead-blue-600 to-lead-green-500 text-white shadow-lg"
                : "bg-gray-800 text-gray-400 hover:text-gray-300"
            }`}
          >
            All Examples
          </button>
          <button
            onClick={() => handleCategoryChange("b2b")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === "b2b"
                ? "bg-gradient-to-r from-lead-blue-600 to-lead-green-500 text-white shadow-lg"
                : "bg-gray-800 text-gray-400 hover:text-gray-300"
            }`}
          >
            B2B Leads
          </button>
          <button
            onClick={() => handleCategoryChange("b2c")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === "b2c"
                ? "bg-gradient-to-r from-lead-blue-600 to-lead-green-500 text-white shadow-lg"
                : "bg-gray-800 text-gray-400 hover:text-gray-300"
            }`}
          >
            B2C Leads
          </button>
          <button
            onClick={() => handleCategoryChange("industry")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === "industry"
                ? "bg-gradient-to-r from-lead-blue-600 to-lead-green-500 text-white shadow-lg"
                : "bg-gray-800 text-gray-400 hover:text-gray-300"
            }`}
          >
            Industry-Specific
          </button>
          <button
            onClick={() => handleCategoryChange("saas")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === "saas"
                ? "bg-gradient-to-r from-lead-blue-600 to-lead-green-500 text-white shadow-lg"
                : "bg-gray-800 text-gray-400 hover:text-gray-300"
            }`}
          >
            SaaS Companies
          </button>
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {getFilteredResults().map((result) => (
              <motion.div
                key={result.id}
                variants={itemVariants}
                className="card-hover rounded-xl overflow-hidden"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={result.image}
                      alt={result.industry}
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      width={600}
                      height={400}
                    />
                  </div>
                </div>
                
                <div className="p-6 bg-[#1F2937]">
                  <div className="flex items-center mb-3">
                    <span className="text-xs font-semibold bg-lead-blue-600/20 text-lead-blue-400 px-2 py-1 rounded-full">
                      {result.industry}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3">{result.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm">{result.description}</p>
                  
                  <div className="mb-4 space-y-2">
                    <h4 className="text-sm font-semibold text-lead-blue-400">Potential Outcomes:</h4>
                    <ul className="space-y-1">
                      <li className="flex items-start text-sm">
                        <svg className="h-5 w-5 text-lead-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{result.potentialOutcomes.leads}</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <svg className="h-5 w-5 text-lead-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{result.potentialOutcomes.conversion}</span>
                      </li>
                      <li className="flex items-start text-sm">
                        <svg className="h-5 w-5 text-lead-blue-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-300">{result.potentialOutcomes.potential}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-800">
                    <h4 className="text-sm font-semibold text-lead-blue-400 mb-2">Target Audience:</h4>
                    <p className="text-sm text-gray-400">{result.targetAudience}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-lead-blue-600 to-lead-green-500 text-white rounded-lg font-medium button-glow"
          >
            Discuss Your Lead Generation Needs
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 