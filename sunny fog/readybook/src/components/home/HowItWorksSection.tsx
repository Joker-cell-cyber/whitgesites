"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function HowItWorksSection() {
  const processSteps = [
    {
      id: 1,
      title: "Share Your Vision",
      description: "Tell us about your e-book idea, target audience, and any specific requirements. Provide any research or content you already have that can help us understand your vision better.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "First Draft Creation",
      description: "Our expert writers craft the initial draft of your e-book, focusing on structure, content flow, and key messaging. We work to capture your unique voice and vision.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Revision & Refinement",
      description: "Review the draft and provide feedback. Our team then refines the content, addressing your comments and making necessary adjustments to ensure your complete satisfaction.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Final Delivery",
      description: "Receive your polished e-book in your preferred format (PDF, EPUB, MOBI, etc.). For enhanced packages, we'll include professional formatting and cover design to make your book market-ready.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7M19 13l-4 4M12 19l-7-7 7-7m7 7l-7 7-7-7" />
        </svg>
      ),
      image: "https://images.unsplash.com/photo-1613294326794-e7c74fe886e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <section className="py-20 bg-white" id="how-it-works">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-book-blue-900">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-book-blue-700 text-lg">
              Our streamlined process makes it easy to transform your ideas into professionally written e-books.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="grid gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              variants={itemVariants}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                <div className="bg-book-blue-50 p-1.5 rounded-full inline-flex mb-5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-book-blue-600 to-book-green-500 flex items-center justify-center text-white">
                    <span className="text-xl font-bold">{step.id}</span>
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-book-blue-900 flex items-center">
                  {step.title}
                  <div className="ml-3 text-book-blue-600">
                    {step.icon}
                  </div>
                </h3>
                
                <p className="text-book-blue-700 text-lg mb-6">
                  {step.description}
                </p>
                
                {step.id === 1 && (
                  <div className="bg-book-blue-50 rounded-lg p-4 border-l-4 border-book-blue-500">
                    <p className="text-book-blue-800 font-medium">
                      Starting is easy! Simply choose a package and share your vision with us.
                    </p>
                  </div>
                )}
              </div>
              
              <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-book-blue-500/20 to-book-yellow-500/20 rounded-xl blur-lg opacity-70"></div>
                  <div className="relative rounded-xl overflow-hidden shadow-lg">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={600}
                      height={400}
                      className="w-full h-64 md:h-80 object-cover"
                    />
                  </div>
                  {step.id === 2 && (
                    <div className="absolute -bottom-5 -right-5 bg-white p-3 rounded-lg shadow-lg border border-book-blue-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-book-blue-500 to-book-yellow-500 rounded-lg flex items-center justify-center text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-book-blue-900 font-medium">Quick Turnaround</div>
                          <div className="text-book-blue-600 text-sm">Efficient Process</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a
              href="#pricing"
              className="px-6 py-3 bg-gradient-to-r from-book-blue-600 to-book-green-500 text-white rounded-lg font-medium button-glow inline-block"
            >
              See Our Packages
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 