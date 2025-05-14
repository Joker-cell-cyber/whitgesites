"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleOpen: () => void;
  index: number;
}

const FAQItem = ({ question, answer, isOpen, toggleOpen, index }: FAQItemProps) => {
  return (
    <motion.div 
      className="border-b border-gray-800 last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full py-5 px-1 text-left focus:outline-none transition-colors"
      >
        <h3 className="text-lg font-medium text-white group flex items-center">
          <span className="w-6 h-6 mr-2 flex-shrink-0 flex items-center justify-center bg-gradient-to-r from-toxic-green-500/20 to-toxic-green-500/10 rounded text-toxic-green-500 text-xs font-mono">
            {(index + 1).toString().padStart(2, '0')}
          </span>
          {question}
        </h3>
        <svg
          className={`w-5 h-5 text-toxic-green-500 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <div className="pl-8 pr-1 border-l-2 border-toxic-green-500/30">
          <p className="text-gray-400">{answer}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default function FAQSection() {
  const faqs = [
    {
      question: "How does your elite gaming boosting service operate?",
      answer: "Select your combat tier, define your objectives, and share your account credentials through our secure portal. Our elite team will execute the requested farming missions within the allocated time frame and deliver results with military-grade efficiency."
    },
    {
      question: "Are these power-leveling packages one-time purchases?",
      answer: "Affirmative. All packages are single tactical strikes - one-time purchases for the exact number of combat hours specified. Zero subscriptions. Zero recurring charges. Pure domination."
    },
    {
      question: "What games do your elite boosters support?",
      answer: "Our tactical team specializes in World of Warcraft, Diablo 4, Runescape (OSRS/RS3), Dofus, Genshin Impact, and EVE Online. Additional games can be requested through our Special Operations contact form."
    },
    {
      question: "What's included in each power tier?",
      answer: "Each tier includes dedicated combat hours (ranging from 1 to 60 hours based on rank), specialized resource acquisition with varying optimization protocols, and detailed operation reports. Elite tiers include multi-character support and proprietary automation scripts for maximum efficiency."
    },
    {
      question: "How are the combat hours utilized?",
      answer: "Every purchased hour represents actual gameplay time devoted to your specific objectives. Our elite operators focus exclusively on high-value targets, optimizing every minute for maximum resource extraction and character progression."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#070c15] relative overflow-hidden" id="faq">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-cyber-grid bg-[length:30px_30px] opacity-5"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-hexagon-pattern opacity-5"></div>
        
        {/* Animated scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
          <div className="absolute inset-x-0 h-[2px] bg-toxic-green-500/50 blur-[1px] animate-scan-line"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-toxic-green-500 to-transparent"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              INTEL <span className="cyber-text">DATABASE</span>
            </h2>
            
            <div className="gaming-divider mx-auto w-32 my-4"></div>
            
            <p className="text-gray-400 text-lg">
              Critical information for elite boosting operations
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card-hover rounded-xl bg-[#0c1220] p-6 md:p-8 pixel-corners border border-gray-800 relative">
            <div className="absolute top-0 right-0 m-6 px-2 py-1 bg-black/50 text-toxic-green-500 text-xs rounded border border-toxic-green-500/30 font-mono">
              SYSTEM: ONLINE
            </div>
            
            <div className="mb-6 border-b border-gray-800 pb-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-toxic-green-500 rounded-full mr-2 animate-pulse"></div>
                <p className="text-toxic-green-500 text-xs uppercase tracking-wider font-mono">Accessing Database Records</p>
              </div>
            </div>
            
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                toggleOpen={() => toggleFAQ(index)}
                index={index}
              />
            ))}
            
            <div className="loading-bar mt-6"></div>
          </div>
          
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="inline-flex items-center bg-black/50 px-6 py-3 rounded-lg border border-toxic-green-500/30">
              <svg className="h-5 w-5 text-toxic-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-gray-400">
                Need tactical support? <a href="/contact" className="text-toxic-green-400 hover:text-toxic-green-300 transition-colors font-medium">Deploy Special Operations Unit</a>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 