"use client";

import { useState } from "react";

export default function FAQSection() {
  const faqs = [
    {
      question: "What types of content do you write?",
      answer: "We create a variety of SEO-optimized text content: blog articles, landing pages, product descriptions, social media content, and marketing materials. Each text is written to captivate your audience while naturally incorporating important keywords for your SEO ranking."
    },
    {
      question: "How does the writing process work?",
      answer: "Our process is simple: after understanding your needs and analyzing relevant keywords for your industry, our writers create the requested content according to your instructions. We deliver ready-to-use texts. Note that we focus exclusively on quality writing and not on SEO tracking services or continuous optimization."
    },
    {
      question: "How long does it take to receive my content?",
      answer: "Our delivery times depend on the volume and complexity of the requested content. Generally, a standard blog article is delivered within 3 to 5 business days. For larger projects, we establish a delivery schedule at the time of order. We only provide the written content, without publication services or performance tracking."
    },
    {
      question: "How do you ensure the content is optimized for SEO?",
      answer: "Our writers are trained in SEO writing techniques and follow current best practices. We naturally integrate keywords, use an appropriate content structure with relevant subheadings, and ensure text readability. Our service is limited to delivering this optimized content - implementation and performance monitoring are your responsibility."
    },
    {
      question: "Do you offer SEO tracking services after writing?",
      answer: "No, we specialize exclusively in writing optimized content. We do not offer position tracking, SEO audits, or continuous optimization services. Our expertise focuses on creating quality texts that follow current SEO best practices. For performance monitoring, we recommend working with a specialized SEO agency."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-turquoise-100 text-turquoise-800 text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Frequently <span className="text-turquoise-600">Asked Questions</span>
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about our SEO writing services and how we can help you.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border-b border-gray-100 last:border-0"
              >
                <button 
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full p-6 text-left focus:outline-none"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  <span className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-turquoise-600">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-gray-600">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Do you have other questions?</p>
            <a 
              href="/contact" 
              className="inline-flex items-center text-turquoise-600 font-medium hover:text-turquoise-700 transition-colors"
            >
              Contact us
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}