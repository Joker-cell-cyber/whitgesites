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
    <div className="border-b border-gray-800">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full py-5 text-left"
      >
        <h3 className="text-lg font-medium text-white">{question}</h3>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-400 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-gray-400">{answer}</p>
      </div>
    </div>
  );
};

export default function ContactFAQ() {
  const faqs = [
    {
      question: "What is ELO boosting?",
      answer: "ELO boosting is a service where a professional player logs into your account to play matches and increase your rank. The term 'ELO' comes from the chess rating system and is used to describe a player's skill level in competitive games."
    },
    {
      question: "Is boosting against the game's terms of service?",
      answer: "Many games discourage or prohibit account sharing and boosting. We take extensive security measures including VPN usage and offline mode to minimize any risk to your account. However, it's important to understand that there is always a small risk involved."
    },
    {
      question: "How long will my boost take?",
      answer: "The time required depends on the current rank, target rank, and game type. Small boosts (1-3 divisions) typically take 1-3 days, while larger boosts may require 1-2 weeks. Our dashboard provides estimated completion times for your specific boost."
    },
    {
      question: "Are there any payment plans available?",
      answer: "Currently, we only accept full payments upfront for boosting services. We process payments securely through our payment processor and offer various payment methods including major credit cards."
    },
    {
      question: "What happens if I'm not satisfied with the boosting service?",
      answer: "Customer satisfaction is our priority. If you're unhappy with our service, please contact our support team within 30 days of your purchase. We'll work to resolve any issues or provide a refund according to our refund policy."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-vid-red-900/5 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to the most common questions about our boosting services
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-3xl mx-auto bg-[#1a1a1a] rounded-xl border border-gray-800 overflow-hidden"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#1a1a1a] rounded-lg p-6 border border-gray-800"
            >
              <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
              <p className="text-gray-400">{faq.answer}</p>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <p className="text-gray-300 mb-6">
            Still have questions? We&apos;re here to help.
          </p>
          <a
            href={`mailto:${COMPANY.email}`}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-lg font-medium button-glow"
          >
            Contact Our Support Team
          </a>
        </motion.div>
      </div>
    </section>
  );
} 