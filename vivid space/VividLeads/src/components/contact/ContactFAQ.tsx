"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  return (
    <div className="border-b border-gray-800">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full py-5 text-left"
      >
        <h3 className="text-lg font-medium text-white">{question}</h3>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-gray-400">{answer}</p>
      </div>
    </div>
  );
};

export default function ContactFAQ() {
  const faqs = [
    {
      question: "What information should I include in my inquiry?",
      answer: "To help us serve you better, please include details about your lead generation needs, such as target industry, ideal customer profile, volume of leads needed, and any specific qualification criteria. The more details you provide, the better we can match you with the right lead solution."
    },
    {
      question: "How quickly will I receive a response?",
      answer: "We typically respond to all inquiries within 24 business hours. If your lead generation needs are urgent, please indicate this in your message, and we'll prioritize your request."
    },
    {
      question: "Can I request a sample of lead quality before purchasing?",
      answer: "Yes, we can provide sample lead profiles (with sensitive information redacted) to demonstrate the quality and depth of information included with our leads. This gives you confidence in what you'll receive before making a purchase."
    },
    {
      question: "Do you offer custom lead packages not listed on your pricing page?",
      answer: "Absolutely. Many of our clients have specific needs that require custom lead generation solutions. Please contact us with your requirements, and we'll create a tailored package that meets your exact specifications."
    },
    {
      question: "Can I schedule a consultation before committing to a lead package?",
      answer: "Yes, we offer free 20-minute lead strategy sessions to discuss your business goals, target audience, and lead qualification criteria. This helps us understand your needs better and allows you to determine if our services align with your objectives."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-lead-blue-900/5 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our lead generation services and how to get started.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-[#1F2937] rounded-xl border border-gray-800 overflow-hidden"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-300 mb-6">
            Still have questions? Our lead generation experts are ready to help.
          </p>
          <a
            href="mailto:support@vividleads.com"
            className="text-vivid-purple-400 hover:text-vivid-purple-300"
          >
            support@vividleads.com
          </a>
        </motion.div>
      </div>
    </section>
  );
} 