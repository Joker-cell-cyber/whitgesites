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
      className="border-b border-gray-200 last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full py-5 px-1 text-left focus:outline-none transition-colors"
      >
        <h3 className="text-lg font-medium text-gray-800">{question}</h3>
        <svg
          className={`w-5 h-5 text-nutrition-green-500 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
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
        <p className="text-gray-600">{answer}</p>
      </div>
    </motion.div>
  );
};

export default function FAQSection() {
  const faqs = [
    {
      question: "How much time will meal prepping save me?",
      answer: "Meal prepping typically saves 5-10 hours per week. By preparing multiple meals at once, you eliminate daily cooking and cleanup time. Most of our subscribers report spending just 2-3 hours on Sunday preparing meals for the entire week, saving them approximately 1-2 hours each weekday that would otherwise be spent cooking individual meals."
    },
    {
      question: "Can I customize plans for dietary restrictions?",
      answer: "Absolutely! All our meal plans can be customized for dietary restrictions and preferences including gluten-free, dairy-free, nut-free, vegetarian, vegan, keto, paleo, and more. During signup, you'll complete a dietary preference questionnaire, and our nutritionists will tailor your meal plans accordingly."
    },
    {
      question: "How long do prepped meals stay fresh?",
      answer: "Most properly stored meal preps stay fresh for 3-5 days in the refrigerator. We provide detailed storage instructions with each recipe. For extended meal prepping, many of our recipes are freezer-friendly and can last 2-3 months when frozen. We also include guidance on which meals freeze well and the best reheating methods."
    },
    {
      question: "Do you provide shopping lists?",
      answer: "Yes, every meal plan comes with a comprehensive shopping list organized by grocery store section for efficiency. We also provide a consolidated ingredient list that helps you buy in bulk and reduce costs. Our Premium and Family plans include a smart shopping feature that adjusts quantities based on your household size to minimize waste."
    },
    {
      question: "How do your meal plans work for families?",
      answer: "Our Family Meal Plan is specifically designed for households with multiple people. It includes family-sized portions, kid-friendly options, and strategies for customizing dishes to accommodate different preferences within one meal. The plan also features time-saving tips for busy parents and nutritional information to ensure balanced meals for all family members."
    },
    {
      question: "What equipment do I need for meal prepping?",
      answer: "Basic meal prepping requires food storage containers, measuring cups/spoons, and standard kitchen tools. For optimal results, we recommend having a set of quality storage containers (preferably glass with compartments), a digital food scale, and a good chef's knife. More advanced meal preppers might benefit from a slow cooker, Instant Pot, or vacuum sealer, but these are optional."
    },
    {
      question: "Do I need cooking experience to follow your meal plans?",
      answer: "Not at all! Our meal plans include options for all skill levels. Beginners can start with our Simple Starter recipes that require minimal cooking skills. Each recipe includes step-by-step instructions, photos, and even video tutorials for more complex techniques. We also offer cooking skills workshops as part of our Premium and Custom packages."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50" id="faq">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Everything you need to know about our meal prep and nutrition services
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card-hover rounded-xl bg-white p-6 md:p-8">
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
            <p className="text-gray-600">
              Still have questions? <a href="/contact" className="text-nutrition-green-600 hover:text-nutrition-green-700 transition-colors font-medium">Get in touch</a> with our nutrition team.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 