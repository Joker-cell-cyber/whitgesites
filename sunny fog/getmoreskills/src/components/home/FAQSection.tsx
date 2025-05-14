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
          className={`w-5 h-5 text-beat-purple-500 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
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
      question: "How do the music coaching sessions work?",
      answer: "Our coaching sessions are customized: you first choose a package that suits your needs. Then, we schedule an initial call to discuss your specific goals. Your coach will guide you with exercises and techniques adapted to your level. After each session, you receive practical exercises and personalized feedback to help you progress effectively."
    },
    {
      question: "Which music production software do you use for teaching?",
      answer: "We cover all major DAWs (Digital Audio Workstations) on the market, including Ableton Live, FL Studio, Logic Pro, and Pro Tools. We adapt our teaching to the software you're already using. If you're a beginner and haven't chosen a DAW yet, we'll recommend one that best matches your music style and goals."
    },
    {
      question: "How many sessions are needed to see progress?",
      answer: "The number of sessions varies depending on your starting level and goals. For beginners, a package of 8-10 sessions typically provides a solid foundation. For specific skill enhancement, 4-6 sessions may be sufficient. Our packages are flexible and can be adjusted based on your progress. Regular practice between sessions is also crucial for significant improvement."
    },
    {
      question: "What's the typical time between coaching sessions?",
      answer: "For optimal learning, we recommend weekly sessions, allowing sufficient time to practice the concepts covered. For intensive projects, bi-weekly sessions are possible. For lighter coaching, sessions can be spaced two weeks apart. We adapt to your schedule and learning pace."
    },
    {
      question: "Do you provide samples and presets for the courses?",
      answer: "Yes, all our packages include access to a library of royalty-free samples and presets. Premium and Ultra packages also include exclusive packs tailored to your music style. We'll also teach you how to create your own sounds and develop your unique sonic signature."
    },
    {
      question: "Do you offer specific sessions for mastering?",
      answer: "Absolutely, we offer specialized sessions in audio mastering. Since mastering is an advanced skill, we recommend having good foundations in mixing first. Our mastering courses cover professional techniques, specific tools, and optimization for different streaming platforms and physical media."
    },
    {
      question: "What happens if I'm not satisfied with a session?",
      answer: "Your satisfaction is our priority. If a session doesn't meet your expectations, we offer a free complementary session to address points that weren't sufficiently covered. If you feel the teaching approach doesn't suit you, we can offer another coach or a partial refund depending on the circumstances."
    },
    {
      question: "How do remote sessions work?",
      answer: "Remote sessions take place via Zoom or Discord with screen sharing and high-quality audio. We use tools like Audiomovers to ensure lossless audio transmission. You'll need a stable internet connection, quality headphones, and your DAW installed. Each session is recorded and sent to you afterward so you can review it."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-[#0a0a0a]" id="faq">
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
              Everything you need to know about our music coaching services
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card-hover rounded-xl bg-[#1a1a1a] p-6 md:p-8">
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
              Still have questions? <a href="/contact" className="text-beat-purple-400 hover:text-beat-purple-300 transition-colors font-medium">Contact us</a> directly.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 