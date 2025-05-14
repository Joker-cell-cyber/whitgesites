"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  
  const faqs: FAQItem[] = [
    {
      question: "What languages do you support?",
      answer: "We support over 30 languages including English, Spanish, French, German, Italian, Portuguese, Chinese, Japanese, Russian, Arabic, and many more. For specific language pair inquiries, please contact our team."
    },
    {
      question: "How do you ensure translation accuracy?",
      answer: "Our translations are performed by professional linguists who are native speakers and subject matter experts. Each translation goes through a quality control process to ensure accuracy, consistency, and cultural appropriateness."
    },
    {
      question: "What file formats do you accept?",
      answer: "For text translations, we accept most document formats including DOCX, PDF, TXT, XLSX, HTML, and more. For video subtitling, we accept MP4, MOV, AVI, and other common video formats."
    },
    {
      question: "How long does a translation take?",
      answer: "Turnaround times vary based on content length, complexity, and language pair. Standard text translations typically take 1-3 days, while more complex projects or video subtitling may take 3-10 days. Expedited service is available for urgent needs."
    },
    {
      question: "Do you provide certified translations?",
      answer: "Yes, we can provide certified translations for official documents like birth certificates, academic transcripts, and legal documents. These translations include certification statements and can be used for immigration, education, and legal purposes."
    },
    {
      question: "How do I determine which package I need?",
      answer: "Choose your package based on word count (for text) or video length (for subtitling), complexity of content, and required turnaround time. For specialized content (legal, medical, technical), we recommend our Professional or Enterprise packages."
    },
    {
      question: "Can I request revisions to my translation?",
      answer: "Yes, all our packages include at least one revision round. The number of revision rounds increases with higher-tier packages, and our Enterprise packages include unlimited revisions."
    },
    {
      question: "How do you handle specialized terminology?",
      answer: "For technical, legal, medical, or other specialized content, we assign translators with relevant expertise in those fields. We can also work with client-provided glossaries to ensure terminology consistency."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden" id="faq">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-50" 
             style={{ 
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366F1' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
             }}
        ></div>
      </div>
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-[15%] w-96 h-96 bg-purple-600/5 rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-20 left-[10%] w-72 h-72 bg-indigo-600/5 rounded-full filter blur-[80px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center justify-center p-1 px-3 mb-4 rounded-full bg-indigo-950/80 border border-indigo-800/50 text-indigo-300 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Questions & Answers</span>
          </div>
          
          <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-purple-300">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-300 text-lg">
            Find answers to common questions about our translation services.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900/80 to-slate-900/40 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-xl border border-slate-800/50">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8"
          >
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="relative group">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex justify-between items-start w-full text-left focus:outline-none group"
                  >
                    <div className="pr-10">
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 mr-3 flex-shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-medium text-sm">
                          Q
                        </div>
                        <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors duration-200">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <span className="absolute right-0 top-1 flex-shrink-0 text-indigo-400">
                      {activeIndex === index ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </span>
                  </button>

                  {activeIndex === index && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 pl-11"
                    >
                      <div className="relative">
                        <div className="absolute -left-11 top-0 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-400/20 flex items-center justify-center text-indigo-300 font-medium text-sm border border-indigo-700/30">
                          A
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
                
                {index < faqs.length - 1 && <div className="absolute -bottom-4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-slate-700/30 to-transparent"></div>}
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 text-center bg-gradient-to-r from-indigo-900/30 to-purple-900/30 rounded-xl p-6 border border-indigo-800/30"
          >
            <p className="text-slate-300">
              Still have questions? <a href="/contact" className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors underline decoration-2 decoration-indigo-700/50 hover:decoration-indigo-500/70">Contact our team</a> for more information.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 