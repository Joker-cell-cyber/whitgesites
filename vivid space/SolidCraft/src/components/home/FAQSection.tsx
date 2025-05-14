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
      className="border-b border-[#c35a38]/10 last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full py-5 px-1 text-left focus:outline-none transition-colors hover:text-[#c35a38]"
      >
        <h3 className="text-lg font-medium font-fraunces text-[#3b332b] group-hover:text-[#c35a38]">{question}</h3>
        <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${isOpen ? "bg-[#c35a38] rotate-180" : "bg-[#c35a38]/10"}`}>
          <svg
            className={`w-5 h-5 ${isOpen ? "text-white" : "text-[#c35a38]"}`}
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
        <p className="text-[#3b332b]/80">{answer}</p>
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
    <section className="py-20 bg-[#fff8e9] relative overflow-hidden" id="faq">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#c35a38]/5 to-transparent"></div>
        <div className="absolute -right-64 top-40 w-96 h-96 bg-[#0d7682]/5 shape-blob"></div>
        <div className="absolute -left-64 bottom-40 w-96 h-96 bg-[#e05e41]/5 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-[#ffb75e]/10 shape-wave animate-float"></div>
              <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-[#0d7682]/10 rounded-full animate-pulse-glow"></div>
              
              <div className="inline-flex items-center px-4 py-1.5 rounded-full text-sm bg-[#0d7682]/10 text-[#0d7682] mb-4">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Let Us Help
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-5 font-fraunces text-[#3b332b]">
                Frequently Asked <span className="text-[#c35a38]">Questions</span>
              </h2>
              <p className="text-[#3b332b]/80 text-lg mb-6">
                Everything you need to know about our landing page platform
              </p>
              
              <div className="mt-8 mb-8 md:mb-0 relative">
                <div className="p-5 bg-[#fffdf7] rounded-2xl shadow-sm clay-effect relative z-10">
                  <div className="flex items-start">
                    <div className="bg-[#0d7682]/10 rounded-full p-3 mr-4">
                      <svg className="w-6 h-6 text-[#0d7682]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-[#3b332b] font-medium font-fraunces mb-1">Need more help?</h3>
                      <p className="text-[#3b332b]/70 text-sm mb-3">Get in touch with our support team.</p>
                      <a href="/contact" className="inline-flex items-center text-[#c35a38] font-medium text-sm hover:underline">
                        Contact us
                        <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-7">
            <motion.div 
              className="p-1 rounded-3xl bg-gradient-to-r from-[#c35a38]/20 to-[#0d7682]/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-2xl bg-[#fffdf7] p-6 md:p-8">
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
          </div>
        </div>
      </div>
    </section>
  );
} 