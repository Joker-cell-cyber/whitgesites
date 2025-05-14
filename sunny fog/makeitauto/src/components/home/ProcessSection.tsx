"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

export default function ProcessSection() {
  const ref = useRef(null);
  
  const steps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "We discuss your automation needs and identify the processes to optimize for your business.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
        </svg>
      ),
      color: "from-blue-500 to-cyan-500",
      lightColor: "from-blue-50 to-cyan-50",
      delay: 0
    },
    {
      number: "02",
      title: "Strategic Planning",
      description: "Our team designs a custom automation solution that meets your specific business objectives.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
      ),
      color: "from-purple-500 to-violet-500",
      lightColor: "from-purple-50 to-violet-50",
      delay: 0.1
    },
    {
      number: "03",
      title: "Development & Testing",
      description: "We build your automation solution and perform rigorous testing to ensure it works properly.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
      color: "from-amber-500 to-orange-500",
      lightColor: "from-amber-50 to-orange-50",
      delay: 0.2
    },
    {
      number: "04",
      title: "Deployment",
      description: "Your solution is deployed and we train you on its optimal use to maximize its impact on your business.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      ),
      color: "from-green-500 to-emerald-500",
      lightColor: "from-green-50 to-emerald-50",
      delay: 0.3
    },
  ];

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden relative" ref={ref}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-0 w-1/3 h-1/3 bg-blue-50 rounded-full blur-3xl opacity-30 transform -translate-x-1/2"></div>
        <div className="absolute top-1/3 right-0 w-1/3 h-1/3 bg-purple-50 rounded-full blur-3xl opacity-30 transform translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/2 w-1/3 h-1/3 bg-green-50 rounded-full blur-3xl opacity-30 transform -translate-x-1/2"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-make-purple-100 to-make-blue-100 text-make-purple-800 text-sm font-medium mb-6">
              Our Approach
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 tracking-tight">
              How <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-make-purple-500 to-make-blue-500 bg-clip-text text-transparent">it works</span>
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-make-purple-100/70 -z-10 rounded-sm"></span>
              </span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Our proven 4-step process to create automations that transform your business
            </p>
          </motion.div>
        </div>

        {/* Process Steps */}
        <motion.div 
          className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="relative group"
            >
              {/* Connecting line between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[55%] right-0 h-0.5 bg-gradient-to-r from-gray-200 to-gray-100 z-0"></div>
              )}
              
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-md relative z-10 h-full hover:shadow-xl transition-shadow duration-300">
                {/* Step number with gradient */}
                <div className="relative mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.lightColor} flex items-center justify-center text-lg font-bold border border-gray-100`}>
                    <span className={`bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>{step.number}</span>
                  </div>
                  <div className={`absolute -right-2 -top-2 w-6 h-6 rounded-lg flex items-center justify-center bg-gradient-to-br ${step.color} text-white shadow-lg`}>
                    {step.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                
                {/* Arrow indicator */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits section */}
        <motion.div 
          className="mt-32 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-make-purple-500/5 to-make-blue-500/5 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
                <div className="p-8 md:p-12">
                  <h3 className="text-3xl font-bold mb-6 text-gray-900">
                    Why choose<br />our methodology
                  </h3>
                  <p className="text-gray-600 mb-10 leading-relaxed">
                    Our methodical approach ensures robust, reliable automation solutions perfectly adapted to your specific needs.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "100% customized solutions",
                      "Transparent collaborations",
                      "Measurable results",
                      "Dedicated technical support"
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "In-depth technical expertise",
                  description: "Our team masters the most advanced automation platforms with official certifications.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                  ),
                  color: "bg-blue-50 text-blue-700",
                },
                {
                  title: "Time and cost savings",
                  description: "Our clients save an average of 15 hours per week by automating their repetitive tasks.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  color: "bg-purple-50 text-purple-700"
                },
                {
                  title: "Guaranteed scalability",
                  description: "Our solutions adapt to your business growth, with continuous updates and improvements.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                    </svg>
                  ),
                  color: "bg-green-50 text-green-700"
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-md flex items-start space-x-5"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 