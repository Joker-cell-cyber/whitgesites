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
      className="mb-4 last:mb-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="relative">
        {/* Background with gradient border */}
        <div className={`
          absolute inset-0 rounded-xl backdrop-blur-sm transition-all duration-300
          ${isOpen 
            ? 'bg-gradient-to-br from-felt-800/80 to-black/80 border border-poker-royal-700/40' 
            : 'bg-gradient-to-br from-felt-900/50 to-black/50 border border-gray-800/30'
          }
        `}></div>
        
        <div className="relative p-5">
          <button
            onClick={toggleOpen}
            className="flex justify-between items-center w-full text-left focus:outline-none group"
          >
            <h3 className="text-xl font-medium text-white font-montserrat pr-8">{question}</h3>
            <div className={`
              absolute right-5 top-5 flex items-center justify-center w-8 h-8 rounded-full 
              transition-all duration-300 
              ${isOpen 
                ? 'bg-chip-gold-500 text-black rotate-180' 
                : 'bg-felt-800 text-gray-300 group-hover:bg-felt-700'
              }
            `}>
              <svg
                className="w-5 h-5 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </button>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-gray-800/50">
                  <p className="text-gray-300 leading-relaxed">{answer}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
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
    <section className="relative py-28" id="faq">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c1014] to-[#07090c]"></div>
      
      {/* Playing card pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-[url('/images/card-pattern-bg.png')] bg-repeat opacity-10"></div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute left-0 top-0 w-1/3 h-1/3 bg-gradient-to-br from-poker-royal-800/20 to-transparent rounded-full filter blur-3xl"></div>
      <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-gradient-to-tl from-chip-gold-600/10 to-transparent rounded-full filter blur-3xl"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-felt-800/50 to-felt-900/50 rounded-full mb-4 border border-gray-800/30">
            <span className="text-sm text-gray-400">Got questions?</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat text-white">
            Frequently Asked <span className="bg-clip-text text-transparent bg-gradient-to-r from-chip-gold-400 to-chip-gold-600">Questions</span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Everything you need to know about our poker coaching services
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
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
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="inline-block p-px bg-gradient-to-r from-felt-800 via-chip-gold-500/30 to-felt-800 rounded-xl">
              <div className="bg-gradient-to-br from-black/80 to-felt-900/80 backdrop-blur-sm px-6 py-5 rounded-xl">
                <p className="text-gray-300 mb-2">
                  Still have questions about our coaching services?
                </p>
                <a 
                  href="/contact" 
                  className="text-chip-gold-400 hover:text-chip-gold-300 transition-colors font-medium inline-flex items-center group"
                >
                  <span>Get in touch with our coaching team</span>
                  <svg 
                    className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom decorative edge */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
    </section>
  );
} 