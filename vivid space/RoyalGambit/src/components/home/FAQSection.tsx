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
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <button
        onClick={toggleOpen}
        className="w-full py-6 border-t border-white/5 text-left focus:outline-none transition-colors group-hover:border-white/10 flex items-start"
      >
        <span className="text-chess-gold-500 mr-4 font-mono text-sm pt-1 opacity-50">{(index + 1).toString().padStart(2, '0')}</span>
        <div className="flex-1">
          <h3 className="text-xl font-medium text-white group-hover:text-chess-gold-400 transition-colors">{question}</h3>
          
          <div
            className={`mt-3 overflow-hidden transition-all duration-500 ease-in-out ${
              isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <p className="text-gray-400 leading-relaxed">{answer}</p>
          </div>
        </div>
        
        <div className="flex-shrink-0 ml-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-chess-gold-500 rotate-180' : 'bg-white/5'}`}>
            <svg
              className={`w-4 h-4 ${isOpen ? 'text-gray-900' : 'text-white'} transition-colors`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>
    </motion.div>
  );
};

export default function FAQSection() {
  const faqs = [
    {
      question: "How does the online chess coaching process work?",
      answer: "Our coaching process is straightforward: First, you select a coaching package based on your goals and skill level. Then, we'll schedule a session at your convenience. Before each session, you'll share your recent games and areas you want to improve. Your coach will analyze your play and create personalized training. Live sessions take place via video conferencing with an interactive chess board for real-time instruction."
    },
    {
      question: "What skill levels do you coach?",
      answer: "We coach players of all skill levels, from complete beginners to advanced tournament players (2200+ ELO). Each coaching package is tailored to your specific rating range and learning goals. Our coaches are experienced in working with players at various stages of development and can adapt their teaching methods accordingly."
    },
    {
      question: "How quickly will I see improvement in my ELO rating?",
      answer: "Improvement varies by individual, but most dedicated students see measurable ELO gains within 2-3 months of consistent coaching. Beginners often experience faster initial growth (100-200 points), while advanced players might see more incremental improvements. Your coach will set realistic expectations and milestones based on your starting level, learning pace, and practice commitment."
    },
    {
      question: "Do I need special software for the online coaching?",
      answer: "You'll need a computer with a webcam, microphone, and stable internet connection. We use popular video conferencing software along with interactive chess platforms like Lichess or Chess.com for the sessions. We'll provide detailed setup instructions before your first session and offer a brief technology check to ensure everything works smoothly."
    },
    {
      question: "How are the coaches qualified?",
      answer: "Our coaches are highly qualified chess professionals with a combination of strong playing credentials (minimum FIDE rating of 2100) and proven teaching experience. Many are titled players (FM, IM, GM) with years of coaching success. Each coach specializes in different aspects of chess instruction, allowing us to match you with the best mentor for your specific needs."
    },
    {
      question: "What's included in each coaching package?",
      answer: "Each package includes a set number of one-on-one coaching sessions, personalized homework assignments, game analysis, and access to our training resources. Higher-tier packages include additional features like opening repertoire development, tournament preparation, and more frequent sessions. All packages include email support between sessions and progress tracking."
    },
    {
      question: "Can I switch coaches if needed?",
      answer: "Yes, we understand that teaching styles and personality fit are important. If you feel your assigned coach isn't the right match, you can request a change after completing at least two sessions. We'll work with you to find a better fit without any disruption to your learning progress."
    },
    {
      question: "What if I need to reschedule a session?",
      answer: "We have a flexible rescheduling policy. Sessions can be rescheduled with at least 24 hours' notice at no charge. Last-minute cancellations or missed sessions may count against your package total, but we evaluate each situation individually and aim to be accommodating of unexpected circumstances."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 relative overflow-hidden" id="faq">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-0 bottom-0 right-0 h-1/3 bg-gradient-to-t from-[#05080f] to-transparent"></div>
        <div className="absolute right-0 top-0 w-1/3 aspect-square bg-[#0d1c3f]/20 rounded-full filter blur-[120px]"></div>
        <div className="absolute left-0 bottom-0 w-1/4 aspect-square bg-chess-gold-900/10 rounded-full filter blur-[80px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative mb-16"
          >
            <div className="absolute -left-12 top-1/2 transform -translate-y-1/2 h-[1px] w-8 bg-chess-gold-500/30"></div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              <span className="block">Frequently Asked</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-chess-gold-400 via-white to-chess-gold-300">Questions</span>
            </h2>
            <p className="mt-4 text-gray-400 text-lg max-w-xl">
              Everything you need to know about our chess coaching services
            </p>
          </motion.div>

          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -left-4 top-1/3 w-2 h-24 bg-gradient-to-b from-chess-gold-500/0 via-chess-gold-500/50 to-chess-gold-500/0"></div>
            
            <motion.div 
              className="relative backdrop-blur-sm bg-white/[0.02] border border-white/5 rounded-2xl p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
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
            </motion.div>
          </div>
          
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-400">
              Still have questions? <a href="/contact" className="inline-flex items-center text-chess-gold-400 hover:text-chess-gold-300 transition-colors font-medium">
                Get in touch
                <svg className="ml-1 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a> with our coaching team.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 