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
        <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-r from-indigo-600/20 to-purple-600/20 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          <svg
            className="w-4 h-4 text-indigo-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
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
    <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden" id="faq">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 opacity-20 blur-3xl"></div>
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
              Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">Questions</span>
            </h2>
            <p className="text-gray-300 text-lg">
              Everything you need to know about our video editing services
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-gray-800 shadow-2xl shadow-indigo-500/10 bg-gradient-to-br from-gray-900/70 to-black/70 backdrop-blur-sm p-6 md:p-8">
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
            <p className="text-gray-300">
              Still have questions? <a href="/contact" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">Get in touch</a> with our support team.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 