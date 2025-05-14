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
          className={`w-5 h-5 text-chess-gold-500 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
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
    <section className="py-20 bg-[#0a1628]" id="faq">
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
              Everything you need to know about our chess coaching services
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card-hover rounded-xl bg-[#0e2250] p-6 md:p-8">
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
              Still have questions? <a href="/contact" className="text-chess-gold-400 hover:text-chess-gold-300 transition-colors font-medium">Get in touch</a> with our coaching team.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 