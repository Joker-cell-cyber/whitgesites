"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How does ELO boosting work?",
      answer: "Our professional boosters will play on your account to rapidly climb ranks. After your order, we assign a specialized booster for your game and rank range. They'll use their expertise to win games efficiently while maintaining your account's security with VPN protection. You can track progress in real-time through our dashboard."
    },
    {
      question: "Is boosting safe for my account?",
      answer: "Absolutely. We take multiple security measures to ensure account safety. All our boosters use high-quality VPNs matching your region, play in offline mode when possible, and follow strict security protocols. Our team implements industry-standard practices to protect your account throughout the boosting process."
    },
    {
      question: "How long will my boost take to complete?",
      answer: "Completion time varies based on the rank gap, game type, and selected options. Generally, smaller boosts (1-3 divisions) can be completed in 1-3 days, while larger boosts may take 1-2 weeks. Our system will provide an estimated timeframe when you place your order, and you can always check the progress in real-time."
    },
    {
      question: "Can I play on my account during boosting?",
      answer: "We recommend not playing on your account while a boost is active to avoid interfering with progress. However, if you need to play, just notify us through the dashboard and we'll pause the boost. You can resume the service whenever you're ready with no additional charges."
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="faq">
      {/* Completely redesigned background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-full h-full bg-[url('/images/subtle-dots.svg')] opacity-5"></div>
        <div className="absolute right-0 w-1/2 h-full bg-gradient-to-l from-rank-emerald-900/10 to-transparent"></div>
        <div className="absolute left-0 bottom-0 w-1/3 h-2/3 bg-gradient-to-tr from-rank-orange-900/10 to-transparent"></div>
        <div className="absolute right-20 top-20 w-72 h-72 rounded-full bg-rank-emerald-800/10 blur-3xl"></div>
        <div className="absolute left-40 bottom-20 w-64 h-64 rounded-full bg-rank-orange-800/10 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Completely redesigned header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="relative inline-block text-4xl md:text-5xl font-bold mb-6">
              <span className="absolute -top-10 -left-10 text-rank-emerald-600 opacity-10 text-7xl font-serif">Q</span>
              <span className="text-white">Your Questions</span>
              <span className="block gradient-text mt-2">Answered</span>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 rounded-full bg-gradient-to-r from-rank-emerald-500 to-rank-orange-500"></div>
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mt-8">
              Everything you need to know about our boosting services
            </p>
          </motion.div>

          {/* Split layout with sidebar for FAQ */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Left sidebar - FAQs categories */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-2"
            >
              <div className="sticky top-24 bg-gradient-to-br from-[#0d1511] to-[#0a0f0d] rounded-2xl overflow-hidden border border-rank-emerald-900/20 shadow-xl backdrop-blur-sm">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Common Questions</h3>
                  <p className="text-gray-400 mb-6">
                    Browse through our most frequently asked questions or contact our support team for personalized assistance.
                  </p>
                  
                  <div className="space-y-1 mt-6">
                    {faqItems.map((item, index) => (
                      <button 
                        key={index}
                        onClick={() => toggleAccordion(index)} 
                        className={`w-full py-3 px-4 text-left rounded-lg transition-all duration-300 flex items-center ${
                          activeIndex === index 
                            ? "bg-rank-emerald-900/40 text-rank-emerald-400" 
                            : "text-gray-300 hover:bg-rank-emerald-900/20"
                        }`}
                      >
                        <span className="mr-4">{index + 1}.</span>
                        <span className="font-medium">{item.question}</span>
                      </button>
                    ))}
                  </div>
                  
                  {/* Support CTA */}
                  <div className="mt-8 pt-6 border-t border-rank-emerald-900/30">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-rank-emerald-900/30 flex items-center justify-center text-rank-emerald-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-white">24/7 Support</h4>
                        <p className="text-sm text-gray-400">Our team is always here to help</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right side - FAQ Content */}
            <div className="lg:col-span-3">
              {faqItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: activeIndex === index ? 1 : 0,
                    height: activeIndex === index ? "auto" : "0px",
                    marginBottom: activeIndex === index ? "2rem" : "0px",
                    display: activeIndex === index ? "block" : "none"
                  }}
                  transition={{ duration: 0.5 }}
                  className="bg-rank-emerald-900/10 backdrop-blur-sm rounded-xl overflow-hidden"
                >
                  {/* Answer card with creative design */}
                  <div className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 rounded-full bg-rank-emerald-500 text-white font-bold flex items-center justify-center mr-4">
                        Q
                      </div>
                      <h3 className="text-xl font-bold text-white">{item.question}</h3>
                    </div>
                    
                    <div className="ml-14 relative">
                      <div className="absolute top-0 left-0 bottom-0 w-px bg-gradient-to-b from-rank-emerald-500 to-rank-orange-500"></div>
                      <div className="pl-8">
                        <div className="flex items-center mb-4">
                          <div className="w-10 h-10 absolute -left-5 rounded-full bg-rank-orange-500 text-white font-bold flex items-center justify-center">
                            A
                          </div>
                        </div>
                        <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-rank-emerald-900/20 flex justify-between items-center">
                      <div className="text-sm text-gray-400">
                        Was this helpful?
                      </div>
                      <div className="flex space-x-2">
                        <button className="px-4 py-2 rounded-lg border border-rank-emerald-900/30 text-rank-emerald-400 hover:bg-rank-emerald-900/20 transition-colors">
                          Yes
                        </button>
                        <button className="px-4 py-2 rounded-lg border border-rank-emerald-900/30 text-gray-400 hover:bg-rank-emerald-900/20 transition-colors">
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Visual element when no FAQ is selected */}
              {activeIndex === null && (
                <div className="h-80 rounded-xl bg-rank-emerald-900/5 border border-rank-emerald-900/20 flex items-center justify-center">
                  <div className="text-center px-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rank-emerald-900/30 flex items-center justify-center text-rank-emerald-400">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Select a Question</h3>
                    <p className="text-gray-400">Choose a question from the menu to see the answer</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Contact CTA completely redesigned */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 rounded-2xl overflow-hidden shadow-2xl relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rank-emerald-900/90 to-rank-orange-900/90"></div>
            <div className="absolute inset-0 bg-[url('/images/topography.svg')] opacity-10"></div>
            
            {/* Glowing orbs */}
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-rank-emerald-500/20 rounded-full filter blur-xl"></div>
            <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-rank-orange-500/20 rounded-full filter blur-xl"></div>
            
            <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-3/5">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Still have questions?</h3>
                <p className="text-gray-200 text-lg">
                  Our support team is available 24/7 to assist you with any queries about our boosting services. We're here to ensure your complete satisfaction.
                </p>
              </div>
              
              <div className="md:w-2/5 flex justify-center md:justify-end">
                <a 
                  href="/contact" 
                  className="group relative inline-flex items-center px-8 py-4 overflow-hidden rounded-xl bg-gradient-to-r from-rank-emerald-600 to-rank-emerald-500 text-white font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>Contact Support</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 