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
      question: "What information should I include in my message?",
      answer: "To help us serve you better, please include details about your project, such as the type of content, duration, style preferences, and any deadlines. The more specific you are, the better we can address your needs."
    },
    {
      question: "How quickly will I receive a response?",
      answer: "We typically respond to all inquiries within 24 business hours. If your project is urgent, please indicate this in your message, and we'll do our best to prioritize your request."
    },
    {
      question: "Can I request a quote without committing to a project?",
      answer: "Absolutely! We're happy to provide a free quote with no obligation. Just let us know your project details, and we'll send you a detailed estimate of costs and timeframes."
    },
    {
      question: "Do you offer custom packages not listed on your pricing page?",
      answer: "Yes, we understand that every project is unique. If our standard packages don't meet your specific needs, please contact us to discuss a custom solution tailored to your requirements."
    },
    {
      question: "Can I schedule a consultation before committing to a project?",
      answer: "Yes, we offer free 15-minute consultations to discuss your project in detail. This helps us understand your vision better and allows you to see if we're the right fit for your needs."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-vid-red-900/5 to-transparent"></div>
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
            Find answers to common questions about contacting us and our services.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden"
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
            Still have questions? We&apos;re here to help.
          </p>
          <a
            href="mailto:info@superorganized.com"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-vid-red-600 to-vid-orange-500 text-white rounded-lg font-medium button-glow"
          >
            Contact Our Support Team
          </a>
        </motion.div>
      </div>
    </section>
  );
} 