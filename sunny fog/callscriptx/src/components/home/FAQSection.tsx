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
      className="border-b border-cs-blue-100 last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full py-5 px-1 text-left focus:outline-none transition-colors"
      >
        <h3 className="text-lg font-medium text-cs-navy-900">{question}</h3>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-cs-blue-50 transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <svg
            className="w-5 h-5 text-cs-blue-600 transform transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>
      
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-cs-navy-700">{answer}</p>
      </div>
    </motion.div>
  );
};

export default function FAQSection() {
  const faqs = [
    {
      question: "How does the sales script creation process work?",
      answer: "Our script creation process is simple: First, you select a package and place your order. Then you provide details about your product/service and target audience. Our professional copywriters will create a draft for your review. After you provide feedback, we'll make the necessary revisions and deliver the final script in your preferred format."
    },
    {
      question: "What types of sales scripts do you offer?",
      answer: "We offer various types of sales scripts including cold calling scripts, follow-up scripts, closing scripts, objection handling scripts, voicemail scripts, and more. Each script is tailored to your specific industry, product/service, and target audience."
    },
    {
      question: "How many revisions are included in each package?",
      answer: "The number of revisions varies by package. Basic packages include 1 revision, Standard packages include 2 revisions, and Premium packages include 3 revisions. Additional revisions beyond what's included can be purchased separately."
    },
    {
      question: "What's the typical turnaround time?",
      answer: "Our standard turnaround time is 24-48 hours for most script packages. Complex scripts or multiple script orders may take 3-5 business days. Rush services are available for an additional fee if you need your script sooner."
    },
    {
      question: "Do you provide customization for specific industries?",
      answer: "Yes, we specialize in industry-specific customization. Our writers have experience across various industries including SaaS, real estate, financial services, healthcare, retail, and more. We ensure your script uses the right terminology and addresses common objections specific to your industry."
    },
    {
      question: "Can you incorporate my company's tone and brand voice?",
      answer: "Absolutely! We tailor each script to match your company's tone, brand voice, and values. During the ordering process, you can provide examples of your existing marketing materials or communication style, and we'll ensure consistency throughout your script."
    },
    {
      question: "What if I'm not satisfied with the final script?",
      answer: "Your satisfaction is our priority. If you're not happy with the final script, we'll work with you to address your concerns through the revision process. If we can't meet your expectations after all included revisions, we offer a partial or full refund depending on the circumstances."
    },
    {
      question: "How do I receive my completed script?",
      answer: "After we complete your script, you'll receive it via email in both PDF and editable document formats. For Premium packages, we also include a professionally formatted version ready for your team to use, complete with talking points and potential objection responses highlighted."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-white" id="faq">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-cs-blue-50 rounded-bl-[100px] opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-cs-navy-50 rounded-tr-[80px] opacity-40"></div>
        
        {/* Animated dot pattern */}
        <div className="absolute inset-0 opacity-10" 
          style={{
            backgroundImage: 'radial-gradient(circle, #3a6fff 1px, transparent 1px)', 
            backgroundSize: '30px 30px'
          }}>
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute -right-40 top-1/3 w-80 h-80 rounded-full bg-cs-blue-200 mix-blend-multiply filter blur-[100px] opacity-30 animate-slow-float"></div>
        <div className="absolute -left-40 bottom-1/3 w-80 h-80 rounded-full bg-cs-navy-200 mix-blend-multiply filter blur-[100px] opacity-30 animate-slow-float-delay"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-cs-blue-50 text-cs-navy-700 border border-cs-blue-200 mb-4 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-cs-blue-500 mr-2"></span>
              Questions & Answers
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cs-navy-900">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-cs-navy-700 text-lg">
              Everything you need to know about our sales script services
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-cs-blue-100">
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
            <p className="text-cs-navy-700">
              Still have questions? <a href="/contact" className="text-cs-blue-600 hover:text-cs-blue-700 transition-colors font-medium">Get in touch</a> with our support team.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative element at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-cs-blue-500 via-cs-blue-400 to-cs-navy-500 opacity-10"></div>
      </div>
    </section>
  );
} 