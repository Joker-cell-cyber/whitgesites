"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What types of AI agents can I build with SuperGPTAgent?",
      answer: "SuperGPTAgent supports a wide variety of agent types including customer service bots, data analysis agents, content generation assistants, coding helpers, research assistants, and specialized domain experts. Our platform is designed to be flexible enough for nearly any AI agent use case you can imagine."
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
      answer: "SuperGPTAgent is designed for both technical and non-technical users. Our intuitive interface allows anyone to create basic agents without coding. For advanced customization, developers can use our API and SDKs to fine-tune behavior, create custom tools, and deeply integrate agents into existing workflows."
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
    <section id="faq" className="py-24 relative overflow-hidden">
      {/* Technical background effect */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute inset-0 bg-[#0c0c14]"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300c3f5' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      {/* Digital circuit lines */}
      <div className="absolute inset-0 -z-10 opacity-10 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-ai-blue-500 to-transparent"></div>
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-ai-purple-500 to-transparent"></div>
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-ai-green-500 to-transparent"></div>
        <div className="absolute top-0 left-2/3 w-px h-full bg-gradient-to-b from-transparent via-ai-blue-500 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
          <h2 className="text-3xl font-bold mb-4">
            Technical <span className="gradient-text">FAQ</span>
            </h2>
            <p className="text-gray-400 text-lg">
            Common questions about our AI agent platform and capabilities
            </p>
          </motion.div>

        <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
            <motion.div
                key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mb-4"
            >
              <button
                className={`w-full text-left p-5 rounded-lg transition-all cyber-border ${
                  openIndex === index
                    ? "bg-[#14141e]"
                    : "bg-[#0f0f17] hover:bg-[#14141e]/80"
                }`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold pr-8">{faq.question}</h3>
                  <div className={`p-1 rounded-full bg-[#14141e] border border-ai-blue-500/30 transition-transform ${
                    openIndex === index ? "rotate-45" : ""
                  }`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-ai-blue-500"
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
                
                <div className={`mt-2 text-gray-400 overflow-hidden transition-all ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}>
                  <p className="py-2">{faq.answer}</p>
                </div>
              </button>
            </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">Still have questions about our AI agent platform?</p>
          <div className="inline-block p-px rounded-lg cyber-border">
            <a
              href="/contact"
              className="inline-block px-6 py-3 bg-[#14141e] hover:bg-[#1a1a24] transition-colors text-white rounded-lg font-medium"
            >
              Contact Our Team
            </a>
          </div>
          </motion.div>
      </div>
    </section>
  );
} 