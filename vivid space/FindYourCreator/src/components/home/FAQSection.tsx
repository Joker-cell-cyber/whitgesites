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
      className="mb-6 last:mb-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div 
        className={`border-l-4 ${isOpen ? 'border-emerald-500' : 'border-slate-700'} bg-slate-900/50 rounded-lg overflow-hidden transition-all duration-300 ${isOpen ? 'shadow-lg shadow-emerald-900/10' : ''}`}
      >
        <button
          onClick={toggleOpen}
          className="flex justify-between items-center w-full p-5 text-left focus:outline-none"
        >
          <span className="text-lg font-medium text-white">{question}</span>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-slate-800 transition-all duration-300 ${isOpen ? 'bg-emerald-900/30 text-emerald-400' : 'text-slate-400'}`}>
            <svg
              className={`w-4 h-4 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
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
            isOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="p-5 pt-0 border-t border-slate-800/80">
            <p className="text-slate-300">{answer}</p>
          </div>
        </div>
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
    <section className="py-20 bg-gradient-to-b from-slate-950 to-emerald-950" id="faq">
      <div className="container mx-auto px-4 md:px-6">
        {/* Decorative elements */}
        <div className="absolute left-0 top-1/4 w-1/3 h-1/2 bg-emerald-900/20 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute right-0 bottom-1/4 w-1/3 h-1/2 bg-slate-800/30 rounded-full blur-[100px] -z-10"></div>
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Questions</span>
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mb-6"></div>
            <p className="text-slate-400 text-lg">
              Everything you need to know about our video editing services
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative backdrop-blur-sm rounded-2xl p-8 border border-slate-800/50">
            {/* Glassmorphism effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-slate-800/30 to-slate-900/70 -z-10"></div>
            
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
            <p className="text-slate-400">
              Still have questions? <a href="/contact" className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium underline-offset-4 hover:underline">Get in touch</a> with our support team.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 