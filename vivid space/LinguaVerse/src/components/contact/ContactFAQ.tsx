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

export default function ContactFAQ() {
  const faqs = [
    {
      question: "How do I request a translation?",
      answer: "You can request a translation by filling out our contact form with details about your project, including source language, target language, content type, and any special requirements. Our team will get back to you promptly with a quote and timeline."
    },
    {
      question: "What languages do you support?",
      answer: "We support over 30 languages including English, Spanish, French, German, Chinese, Japanese, Russian, Arabic, Portuguese, and many more. If you need a language that isn't listed, please reach out as we're constantly expanding our network of translators."
    },
    {
      question: "How long does a translation project take?",
      answer: "Translation timelines depend on several factors including document length, complexity, language pair, and any additional services required. As a general guideline, we can typically translate 1,000-3,000 words per day. Rush services are available for time-sensitive projects."
    },
    {
      question: "What file formats do you accept?",
      answer: "We accept a wide range of file formats including Word (.docx), PowerPoint (.pptx), Excel (.xlsx), PDF, InDesign, HTML, XML, and more. If you have a specific file format not listed here, please contact us to confirm compatibility."
    },
    {
      question: "Can you handle specialized or technical content?",
      answer: "Yes, we specialize in technical, legal, medical, and other specialized content translations. Our translators have domain expertise in various fields and understand the specific terminology required for accurate translations of complex materials."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-blue-900/5 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-gradient-blue">Questions</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Find answers to common questions about our translation services
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
            <p className="text-gray-400 mb-6">
              Didn&apos;t find what you&apos;re looking for? Reach out to us directly.
            </p>
            <a 
              href="#contact-form"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white rounded-lg font-medium button-glow"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 