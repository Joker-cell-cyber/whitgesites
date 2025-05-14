"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type VideoCategory = "short" | "long" | "advertising";

export default function ComparisonTable() {
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>("short");

  // Simplified feature list focused on clear deliverables
  const featuresByCategory = {
    short: [
      "Video Duration",
      "Delivery Time",
      "Revision Rounds",
      "Aspect Ratios",
      "Basic Cuts & Transitions",
      "Text & Titles",
      "Background Music",
      "Sound Effects",
      "Color Correction/Grading",
      "Motion Graphics",
      "Custom Animation",
    ],
    long: [
      "Video Duration",
      "Delivery Time", 
      "Revision Rounds",
      "Custom Intro/Outro",
      "Basic Cuts & Transitions",
      "Text & Titles",
      "Background Music",
      "Sound Design",
      "Color Correction/Grading",
      "Graphic Elements",
      "Thumbnail Design",
    ],
    advertising: [
      "Video Duration",
      "Delivery Time",
      "Revision Rounds",
      "Logo Integration",
      "Basic Cuts & Transitions",
      "Text & Titles",
      "Background Music",
      "Sound Design",
      "Color Correction/Grading",
      "Motion Graphics",
      "Call-to-Action Elements",
    ],
  };

  // Updated pricing model with clear tiers
  const prices = {
    short: {
      basic: 19.90,
      standard: 29.90,
      premium: 49.90,
    },
    long: {
      basic: 59.90,
      standard: 89.90,
      premium: 119.90,
    },
    advertising: {
      basic: 39.90,
      standard: 69.90,
      premium: 99.90,
    },
  };

  // Define feature values for each tier
  const tierFeatureValues = {
    short: {
      basic: [
        "Up to 30 sec",
        "72 hours",
        "1 round",
        "Single ratio",
        "✓",
        "Basic",
        "✓",
        "✗",
        "Basic correction",
        "✗",
        "✗",
      ],
      standard: [
        "Up to 45 sec",
        "48 hours",
        "2 rounds",
        "Multiple ratios",
        "✓",
        "Animated",
        "✓",
        "✓",
        "Advanced correction",
        "Basic",
        "✗",
      ],
      premium: [
        "Up to 60 sec",
        "24 hours",
        "3 rounds",
        "All platforms",
        "✓",
        "Custom animated",
        "Premium selection",
        "Custom package",
        "Professional grading",
        "Advanced",
        "✓",
      ],
    },
    long: {
      basic: [
        "Up to 5 min",
        "5 days",
        "1 round",
        "Simple",
        "✓",
        "Basic",
        "✓",
        "✗",
        "Basic correction",
        "✗",
        "✗",
      ],
      standard: [
        "Up to 10 min",
        "4 days",
        "2 rounds",
        "Custom",
        "✓",
        "Animated",
        "✓",
        "Basic",
        "Advanced correction",
        "Basic",
        "✓",
      ],
      premium: [
        "Up to 15 min",
        "3 days",
        "3 rounds",
        "Animated custom",
        "✓",
        "Custom animated",
        "Premium selection",
        "Professional",
        "Professional grading",
        "Custom animated",
        "✓",
      ],
    },
    advertising: {
      basic: [
        "Up to 30 sec",
        "5 days",
        "1 round",
        "✓",
        "✓",
        "Basic",
        "✓",
        "✗",
        "Basic correction",
        "✗",
        "Simple",
      ],
      standard: [
        "Up to 60 sec",
        "4 days",
        "2 rounds",
        "Animated",
        "✓",
        "Animated",
        "✓",
        "Basic",
        "Advanced correction",
        "Basic",
        "Animated",
      ],
      premium: [
        "Up to 90 sec",
        "3 days",
        "3 rounds",
        "Custom animated",
        "✓",
        "Custom animated",
        "Premium selection",
        "Professional",
        "Professional grading",
        "Advanced",
        "Custom optimized",
      ],
    },
  };

  const activeFeatures = featuresByCategory[selectedCategory];
  const activeTierValues = tierFeatureValues[selectedCategory];
  const activePrice = prices[selectedCategory];

  return (
    <section className="py-20 relative">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-vid-red-950/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-2/3 bg-gradient-to-t from-vid-orange-950/20 to-transparent"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-vid-red-600/10 rounded-full transform translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-vid-orange-500/10 rounded-full transform -translate-x-1/3 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl px-4 relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple Pricing Packages
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Clear, transparent pricing based on your specific video needs
            </p>
          </motion.div>
        </div>
            
            <div className="flex justify-center mb-8">
          <div className="inline-flex p-1 bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-lg border border-gray-700/30">
            <button
              onClick={() => setSelectedCategory("short")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === "short"
                  ? "bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Short-Form
            </button>
            <button
              onClick={() => setSelectedCategory("long")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === "long"
                  ? "bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Long-Form
            </button>
                  <button
              onClick={() => setSelectedCategory("advertising")}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === "advertising"
                  ? "bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              Advertising
                  </button>
            </div>
        </div>

        <div className="overflow-x-auto">
        <motion.div 
            className="min-w-full bg-gradient-to-b from-gray-900/80 to-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          key={selectedCategory}
        >
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-800/40">
                  <th className="text-left p-5 bg-gradient-to-b from-gray-900/90 to-gray-900/70">Features</th>
                  <th className="p-5 bg-gradient-to-b from-gray-900/90 to-gray-900/70">
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-bold text-white mb-1">Basic</span>
                      <span className="text-2xl font-bold gradient-text">€{activePrice.basic}</span>
                      <span className="text-sm text-gray-400">per project</span>
                      </div>
                    </th>
                  <th className="p-5 bg-gradient-to-b from-vid-red-950/30 to-vid-orange-950/20 relative">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-vid-red-600 to-vid-orange-500"></div>
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-bold text-vid-red-400 mb-1">MOST POPULAR</span>
                      <span className="text-lg font-bold text-white mb-1">Standard</span>
                      <span className="text-2xl font-bold gradient-text">€{activePrice.standard}</span>
                      <span className="text-sm text-gray-400">per project</span>
                      </div>
                    </th>
                  <th className="p-5 bg-gradient-to-b from-gray-900/90 to-gray-900/70">
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-bold text-white mb-1">Premium</span>
                      <span className="text-2xl font-bold gradient-text">€{activePrice.premium}</span>
                      <span className="text-sm text-gray-400">per project</span>
                      </div>
                    </th>
              </tr>
            </thead>
            <tbody>
              {activeFeatures.map((feature, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-900/40" : "bg-gray-900/30"}>
                    <td className="p-4 border-r border-gray-800/30 font-medium text-gray-300">{feature}</td>
                    <td className="p-4 text-center border-r border-gray-800/30 text-gray-300">{activeTierValues.basic[index]}</td>
                    <td className="p-4 text-center border-r border-gray-800/30 text-gray-300 bg-vid-red-950/10">{activeTierValues.standard[index]}</td>
                    <td className="p-4 text-center text-gray-300">{activeTierValues.premium[index]}</td>
                </tr>
              ))}
              <tr>
                  <td className="p-5"></td>
                  <td className="p-5 text-center">
                  <a 
                      href="/contact" 
                      className="inline-block px-4 py-2 bg-gradient-to-r from-gray-800/40 to-gray-700/40 hover:from-gray-700/60 hover:to-gray-600/60 text-white rounded-lg transition-colors backdrop-blur-sm"
                  >
                    Select Basic
                  </a>
                </td>
                  <td className="p-5 text-center">
                  <a 
                      href="/contact" 
                      className="inline-block px-4 py-2 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white rounded-lg button-glow transition-colors"
                  >
                    Select Standard
                  </a>
                </td>
                  <td className="p-5 text-center">
                    <a 
                      href="/contact" 
                      className="inline-block px-4 py-2 bg-gradient-to-r from-gray-800/40 to-gray-700/40 hover:from-gray-700/60 hover:to-gray-600/60 text-white rounded-lg transition-colors backdrop-blur-sm"
                    >
                      Select Premium
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Need a custom editing solution?</p>
          <a 
            href="/contact" 
            className="inline-flex items-center text-vid-red-400 hover:text-vid-red-300 transition-colors"
          >
            <span className="mr-1">Contact us for custom packages</span>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 