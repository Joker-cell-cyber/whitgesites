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
    <div className="border-b border-slate-700 last:border-b-0">
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full py-5 text-left focus:outline-none group"
      >
        <h3 className="text-lg font-medium text-white group-hover:text-teal-400 transition-colors">
          {question}
        </h3>
        <div className={`w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center transition-colors group-hover:bg-teal-900/30 ${isOpen ? 'bg-teal-900/30' : ''}`}>
          <svg
            className={`w-4 h-4 text-teal-500 transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="py-4 pr-8">
          <div className="pl-4 border-l-2 border-teal-600/40">
            <p className="text-slate-400">{answer}</p>
          </div>
        </div>
      </motion.div>
    </div>
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
    <section className="py-24 bg-gradient-to-b from-midnight-blue-800 to-midnight-blue-900 relative" id="faq">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-2 px-4 py-1 bg-teal-600/10 rounded-full text-teal-500 text-sm font-medium">
              Frequently Asked Questions
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              INTEL <span className="text-teal-500">DATABASE</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-600 to-amber-500 mx-auto mb-6"></div>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Critical information for elite boosting operations
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="sticky top-24"
            >
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-900/30 to-teal-600/20 flex items-center justify-center mb-6 border border-teal-600/30">
                  <svg className="w-8 h-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Need help?</h3>
                <p className="text-slate-400 mb-6">Our support team is ready to assist with any questions about our elite services.</p>
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors font-medium"
                >
                  <span>Contact Support</span>
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-2"
          >
            <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800">
              <div className="px-6 py-5 bg-slate-800/50 border-b border-slate-700 flex items-center">
                <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                <span className="text-teal-500 text-sm font-medium">Frequently Asked Questions</span>
              </div>
              
              <div className="p-6">
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
              </div>
              
              <div className="px-6 py-5 border-t border-slate-700 bg-slate-800/30">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400 text-sm">
                    Can't find what you're looking for?
                  </span>
                  <a 
                    href="/contact" 
                    className="text-teal-500 hover:text-teal-400 transition-colors text-sm font-medium"
                  >
                    Deploy Special Operations Unit
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