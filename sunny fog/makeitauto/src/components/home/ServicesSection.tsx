"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ServicesSection() {
  const containerRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const services = [
    {
      title: "Form Automation",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
        </svg>
      ),
      description: "Transform your data collection with intelligent form processing solutions that automatically route submissions, store data, and trigger actions.",
      gradient: "from-purple-500 to-indigo-600",
      bgGradient: "from-purple-50 to-indigo-50",
      border: "border-purple-100",
      options: [
        { name: "Simple Trigger", price: "$9.99" },
        { name: "Form Processor", price: "$39.99" },
      ]
    },
    {
      title: "Data Synchronization",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      ),
      description: "Keep your data in sync across multiple systems with reliable, real-time data synchronization solutions for seamless operations.",
      gradient: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50 to-cyan-50",
      border: "border-blue-100",
      options: [
        { name: "Dual Integration", price: "$19.50" },
        { name: "Data Sync Solution", price: "$49.90" },
        { name: "API Connector", price: "$59.50" },
      ]
    },
    {
      title: "E-commerce Solutions",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
      ),
      description: "Automate your online store operations from order processing to inventory management and customer communications.",
      gradient: "from-orange-500 to-amber-500",
      bgGradient: "from-orange-50 to-amber-50",
      border: "border-orange-100",
      options: [
        { name: "Multi-step Flow", price: "$29.90" },
        { name: "E-commerce Automation", price: "$69.99" },
        { name: "CRM Integration", price: "$79.90" },
      ]
    },
    {
      title: "Document Workflows",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
      ),
      description: "Automate document creation, processing, and approval workflows to eliminate manual paperwork and increase efficiency.",
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
      border: "border-green-100",
      options: [
        { name: "Document Automation", price: "$89.50" },
        { name: "Business Process Automation", price: "$99.99" },
        { name: "Complete Automation Package", price: "$119.50" },
      ]
    },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-make-purple-50/50 to-make-blue-50/50 rounded-bl-[100px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-make-blue-50/50 to-make-purple-50/50 rounded-tr-[100px] -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-make-purple-100 to-make-blue-100 text-make-purple-800 text-sm font-medium mb-6">
            Our Packages
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
            One-Shot <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-make-purple-500 to-make-blue-500 bg-clip-text text-transparent">Automation Solutions</span>
              <span className="absolute -bottom-1 left-0 right-0 h-3 bg-make-purple-100/70 -z-10 rounded-sm"></span>
            </span>
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Streamline your business with our fixed-price automation packages designed to solve specific business needs quickly and efficiently.
          </p>
        </motion.div>

        <motion.div 
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:gap-10 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className={`bg-gradient-to-br ${service.bgGradient} rounded-3xl p-8 md:p-10 border ${service.border} shadow-md hover:shadow-xl transition-all duration-500 group`}
              variants={itemVariants}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold ml-5 text-gray-900 group-hover:translate-x-1 transition-transform">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-8 leading-relaxed">{service.description}</p>
                
                <div className="mt-auto space-y-4">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                  
                  <ul className="space-y-4 mb-8">
                    {service.options.map((option, idx) => (
                      <li key={idx} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mr-3 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </span>
                          <span className="text-gray-700 font-medium">{option.name}</span>
                        </div>
                        <span className="font-bold text-gray-900">{option.price}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    href="/pricing"
                    className="group relative w-full py-3.5 px-5 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium hover:border-gray-300 transition-all duration-300 flex items-center justify-center shadow-sm"
                  >
                    <span>Choose Package</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-make-purple-500 to-make-blue-500 rounded-3xl blur-md opacity-75"></div>
            <div className="relative bg-white rounded-3xl p-10 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="flex-1 mb-8 md:mb-0 md:mr-8">
                  <h3 className="text-3xl font-bold mb-4 text-gray-900">Enterprise Integration</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Need a complex integration solution for your enterprise? Our custom-built Enterprise Integration plan offers tailored automation solutions for large-scale operations.
                  </p>
                  <div className="flex items-center text-2xl font-bold text-make-purple-600 mb-4">
                    $109.90 <span className="ml-2 text-sm font-normal text-gray-500">one-time payment</span>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Link
                    href={`/checkout?product=Enterprise Integration&price=$109.90`}
                    className="inline-flex items-center justify-center py-4 px-8 rounded-xl bg-gradient-to-r from-make-purple-600 to-make-blue-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-make-purple-200/30 hover:-translate-y-1"
                  >
                    Get Started
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}