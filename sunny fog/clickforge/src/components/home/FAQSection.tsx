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
      className="border-b border-[rgba(37,99,235,0.1)] last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full py-5 px-1 text-left focus:outline-none transition-colors"
      >
        <h3 className="text-lg font-medium text-white">{question}</h3>
        <div className={`flex items-center justify-center w-8 h-8 rounded bg-[rgba(37,99,235,0.1)] transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <svg
            className="w-5 h-5 text-[rgb(37,99,235)]"
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
      question: "What kind of landing pages can you create for me?",
      answer: "We specialize in creating high-converting landing pages for affiliate marketers and advertisers. Our landing pages are designed to maximize conversions for your specific offers, whether you're promoting products on social media, Google ads, or other traffic sources."
    },
    {
      question: "What's included in your landing page packages?",
      answer: "All our packages include responsive design (mobile-friendly), SEO optimization, fast loading speed, and custom branding integration. Premium and Enterprise packages add A/B testing setups, advanced analytics integration, multiple call-to-action sections, and more premium features to maximize your conversion rates."
    },
    {
      question: "Do I need to provide content for my landing page?",
      answer: "While you can provide your own content, our packages include professional copywriting tailored to your offer. Our copywriters specialize in creating persuasive content for affiliate marketing and advertising. We'll need basic information about your product/service and target audience to create effective content."
    },
    {
      question: "Can you integrate my affiliate links and tracking?",
      answer: "Absolutely! We integrate all your affiliate links, tracking pixels, and conversion tracking systems. We work with all major affiliate networks and tracking solutions. Our Enterprise package includes setup of advanced tracking features like dynamic parameters and click fraud protection."
    },
    {
      question: "Do I own the landing page once it's completed?",
      answer: "Yes, once your landing page is delivered and payment is complete, you have full ownership of the design and content. You can host it wherever you prefer, though many clients choose our optional hosting service for optimal performance and security."
    },
    {
      question: "How do you ensure high conversion rates?",
      answer: "Our landing pages are built by experts who understand conversion optimization for affiliate offers. We incorporate proven psychological triggers, optimized layouts, and clear call-to-action elements. For Premium and Enterprise clients, we also provide A/B testing setups to help you continuously improve conversion rates."
    },
    {
      question: "Do you offer revisions if I'm not satisfied?",
      answer: "Yes, all our packages include revision rounds - Basic (1 round), Premium (2 rounds), and Enterprise (unlimited revisions). We're committed to your satisfaction and will work with you until your landing page meets your requirements and conversion goals."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#0a0a0a] relative overflow-hidden" id="faq">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[rgba(37,99,235,0.03)] to-transparent"></div>
        <div className="absolute -right-64 top-40 w-96 h-96 bg-[rgba(37,99,235,0.02)] rounded-full blur-3xl"></div>
        <div className="absolute -left-64 bottom-40 w-96 h-96 bg-[rgba(124,58,237,0.02)] rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[rgba(37,99,235,0.1)] text-[rgb(37,99,235)] mb-4">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Common Questions
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to know about our landing page platform
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div 
            className="p-1 rounded-xl bg-gradient-to-r from-[rgba(37,99,235,0.2)] to-[rgba(124,58,237,0.2)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-lg bg-[#141414] p-6 md:p-8">
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
          </motion.div>
          
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="inline-flex items-center bg-[rgba(37,99,235,0.05)] rounded-full px-5 py-2 text-gray-400">
              <svg className="h-5 w-5 text-[rgb(37,99,235)] mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Still have questions? <a href="/contact" className="text-[rgb(37,99,235)] hover:text-[rgb(124,58,237)] transition-colors font-medium ml-1">Get in touch</a> with our support team.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 