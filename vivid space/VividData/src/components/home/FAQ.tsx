"use client";

import { useState } from 'react';

// Define types for our data
interface Question {
  question: string;
  answer: string;
}

interface Category {
  name: string;
  questions: Question[];
}

// Define the type for openQuestions state
interface OpenQuestionsState {
  [key: number]: boolean;
}

export function FAQ() {
  const faqCategories: Category[] = [
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
  const [openQuestions, setOpenQuestions] = useState<OpenQuestionsState>({});

  const toggleQuestion = (index: number) => {
    setOpenQuestions(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  
  const currentCategory = faqCategories.find(cat => cat.name === activeCategory);

  return (
    <section className="relative py-24 bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute w-full h-full">
          {/* Noise pattern */}
          <svg className="fixed inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>

          {/* Circles */}
          <div className="absolute -top-48 -right-48 w-96 h-96 rounded-full bg-pink-700/30 blur-3xl"></div>
          <div className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full bg-blue-700/20 blur-3xl"></div>
        </div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-pink-500/5">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeOpacity="0.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex p-1 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 mb-6">
            <div className="bg-gray-900 rounded-full px-4 py-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 font-medium">
                Got Questions?
              </span>
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">Questions</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our data scraping services
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Category buttons - horizontal tabs with animated indicator */}
          <div className="flex justify-center mb-12 relative">
            <div className="bg-gray-800/50 backdrop-blur-sm p-1.5 rounded-full border border-gray-700/50 inline-flex">
              {faqCategories.map((category, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveCategory(category.name);
                    setOpenQuestions({});
                  }}
                  className={`relative px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
                    activeCategory === category.name
                      ? 'text-white'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {activeCategory === category.name && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 animate-fadeIn"></span>
                  )}
                  <span className="relative z-10">{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Questions and answers with glass morphism effect */}
          <div className="space-y-6">
            {currentCategory?.questions.map((faq, index) => (
              <div 
                key={index} 
                className="backdrop-blur-md rounded-2xl relative overflow-hidden transition-all duration-500 border border-gray-700/30"
              >
                {/* Animated gradient border on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className={`relative ${openQuestions[index] ? 'bg-gray-800/50' : 'bg-gray-900/50'}`}>
                  <button
                    className="w-full px-6 py-5 flex justify-between items-center text-left group"
                    onClick={() => toggleQuestion(index)}
                  >
                    <h3 className="text-lg font-medium text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-blue-500 transition-all duration-300">
                      {faq.question}
                    </h3>
                    <div className={`w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 border border-gray-700 transition-all duration-300 transform ${
                      openQuestions[index] ? 'rotate-45 bg-gradient-to-r from-pink-500 to-blue-500' : 'group-hover:border-pink-500'
                    }`}>
                      <svg 
                        className={`w-4 h-4 ${openQuestions[index] ? 'text-white' : 'text-gray-400 group-hover:text-pink-400'}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                  </button>
                  
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden max-h-0 ${
                      openQuestions[index] ? 'max-h-[500px] opacity-100' : 'opacity-0'
                    }`}
                  >
                    <div className="p-6 border-t border-gray-800">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 mb-6">
            Still have questions? We&apos;re here to help.
          </p>
          <a 
            href="/contact" 
            className="inline-flex items-center px-8 py-4 rounded-full font-medium text-white bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 transform transition-all hover:scale-105 shadow-lg shadow-pink-500/20"
          >
            Contact our team
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 