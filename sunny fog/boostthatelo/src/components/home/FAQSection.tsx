"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
      {/* Gaming-themed background elements */}
      <div className="absolute inset-0 z-0">
        {/* Circuit board pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{
               backgroundImage: 'url("/circuit-board.svg")',
               backgroundSize: '100px 100px'
             }}></div>
             
        {/* Glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-blue-600/5 filter blur-[100px]"></div>
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-600/5 filter blur-[120px]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-gradient-to-r from-blue-900/30 to-purple-900/30 text-blue-300 backdrop-blur-sm border border-blue-500/20 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse mr-2"></span>
            Support Available 24/7
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-white">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Everything you need to know about our boosting services
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:gap-6 mt-12">
          {faqItems.map((item, index) => (
          <motion.div
              key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`card-game border ${activeIndex === index ? 'border-blue-500/50' : 'border-gray-800'} rounded-xl transition-all duration-300`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-5 flex justify-between items-center text-left"
              >
                <h3 className="text-lg font-bold text-white">{item.question}</h3>
                <div className={`h-8 w-8 rounded-full flex items-center justify-center bg-gray-800 transition-transform duration-300 ${activeIndex === index ? 'rotate-45' : ''}`}>
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </button>
              
              <div className={`px-6 overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                <div className="text-gray-300 leading-relaxed">
                  {item.answer}
                </div>
              </div>
          </motion.div>
          ))}
        </div>

        {/* Contact CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 rounded-2xl bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-8 md:p-10 border border-gray-800 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-blue-500/10 rounded-full filter blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
              <p className="text-gray-300">Our support team is available 24/7 to assist you with any queries</p>
            </div>
            
            <a 
              href="/contact" 
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors flex items-center space-x-2 whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>Contact Support</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 