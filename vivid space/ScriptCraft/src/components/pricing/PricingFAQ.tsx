"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const toggleFAQ = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };
  
  const faqs = [
    {
      question: "How does the sales script writing process work?",
      answer: "Our process is simple: First, you select the package that fits your needs. After purchase, you'll receive a brief questionnaire about your product/service, target audience, and sales goals. Our expert copywriters then craft your script based on your requirements. You'll receive your first draft according to your package's delivery timeline, and you can request revisions as included in your package."
    },
    {
      question: "What if I need revisions to my script?",
      answer: "Each pricing package includes a specific number of revision rounds. Basic packages include 1 round, Standard includes 2 rounds, Premium includes 3 rounds, and Enterprise includes unlimited revisions. Additional revision rounds can be purchased if needed. We're committed to getting your script just right."
    },
    {
      question: "Can I request scripts for specific industries or products?",
      answer: "Absolutely! Our scripts are fully customized for your specific industry, product/service, and target audience. We have experience writing sales scripts across diverse sectors including SaaS, financial services, real estate, healthcare, education, and many more. Simply provide details about your industry in the questionnaire after purchase."
    },
    {
      question: "How quickly will I receive my sales script?",
      answer: "Delivery times vary by package: Basic scripts are delivered within 24 hours, Standard in 48 hours, Premium in 72 hours, and Enterprise in 96 hours. For urgent requests, contact us directly to discuss expedited options."
    },
    {
      question: "What's the difference between cold call, closing, and follow-up scripts?",
      answer: "Cold call scripts are designed for initial outreach to prospects who haven't shown interest yet. Closing scripts help secure the sale with interested prospects who need that final push. Follow-up scripts are multi-touch sequences to nurture leads over time. Each serves a different purpose in the sales process, and many clients purchase all three to create a complete sales funnel."
    },
    {
      question: "Do you offer refunds if I'm not satisfied?",
      answer: "Yes, we offer a 30-day satisfaction guarantee. If you're not completely satisfied with your script, we'll work with you to revise it according to your package's revision policy. If you're still not happy, we'll issue a full refund within 30 days of delivery."
    },
    {
      question: "Can I see samples of your scripts before purchasing?",
      answer: "Contact our sales team at support@scriptcraft.com to request script samples relevant to your industry. While we can't share client-specific scripts due to confidentiality, we have generic samples that demonstrate our writing style and approach."
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" id="faq">
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-cs-blue-50/50 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cs-navy-900">
                Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
              <p className="text-cs-navy-700 text-lg">
                Find answers to common questions about our sales script services
            </p>
          </motion.div>
        </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white border rounded-xl overflow-hidden ${
                  openIndex === index ? 'border-cs-blue-200 shadow-lg' : 'border-gray-200'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                >
                  <span className="font-semibold text-cs-navy-900">{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 text-cs-blue-500 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-4">
                    <p className="text-cs-navy-700">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-cs-navy-700 mb-4">
              Still have questions? We're here to help.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 rounded-lg text-white bg-gradient-to-r from-cs-blue-600 to-cs-navy-600 font-medium hover:shadow-lg transition-shadow"
            >
              Contact Support
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 