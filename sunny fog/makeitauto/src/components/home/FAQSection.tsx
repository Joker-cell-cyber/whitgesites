"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is process automation and how can it help my business?",
      answer: "Process automation involves using technologies to automatically execute repetitive tasks that were previously performed manually. It can help your business save time, reduce errors, increase productivity, and allow your team to focus on higher-value tasks."
    },
    {
      question: "How long does it take to implement an automation solution?",
      answer: "Implementation time varies depending on the complexity of your project. A simple automation can be deployed in a few days, while a more complex system might take 2 to 4 weeks. We always define a precise timeline during the planning phase so you know exactly what to expect."
    },
    {
      question: "Which automation platforms do you use?",
      answer: "We primarily use Make.com (formerly Integromat) and Zapier, which are the market leaders in no-code automation. These platforms offer hundreds of integrations with popular applications. We can also develop custom solutions using APIs if necessary."
    },
    {
      question: "Do I need technical knowledge to use your automation solutions?",
      answer: "No, no technical knowledge is required. We design solutions that are easy to use and maintain. Additionally, we provide comprehensive training and detailed documentation to help you get the most out of your automation."
    },
    {
      question: "Can I modify my automation after it's implemented?",
      answer: "Absolutely! Business needs evolve and your automations should follow. We offer maintenance and update services to adapt your automation solutions to your evolving needs. Plus, we show you how to make minor modifications yourself."
    },
    {
      question: "What types of processes can be automated?",
      answer: "Many processes can be automated, including form management, data synchronization between applications, order processing, document creation, lead routing, report generation, email notifications, and much more. If you have a repetitive process that follows defined rules, it can probably be automated."
    },
  ];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-make-purple-50/50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-make-purple-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-make-blue-100 rounded-full blur-3xl opacity-30 -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-make-purple-100 to-make-blue-100 text-make-purple-800 text-sm font-medium mb-6">
              Frequently Asked Questions
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              Do you have any <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-make-purple-500 to-make-blue-500 bg-clip-text text-transparent">questions</span>
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-make-purple-100/70 -z-10 rounded-sm"></span>
              </span> ?
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Here are the answers to the most frequently asked questions about our automation services
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="max-w-4xl mx-auto"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              className="mb-6"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }
                }
              }}
            >
              <button
                onClick={() => toggleQuestion(index)}
                className={`w-full text-left p-6 bg-white rounded-2xl shadow-md border border-gray-100 flex justify-between items-center transition-all ${
                  openIndex === index ? "rounded-b-none border-b-0" : ""
                }`}
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-gray-900 pr-6">{faq.question}</span>
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-make-purple-100 transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-make-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-white border border-gray-100 border-t-0 rounded-b-2xl shadow-md">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional question prompt */}
        <motion.div 
          className="max-w-4xl mx-auto mt-16 bg-gradient-to-r from-make-purple-500/10 to-make-blue-500/10 p-8 rounded-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Do you have another question?</h3>
          <p className="text-gray-600 mb-6">
            We're here to help. Contact us directly and we'll get back to you as soon as possible.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 rounded-xl bg-white text-make-purple-700 font-medium shadow-md hover:shadow-lg transition-shadow"
          >
            Contact us
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 