"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type VideoCategory = "short" | "long" | "advertising";

export default function ComparisonTable() {
  const [selectedCategory, setSelectedCategory] = useState<VideoCategory>("short");

  const featuresByCategory = {
    short: {
      categoryName: "Short-Form Content",
      features: [
        { name: "Video Duration", basic: "Up to 30 sec", standard: "Up to 30 sec", premium: "Up to 60 sec", ultra: "Up to 60 sec" },
        { name: "Turnaround Time", basic: "48 hours", standard: "48 hours", premium: "72 hours", ultra: "96 hours" },
        { name: "Revisions", basic: "1 round", standard: "2 rounds", premium: "3 rounds", ultra: "Unlimited" },
        { name: "Basic Cuts & Transitions", basic: "✓", standard: "✓", premium: "✓", ultra: "✓" },
        { name: "Text Overlays", basic: "✓", standard: "✓", premium: "✓", ultra: "✓" },
        { name: "Background Music", basic: "✓", standard: "✓", premium: "✓", ultra: "✓" },
        { name: "Sound Effects", basic: "✗", standard: "✓", premium: "✓", ultra: "✓" },
        { name: "Motion Graphics", basic: "✗", standard: "Basic", premium: "Advanced", ultra: "Custom" },
        { name: "Color Correction", basic: "✗", standard: "Basic", premium: "✓", ultra: "✓" },
        { name: "Color Grading", basic: "✗", standard: "✗", premium: "✓", ultra: "Advanced" },
        { name: "Audio Enhancement", basic: "✗", standard: "✗", premium: "✓", ultra: "✓" },
        { name: "Custom Text Animations", basic: "✗", standard: "✗", premium: "✓", ultra: "✓" },
        { name: "Stock Footage Included", basic: "0", standard: "0", premium: "1 clip", ultra: "3 clips" },
        { name: "Multiple Aspect Ratios", basic: "✗", standard: "✓", premium: "✓", ultra: "✓" },
        { name: "Visual Effects (VFX)", basic: "✗", standard: "✗", premium: "Basic", ultra: "Advanced" },
        { name: "Project Consultation", basic: "✗", standard: "✗", premium: "✗", ultra: "✓" },
      ]
    },
    long: {
      categoryName: "Long-Form Content",
      features: [
        { name: "Video Duration", basic: "Up to 5 min", standard: "Up to 10 min", premium: "Up to 15 min", ultra: "Up to 20 min" },
        { name: "Turnaround Time", basic: "4 days", standard: "5 days", premium: "7 days", ultra: "10 days" },
        { name: "Revisions", basic: "1 round", standard: "2 rounds", premium: "3 rounds", ultra: "Unlimited" },
        { name: "Basic Cuts & Transitions", basic: "✓", standard: "✓", premium: "✓", ultra: "✓" },
        { name: "Intro/Outro", basic: "Simple", standard: "Branded", premium: "Custom", ultra: "Custom" },
        { name: "Background Music", basic: "✓", standard: "✓", premium: "✓", ultra: "Custom Selection" },
        { name: "Sound Design", basic: "✗", standard: "Basic", premium: "Advanced", ultra: "Professional" },
        { name: "Motion Graphics", basic: "✗", standard: "Basic", premium: "Custom", ultra: "Advanced" },
        { name: "Color Correction", basic: "Minimal", standard: "✓", premium: "✓", ultra: "✓" },
        { name: "Color Grading", basic: "✗", standard: "✗", premium: "✓", ultra: "Professional" },
        { name: "Audio Enhancement", basic: "✗", standard: "✓", premium: "Complete", ultra: "Professional" },
        { name: "Lower Thirds/Titles", basic: "Simple", standard: "Basic", premium: "Animated", ultra: "Custom" },
        { name: "Stock Footage Included", basic: "0", standard: "2 clips", premium: "5 clips", ultra: "10 clips" },
        { name: "Thumbnail Design", basic: "✗", standard: "✗", premium: "Custom", ultra: "Custom" },
        { name: "End Screens & Cards", basic: "✗", standard: "Basic", premium: "Custom", ultra: "Custom" },
        { name: "Project Consultation", basic: "✗", standard: "✗", premium: "✓", ultra: "Detailed" },
        { name: "Multicam Editing", basic: "✗", standard: "✗", premium: "✗", ultra: "✓" },
        { name: "Audience Retention Optimization", basic: "✗", standard: "✗", premium: "Basic", ultra: "Advanced" },
      ]
    },
    advertising: {
      categoryName: "Advertising Videos",
      features: [
        { name: "Video Duration", basic: "Up to 30 sec", standard: "Up to 60 sec", premium: "Up to 90 sec", ultra: "Up to 2 min" },
        { name: "Turnaround Time", basic: "3 days", standard: "5 days", premium: "7 days", ultra: "10 days" },
        { name: "Revisions", basic: "1 round", standard: "2 rounds", premium: "3 rounds", ultra: "Unlimited" },
        { name: "Clean Professional Cuts", basic: "✓", standard: "✓", premium: "✓", ultra: "✓" },
        { name: "Text Overlays", basic: "✓", standard: "✓", premium: "✓", ultra: "✓" },
        { name: "Background Music", basic: "✓", standard: "✓", premium: "✓", ultra: "Custom" },
        { name: "Logo Integration", basic: "✓", standard: "Animated", premium: "Animated", ultra: "Custom Animation" },
        { name: "Call-to-Action", basic: "✓", standard: "✓", premium: "Custom", ultra: "Advanced" },
        { name: "Motion Graphics", basic: "✗", standard: "Basic", premium: "Advanced", ultra: "Premium" },
        { name: "Voice-over Integration", basic: "✗", standard: "✓", premium: "✓", ultra: "Multiple Languages" },
        { name: "Sound Effects", basic: "✗", standard: "✓", premium: "✓", ultra: "Custom Design" },
        { name: "Color Grading", basic: "Basic", standard: "✓", premium: "Professional", ultra: "Cinema-grade" },
        { name: "Stock Footage Included", basic: "0", standard: "3 clips", premium: "5 clips", ultra: "10 clips" },
        { name: "Multiple Format Delivery", basic: "✗", standard: "✓", premium: "✓", ultra: "✓" },
        { name: "Storytelling Structure", basic: "✗", standard: "✗", premium: "✓", ultra: "Advanced" },
        { name: "Audience Targeting Optimization", basic: "✗", standard: "✗", premium: "✓", ultra: "✓" },
        { name: "A/B Testing Versions", basic: "✗", standard: "✗", premium: "✗", ultra: "✓" },
        { name: "Storyboarding", basic: "✗", standard: "✗", premium: "Basic", ultra: "Detailed" },
      ]
    }
  };

  const activeFeatures = featuresByCategory[selectedCategory].features;
  const prices = {
    short: { basic: "$9.99", standard: "$19.50", premium: "$29.90", enhanced: "$39.99", ultra: "$49.90" },
    long: { basic: "$59.50", standard: "$69.99", enhanced: "$79.90", premium: "$99.99", expert: "$109.90", ultra: "$119.50" },
    advertising: { basic: "$29.90", standard: "$49.90", enhanced: "$59.50", professional: "$89.50", premium: "$109.90" }
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
          className="w-full overflow-x-auto card-hover rounded-xl bg-[#0b0b1e]/80 backdrop-blur border border-gray-800/50 p-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          key={selectedCategory}
        >
          <table className="w-full">
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
                  <a 
                    href="#pricing-tabs" 
                    className="inline-block px-4 py-2 bg-gray-800 hover:bg-gray-700 transition-colors text-white rounded-lg text-sm font-medium"
                  >
                    Select Basic
                  </a>
                </td>
                <td className="py-6 px-4 text-center bg-gradient-to-b from-vid-red-900/10 to-transparent">
                  <a 
                    href="#pricing-tabs" 
                    className="inline-block px-4 py-2 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white rounded-lg text-sm font-medium button-glow"
                  >
                    Select Standard
                  </a>
                </td>
                <td className="py-6 px-4 text-center">
                  <a 
                    href="#pricing-tabs" 
                    className="inline-block px-4 py-2 bg-gray-800 hover:bg-gray-700 transition-colors text-white rounded-lg text-sm font-medium"
                  >
                    {selectedCategory === 'advertising' ? 'Select Enhanced' : 'Select Premium'}
                  </a>
                </td>
                <td className="py-6 px-4 text-center">
                  <a 
                    href="#pricing-tabs" 
                    className="inline-block px-4 py-2 bg-gray-800 hover:bg-gray-700 transition-colors text-white rounded-lg text-sm font-medium"
                  >
                    {selectedCategory === 'short' ? 'Select Enhanced' : 
                     selectedCategory === 'long' ? 'Select Premium' : 
                     'Select Professional'}
                  </a>
                </td>
                <td className="py-6 px-4 text-center">
                  <a 
                    href="#pricing-tabs" 
                    className="inline-block px-4 py-2 bg-gray-800 hover:bg-gray-700 transition-colors text-white rounded-lg text-sm font-medium"
                  >
                    {selectedCategory === 'advertising' ? 'Select Premium' : 'Select Ultra'}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
} 