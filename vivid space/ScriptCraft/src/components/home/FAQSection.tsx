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
    <div 
      className={`mb-4 overflow-hidden rounded-lg transition-all duration-300 ${
        isOpen ? "bg-white shadow-lg" : "bg-vf-slate-50 hover:bg-white/70"
      }`}
    >
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full p-5 text-left focus:outline-none focus:ring-2 focus:ring-vf-amber-300 focus:ring-offset-2 rounded-lg transition-all"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-vf-slate-900 pr-8">{question}</h3>
        <div className={`w-6 h-6 rounded-full flex items-center justify-center border border-vf-amber-200 text-vf-amber-600 transition-transform ${isOpen ? "rotate-90" : ""}`}>
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0.5 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-vf-slate-700 border-t border-vf-slate-100 pt-3">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function FAQSection() {
  const faqs = [
    {
      question: "How does the sales script creation process work?",
      answer: "Our script creation process is simple: First, you select a package and place your order. Then you provide details about your product/service and target audience. Our professional copywriters will create a draft for your review. After you provide feedback, we'll make the necessary revisions and deliver the final script in your preferred format."
    },
    {
      question: "What types of sales scripts do you offer?",
      answer: "We offer various types of sales scripts including cold calling scripts, follow-up scripts, closing scripts, objection handling scripts, voicemail scripts, and more. Each script is tailored to your specific industry, product/service, and target audience."
    },
    {
      question: "How many revisions are included in each package?",
      answer: "The number of revisions varies by package. Basic packages include 1 revision, Standard packages include 2 revisions, and Premium packages include 3 revisions. Additional revisions beyond what's included can be purchased separately."
    },
    {
      question: "What's the typical turnaround time?",
      answer: "Our standard turnaround time is 24-48 hours for most script packages. Complex scripts or multiple script orders may take 3-5 business days. Rush services are available for an additional fee if you need your script sooner."
    },
    {
      question: "Do you provide customization for specific industries?",
      answer: "Yes, we specialize in industry-specific customization. Our writers have experience across various industries including SaaS, real estate, financial services, healthcare, retail, and more. We ensure your script uses the right terminology and addresses common objections specific to your industry."
    },
    {
      question: "Can you incorporate my company's tone and brand voice?",
      answer: "Absolutely! We tailor each script to match your company's tone, brand voice, and values. During the ordering process, you can provide examples of your existing marketing materials or communication style, and we'll ensure consistency throughout your script."
    },
    {
      question: "What if I'm not satisfied with the final script?",
      answer: "Your satisfaction is our priority. If you're not happy with the final script, we'll work with you to address your concerns through the revision process. If we can't meet your expectations after all included revisions, we offer a partial or full refund depending on the circumstances."
    },
    {
      question: "How do I receive my completed script?",
      answer: "After we complete your script, you'll receive it via email in both PDF and editable document formats. For Premium packages, we also include a professionally formatted version ready for your team to use, complete with talking points and potential objection responses highlighted."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-28 relative overflow-hidden" id="faq">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-vf-amber-50/30 z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 diagonal-pattern opacity-[0.15] z-0"></div>
      <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-transparent via-vf-amber-300/50 to-transparent"></div>
      <div className="absolute right-10 bottom-0 w-64 h-64 bg-vf-amber-200/20 rounded-full filter blur-3xl"></div>
      <div className="absolute left-10 top-1/4 w-32 h-32 bg-vf-teal-500/10 rounded-full filter blur-2xl"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm bg-white border border-vf-amber-200 text-vf-slate-700 shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-vf-amber-500 mr-2"></span>
              Questions & Answers
            </div>
            
            <h2 className="heading-lg mb-6">
              Frequently Asked <span className="text-vf-amber-600">Questions</span>
            </h2>
            <p className="text-vf-slate-600 text-lg max-w-xl mx-auto">
              Everything you need to know about our sales script services
            </p>
          </motion.div>

          {/* Tab-style FAQ layout */}
          <div className="grid md:grid-cols-5 gap-8">
            {/* FAQ navigation on desktop */}
            <div className="hidden md:block md:col-span-2">
              <div className="sticky top-24 bg-white/50 backdrop-blur-sm rounded-xl p-1 shadow-sm border border-vf-slate-200">
                {faqs.map((faq, index) => (
                  <button
                    key={index}
                    onClick={() => toggleFAQ(index)}
                    className={`w-full text-left p-3 rounded-lg mb-1 transition-all text-sm font-medium ${
                      openIndex === index 
                        ? "bg-vf-amber-500 text-white shadow-sm" 
                        : "text-vf-slate-700 hover:bg-vf-amber-50"
                    }`}
                  >
                    {faq.question}
                  </button>
                ))}
              </div>
            </div>
            
            {/* FAQ content - vertical accordion on mobile, selected content on desktop */}
            <div className="md:col-span-3">
              <div className="md:hidden">
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
              
              <div className="hidden md:block bg-white rounded-xl p-8 shadow-lg border border-vf-slate-200">
                <AnimatePresence mode="wait">
                  {openIndex !== null && (
                    <motion.div
                      key={openIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-xl font-semibold text-vf-slate-900 mb-4 pb-3 border-b border-vf-slate-100">
                        {faqs[openIndex].question}
                      </h3>
                      <div className="text-vf-slate-700 prose">
                        {faqs[openIndex].answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <p className="text-vf-slate-700 inline-flex items-center gap-2 bg-white py-2 px-4 rounded-full shadow-sm border border-vf-slate-200">
              Still have questions? 
              <a href="/contact" className="text-vf-amber-600 hover:text-vf-amber-700 transition-colors font-medium inline-flex items-center">
                Get in touch
                <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 