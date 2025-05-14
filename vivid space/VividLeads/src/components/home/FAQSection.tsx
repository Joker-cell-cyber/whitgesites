"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "What makes your lead generation service different?",
      answer: "Our lead generation process ensures you receive only high-quality, verified leads that match your specific business criteria. We combine advanced data analytics, manual verification, and intent signals to deliver leads that are more likely to convert."
    },
    {
      question: "How quickly will I receive my leads after purchase?",
      answer: "Delivery time depends on the package you select, ranging from 3-6 business days. Premium and industry-specific leads may take slightly longer as they undergo more thorough verification and qualification processes."
    },
    {
      question: "Are the leads exclusive or shared with other businesses?",
      answer: "We offer both exclusive and shared lead options. For shared leads, we guarantee they are only shared with a very limited number of businesses (maximum 2-3 companies) and strictly with non-competing businesses in different industries or geographic regions. This ensures you can still get high conversion rates while benefiting from more affordable pricing. Exclusive leads are also available and clearly marked in our pricing."
    },
    {
      question: "What information is included with each lead?",
      answer: "Depending on your package, leads typically include contact information (name, email, phone), company details, job title, industry, and various qualification data points. Premium packages include additional data like buying intent signals, technology usage, and budget information."
    }
  ];
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  return (
    <section className="py-24 relative" id="faq">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-full">
          <div className="absolute left-0 top-0 -ml-24 -mt-24 w-96 h-96 bg-vivid-purple-900/10 rounded-full filter blur-3xl"></div>
          <div className="absolute right-0 bottom-0 -mr-24 -mb-24 w-96 h-96 bg-vivid-amber-900/10 rounded-full filter blur-3xl"></div>
        </div>
        
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="absolute bg-gradient-to-br from-vivid-purple-500/5 to-vivid-amber-500/5 rounded-full"
              style={{
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-4">
            <span className="inline-block px-4 py-1 rounded-full bg-vivid-purple-900/20 text-vivid-purple-400 text-sm font-medium">
              Support
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Find answers to common questions about our lead generation services and how to get started.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-8">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div 
                onClick={() => toggleFAQ(index)}
                className={`relative cursor-pointer transition-all duration-300 p-6 rounded-xl
                  ${openIndex === index 
                    ? 'bg-gradient-to-r from-vivid-purple-900/30 to-vivid-amber-900/30' 
                    : 'bg-gray-900/50 hover:bg-gray-900/70'
                  }`}
              >
                {/* Decorative element */}
                <div className={`absolute left-0 top-0 w-full h-full rounded-xl overflow-hidden transition-opacity duration-300 pointer-events-none ${openIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-vivid-purple-600/10 to-vivid-amber-500/10"></div>
                  <div className="absolute inset-0 backdrop-blur-[1px]"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-vivid-purple-500/60 via-transparent to-vivid-amber-500/60"></div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-vivid-purple-500/60 via-transparent to-vivid-amber-500/60"></div>
                </div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className={`font-medium text-lg transition-colors duration-200 ${openIndex === index ? 'text-white' : 'text-gray-200'}`}>
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0 pt-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${openIndex === index ? 'bg-gradient-to-r from-vivid-purple-500 to-vivid-amber-500 text-white' : 'bg-gray-800 text-gray-400 group-hover:bg-gray-700'}`}>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-300 ${openIndex === index ? 'transform rotate-45' : ''}`} 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        key={`answer-${index}`}
                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                        animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="text-gray-400 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-px rounded-full bg-gradient-to-r from-vivid-purple-500 to-vivid-amber-500">
            <div className="px-8 py-4 rounded-full bg-gray-900 backdrop-blur-sm">
              <p className="text-gray-300 font-medium">
                Still have questions? <a href="/contact" className="text-white font-semibold inline-flex items-center group">
                  Contact our support team
                  <svg 
                    className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 