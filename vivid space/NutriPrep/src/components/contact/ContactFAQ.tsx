"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { COMPANY } from "@/app/constants/company";

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

const FAQItem = ({ question, answer, isOpen, onToggle }: FAQItemProps) => {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full py-5 text-left"
      >
        <h3 className="text-lg font-medium text-gray-800">{question}</h3>
        <ChevronDownIcon
          className={`h-5 w-5 text-turquoise-500 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

export default function ContactFAQ() {
  const faqs = [
    {
      question: "How quickly will I receive my meal plan after purchase?",
      answer: "For standard plans, you'll receive instant access after your payment is processed. For custom or personalized plans, delivery could take up to 24-48 hours as we tailor the plan to your specific requirements."
    },
    {
      question: "Can I request modifications to my meal plan?",
      answer: "Yes, all our meal plans can be customized for dietary restrictions. When placing your order, make sure to fill out the dietary questionnaire completely so we can accommodate your needs. For additional modifications after purchase, please contact our support team."
    },
    {
      question: "Do you offer refunds if I'm not satisfied?",
      answer: "We offer a satisfaction guarantee. If you're not satisfied with your meal plan within 7 days of purchase, please contact us and we'll work to adjust it to better meet your needs or provide a refund."
    },
    {
      question: "Do your meal plans include grocery delivery?",
      answer: "Our meal plans do not include grocery delivery, but they do come with comprehensive shopping lists organized by grocery store section to make your shopping experience efficient and straightforward."
    },
    {
      question: "Can I upgrade my meal plan after purchase?",
      answer: "Yes, you can upgrade your meal plan at any time. Simply contact our support team with your order details and the plan you'd like to upgrade to, and we'll process the change and charge only the difference in price."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative overflow-hidden bg-gray-50">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-turquoise-100 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our meal plans and services.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => toggleFAQ(index)}
            />
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-700 mb-6">
            Still have questions? We&apos;re here to help.
          </p>
          <a
            href={`mailto:${COMPANY.email}`}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-turquoise-600 to-purple-500 text-white rounded-lg font-medium button-glow"
          >
            Contact Our Support Team
          </a>
        </motion.div>
      </div>
    </section>
  );
} 