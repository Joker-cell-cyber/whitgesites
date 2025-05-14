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
    <section className="py-20" id="faq">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-300">Find answers to common questions about our translation services.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto divide-y divide-indigo-800/30"
        >
            {faqs.map((faq, index) => (
            <div key={index} className="py-5">
              <button
                onClick={() => toggleFaq(index)}
                className="flex justify-between items-center w-full text-left focus:outline-none"
              >
                <h3 className="text-xl font-medium text-white">{faq.question}</h3>
                <span className="ml-6 flex-shrink-0">
                  {activeIndex === index ? (
                    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
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
                  className="mt-3"
                >
                  <p className="text-gray-400">{faq.answer}</p>
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
        
        <div className="mt-12 text-center">
            <p className="text-gray-400">
            Still have questions? <a href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">Contact us</a> for more information.
            </p>
        </div>
      </div>
    </section>
  );
} 