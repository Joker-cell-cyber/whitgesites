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
      className="border-b border-book-blue-100 last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full py-5 px-1 text-left focus:outline-none transition-colors"
      >
        <h3 className="text-lg font-medium text-book-blue-900">{question}</h3>
        <svg
          className={`w-5 h-5 text-book-blue-500 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
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
        <p className="text-book-blue-700">{answer}</p>
      </div>
    </motion.div>
  );
};

export default function FAQSection() {
  const faqs = [
    {
      question: "What types of e-books do you write?",
      answer: "We write a wide variety of e-books across many niches including business guides, educational content, how-to manuals, fiction stories, personal memoirs, self-help books, and more. Our team of professional writers can adapt to different styles and subject matters to meet your specific needs."
    },
    {
      question: "Do you do the research?",
      answer: "Our services primarily focus on writing rather than extensive research. While we can incorporate information you provide, detailed technical research is not included in our standard packages. However, if you provide documentation and source materials, we can effectively organize and present that information in your e-book."
    },
    {
      question: "How does the revision process work?",
      answer: "The revision process begins after you receive the first draft. You'll review the content and provide specific feedback on what you'd like changed or improved. Depending on your chosen package, you'll have 1-4 revision rounds (or unlimited for our Enterprise package). We'll implement your requested changes until you're satisfied with the final result, within the scope of your package."
    },
    {
      question: "What formats do you deliver in?",
      answer: "We deliver e-books in various formats depending on your package. Basic packages include Word documents, while higher-tier packages include multiple formats such as PDF, EPUB, MOBI, and other major e-book formats. Our Professional and Enterprise packages also include print-ready files if you're planning to publish physical copies."
    },
    {
      question: "How do you handle specialized topics?",
      answer: "For specialized topics, we match you with writers who have experience or knowledge in your subject area. We also recommend providing reference materials, outlines, or specific guidance to ensure we capture the technical aspects correctly. While we can write on many specialized topics, remember that deep technical research is not included in our standard packages."
    },
    {
      question: "Do you provide cover design?",
      answer: "Yes, our Enhanced package includes basic cover design, while our Professional and Enterprise packages include premium cover design. Basic cover design features simple graphics and typography, while premium cover design includes custom illustrations or stock photography with advanced typography and professional layout."
    },
    {
      question: "What if I'm not satisfied?",
      answer: "Your satisfaction is our priority. If you're not happy with the content, we'll work with you through the revision process included in your package to address your concerns. If we can't meet your expectations after all included revisions, we offer a partial refund depending on the circumstances. We encourage clear communication about your expectations from the beginning to ensure the best results."
    },
    {
      question: "How long does it take?",
      answer: "Delivery times vary based on the package and word count. Basic e-books typically take 7-10 days, while more comprehensive packages may take 14-21 days. For our Enterprise package with custom word counts, we'll provide a timeline based on the scope of your project. Rush services are available for an additional fee, depending on our current workload."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white" id="faq">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-book-blue-900">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-book-blue-700 text-lg">
              Everything you need to know about our e-book writing services
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card-hover rounded-xl bg-white shadow-sm p-6 md:p-8">
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
            <p className="text-book-blue-700">
              Still have questions? <a href="/contact" className="text-book-blue-600 hover:text-book-blue-800 transition-colors font-medium">Get in touch</a> with our support team.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 