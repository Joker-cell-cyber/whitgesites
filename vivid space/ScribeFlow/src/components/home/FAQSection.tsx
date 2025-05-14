"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      className="mb-5 last:mb-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className={`overflow-hidden rounded-2xl transition-all duration-300 ${
        isOpen 
          ? "bg-white shadow-lg border border-scribe-indigo-100" 
          : "bg-scribe-indigo-50/50 hover:bg-scribe-indigo-50 border border-transparent"
      }`}>
        <button
          onClick={toggleOpen}
          className="flex justify-between items-center w-full py-5 px-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-scribe-indigo-500 transition-all duration-300 rounded-2xl"
        >
          <h3 className={`text-lg font-semibold ${isOpen ? "text-scribe-indigo-700" : "text-scribe-indigo-900"}`}>{question}</h3>
          <div className={`flex-shrink-0 ml-4 h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
            isOpen ? "bg-scribe-indigo-600 text-white" : "bg-white text-scribe-indigo-600 shadow-sm"
          }`}>
            <svg
              className={`w-5 h-5 transform transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M12 6v12M6 12h12"} />
            </svg>
          </div>
        </button>
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 border-t border-scribe-indigo-100 pt-4 text-scribe-indigo-700 leading-relaxed">
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
    <section className="py-28 relative" id="faq">
      {/* Background decorative elements */}
      <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white to-scribe-indigo-50/30"></div>
      <div className="absolute left-0 top-1/4 w-1/3 h-1/3 bg-gradient-to-br from-scribe-indigo-50 to-transparent rounded-full blur-3xl opacity-70"></div>
      <div className="absolute right-0 bottom-0 w-1/4 h-1/4 bg-gradient-to-tl from-scribe-amber-50 to-transparent rounded-full blur-3xl opacity-60"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm font-medium bg-scribe-indigo-100 text-scribe-indigo-800 mb-6">
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" />
            </svg>
            <span>Support</span>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-scribe-indigo-950">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500">Questions</span>
          </h2>
          
          <p className="text-scribe-indigo-700 text-lg">
            Everything you need to know about our e-book writing services
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
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
          
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="p-6 rounded-2xl bg-gradient-to-r from-scribe-indigo-50 to-scribe-turquoise-50 border border-scribe-indigo-100">
              <p className="text-scribe-indigo-800 font-medium">
                Still have questions? 
                <a 
                  href="/contact" 
                  className="inline-flex items-center ml-2 text-scribe-indigo-600 hover:text-scribe-indigo-800 transition-colors font-semibold"
                >
                  Get in touch
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 