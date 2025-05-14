"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What types of scripts do you write?",
      answer: "We specialize in various video script formats including YouTube videos, TikTok content, Instagram Reels, educational content, promotional videos, explainer videos, product demonstrations, and more. Our writers can adapt to any style needed for your platform and audience."
    },
    {
      question: "How does the process work?",
      answer: "Our process is simple: 1) You submit your script requirements through our form, 2) We match you with the perfect writer for your content type, 3) You receive your draft within the promised timeframe, 4) You can request revisions if needed, and 5) Once satisfied, you receive your final script ready for production."
    },
    {
      question: "Can I request specific language or tone?",
      answer: "Absolutely! We customize each script to match your brand voice, whether you need professional, conversational, humorous, educational, or any other specific tone. Just let us know your preferences, and we'll make sure the script reflects your unique style."
    },
    {
      question: "How quickly can I get my script?",
      answer: "Our standard delivery times range from 2-5 business days depending on length and complexity. Need it faster? We also offer expedited services for urgent projects, with turnaround times as quick as 24 hours for an additional fee."
    },
    {
      question: "Do you provide revisions?",
      answer: "Yes, all our packages include at least one round of revisions. Premium packages offer multiple revision rounds to ensure you're completely satisfied with the final script. Additional revisions beyond your package allowance can be purchased if needed."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-vid-blue-50 to-white relative overflow-hidden" id="faq">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-vid-blue-100 rounded-full filter blur-[80px] opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/10 rounded-full filter blur-[80px] opacity-50"></div>
      </div>
    
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full px-4 py-1.5 text-sm bg-vid-blue-100 text-vid-blue-700 font-medium border border-vid-blue-200 mb-6"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-accent mr-2"></span>
            Have Questions?
          </motion.div>
        
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold mb-6 heading-font gradient-text"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-vid-blue-700 text-lg max-w-3xl mx-auto"
          >
            Everything you need to know about our script writing services for content creators.
          </motion.p>
        </div>
          
        <motion.div
          className="max-w-3xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg border border-vid-blue-100 overflow-hidden"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="flex justify-between items-center w-full text-left p-6 focus:outline-none transition-colors"
                aria-expanded={activeIndex === index}
              >
                <h3 className="text-lg font-medium text-vid-blue-900 heading-font pr-8">{faq.question}</h3>
                <div className={`flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-vid-blue-50 border border-vid-blue-100 transition-transform duration-300 ${
                  activeIndex === index ? "rotate-180 bg-accent/10 border-accent/20" : ""
                }`}>
                  <svg
                    className={`w-4 h-4 text-vid-blue-600 transition-colors ${
                      activeIndex === index ? "text-accent" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden border-t border-vid-blue-100"
                  >
                    <div className="p-6 pt-4 text-vid-blue-700">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-vid-blue-700 mb-6">
            Still have questions? We&apos;re here to help!
          </p>
          <a
            href="/contact"
            className="px-8 py-4 bg-accent hover:bg-accent-hover text-white rounded-full font-medium shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 transform hover:scale-[1.02] inline-flex items-center"
          >
            <span>Contact Us</span>
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 