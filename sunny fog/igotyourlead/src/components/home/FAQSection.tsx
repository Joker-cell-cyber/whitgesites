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
          className={`w-5 h-5 text-lead-blue-500 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
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

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
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
    },
    {
      question: "Can I request leads from specific industries or regions?",
      answer: "Yes, we offer customized lead packages for specific industries, regions, company sizes, and other targeting criteria. For custom requests, please contact our sales team for a tailored solution."
    }
  ];

  return (
    <section className="py-20 bg-[#0f172a]" id="faq">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to know about our lead generation services
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card-hover rounded-xl bg-[#1F2937] p-6 md:p-8">
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
              Still have questions? <a href="/contact" className="text-lead-blue-400 hover:text-lead-blue-300 transition-colors font-medium">Get in touch</a> with our support team.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 