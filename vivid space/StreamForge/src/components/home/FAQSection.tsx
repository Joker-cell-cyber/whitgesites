"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Tooltip from "@/components/ui/Tooltip";
import NeonButton from "@/components/ui/NeonButton";
import GlowText from "@/components/ui/GlowText";

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
      className={`relative mb-6 overflow-hidden border-[3px] ${index % 3 === 0 ? 'border-emerald-500' : index % 3 === 1 ? 'border-fuchsia-500' : 'border-amber-500'} rounded-md`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      {/* Decorative elements */}
      <div className={`absolute top-0 left-0 w-3 h-3 ${index % 3 === 0 ? 'bg-emerald-500' : index % 3 === 1 ? 'bg-fuchsia-500' : 'bg-amber-500'}`}></div>
      <div className={`absolute top-0 right-0 w-3 h-3 ${index % 3 === 0 ? 'bg-emerald-500' : index % 3 === 1 ? 'bg-fuchsia-500' : 'bg-amber-500'}`}></div>
      <div className={`absolute bottom-0 left-0 w-3 h-3 ${index % 3 === 0 ? 'bg-emerald-500' : index % 3 === 1 ? 'bg-fuchsia-500' : 'bg-amber-500'}`}></div>
      <div className={`absolute bottom-0 right-0 w-3 h-3 ${index % 3 === 0 ? 'bg-emerald-500' : index % 3 === 1 ? 'bg-fuchsia-500' : 'bg-amber-500'}`}></div>
      
      <div className={`absolute top-0 right-0 h-full w-1.5 ${index % 3 === 0 ? 'bg-emerald-500' : index % 3 === 1 ? 'bg-fuchsia-500' : 'bg-amber-500'}`}></div>
      <div className={`absolute bottom-0 left-0 h-1.5 w-full ${index % 3 === 0 ? 'bg-emerald-500' : index % 3 === 1 ? 'bg-fuchsia-500' : 'bg-amber-500'}`}></div>
      
      <button
        onClick={toggleOpen}
        className={`flex justify-between items-center w-full py-6 px-6 text-left focus:outline-none transition-colors ${isOpen ? 'bg-black' : 'bg-zinc-900/80 hover:bg-black/60'}`}
      >
        <h3 className={`text-lg font-extrabold ${index % 3 === 0 ? 'text-emerald-400' : index % 3 === 1 ? 'text-fuchsia-400' : 'text-amber-400'}`}>
          {question}
        </h3>
        <div className={`flex items-center justify-center w-8 h-8 rounded-md border-2 ${index % 3 === 0 ? 'border-emerald-500 text-emerald-400' : index % 3 === 1 ? 'border-fuchsia-500 text-fuchsia-400' : 'border-amber-500 text-amber-400'}`}>
          <svg
            className={`w-5 h-5 transform transition-transform ${isOpen ? "rotate-180" : ""}`}
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
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className={`py-6 px-6 bg-black`}>
          <p className="text-gray-300 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default function FAQSection() {
  const faqs = [
    {
      question: "How does the video editing process work?",
      answer: "Our video editing process is simple: First, you select a package and place your order. Then you upload your raw footage and provide your editing instructions. Our professional editors will create a draft for your review. After you provide feedback, we'll make the necessary revisions and deliver the final video in your preferred format."
    },
    {
      question: "What formats do you accept for raw footage?",
      answer: "We accept most standard video formats including MP4, MOV, AVI, WMV, and MKV. We can also work with footage from smartphones, GoPros, DSLRs, and professional cameras. If you have footage in a different format, please contact us to check compatibility."
    },
    {
      question: "How many revisions are included in each package?",
      answer: "The number of revisions varies by package. Basic packages include 1 revision, Standard packages include 2 revisions, Premium packages include 3 revisions, and Ultra packages include unlimited revisions. Additional revisions beyond what's included can be purchased separately."
    },
    {
      question: "What's the typical turnaround time?",
      answer: "Turnaround times vary based on the package and video length. Short-form content typically takes 2-4 days, while long-form content may take 4-10 days. Advertising videos usually take 3-10 days depending on complexity. Rush services are available for an additional fee."
    },
    {
      question: "Do you provide music and sound effects?",
      answer: "Yes, we include royalty-free music and sound effects in all our packages. If you need licensed commercial music, we can guide you through the licensing process or recommend affordable alternatives. You can also provide your own music if you prefer."
    },
    {
      question: "Can you add subtitles or captions to my video?",
      answer: "Yes, we offer subtitling and captioning services for all video types. Basic subtitles are included in Standard packages and above. For Premium and Ultra packages, we offer multiple language options and styled captions to match your brand."
    },
    {
      question: "What if I'm not satisfied with the final product?",
      answer: "Your satisfaction is our priority. If you're not happy with the final product, we'll work with you to address your concerns through the revision process. If we can't meet your expectations after all included revisions, we offer a partial or full refund depending on the circumstances."
    },
    {
      question: "How do I send you my footage?",
      answer: "After placing your order, you'll receive a secure upload link where you can upload your footage directly to our servers. For larger files, we can also accept transfers via services like WeTransfer, Dropbox, or Google Drive. For extremely large projects, we can arrange alternative file transfer methods."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 relative" id="faq">
      {/* Fixed background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black"></div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern mix-blend-soft-light opacity-10"></div>
      
      {/* Brutalist elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-fuchsia-500/10 skew-y-12 translate-x-20 translate-y-10"></div>
      <div className="absolute bottom-24 left-0 w-96 h-24 bg-emerald-500/20 -skew-y-12 -translate-x-20"></div>
      <div className="absolute top-96 left-1/3 w-16 h-96 bg-amber-500/10 skew-x-12"></div>
      
      {/* Asymmetric shapes */}
      <div className="absolute top-1/4 right-1/4 w-48 h-48 rounded-tr-full rounded-bl-full bg-fuchsia-900/20 mix-blend-overlay"></div>
      <div className="absolute bottom-1/4 left-1/4 w-32 h-32 rounded-full bg-emerald-800/30 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            {/* Decorative lines */}
            <div className="absolute left-0 top-1/2 w-24 h-1 bg-gradient-to-r from-fuchsia-500 to-transparent"></div>
            <div className="absolute right-0 top-1/2 w-24 h-1 bg-gradient-to-l from-emerald-500 to-transparent"></div>
            
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-white tracking-tight uppercase relative inline-block">
              Frequently Asked <span className="relative z-10"><GlowText color="purple" size="4xl" weight="bold">Questions</GlowText></span>
              <div className="absolute -right-6 -top-6 w-12 h-12 bg-amber-500/20 rounded-tr-xl rotate-12"></div>
              <div className="absolute -left-3 -bottom-3 w-8 h-8 bg-fuchsia-500/20 rounded-bl-xl -rotate-12"></div>
            </h2>
            <p className="text-gray-300 text-lg relative z-10">
              Everything you need to know about our video editing services
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* Offset container */}
          <div className="relative ml-4">
            {/* Decorative bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-amber-500 to-fuchsia-500"></div>
            
            {/* FAQ items */}
            <div className="ml-6">
              {faqs.map((faq, index) => (
                <Tooltip 
                  key={index}
                  text={index === 0 ? "Click to expand answer" : ""}
                  color="purple"
                  delay={1000}
                >
                  <FAQItem
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === index}
                    toggleOpen={() => toggleFAQ(index)}
                    index={index}
                  />
                </Tooltip>
              ))}
            </div>
          </div>
          
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Custom neobrutalist container */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-fuchsia-500 translate-x-2 translate-y-2 rounded-xl"></div>
              <div className="relative bg-black border-3 border-white rounded-xl px-8 py-6">
                <p className="text-gray-200 mb-5 font-bold">
                  Still have questions?
                </p>
                <Tooltip text="Nous répondons généralement en moins de 24h" color="green">
                  <a href="/contact">
                    <NeonButton
                      color="blue"
                      variant="outline"
                      size="md"
                      icon={
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      }
                    >
                      Get in touch with our support team
                    </NeonButton>
                  </a>
                </Tooltip>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Custom styles */}
      <style jsx>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px);
          background-size: 30px 30px;
        }
      `}</style>
    </section>
  );
} 