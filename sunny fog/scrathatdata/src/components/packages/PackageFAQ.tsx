"use client";

import { useState } from 'react';

export function PackageFAQ() {
  const faqs = [
    {
      question: "How do I know which package is right for me?",
      answer: "The best package depends on the volume of data you need and the number of websites to scrape. Start by estimating the number of data points you require, then consider how many different websites you need to extract from. Our team can also help you choose the right package based on your specific needs."
    },
    {
      question: "Is this a subscription or a one-time payment?",
      answer: "All our packages are for a single data extraction project. We do not provide subscription-based or recurring services."
    },
    {
      question: "What is considered a 'data point'?",
      answer: "A data point is a single piece of information extracted from a website. For example, if we scrape product listings, each product's name, price, description, rating, and image URL would each count as one data point. We'll help you calculate the estimated data points for your specific project."
    },
    {
      question: "Do you offer any discounts for larger projects?",
      answer: "Yes, we offer discounts for larger data extraction projects. Contact us with your requirements to discuss custom pricing options."
    },
    {
      question: "Can I request a custom package if none of these fit my needs?",
      answer: "Absolutely! We understand that every project is unique. Contact us with your specific requirements, and we'll create a tailored solution just for you, with custom pricing based on your exact needs."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers for larger packages. For enterprise clients, we can also arrange custom invoicing and payment terms."
    },
    {
      question: "Is there a setup fee or any hidden costs?",
      answer: "No, there are no hidden fees. The price you see is what you pay. There's no setup fee, and all package features are included in the price. The only potential additional cost would be for exceptionally custom requirements that fall outside the scope of our standard packages."
    },
    {
      question: "What if I need more data than what's included in my package?",
      answer: "If you need more data than what's included in your initial package, we can provide a quote for the additional data extraction. We'll always discuss any potential extra costs with you before proceeding with additional work."
    }
  ];

  const [openIndex, setOpenIndex] = useState(-1);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-gray-950">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Questions about our packages? Find answers to common pricing questions below.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="mb-4 border border-gray-200 rounded-lg overflow-hidden bg-white"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-medium text-gray-900">{faq.question}</span>
                <svg 
                  className={`w-5 h-5 text-primary transition-transform ${openIndex === index ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 border-t border-gray-200">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-700 mb-4">
            Have more questions about our packages?
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center text-primary hover:text-primary-dark font-medium"
          >
            Contact our team
            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 