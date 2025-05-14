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
    <motion.div 
      className="border-b border-gray-200 last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full py-6 text-left focus:outline-none group"
      >
        <h3 className="text-xl font-medium text-gray-900 group-hover:text-turquoise-600 transition-colors duration-200">
          {question}
        </h3>
        <div className={`relative w-8 h-8 flex-shrink-0 ml-4 ${isOpen ? "text-purple-500" : "text-turquoise-500"} transition-colors duration-300`}>
          <span className={`absolute top-1/2 left-0 w-full h-0.5 bg-current transform -translate-y-1/2 transition-transform duration-300`}></span>
          <span className={`absolute top-1/2 left-0 w-full h-0.5 bg-current transform -translate-y-1/2 transition-transform duration-300 ${isOpen ? "rotate-0 opacity-0" : "rotate-90"}`}></span>
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
            animate={{ height: "auto", opacity: 1, marginBottom: 24 }}
            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-gray-600 text-lg font-light leading-relaxed pr-8">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
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
    <section className="py-24 bg-white" id="faq">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <div className="flex flex-col items-start">
            <div className="w-20 h-1 bg-turquoise-500 mb-8"></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              Frequently Asked <span className="text-turquoise-500">Questions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mb-12 font-light">
              Everything you need to know about our meal prep and nutrition services
            </p>
          </div>
        </motion.div>

        <div className="relative">
          {/* Background decoration */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-50 rounded-full filter blur-3xl opacity-50"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-turquoise-50 rounded-full filter blur-2xl opacity-50"></div>
          
          <div className="relative z-10">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10">
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
              className="mt-14 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-lg text-gray-700">
                Still have questions? 
                <a href="/contact" className="relative inline-block ml-2 font-medium group">
                  <span className="relative z-10">Get in touch</span>
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-turquoise-500/30 group-hover:h-full group-hover:bg-turquoise-500/10 transition-all duration-200"></span>
                </a> 
                with our nutrition team.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 