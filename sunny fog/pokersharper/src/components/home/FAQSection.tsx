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
        <h3 className="text-lg font-medium text-white font-montserrat">{question}</h3>
        <svg
          className={`w-5 h-5 text-chip-gold-500 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
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
  const faqs = [
    {
      question: "How are coaching sessions conducted?",
      answer: "All coaching sessions are conducted one-on-one via Discord or Skype with screen sharing. Basic and Standard sessions last 1 hour, while Premium and Elite sessions last 2 hours. You'll need to share your screen and have your poker software ready. We'll analyze your gameplay, review hand histories, and provide personalized feedback and strategic advice tailored to your specific needs and game format."
    },
    {
      question: "What's the difference between the coaching tiers?",
      answer: "Basic coaching ($9.90-$19.90) provides foundational one-hour sessions for beginners focusing on core concepts. Standard coaching ($29.90-$49.90) offers one-hour sessions with more in-depth strategy and preparation. Premium coaching ($59.90-$79.90) includes comprehensive two-hour sessions with database analysis and advanced techniques. Elite coaching ($99.90-$119.90) delivers expert-level two-hour sessions with GTO solver analysis and highly personalized strategy development for professional players."
    },
    {
      question: "How do I prepare for my coaching session?",
      answer: "To get the most from your session, have your poker software and tracking tools ready if you use them. Prepare specific hands or scenarios you want to discuss, and consider having recent hand histories available for review. For Premium and Elite sessions, having your database ready for analysis is valuable. It's also helpful to come with specific questions or areas where you feel you need improvement. The more prepared you are, the more value you'll get from each session."
    },
    {
      question: "Can you help with specific poker formats and stakes?",
      answer: "Yes, our coaching is specialized by format (Cash Game, Tournament, or Spin & Go) and tailored to your stake level. Each coach has expertise in specific formats and can help with everything from micro to high stakes. Whether you're looking to improve your cash game fundamentals, tournament ICM decisions, or Spin & Go short-stack strategy, we match you with a coach who specializes in your preferred format and appropriate for your current stake level."
    },
    {
      question: "Do you offer hand history reviews?",
      answer: "Yes! Hand history review is included in all coaching sessions. You can submit hands in advance for the coach to review before your session, or we can analyze them together during the session. For Premium and Elite sessions, we can perform more extensive database analysis to identify patterns and leaks in your game. This approach helps us pinpoint specific areas for improvement and develop targeted strategies to address them."
    },
    {
      question: "Do you teach GTO or exploitative play?",
      answer: "We teach a balanced approach that combines both GTO principles and exploitative strategies. Our coaching starts with establishing solid theoretical foundations to ensure your strategy is fundamentally sound. From there, we focus on identifying and exploiting opponents' tendencies to maximize your win rate in your specific games. The balance between GTO and exploitation varies based on your playing environment, stake level, and personal style preferences."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#0a0e10] felt-texture" id="faq">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-montserrat">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Everything you need to know about our poker coaching services
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card-hover rounded-xl bg-[#151a1e] p-6 md:p-8">
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
              Still have questions? <a href="/contact" className="text-chip-gold-400 hover:text-chip-gold-300 transition-colors font-medium">Get in touch</a> with our coaching team.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 