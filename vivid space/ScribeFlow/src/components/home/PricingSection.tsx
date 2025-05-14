"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);
  
  // Define pricing packages to match exactly with PricingTabs.tsx
  const pricingPackages = [
    {
      name: "E-Book XS",
      price: 9.99,
      wordCount: "5,000 words",
      revisions: "1 revision",
      coverDesign: false,
      delivery: "2 days",
      popular: false
    },
    {
      name: "E-Book XS+",
      price: 19.50,
      wordCount: "5,000 words",
      revisions: "2 revisions",
      coverDesign: true,
      delivery: "3 days",
      popular: false
    },
    {
      name: "E-Book S",
      price: 29.90,
      wordCount: "10,000 words",
      revisions: "1 revision",
      coverDesign: false,
      delivery: "3 days",
      popular: false
    },
    {
      name: "E-Book S+",
      price: 39.99,
      wordCount: "10,000 words",
      revisions: "2 revisions",
      coverDesign: true, 
      delivery: "4 days",
      popular: true
    },
    {
      name: "E-Book M",
      price: 49.90,
      wordCount: "15,000 words",
      revisions: "1 revision",
      coverDesign: false,
      delivery: "4 days",
      popular: false
    },
    {
      name: "E-Book M+",
      price: 59.50,
      wordCount: "15,000 words",
      revisions: "2 revisions",
      coverDesign: true,
      delivery: "5 days",
      popular: true
    },
    {
      name: "E-Book L",
      price: 69.99,
      wordCount: "20,000 words", 
      revisions: "1 revision",
      coverDesign: false,
      delivery: "5 days",
      popular: false
    },
    {
      name: "E-Book L+",
      price: 79.90,
      wordCount: "20,000 words",
      revisions: "2 revisions",
      coverDesign: true,
      delivery: "6 days",
      popular: false
    },
    {
      name: "E-Book XL",
      price: 89.50,
      wordCount: "30,000 words",
      revisions: "1 revision",
      coverDesign: false,
      delivery: "6 days",
      popular: false
    },
    {
      name: "E-Book XL+",
      price: 99.99,
      wordCount: "30,000 words", 
      revisions: "2 revisions",
      coverDesign: true,
      delivery: "7 days",
      popular: false
    },
    {
      name: "E-Book XXL",
      price: 109.90,
      wordCount: "40,000 words",
      revisions: "2 revisions",
      coverDesign: false,
      delivery: "7 days",
      popular: false
    },
    {
      name: "E-Book XXL+",
      price: 119.50,
      wordCount: "40,000 words",
      revisions: "3 revisions",
      coverDesign: true,
      delivery: "7 days",
      popular: false
    }
  ];

  return (
    <section className="py-28 relative overflow-hidden" id="pricing">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-scribe-indigo-50/30"></div>
      <div className="absolute top-0 left-0 w-full h-20 bg-[linear-gradient(to_right,rgba(121,40,202,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(121,40,202,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-gradient-to-tl from-scribe-turquoise-100/20 to-transparent rounded-full -z-10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-medium bg-scribe-indigo-100 text-scribe-indigo-800 mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Pricing</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-scribe-indigo-950">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500">Pricing</span> Packages
            </h2>
            
            <p className="text-scribe-indigo-700 text-lg mx-auto max-w-2xl">
              Simple solutions for all your publishing needs, from mini-guides to complete books.
            </p>
          </motion.div>
        </div>

        {/* Featured tiers - showing only first 6 packages for homepage */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {pricingPackages.slice(0, 6).map((pack, index) => (
            <motion.div
              key={pack.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`relative rounded-xl overflow-hidden border ${
                pack.popular
                  ? "border-scribe-indigo-500 shadow-lg"
                  : "border-scribe-indigo-100 shadow-md"
              } bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              {pack.popular && (
                <div className="absolute top-0 left-0 w-full text-white text-xs font-bold py-1.5 px-4 text-center bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500">
                  Popular Package
                </div>
              )}
              <div className={`p-6 ${pack.popular ? "pt-10" : ""}`}>
                <h3 className="text-xl font-bold text-scribe-indigo-900">{pack.name}</h3>
                <div className="flex items-baseline mb-5">
                  <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500">
                    ${pack.price}
                  </span>
                  <span className="ml-1 text-scribe-indigo-600">/book</span>
                </div>
                
                <div className="border-t border-scribe-indigo-100 my-5 pt-5">
                  <div className="space-y-4">
                    <div className="flex items-center bg-scribe-indigo-50 p-2 rounded-md">
                      <div className="bg-white p-1.5 rounded-full shadow-sm mr-3">
                        <svg className="w-5 h-5 text-scribe-turquoise-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                      </div>
                      <span className="text-scribe-indigo-800 font-medium">{pack.wordCount}</span>
                    </div>

                    <div className="flex items-center bg-scribe-indigo-50 p-2 rounded-md">
                      <div className="bg-white p-1.5 rounded-full shadow-sm mr-3">
                        <svg className="w-5 h-5 text-scribe-turquoise-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <span className="text-scribe-indigo-800 font-medium">{pack.revisions}</span>
                    </div>

                    <div className="flex items-center bg-scribe-indigo-50 p-2 rounded-md">
                      <div className="bg-white p-1.5 rounded-full shadow-sm mr-3">
                        <svg className="w-5 h-5 text-scribe-turquoise-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <span className="text-scribe-indigo-800 font-medium">Delivery: {pack.delivery}</span>
                    </div>

                    <div className="flex items-center bg-scribe-indigo-50 p-2 rounded-md">
                      <div className="bg-white p-1.5 rounded-full shadow-sm mr-3">
                        {pack.coverDesign ? (
                          <svg className="w-5 h-5 text-scribe-turquoise-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-scribe-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </div>
                      <span className="text-scribe-indigo-800 font-medium">
                        {pack.coverDesign ? "Cover design included" : "No cover design"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Link 
                  href={`/checkout?package=${encodeURIComponent(pack.name)}&price=${pack.price * 100}`}
                  className="mt-4 w-full block py-3 px-6 text-center bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500 hover:from-scribe-indigo-700 hover:to-scribe-turquoise-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:translate-y-[-2px]"
                >
                  Buy Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* View All Packages button */}
        <div className="text-center">
          <Link 
            href="/pricing" 
            className="inline-flex items-center px-8 py-3 rounded-lg bg-scribe-indigo-100 text-scribe-indigo-800 font-medium hover:bg-scribe-indigo-200 transition duration-300"
          >
            View All Packages
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
} 