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
      className="border-b border-gray-200 last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full py-5 px-1 text-left focus:outline-none transition-colors"
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <svg
          className={`w-5 h-5 text-blue-600 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
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
        <p className="text-gray-600">{answer}</p>
      </div>
    </motion.div>
  );
};

export default function PricingFAQ() {
  const faqs = [
    {
      question: "How is the price of my video script determined?",
      answer: "The price primarily depends on the video duration. The longer your script, the higher the price. Other factors such as the number of revisions and delivery time also influence the rate."
    },
    {
      question: "How many revisions are included in each package?",
      answer: "Our basic packages include 1 to 3 revisions depending on the package chosen. Premium packages offer unlimited revisions. Each revision allows you to refine your script until it perfectly matches your expectations."
    },
    {
      question: "What are the delivery timeframes?",
      answer: "Delivery times range from 48 to 120 hours depending on the package. Longer scripts require more time. Express delivery options are available upon request for an additional fee."
    },
    {
      question: "Are there any additional fees?",
      answer: "No, our pricing is transparent and includes all features listed in each package. Additional costs apply only if you request services beyond your package, such as extra revisions or urgent delivery."
    },
    {
      question: "Do you offer discounts for multiple scripts?",
      answer: "Yes, we offer volume discounts for multiple orders. If you need several scripts regularly, contact us to discuss a more advantageous custom package."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Answers to common questions about our packages and pricing
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="rounded-xl bg-white border border-gray-200 p-6 md:p-8 shadow-sm">
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
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-600">
              Have more questions? <a href="/contact" className="text-blue-600 hover:text-blue-800 transition-colors font-medium">Contact us</a> and we&apos;ll be happy to help.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 