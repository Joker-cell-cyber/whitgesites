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
          className={`w-5 h-5 text-[#0078D7] transform transition-transform ${isOpen ? "rotate-180" : ""}`}
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
      question: "How can PrepFast improve my chances of getting hired?",
      answer: "PrepFast provides personalized career preparation services that target every aspect of your job search. We optimize your resume to pass through Applicant Tracking Systems (ATS), prepare you for challenging interview questions specific to your industry, and help you craft compelling application materials. Our clients typically see a 40-60% increase in interview invitations and significantly improved job offer rates."
    },
    {
      question: "What makes your resume services better than using templates?",
      answer: "While templates provide structure, they often lack personalization and can be recognized by ATS systems. Our resume services are tailored to your specific career goals, industry standards, and target positions. Our professional writers highlight your unique achievements, incorporate relevant keywords, and format your resume to showcase your strengths effectively. We also include ATS optimization to ensure your resume reaches human recruiters."
    },
    {
      question: "How do you prepare me for industry-specific interviews?",
      answer: "Our interview preparation is fully customized to your target industry. We pair you with coaches who have experience in your field and understand the specific challenges and questions you might face. Sessions include mock interviews with industry-specific technical questions, behavioral assessments, and guidance on demonstrating your expertise. We also provide detailed feedback and strategies to improve your performance in real interviews."
    },
    {
      question: "Do you offer specialized services for academic applications?",
      answer: "Yes, we offer comprehensive services for academic applications, including graduate school, professional programs, and scholarships. Our specialists help craft compelling personal statements, research proposals, and application essays. We also provide guidance on reference selection, CV formatting for academic contexts, and interview preparation specific to admissions committees. Our academic clients have been accepted to prestigious institutions worldwide."
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
              Everything you need to know about our career preparation services
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
              Still have questions? <a href="/contact" className="text-[#0078D7] hover:text-[#00B2A9] transition-colors font-medium">Get in touch</a> with our career advisors.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 