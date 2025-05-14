"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { COMPANY } from "../../app/constants/company";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: `What types of AI agents can I build with ${COMPANY.serviceName}?`,
      answer: `${COMPANY.serviceName} supports a wide variety of agent types including customer service bots, data analysis agents, content generation assistants, coding helpers, research assistants, and specialized domain experts. Our platform is designed to be flexible enough for nearly any AI agent use case you can imagine.`
    },
    {
      question: "How do you handle data privacy and security?",
      answer: "We take data security seriously. All data is encrypted both in transit and at rest. Your training data is isolated in secure environments, and we offer options for private deployments where data never leaves your infrastructure. We're compliant with major security standards including SOC 2, GDPR, and HIPAA for Enterprise plans."
    },
    {
      question: "Can I integrate my custom agent with existing systems?",
      answer: "Yes! We provide multiple integration options including RESTful APIs, webhooks, SDKs for popular programming languages, and embeddable widgets for websites. Our agents can connect to databases, CRMs, messaging platforms, and virtually any system with an API interface."
    },
    {
      question: "What's the difference between your pricing tiers?",
      answer: "Our Basic tier (€9.90-€39.90) includes essential agent building capabilities with standard models. Enhanced tier (€49.90-€79.90) adds advanced reasoning, higher rate limits, and custom knowledge bases. Enterprise tier (€89.90-€119.90) offers our most powerful models, advanced analytics, priority support, and dedicated infrastructure options."
    },
    {
      question: "How do I train my agent on proprietary knowledge?",
      answer: "Our platform allows you to upload documents (PDFs, Word, Markdown, etc.), connect to databases, or directly input text-based knowledge. The system processes this information into a specialized knowledge vector store that your agent can reference. For Enterprise plans, we also support continuous learning from user interactions."
    },
    {
      question: "What technical expertise do I need to create an agent?",
      answer: `${COMPANY.serviceName} is designed for both technical and non-technical users. Our intuitive interface allows anyone to create basic agents without coding. For advanced customization, developers can use our API and SDKs to fine-tune behavior, create custom tools, and deeply integrate agents into existing workflows.`
    },
    {
      question: "How do agents handle complex reasoning tasks?",
      answer: "Our agents leverage advanced large language models with specialized reasoning frameworks. They can break down complex problems into smaller steps, follow chains of thought, and integrate external tools when needed. For data-intensive tasks, agents can connect to analysis libraries and databases to process information systematically."
    },
    {
      question: "Can my agent run locally without internet connection?",
      answer: "For Enterprise plans, we offer deployment options for edge devices and local infrastructure. These deployments can run without continuous internet connection, though they may have more limited capabilities compared to cloud-hosted versions. This is ideal for secure environments or applications with intermittent connectivity."
    }
  ];

  return (
    <section id="faq" className="py-32 relative overflow-hidden isolate">
      {/* Modern geometric background */}
      <div className="absolute inset-0 -z-10 bg-[#030012]">
        {/* Futuristic grid */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(99, 102, 241, 0.3)" strokeWidth="0.5" />
              </pattern>
              <pattern id="grid" width="160" height="160" patternUnits="userSpaceOnUse">
                <rect width="160" height="160" fill="url(#smallGrid)" />
                <path d="M 160 0 L 0 0 0 160" fill="none" stroke="rgba(99, 102, 241, 0.4)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        {/* Glowing orbs and shapes */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/10 filter blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-violet-600/10 filter blur-[120px] animate-pulse-slow" style={{ animationDelay: "2s" }}></div>
        
        {/* Animated dots */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-indigo-400/40"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `floating ${Math.random() * 10 + 20}s linear infinite`,
                animationDelay: `${Math.random() * 10}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      {/* Content container */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <span className="inline-block py-1 px-3 rounded-full text-xs font-semibold tracking-wider bg-gradient-to-r from-indigo-500/20 to-violet-500/20 border border-indigo-500/10 mb-5">
            ANSWERS TO YOUR QUESTIONS
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
            Technical <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400">FAQ</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
            Common questions about our AI agent platform and capabilities
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Decorative elements behind the accordion */}
            <div className="absolute -left-20 top-1/4 w-40 h-40 border border-indigo-500/20 rounded-full animate-spin-slow"></div>
            <div className="absolute -right-10 bottom-1/4 w-20 h-20 border border-violet-500/20 rounded-md rotate-45 animate-float"></div>
            
            {/* FAQ Accordion */}
            <div className="relative space-y-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <div className="relative group">
                    {/* Animated border effect */}
                    <div 
                      className={`absolute -inset-0.5 bg-gradient-to-r from-indigo-500/50 to-violet-500/50 rounded-xl opacity-30 blur-sm transition-all duration-500 ${
                        openIndex === index ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                      }`}
                    ></div>
                    
                    <div className="relative bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                      <button
                        className="w-full text-left py-5 px-6"
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                      >
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-semibold text-white pr-8">{faq.question}</h3>
                          <div 
                            className={`w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-500/10 to-violet-500/10 border border-white/5 transition-transform duration-300 ${
                              openIndex === index ? "rotate-45" : ""
                            }`}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-indigo-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              {openIndex === index ? (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              ) : (
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                />
                              )}
                            </svg>
                          </div>
                        </div>
                      </button>
                      
                      {/* Answer with slide animation */}
                      <div 
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${
                          openIndex === index ? "max-h-[500px] pb-6" : "max-h-0"
                        }`}
                      >
                        <div className="px-6 text-gray-300 leading-relaxed">
                          <div className="w-16 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500 mb-4"></div>
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-violet-600/20 rounded-2xl blur-xl -z-10"></div>
            <div className="p-10 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-sm">
              <p className="text-gray-300 mb-6 text-lg">Still have questions about our AI agent platform?</p>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 rounded-xl text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 font-medium transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:scale-105"
              >
                Contact Our Team
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 