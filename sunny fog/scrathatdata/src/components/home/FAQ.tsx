"use client";

import { useState } from 'react';

export function FAQ() {
  const faqCategories = [
    {
      name: "General",
      questions: [
        {
          question: "What is web scraping?",
          answer: "Web scraping is a technique that automatically extracts data from websites. Our service transforms unstructured web data into structured and usable data for your business."
        },
        {
          question: "Is web scraping legal?",
          answer: "Yes, web scraping is legal when practiced ethically and responsibly. We respect websites' terms of use, robots.txt files, and comply with GDPR and other data protection regulations."
        },
        {
          question: "What types of data can you extract?",
          answer: "We can extract virtually any type of publicly accessible data: product prices, company contact information, real estate data, customer reviews, financial data, etc. Contact us to discuss your specific needs."
        }
      ]
    },
    {
      name: "Technical",
      questions: [
        {
          question: "How do you handle anti-scraping measures?",
          answer: "We use advanced technologies to respectfully work with websites while still retrieving the data you need. This includes rotating IP addresses, respecting rate limits, mimicking human browsing patterns, and other techniques that allow us to collect data without disrupting the website's operations."
        },
        {
          question: "What format will I receive my data in?",
          answer: "We can deliver data in various formats depending on your needs, including CSV, Excel, JSON, XML, or through an API. We can also set up direct database connections if you require real-time data updates. Just let us know your preferred format when discussing your project."
        },
        {
          question: "Can you scrape data that requires login credentials?",
          answer: "In some cases, we can scrape data from behind login walls if you provide the necessary credentials and have the legal right to access and extract that data. This is evaluated on a case-by-case basis to ensure compliance with terms of service and data privacy regulations."
        }
      ]
    },
    {
      name: "Service",
      questions: [
        {
          question: "How quickly can you deliver the data?",
          answer: "Delivery times depend on the complexity of the scraping project and the volume of data. Simple extractions can be completed within days, while larger projects may take longer. We'll provide a specific timeline after discussing your requirements."
        },
        {
          question: "Do you offer ongoing scraping services or just one-time extractions?",
          answer: "We only offer data extraction services for specific projects. We do not provide subscription-based services. Each project is quoted and delivered as a complete package."
        },
        {
          question: "How do you ensure data quality?",
          answer: "We use advanced data cleaning and validation techniques, with automated and manual checks. We guarantee the accuracy, completeness, and freshness of the extracted data."
        },
        {
          question: "Do you offer customized solutions?",
          answer: "Absolutely. We create custom data extraction solutions tailored to your specific needs. Our team works with you to define the required data and develop the optimal solution."
        }
      ]
    }
  ];

  const [activeCategory, setActiveCategory] = useState("General");
  const [openIndex, setOpenIndex] = useState(-1);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };
  
  const currentCategory = faqCategories.find(cat => cat.name === activeCategory);

  return (
    <section className="section bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-950 mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our data scraping services
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-gray-100 rounded-lg">
            {faqCategories.map((category) => (
              <button
                key={category.name}
                className={`px-6 py-2 rounded-md font-medium transition ${
                  activeCategory === category.name
                    ? 'bg-white shadow-sm text-primary'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => {
                  setActiveCategory(category.name);
                  setOpenIndex(-1);
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Category Icon */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                {activeCategory === "General" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
                {activeCategory === "Technical" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                )}
                {activeCategory === "Service" && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <h3 className="ml-4 text-xl font-bold text-gray-900">{activeCategory} Questions</h3>
            </div>
            <span className="text-sm bg-primary/10 text-primary py-1 px-3 rounded-full font-medium">
              {currentCategory?.questions.length} Questions
            </span>
          </div>

          {/* FAQ Accordion */}
          <div className="divide-y divide-gray-100">
            {currentCategory?.questions.map((faq, index) => (
              <div key={index} className="overflow-hidden">
                <button
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <h4 className="text-lg font-medium text-gray-900">{faq.question}</h4>
                  <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-300 ${openIndex === index ? 'rotate-180 bg-primary/10 text-primary' : 'text-gray-500'}`}>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 bg-gray-50 border-t border-gray-100">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We&apos;re here to help.
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