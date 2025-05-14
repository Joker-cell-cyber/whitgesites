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
          className={`w-5 h-5 text-game-blue-500 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
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
    <section className="py-20 bg-[#080a17]" id="faq">
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
              Everything you need to know about our gaming coaching services
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card-hover rounded-xl bg-[#14172c] p-6 md:p-8">
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
              Still have questions? <a href="/contact" className="text-game-blue-400 hover:text-game-blue-300 transition-colors font-medium">Get in touch</a> with our support team.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 