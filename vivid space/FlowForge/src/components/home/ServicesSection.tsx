"use client";

import Link from "next/link";

// Define color variants type
type ColorVariant = 'purple' | 'blue' | 'orange' | 'green';

// Define the service object type
interface ServiceOption {
  name: string;
  price: string;
}

interface Service {
  title: string;
  icon: React.ReactNode;
  description: string;
  color: ColorVariant;
  options: ServiceOption[];
}

export default function ServicesSection() {
  const services: Service[] = [
    {
      title: "Form Automation",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
        </svg>
      ),
      description: "Transform your data collection with intelligent form processing solutions that automatically route submissions, store data, and trigger actions.",
      color: "purple",
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
      color: "blue",
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
      color: "orange",
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
      color: "green",
      options: [
        { name: "Document Automation", price: "$89.50" },
        { name: "Business Process Automation", price: "$99.99" },
        { name: "Complete Automation Package", price: "$119.50" },
      ]
    },
  ];

  const colorVariants = {
    purple: {
      light: "bg-purple-100",
      dark: "bg-purple-800",
      text: "text-purple-800",
      hover: "hover:bg-purple-50 group-hover:text-purple-700",
      border: "border-purple-200"
    },
    blue: {
      light: "bg-blue-100",
      dark: "bg-blue-800",
      text: "text-blue-800",
      hover: "hover:bg-blue-50 group-hover:text-blue-700",
      border: "border-blue-200"
    },
    orange: {
      light: "bg-orange-100",
      dark: "bg-orange-800",
      text: "text-orange-800",
      hover: "hover:bg-orange-50 group-hover:text-orange-700",
      border: "border-orange-200"
    },
    green: {
      light: "bg-green-100",
      dark: "bg-green-800",
      text: "text-green-800",
      hover: "hover:bg-green-50 group-hover:text-green-700",
      border: "border-green-200"
    }
  };

  return (
    <section className="py-24 bg-gray-100 overflow-hidden relative">
      {/* Diagonal overlay pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg width="100%" height="100%">
          <pattern id="diagonalPattern" patternUnits="userSpaceOnUse" width="40" height="40" patternTransform="rotate(45)">
            <rect width="100%" height="100%" fill="transparent" />
            <line x1="0" y1="0" x2="0" y2="40" strokeWidth="1" stroke="currentColor" />
            <line x1="20" y1="0" x2="20" y2="40" strokeWidth="1" stroke="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#diagonalPattern)" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header with asymmetric styling */}
        <div className="mb-20">
          <div className="max-w-md">
            <div className="inline-flex items-center space-x-3 mb-8">
              <span className="block w-12 h-0.5 bg-flow-green-500"></span>
              <span className="text-flow-green-600 text-sm font-bold uppercase tracking-widest">Our Packages</span>
            </div>
            
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              One-Shot <span className="text-flow-green-600">Automation Solutions</span>
            </h2>
            
            <p className="text-xl text-gray-600 leading-relaxed">
              Streamline your business with our fixed-price automation packages designed to solve specific business needs quickly and efficiently.
            </p>
          </div>
        </div>

        {/* Services grid with cards that have distinct sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => (
            <div key={index} className="group relative bg-white rounded-lg overflow-hidden shadow-xl flex flex-col transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              {/* Service header */}
              <div className={`p-6 ${colorVariants[service.color].dark} text-white`}>
                <div className="flex items-center">
                  <div className="bg-white/20 p-3 rounded-lg">
                    {service.icon}
                  </div>
                  <h3 className="ml-4 text-2xl font-bold">{service.title}</h3>
                </div>
              </div>
              
              {/* Service description */}
              <div className="p-6 flex-grow border-b border-gray-100">
                <p className="text-gray-600">{service.description}</p>
              </div>
              
              {/* Options list */}
              <div className="p-6 space-y-4">
                <h4 className="font-semibold text-gray-900 mb-2">Available Options:</h4>
                {service.options.map((option, idx) => (
                  <div key={idx} className={`flex justify-between p-3 rounded ${colorVariants[service.color].light} ${colorVariants[service.color].hover} transition-colors`}>
                    <div className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-white bg-gray-900 rounded-full p-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className={`font-medium ${colorVariants[service.color].text}`}>{option.name}</span>
                    </div>
                    <span className="font-bold">{option.price}</span>
                  </div>
                ))}
              </div>
              
              {/* Call to action */}
              <div className="p-6">
                <Link 
                  href="/pricing"
                  className="block w-full py-3 text-center bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Choose Package
                </Link>
              </div>
              
              {/* Side accent */}
              <div className={`absolute top-0 left-0 w-1 h-full ${colorVariants[service.color].dark}`}></div>
            </div>
          ))}
        </div>

        {/* Enterprise highlight section */}
        <div className="max-w-6xl mx-auto bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
          <div className="p-10 grid grid-cols-1 lg:grid-cols-5 gap-10">
            <div className="lg:col-span-3">
              <div className="inline-flex items-center px-4 py-1 rounded-full bg-flow-green-900/20 border border-flow-green-700/20 text-flow-green-500 text-sm font-semibold mb-6">
                Premium Option
              </div>
              
              <h3 className="text-3xl font-bold mb-6 text-white">Enterprise Integration</h3>
              
              <p className="text-gray-300 mb-8 leading-relaxed">
                Need a complex integration solution for your enterprise? Our custom-built Enterprise Integration plan offers tailored automation solutions for large-scale operations.
              </p>
              
              <div className="flex items-baseline mb-8">
                <span className="text-4xl font-bold text-flow-green-500">$109.90</span>
                <span className="ml-2 text-gray-400">one-time payment</span>
              </div>
              
              {/* Divider */}
              <div className="w-16 h-1 bg-flow-green-500 mb-6"></div>
              
              <div className="flex">
                <Link
                  href={`/checkout?product=Enterprise Integration&price=$109.90`}
                  className="px-8 py-4 bg-flow-green-600 text-white rounded-lg font-medium flex items-center transition-all hover:bg-flow-green-500"
                >
                  Get Started
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Abstract decoration */}
            <div className="hidden lg:flex lg:col-span-2 items-center justify-center relative">
              <div className="w-64 h-64 rounded-full border-8 border-flow-green-600/20"></div>
              <div className="absolute w-48 h-48 rounded-full border-8 border-flow-green-500/30 right-10 bottom-10"></div>
              <div className="absolute w-32 h-32 rounded-full bg-flow-green-800/20 left-10 top-10"></div>
              <div className="absolute w-16 h-16 rounded-full bg-flow-green-500/30 right-24 top-24"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}