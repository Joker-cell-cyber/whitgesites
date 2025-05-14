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
      className="relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl overflow-hidden mb-4 group transition-all">
        <button
          onClick={toggleOpen}
          className="flex justify-between items-center w-full py-5 px-6 text-left transition-colors"
        >
          <h3 className="text-base md:text-lg font-medium text-white group-hover:text-[#8A2BE2] transition-colors">{question}</h3>
          <div className="relative flex-shrink-0 ml-4 w-5 h-5">
            <span className={`absolute inset-0 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 8L10 12.5L5.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
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
              <div className="px-6 pb-5 pt-0">
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4"></div>
                <p className="text-gray-400 leading-relaxed">{answer}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
    <section className="py-24 relative overflow-hidden" id="faq">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(15,15,20,1)_0%,rgba(5,5,10,1)_100%)]"></div>
        <div className="absolute inset-0 opacity-40 mix-blend-soft-light">
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-30"></div>
        </div>
      </div>

      {/* Mesh grid background */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
      
      {/* Floating gradients */}
      <div className="absolute right-[10%] top-0 w-[30rem] h-[30rem] rounded-full bg-gradient-to-br from-[#8A2BE2]/5 to-[#FF1493]/5 blur-[100px]"></div>
      <div className="absolute left-[5%] bottom-0 w-[40rem] h-[40rem] rounded-full bg-gradient-to-br from-[#FF1493]/5 to-[#8A2BE2]/5 blur-[100px]"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#FF1493] to-transparent"></div>
              <div className="px-4 text-[#FF1493] text-sm font-medium">FAQs</div>
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-[#FF1493] to-transparent"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#FF1493]/90 to-white">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to know about our career preparation services
            </p>
          </motion.div>
          
          {/* FAQ items */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            {/* Glass panel behind FAQs */}
            <div className="absolute inset-0 -m-6 backdrop-blur-md bg-white/5 rounded-3xl border border-white/10 z-0"></div>
            
            <div className="relative z-10 p-6 space-y-0">
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
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <div className="inline-block rounded-full backdrop-blur-md bg-white/5 border border-white/10 p-1">
              <a 
                href="/contact" 
                className="inline-flex items-center text-white font-medium hover:text-[#FF1493] transition-colors px-6 py-3"
              >
                <span>Still have questions?</span>
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 