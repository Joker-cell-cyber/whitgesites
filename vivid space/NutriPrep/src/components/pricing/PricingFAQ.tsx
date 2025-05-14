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
        <svg
          className={`w-5 h-5 text-vid-red-500 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
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

export default function PricingFAQ() {
  const faqs = [
    {
      question: "What determines the price of my video editing project?",
      answer: "The price depends on several factors including video duration, complexity of edits required, turnaround time, number of revisions needed, and the type of content (short-form, long-form, or advertising). Our pricing packages are structured to accommodate these different factors while providing transparent pricing."
    },
    {
      question: "Can I switch between packages after starting a project?",
      answer: "Yes, you can upgrade your package at any time during the project. If you find that you need additional features or services, you can pay the difference and upgrade to a higher-tier package. However, downgrades are only possible before we begin work on your project."
    },
    {
      question: "Do your prices include music licensing costs?",
      answer: "Our packages include royalty-free music from our library. If you require premium licensed music or specific tracks, there may be additional licensing costs that aren't included in our base pricing. We'll always discuss these costs with you before proceeding."
    },
    {
      question: "Are there any hidden fees I should be aware of?",
      answer: "No, our pricing is transparent and the package costs are all-inclusive for the features listed. You'll only incur additional costs if you request services beyond your package scope, such as additional revisions, rush delivery, or premium stock footage/music beyond what's included."
    },
    {
      question: "Do you offer discounts for multiple videos or ongoing collaborations?",
      answer: "Yes, we offer discounts for bulk orders and retainer agreements. If you need multiple videos edited on a regular basis, we can create a custom pricing plan that offers better value than our standard packages. Please contact us to discuss your specific needs."
    },
    {
      question: "What's your payment process and what methods do you accept?",
      answer: "We require a 50% deposit before starting work, with the remaining 50% due upon project completion. For projects under $100, we require full payment upfront. We accept major credit cards, PayPal, and bank transfers. For ongoing collaborations, we can set up monthly billing cycles."
    },
    {
      question: "Do the packages include stock video or images?",
      answer: "Some packages include a limited number of stock video clips as specified. Additional stock footage or images beyond what's included will incur extra costs. We can provide quotes for additional stock media needs, or you can provide your own stock content."
    },
    {
      question: "What's your refund policy if I'm not satisfied?",
      answer: "Our goal is your complete satisfaction. If you're not happy with our work, we'll revise it according to the number of revision rounds included in your package. If we can't meet your expectations after all included revisions, we offer a partial refund on a case-by-case basis. We do not offer refunds for completed work that meets the agreed specifications."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#0a0a0a]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pricing <span className="gradient-text">FAQs</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Answers to common questions about our pricing and packages
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card-hover rounded-xl bg-[#1a1a1a] p-6 md:p-8">
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
            <p className="text-gray-400">
              Have more questions? <a href="/contact" className="text-vid-red-400 hover:text-vid-red-300 transition-colors font-medium">Contact us</a> and we&apos;ll be happy to help.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 