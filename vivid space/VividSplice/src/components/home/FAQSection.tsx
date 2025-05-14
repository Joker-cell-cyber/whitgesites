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
      className={`mb-4 overflow-hidden rounded-xl bg-[#1a1a24] border border-gray-800 ${isOpen ? 'shadow-lg shadow-blue-900/10' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <button
        onClick={toggleOpen}
        className={`flex justify-between items-center w-full py-5 px-6 text-left focus:outline-none transition-all duration-300 ${isOpen ? 'bg-gradient-to-r from-blue-900/20 to-turquoise-900/20' : 'hover:bg-blue-900/10'}`}
      >
        <h3 className="text-lg font-medium text-white font-display pr-6">{question}</h3>
        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-turquoise-500 rotate-180' : 'bg-blue-600'}`}>
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
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
            className="px-6 pb-5 pt-2"
          >
            <motion.p
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-gray-300 leading-relaxed"
            >
              {answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQSection() {
  const faqs = [
    {
      question: "How does the video editing process work?",
      answer: "Our video editing process is simple: First, you select a package and place your order. Then you upload your raw footage and provide your editing instructions. Our professional editors will create a draft for your review. After you provide feedback, we'll make the necessary revisions and deliver the final video in your preferred format."
    },
    {
      question: "What formats do you accept for raw footage?",
      answer: "We accept most standard video formats including MP4, MOV, AVI, WMV, and MKV. We can also work with footage from smartphones, GoPros, DSLRs, and professional cameras. If you have footage in a different format, please contact us to check compatibility."
    },
    {
      question: "How many revisions are included in each package?",
      answer: "The number of revisions varies by package. Basic packages include 1 revision, Standard packages include 2 revisions, Premium packages include 3 revisions, and Ultra packages include unlimited revisions. Additional revisions beyond what's included can be purchased separately."
    },
    {
      question: "What's the typical turnaround time?",
      answer: "Turnaround times vary based on the package and video length. Short-form content typically takes 2-4 days, while long-form content may take 4-10 days. Advertising videos usually take 3-10 days depending on complexity. Rush services are available for an additional fee."
    },
    {
      question: "Do you provide music and sound effects?",
      answer: "Yes, we include royalty-free music and sound effects in all our packages. If you need licensed commercial music, we can guide you through the licensing process or recommend affordable alternatives. You can also provide your own music if you prefer."
    },
    {
      question: "Can you add subtitles or captions to my video?",
      answer: "Yes, we offer subtitling and captioning services for all video types. Basic subtitles are included in Standard packages and above. For Premium and Ultra packages, we offer multiple language options and styled captions to match your brand."
    },
    {
      question: "What if I'm not satisfied with the final product?",
      answer: "Your satisfaction is our priority. If you're not happy with the final product, we'll work with you to address your concerns through the revision process. If we can't meet your expectations after all included revisions, we offer a partial or full refund depending on the circumstances."
    },
    {
      question: "How do I send you my footage?",
      answer: "After placing your order, you'll receive a secure upload link where you can upload your footage directly to our servers. For larger files, we can also accept transfers via services like WeTransfer, Dropbox, or Google Drive. For extremely large projects, we can arrange alternative file transfer methods."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 relative overflow-hidden" id="faq">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-blue-900/5 to-transparent"></div>
        <div className="absolute left-0 top-0 w-full h-1/2 bg-gradient-to-b from-turquoise-900/5 to-transparent"></div>
        <div className="absolute right-0 top-1/3 w-80 h-80 bg-blue-600/10 rounded-full filter blur-3xl"></div>
        <div className="absolute left-0 bottom-1/3 w-80 h-80 bg-turquoise-600/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-4">
              <div className="h-1 w-10 bg-blue-500 inline-block mr-2"></div>
              <div className="h-1 w-5 bg-turquoise-500 inline-block"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-display">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Everything you need to know about our video editing services
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid gap-4">
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
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="inline-flex items-center px-6 py-4 bg-[#1a1a24] border border-gray-800 rounded-xl shadow-md">
              <div className="mr-4 flex-shrink-0 h-10 w-10 bg-gradient-to-r from-blue-600 to-turquoise-500 rounded-full flex items-center justify-center">
                <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-300">
                Still have questions? <a href="/contact" className="text-turquoise-400 hover:text-turquoise-300 transition-colors font-medium font-accent">Get in touch</a> with our support team.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 