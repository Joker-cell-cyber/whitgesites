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
      className="border-b border-gray-800 last:border-b-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <button
        onClick={toggleOpen}
        className="flex justify-between items-center w-full py-5 px-1 text-left focus:outline-none transition-colors"
      >
        <h3 className="text-lg font-medium text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.3)]">{question}</h3>
        <svg
          className={`w-5 h-5 text-[--neon-pink] transform transition-transform ${isOpen ? "rotate-180" : ""}`}
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
        <p className="text-gray-300">{answer}</p>
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
    <section className="py-20 bg-[#0a0a0a]" id="faq">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">
              Frequently Asked <GlowText color="purple" size="4xl" weight="bold">Questions</GlowText>
            </h2>
            <p className="text-gray-300 text-lg">
              Everything you need to know about our video editing services
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="card-hover rounded-xl bg-[--cyber-deep]/90 backdrop-blur-sm p-6 md:p-8 border border-[--neon-purple]/10">
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
          
          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-gray-300 mb-4">
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
          </motion.div>
        </div>
      </div>
    </section>
  );
} 