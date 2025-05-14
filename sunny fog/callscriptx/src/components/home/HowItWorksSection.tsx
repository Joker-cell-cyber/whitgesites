"use client";

import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Select Your Script Package",
      description: "Choose the script type that fits your sales needs and target audience. From cold calls to closing techniques.",
      icon: (
        <svg className="w-12 h-12 text-cs-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      number: "02",
      title: "Provide Your Requirements",
      description: "Tell us about your product, target market, and specific sales challenges you want the script to address.",
      icon: (
        <svg className="w-12 h-12 text-cs-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 19L17 13M17 13L11 7M17 13H3M21 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      number: "03",
      title: "Our Experts Create Your Script",
      description: "Our sales copywriting team crafts a customized script designed to overcome objections and boost conversions.",
      icon: (
        <svg className="w-12 h-12 text-cs-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.2322 5.23223L18.7677 8.76777M16.7322 3.73223C17.7085 2.75592 19.2914 2.75592 20.2677 3.73223C21.244 4.70854 21.244 6.29146 20.2677 7.26777L6.5 21.0355H3V17.4644L16.7322 3.73223Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    {
      number: "04",
      title: "Implement & Start Closing Deals",
      description: "Receive your ready-to-use script and start implementing it immediately to increase your sales success rate.",
      icon: (
        <svg className="w-12 h-12 text-cs-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 18V15M7 15H17V9C17 6.79086 14.7614 5 12 5C9.23858 5 7 6.79086 7 9V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19 15H5C3.89543 15 3 15.8954 3 17V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V17C21 15.8954 20.1046 15 19 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="18" r="0.5" stroke="currentColor" strokeWidth="3"/>
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white" id="how-it-works">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 w-full">
          <svg width="100%" height="16" viewBox="0 0 1440 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20">
            <path d="M0 16L60 13.3C120 10.7 240 5.3 360 2.7C480 0 600 0 720 2.7C840 5.3 960 10.7 1080 12C1200 13.3 1320 10.7 1380 9.3L1440 8V0H0V16Z" fill="#3A6FFF"/>
          </svg>
        </div>
        <div className="absolute -right-48 top-24 w-96 h-96 rounded-full bg-cs-blue-100 mix-blend-multiply filter blur-5xl opacity-30 animate-slow-float"></div>
        <div className="absolute -left-48 bottom-24 w-96 h-96 rounded-full bg-cs-navy-100 mix-blend-multiply filter blur-5xl opacity-30 animate-slow-float-delay"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-cs-blue-50 text-cs-navy-700 border border-cs-blue-200 mb-4 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-cs-blue-500 mr-2"></span>
              Simple 4-Step Process
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-cs-navy-900">
              How <span className="gradient-text">CallScriptX</span> Works
            </h2>
            <p className="text-cs-navy-700 text-lg mb-4 max-w-2xl mx-auto">
              From selecting your script type to closing deals, our streamlined process makes it easy to get the sales scripts you need.
            </p>
          </motion.div>
        </div>
        
        {/* Process Flow with Connector Line */}
        <div className="relative mt-20">
          {/* Connector Line */}
          <div className="absolute top-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl mx-auto h-0.5 bg-cs-blue-100">
            <div className="absolute top-0 left-0 h-full w-1/4 bg-cs-blue-500 animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative z-10"
              >
                <div className="bg-white rounded-xl p-8 border border-cs-blue-100 shadow-lg flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-cs-blue-50 flex items-center justify-center mb-6 relative">
                    <div className="absolute inset-0 rounded-full bg-cs-blue-500 opacity-10 animate-ping"></div>
                    {step.icon}
                  </div>
                  <div className="absolute -top-5 right-8 text-5xl font-extrabold text-cs-blue-100">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-cs-navy-900 mb-3">{step.title}</h3>
                  <p className="text-cs-navy-700">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Feature callout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="mt-24 max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center bg-cs-blue-50 text-cs-blue-700 px-4 py-2 rounded-full mb-6 font-medium">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Rapid 24-hour turnaround available
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-8 text-cs-navy-900">
            Ready to transform your sales conversations?
          </h3>
          <a 
            href="#pricing" 
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cs-blue-600 to-cs-navy-600 text-white rounded-xl font-bold button-glow text-center text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            Get Your Script Now
            <svg className="ml-2 w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 