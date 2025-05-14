"use client";

import { useState } from "react";

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
    <section className="py-24 bg-gray-50 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-1/2">
          <svg className="h-full w-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dotPattern" patternUnits="userSpaceOnUse" width="20" height="20">
                <circle cx="3" cy="3" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header with offset design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <div className="inline-flex items-center mb-6">
              <div className="h-10 w-1 bg-flow-green-500 mr-4"></div>
              <span className="text-flow-green-600 uppercase tracking-widest text-sm font-bold">FAQ</span>
            </div>
            
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Do you have any <br />
              <span className="text-flow-green-600">questions</span>?
            </h2>
          </div>
          
          <div className="lg:pt-16">
            <p className="text-xl text-gray-600 leading-relaxed">
              Here are the answers to the most frequently asked questions about our automation services
            </p>
          </div>
        </div>

        {/* Two column FAQ layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4 mb-20">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full p-6 flex justify-between items-start text-left focus:outline-none group"
                aria-expanded={openIndex === index}
              >
                <span className="text-lg font-semibold text-gray-900 group-hover:text-flow-green-600 transition-colors pr-4">
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 mt-1 w-6 h-6 rounded-full border-2 border-flow-green-500 flex items-center justify-center transition-transform duration-300 ${openIndex === index ? "bg-flow-green-500 transform rotate-45" : ""}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 ${openIndex === index ? "text-white" : "text-flow-green-500"}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index 
                    ? "max-h-96 opacity-100" 
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="p-6 pt-0 border-t border-gray-100">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA section with card design */}
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            {/* Background layer */}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 z-0"></div>
            
            {/* Content layer */}
            <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center">
              <div className="mb-8 md:mb-0 md:mr-12 md:w-2/3">
                <h3 className="text-3xl font-bold text-white mb-4">Do you have another question?</h3>
                <p className="text-gray-300 text-lg">
                  We're here to help. Contact us directly and we'll get back to you as soon as possible.
                </p>
              </div>
              
              <div className="flex-shrink-0">
                <a 
                  href="/contact" 
                  className="inline-flex items-center px-6 py-3 rounded-lg bg-flow-green-500 hover:bg-flow-green-600 text-white font-medium shadow-lg transition-colors"
                >
                  Contact us
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-40 h-40 border-4 border-flow-green-500/20 rounded-full"></div>
              <div className="absolute -bottom-12 -left-12 w-60 h-60 border-4 border-flow-green-500/10 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 