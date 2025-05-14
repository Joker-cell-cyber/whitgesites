"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

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
      question: "What happens after I book a coaching session?",
      answer: "After booking, you'll receive a confirmation email with a detailed questionnaire to help us prepare for your session. This questionnaire asks about your current skill level, specific challenges, and goals. Once completed, you'll receive a scheduling link to choose a time slot that works best for you. This process ensures your coaching session is personalized and effective from the start."
    },
    {
      question: "How does the coaching process work?",
      answer: "Our coaching process has three main steps: First, you book a session and complete our preparation questionnaire. Second, you schedule your session using our booking system. Third, we conduct the coaching session via video call where we provide personalized guidance based on your needs and goals. After the session, you'll receive follow-up notes and resources to help implement what you've learned."
    },
    {
      question: "What information should I include in my message?",
      answer: "To help us serve you better, please include details about your experience level, your DAW of choice, the specific areas you want to improve, and your goals. The more specific you are, the better we can tailor our coaching to your needs."
    },
    {
      question: "How quickly will I receive a response?",
      answer: "We typically respond to all inquiries within 24 business hours. If you need to schedule a session soon, please indicate this in your message, and we'll do our best to accommodate your schedule."
    },
    {
      question: "Can I request information about coaching without committing to a session?",
      answer: "Absolutely! We're happy to provide more information with no obligation. Just let us know what you're interested in learning, and we'll send you detailed information about our coaching approach."
    },
    {
      question: "Do you offer custom packages not listed on your pricing page?",
      answer: "Yes, we understand that every producer has unique needs. If our standard packages don't meet your specific requirements, please contact us to discuss a custom coaching solution tailored to your goals."
    },
    {
      question: "Can I schedule a brief introduction call before booking a session?",
      answer: "Yes, we offer free 15-minute introduction calls to discuss your goals and experience. This helps us understand your needs better and allows you to see if we're the right fit for your learning style."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-beat-purple-900/5 to-transparent"></div>
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
            Find answers to common questions about our coaching services.
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
          <p className="text-gray-300 mb-6">
            Still have questions? We&apos;re here to help.
          </p>
          <a
            href="mailto:info@beatmaestro.com"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-beat-purple-600 to-beat-gold-500 text-white rounded-lg font-medium button-glow"
          >
            Contact Our Support Team
          </a>
        </motion.div>
      </div>
    </section>
  );
} 