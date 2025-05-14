"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type VideoCategory = "short" | "long" | "advertising";

export default function ComparisonTable() {
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>("short");

  const featuresByCategory = {
    short: {
      categoryName: "Short Videos",
      features: [
        { name: "Video Length", basic: "Up to 30s", standard: "Up to 1m", premium: "Up to 2m", enhanced: "Up to 3m", ultra: "Up to 5m" },
        { name: "Revisions", basic: "1", standard: "2", premium: "3", enhanced: "5", ultra: "Unlimited" },
        { name: "Turnaround Time", basic: "72h", standard: "48h", premium: "36h", enhanced: "24h", ultra: "12h" },
        { name: "Background Music", basic: "✓", standard: "✓", premium: "✓", enhanced: "✓", ultra: "✓" },
        { name: "Custom Colors", basic: "✓", standard: "✓", premium: "✓", enhanced: "✓", ultra: "✓" },
        { name: "Text Effects", basic: "✗", standard: "Basic", premium: "Advanced", enhanced: "Premium", ultra: "Ultra" },
        { name: "Transitions", basic: "Basic", standard: "Standard", premium: "Premium", enhanced: "Enhanced", ultra: "Ultra" },
        { name: "Stock Footage", basic: "1 clip", standard: "3 clips", premium: "5 clips", enhanced: "10 clips", ultra: "Unlimited" },
        { name: "Voice Over", basic: "✗", standard: "✗", premium: "✓", enhanced: "✓", ultra: "✓" }
      ]
    },
    long: {
      categoryName: "Long Videos",
      features: [
        { name: "Video Length", basic: "Up to 5m", standard: "Up to 10m", premium: "Up to 20m", enhanced: "Up to 15m", ultra: "Up to 30m" },
        { name: "Revisions", basic: "1", standard: "2", premium: "Unlimited", enhanced: "3", ultra: "Unlimited" },
        { name: "Turnaround Time", basic: "7 days", standard: "5 days", premium: "3 days", enhanced: "4 days", ultra: "48h" },
        { name: "Background Music", basic: "✓", standard: "✓", premium: "✓", enhanced: "✓", ultra: "✓" },
        { name: "Custom Colors", basic: "✓", standard: "✓", premium: "✓", enhanced: "✓", ultra: "✓" },
        { name: "Text Effects", basic: "Basic", standard: "Standard", premium: "Premium", enhanced: "Enhanced", ultra: "Ultra" },
        { name: "Transitions", basic: "Basic", standard: "Standard", premium: "Premium", enhanced: "Enhanced", ultra: "Ultra" },
        { name: "Stock Footage", basic: "3 clips", standard: "5 clips", premium: "Unlimited", enhanced: "10 clips", ultra: "Unlimited" },
        { name: "Voice Over", basic: "✗", standard: "✓", premium: "Professional", enhanced: "✓", ultra: "Professional" },
        { name: "Chapters/Sections", basic: "✗", standard: "✓", premium: "✓", enhanced: "✓", ultra: "✓" },
        { name: "Animated Infographics", basic: "✗", standard: "✗", premium: "✓", enhanced: "Basic", ultra: "Advanced" }
      ]
    },
    advertising: {
      categoryName: "Ad Videos",
      features: [
        { name: "Video Length", basic: "15-30s", standard: "30-60s", premium: "Up to 2m", enhanced: "Up to 90s", ultra: "-" },
        { name: "Revisions", basic: "1", standard: "2", premium: "Unlimited", enhanced: "3", ultra: "-" },
        { name: "Turnaround Time", basic: "72h", standard: "48h", premium: "24h", enhanced: "36h", ultra: "-" },
        { name: "Background Music", basic: "✓", standard: "✓", premium: "✓", enhanced: "✓", ultra: "-" },
        { name: "Custom Colors", basic: "✓", standard: "✓", premium: "✓", enhanced: "✓", ultra: "-" },
        { name: "Call to Action", basic: "Basic", standard: "Standard", premium: "Premium", enhanced: "Enhanced", ultra: "-" },
        { name: "Transitions", basic: "Basic", standard: "Standard", premium: "Premium", enhanced: "Enhanced", ultra: "-" },
        { name: "Stock Footage", basic: "1 clip", standard: "3 clips", premium: "Unlimited", enhanced: "5 clips", ultra: "-" },
        { name: "Voice Over", basic: "✗", standard: "✓", premium: "Professional", enhanced: "✓", ultra: "-" },
        { name: "Ad Platform Optimization", basic: "✗", standard: "✓", premium: "✓", enhanced: "✓", ultra: "-" },
        { name: "A/B Testing Versions", basic: "✗", standard: "✗", premium: "2 versions", enhanced: "✗", ultra: "-" }
      ]
    }
  };

  const activeFeatures = featuresByCategory[selectedCategory].features;
  const prices = {
    short: { basic: "$9.99", standard: "$19.50", premium: "$29.90", enhanced: "$39.99", ultra: "$49.90" },
    long: { basic: "$59.50", standard: "$69.99", enhanced: "$79.90", premium: "$99.99", expert: "$109.90", ultra: "$119.50" },
    advertising: { basic: "$29.90", standard: "$49.90", enhanced: "$59.50", professional: "$89.50", premium: "$119.50" }
  };

  return (
    <section className="py-24 relative" id="comparison">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-vid-red-600/5 rounded-full transform translate-x-1/4 -translate-y-1/4 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-vid-orange-500/5 rounded-full transform -translate-x-1/4 translate-y-1/4 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Package <span className="gradient-text">Comparison</span> Table
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Compare our packages side by side to find the perfect match for your needs
            </p>
            
            <div className="flex justify-center mb-8">
              <div className="inline-flex p-1 bg-gray-800 rounded-lg">
                {(["short", "long", "advertising"] as VideoCategory[]).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {featuresByCategory[category].categoryName}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="w-full overflow-x-auto card-hover rounded-xl bg-[#1a1a1a] p-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          key={selectedCategory}
        >
          <table className="w-full min-w-[768px]">
            <thead className="bg-gray-800/50">
              <tr>
                <th className="py-4 px-4 text-left text-gray-300 font-semibold w-1/5">Feature</th>
                {selectedCategory === 'short' && (
                  <>
                    <th className="py-4 px-4 text-center">
                      <div className="text-white font-bold">Basic</div>
                      <div className="text-vid-red-400 text-xl font-bold">{prices[selectedCategory].basic}</div>
                    </th>
                    <th className="py-4 px-4 text-center bg-gradient-to-b from-vid-red-900/20 to-transparent relative">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-vid-red-600 to-vid-orange-500"></div>
                      <div className="text-white font-bold">Standard</div>
                      <div className="text-vid-red-400 text-xl font-bold">{prices[selectedCategory].standard}</div>
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white text-xs uppercase font-bold py-1 px-2 rounded">
                        Popular
                      </div>
                    </th>
                    <th className="py-4 px-4 text-center">
                      <div className="text-white font-bold">Premium</div>
                      <div className="text-vid-red-400 text-xl font-bold">{prices[selectedCategory].premium}</div>
                    </th>
                    <th className="py-4 px-4 text-center">
                      <div className="text-white font-bold">Enhanced</div>
                      <div className="text-vid-red-400 text-xl font-bold">{prices[selectedCategory].enhanced}</div>
                    </th>
                    <th className="py-4 px-4 text-center">
                      <div className="text-white font-bold">Ultra</div>
                      <div className="text-vid-red-400 text-xl font-bold">{prices[selectedCategory].ultra}</div>
                    </th>
                  </>
                )}
                {selectedCategory === 'long' && (
                  <>
                    <th className="py-4 px-4 text-center">
                      <div className="text-white font-bold">Basic</div>
                      <div className="text-vid-red-400 text-xl font-bold">{prices[selectedCategory].basic}</div>
                    </th>
                    <th className="py-4 px-4 text-center bg-gradient-to-b from-vid-red-900/20 to-transparent relative">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-vid-red-600 to-vid-orange-500"></div>
                      <div className="text-white font-bold">Standard</div>
                      <div className="text-vid-red-400 text-xl font-bold">{prices[selectedCategory].standard}</div>
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white text-xs uppercase font-bold py-1 px-2 rounded">
                        Popular
                      </div>
                    </th>
                    <th className="py-4 px-4 text-center">
                      <div className="text-white font-bold">Enhanced</div>
                      <div className="text-vid-red-400 text-xl font-bold">{prices[selectedCategory].enhanced}</div>
                    </th>
                    <th className="py-4 px-4 text-center">
                      <div className="text-white font-bold">Premium</div>
                      <div className="text-vid-red-400 text-xl font-bold">{prices[selectedCategory].premium}</div>
                    </th>
                    <th className="py-4 px-4 text-center">
                      <div className="text-white font-bold">Ultra</div>
                      <div className="text-vid-red-400 text-xl font-bold">{prices[selectedCategory].ultra}</div>
                    </th>
                  </>
                )}
                {selectedCategory === 'advertising' && (
                  <>
                    <th className="py-4 px-4 text-center">
                      <div className="text-white font-bold">Basic</div>
                      <div className="text-vid-red-400 text-xl font-bold">{prices[selectedCategory].basic}</div>
                    </th>
                    <th className="py-4 px-4 text-center bg-gradient-to-b from-vid-red-900/20 to-transparent relative">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-vid-red-600 to-vid-orange-500"></div>
                      <div className="text-white font-bold">Standard</div>
                      <div className="text-vid-red-400 text-xl font-bold">{prices[selectedCategory].standard}</div>
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white text-xs uppercase font-bold py-1 px-2 rounded">
                        Popular
                      </div>
                    </th>
                    <th className="py-4 px-4 text-center">
                      <div className="text-white font-bold">Enhanced</div>
                      <div className="text-vid-red-400 text-xl font-bold">{prices[selectedCategory].enhanced}</div>
                    </th>
                    <th className="py-4 px-4 text-center">
                      <div className="text-white font-bold">Professional</div>
                      <div className="text-vid-red-400 text-xl font-bold">{prices[selectedCategory].professional}</div>
                    </th>
                    <th className="py-4 px-4 text-center">
                      <div className="text-white font-bold">Premium</div>
                      <div className="text-vid-red-400 text-xl font-bold">{prices[selectedCategory].premium}</div>
                    </th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {activeFeatures.map((feature, index) => (
                <tr key={index} className={`border-b border-gray-800 ${index % 2 === 1 ? 'bg-gray-800/10' : ''}`}>
                  <td className="py-3 px-4 text-white font-medium">{feature.name}</td>
                  <td className="py-3 px-4 text-center text-gray-300">
                    {feature.basic === "✓" ? (
                      <svg className="h-5 w-5 text-vid-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : feature.basic === "✗" ? (
                      <svg className="h-5 w-5 text-gray-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      feature.basic
                    )}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-300 bg-gradient-to-b from-vid-red-900/10 to-transparent">
                    {feature.standard === "✓" ? (
                      <svg className="h-5 w-5 text-vid-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : feature.standard === "✗" ? (
                      <svg className="h-5 w-5 text-gray-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      feature.standard
                    )}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-300">
                    {feature.premium === "✓" ? (
                      <svg className="h-5 w-5 text-vid-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : feature.premium === "✗" ? (
                      <svg className="h-5 w-5 text-gray-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      feature.premium
                    )}
                  </td>
                  <td className="py-3 px-4 text-center text-gray-300">
                    {feature.ultra === "✓" ? (
                      <svg className="h-5 w-5 text-vid-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : feature.ultra === "✗" ? (
                      <svg className="h-5 w-5 text-gray-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      feature.ultra
                    )}
                  </td>
                </tr>
              ))}
              <tr>
                <td className="py-6 px-4"></td>
                <td className="py-6 px-4 text-center">
                  <Link 
                    href={`/checkout?package=Basic&price=${selectedCategory === 'short' ? '9.99' : selectedCategory === 'long' ? '59.50' : '29.90'}`}
                    className="inline-block px-4 py-2 bg-gray-800 hover:bg-gray-700 transition-colors text-white rounded-lg text-sm font-medium"
                  >
                    Select Basic
                  </Link>
                </td>
                <td className="py-6 px-4 text-center bg-gradient-to-b from-vid-red-900/10 to-transparent">
                  <Link 
                    href={`/checkout?package=Standard&price=${selectedCategory === 'short' ? '19.50' : selectedCategory === 'long' ? '69.99' : '49.90'}`}
                    className="inline-block px-4 py-2 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white rounded-lg text-sm font-medium button-glow"
                  >
                    Select Standard
                  </Link>
                </td>
                <td className="py-6 px-4 text-center">
                  <Link 
                    href={`/checkout?package=${selectedCategory === 'advertising' ? 'Enhanced' : 'Premium'}&price=${selectedCategory === 'short' ? '29.90' : selectedCategory === 'long' ? '99.99' : '59.50'}`}
                    className="inline-block px-4 py-2 bg-gray-800 hover:bg-gray-700 transition-colors text-white rounded-lg text-sm font-medium"
                  >
                    {selectedCategory === 'advertising' ? 'Select Enhanced' : 'Select Premium'}
                  </Link>
                </td>
                <td className="py-6 px-4 text-center">
                  <Link 
                    href={`/checkout?package=${selectedCategory === 'short' ? 'Enhanced' : selectedCategory === 'long' ? 'Premium' : 'Professional'}&price=${selectedCategory === 'short' ? '39.99' : selectedCategory === 'long' ? '99.99' : '89.50'}`}
                    className="inline-block px-4 py-2 bg-gray-800 hover:bg-gray-700 transition-colors text-white rounded-lg text-sm font-medium"
                  >
                    {selectedCategory === 'short' ? 'Select Enhanced' : 
                     selectedCategory === 'long' ? 'Select Premium' : 
                     'Select Professional'}
                  </Link>
                </td>
                <td className="py-6 px-4 text-center">
                  <Link 
                    href={`/checkout?package=${selectedCategory === 'advertising' ? 'Premium' : 'Ultra'}&price=${selectedCategory === 'short' ? '49.90' : selectedCategory === 'long' ? '119.50' : '119.50'}`}
                    className="inline-block px-4 py-2 bg-gray-800 hover:bg-gray-700 transition-colors text-white rounded-lg text-sm font-medium"
                  >
                    {selectedCategory === 'advertising' ? 'Select Premium' : 'Select Ultra'}
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
} 