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
        <h3 className="text-lg font-medium text-white">{question}</h3>
        <svg
          className={`w-5 h-5 text-blue-500 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
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
        <p className="text-gray-400">{answer}</p>
      </div>
    </motion.div>
  );
};

export default function PricingFAQ() {
  const faqs = [
    {
      question: "What determines the price of my translation project?",
      answer: "Our pricing is primarily based on the complexity of your content, the language pair required, and whether you need additional services like dedicated project management or style guide adherence. We offer three simplified tiers - Basic, Professional, and Premium - to make it easy to choose the right option for your needs."
    },
    {
      question: "What's included in the Premium package that isn't in others?",
      answer: "The Premium package includes key benefits that aren't available in other tiers: multiple language pair support (for multi-language projects), complex technical content handling, style guide adherence for consistent terminology and tone, and a dedicated project manager who oversees your entire project from start to finish."
    },
    {
      question: "Can I upgrade my package after starting a project?",
      answer: "Yes, you can upgrade to a higher-tier package if you find that you need additional features or services during your project. Simply contact our support team, and they'll help you with the upgrade process and any additional payments required."
    },
    {
      question: "Do you offer discounts for large projects?",
      answer: "Yes, we offer volume discounts for large projects or ongoing collaboration. For substantial word counts or regular translation needs, we can create a custom pricing plan that offers better value than our standard packages. Please contact us to discuss your specific requirements."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers. For larger projects, we typically require a 50% deposit before starting work, with the remaining balance due upon completion. For ongoing collaborations, we can set up monthly billing cycles."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pricing <span className="text-gradient-blue">FAQs</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Answers to common questions about our simplified pricing packages
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card-hover rounded-xl bg-[#1a1a1a] p-6 md:p-8">
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
          
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-400">
              Have more questions? <a href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">Contact us</a> and we&apos;ll be happy to help.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 