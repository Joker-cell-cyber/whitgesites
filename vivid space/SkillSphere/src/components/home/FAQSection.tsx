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
      className="mb-6 last:mb-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className={`cyberpunk-border transition-all duration-300 ${isOpen ? 'bg-slate-800/40' : 'bg-transparent'}`}>
        <button
          onClick={toggleOpen}
          className="flex justify-between items-center w-full py-4 text-left focus:outline-none"
        >
          <div className="flex items-center">
            <div className={`mr-4 w-2 h-2 rounded-full ${isOpen ? 'bg-cyan-500' : 'bg-indigo-600'} transition-colors duration-300`}></div>
            <h3 className={`text-lg font-medium font-['Montserrat'] ${isOpen ? 'text-cyan-500' : 'text-white'} transition-colors duration-300`}>
              {question}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono ${isOpen ? 'text-cyan-500' : 'text-gray-400'}`}>
              {isOpen ? 'SYS:OPEN' : 'SYS:CLOSED'}
            </span>
            <div className={`flex items-center justify-center h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`${isOpen ? 'text-cyan-500' : 'text-gray-400'}`}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </button>
        
        <div
          className={`overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pt-2 pb-4 border-t border-cyan-500/30 mt-4">
            <p className="text-gray-300 font-['Space_Grotesk'] pl-6">
              <span className="text-cyan-500 font-mono text-xs mr-2">&gt;</span>
              {answer}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function FAQSection() {
  const faqs = [
    {
      question: "How are the coaching sessions conducted?",
      answer: "All coaching sessions are conducted via Discord. You'll receive a link to join a private voice channel with your coach at the scheduled time. Depending on the package, the coach may review your gameplay live, analyze your VODs, or guide you through specific training exercises to improve your skills."
    },
    {
      question: "What skill levels do you coach?",
      answer: "We coach players of all skill levels, from complete beginners to advanced competitive players. Our coaches adapt their approach based on your current skill level and goals. We have specific packages designed for different skill tiers to ensure you get the most appropriate guidance."
    },
    {
      question: "Do I need to have specific equipment for coaching?",
      answer: "The basic requirements are a computer or console to play on, a Discord account, and a microphone for communication. Some coaching packages that include VOD reviews may require screen recording software. Your coach can suggest free options if needed."
    },
    {
      question: "How do I schedule my coaching session?",
      answer: "After purchasing a coaching package, you'll receive a link to our scheduling system where you can select a time slot that works for both you and your assigned coach. We offer flexible scheduling with options available on weekdays and weekends."
    },
    {
      question: "What happens if I need to reschedule my session?",
      answer: "You can reschedule your session up to 24 hours before the scheduled time without any penalty. Cancellations or rescheduling with less than 24 hours' notice may result in a partial credit or fee, depending on the circumstances."
    },
    {
      question: "How quickly will I see improvement in my gameplay?",
      answer: "Improvement varies based on your starting skill level, how frequently you play, and how well you apply the coach's advice. Many players see noticeable improvements after just 1-2 sessions by fixing fundamental mistakes. For significant rank improvement, consistency is key, which is why our weekly packages often yield the best results."
    },
    {
      question: "Do you offer team coaching for my squad?",
      answer: "Yes, we offer specialized team coaching packages for organized teams and squads. These sessions focus on team coordination, strategy, and communication. Contact us for custom pricing and scheduling for team coaching, as these differ from our individual coaching packages."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 relative" id="faq">
      {/* Cyberpunk background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 hexagon-pattern opacity-30"></div>
        <div className="absolute top-20 right-0 w-72 h-72 bg-indigo-900/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-cyan-800/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-cyan-500/30 rounded-full animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-3 h-3 bg-indigo-500/30 rounded-full animate-pulse-glow"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <div className="inline-flex items-center justify-center px-6 py-2 border border-indigo-600/30 bg-indigo-900/20 rounded-md mb-6">
              <div className="w-2 h-2 bg-cyan-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-cyan-500 font-['Space_Grotesk'] uppercase tracking-widest text-sm">Database</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold font-['Montserrat'] mb-6 relative">
              Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-indigo-600">Questions</span>
              <div className="h-1 w-1/3 mx-auto bg-gradient-to-r from-indigo-600 to-cyan-500 mt-4"></div>
            </h2>
            
            <p className="text-gray-300 text-lg max-w-3xl mx-auto font-['Space_Grotesk']">
              Everything you need to know about our gaming coaching services
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="max-w-4xl mx-auto relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute top-0 left-0 w-full h-full border border-indigo-600/20 -m-2 rounded-lg"></div>
          <div className="absolute top-0 left-0 w-full h-full border border-cyan-500/20 m-2 rounded-lg"></div>
          
          <div className="bg-slate-900/50 backdrop-blur-sm border border-cyan-500/20 p-6 md:p-8 rounded-lg">
            <div className="flex items-center justify-between border-b border-indigo-600/30 pb-4 mb-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse mr-2"></div>
                <span className="font-mono text-xs text-cyan-500">SYSTEM.DATABASE.QUERY</span>
              </div>
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <div className="w-2 h-2 bg-indigo-600 rounded-full"></div>
              </div>
            </div>
            
            <div className="space-y-3">
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
          </div>
          
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-300 font-['Space_Grotesk']">
              Still have questions? <a href="/contact" className="text-cyan-500 hover:text-white transition-colors font-medium relative group">
                Get in touch
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 group-hover:w-full transition-all duration-300"></span>
              </a> with our support team.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 