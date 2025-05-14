"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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
    <section className="py-20 bg-[#0a0e1c]" id="faq">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently <span className="gradient-text">Asked</span> Questions
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Everything you need to know about our script writing services for content creators.
            </p>
          </motion.div>
          </div>
          
          <motion.div
          className="max-w-3xl mx-auto divide-y divide-gray-800"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
          {faqs.map((faq, index) => (
            <div key={index} className="py-5">
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="flex justify-between items-center w-full text-left focus:outline-none"
              >
                <h3 className="text-lg font-medium text-white">{faq.question}</h3>
                <span className="ml-6 flex-shrink-0">
                  <svg
                    className={`w-6 h-6 text-script-blue-500 transition-transform duration-200 ${
                      activeIndex === index ? "transform rotate-180" : ""
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
                </span>
              </button>
              <div
                className={`mt-2 transition-all duration-200 overflow-hidden ${
                  activeIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-gray-400 mb-4">
            Still have questions? We&apos;re here to help!
          </p>
          <a
            href="/contact"
            className="px-6 py-3 bg-gradient-to-r from-script-blue-600 to-script-purple-500 text-white rounded-lg font-medium button-glow inline-block"
          >
            Contact Us
          </a>
          </motion.div>
      </div>
    </section>
  );
} 