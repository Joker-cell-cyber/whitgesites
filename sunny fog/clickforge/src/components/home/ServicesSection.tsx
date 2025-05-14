"use client";

import { motion } from "framer-motion";
import Link from "next/link";

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export default function ServicesSection() {
  const services = [
    {
      title: "Pre-Lander Design",
      description: "Custom pre-landers that warm up cold traffic and prepare visitors for your main offer.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      features: [
        "Attention-grabbing design",
        "Fast-loading optimized pages",
        "Mobile-responsive layouts",
        "Complete source code delivery"
      ],
      bgGradient: "from-blue-100 via-transparent to-transparent",
      iconBg: "bg-blue-500"
    },
    {
      title: "Sales Landing Pages",
      description: "Professional high-converting sales pages designed to showcase your product and drive conversions.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: [
        "Conversion-optimized design",
        "Compelling call-to-action elements",
        "Trust-building sections",
        "Payment integration ready"
      ],
      bgGradient: "from-purple-100 via-transparent to-transparent",
      iconBg: "bg-purple-500"
    },
    {
      title: "Lead Generation Pages",
      description: "Custom pages designed to capture quality leads and grow your email list or customer database.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      features: [
        "Opt-in form optimization",
        "Multi-step form options",
        "Email service integration",
        "GDPR compliant design"
      ],
      bgGradient: "from-cyan-100 via-transparent to-transparent",
      iconBg: "bg-cyan-500"
    }
  ];

  return (
    <section id="services" className="py-32 bg-gradient-to-b from-[#121212] to-[#0a0a0a]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Our Landing Page Design Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-gray-400"
          >
            We specialize in creating high-converting landing pages that drive real results for your business.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <Link 
              href="/pricing" 
              className="px-6 py-3 bg-white text-[#0a0a0a] rounded-lg font-medium hover:bg-gray-200 transition-colors duration-300"
            >
              View Pricing Options
            </Link>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="relative rounded-xl p-6 overflow-hidden bg-[#141414] hover:shadow-lg hover:shadow-[rgba(37,99,235,0.2)] transition-all duration-300 border border-[rgba(37,99,235,0.05)] hover:border-[rgba(37,99,235,0.2)]"
              variants={itemVariants}
            >
              <div className={`absolute top-0 left-0 w-full h-24 bg-gradient-to-r opacity-10 dark:opacity-5 ${service.bgGradient}`}></div>
              
              <div className="mb-4 relative">
                <span className={`inline-flex items-center justify-center w-12 h-12 rounded-lg text-white ${service.iconBg}`}>
                {service.icon}
                </span>
                <div className="absolute -right-3 -bottom-8 w-24 h-24 bg-[rgb(37,99,235)] rounded-full opacity-5 blur-xl"></div>
              </div>
              
              <div className="relative">
              <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
              <p className="text-gray-400 mb-5">{service.description}</p>
              
                <ul className="space-y-3">
                {service.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start">
                      <svg className="h-5 w-5 text-[rgb(37,99,235)] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              </div>
              
              <div className="absolute bottom-6 right-6 opacity-20">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor" opacity="0.2" />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16 p-8 rounded-xl bg-[#141414] border border-[rgba(37,99,235,0.1)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4">Complete Funnel Design Service</h3>
              <p className="text-gray-400 mb-6">
                Need a complete sales funnel? We design and connect multiple landing pages to create a seamless customer journey from awareness to conversion.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-[rgb(37,99,235)] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Cohesive design between pages</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-[rgb(37,99,235)] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Strategic conversion pathways</span>
                </div>
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-[rgb(37,99,235)] mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-300">Complete funnel implementation</span>
                </div>
              </div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="mt-6"
              >
                <Link
                  href="/pricing"
                  className="inline-flex items-center px-4 py-2 bg-[rgb(37,99,235)] text-white rounded-lg hover:bg-[rgb(29,78,216)] transition-colors duration-200"
                >
                  View Pricing
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="p-1 rounded-xl bg-gradient-to-r from-[rgb(37,99,235)] to-[rgb(124,58,237)]">
                <div className="bg-[#141414] p-8 rounded-lg">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-[rgb(37,99,235)]"></div>
                      <div className="w-3 h-3 rounded-full bg-[rgb(124,58,237)]"></div>
                      <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                    </div>
                    <div className="text-gray-400 text-sm">Funnel Process</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-3 rounded bg-[rgba(37,99,235,0.1)] border border-[rgba(37,99,235,0.2)] flex items-center">
                      <div className="w-8 h-8 rounded bg-[rgb(37,99,235)] flex items-center justify-center text-white mr-3">1</div>
                      <div className="text-white font-medium">Pre-Lander Design</div>
                      <svg className="ml-auto h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    
                    <svg className="w-6 h-6 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    
                    <div className="p-3 rounded bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.2)] flex items-center">
                      <div className="w-8 h-8 rounded bg-[rgb(124,58,237)] flex items-center justify-center text-white mr-3">2</div>
                      <div className="text-white font-medium">Landing Page Design</div>
                      <svg className="ml-auto h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    
                    <svg className="w-6 h-6 mx-auto text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                    
                    <div className="p-3 rounded bg-[rgba(14,165,233,0.1)] border border-[rgba(14,165,233,0.2)] flex items-center">
                      <div className="w-8 h-8 rounded bg-[rgb(14,165,233)] flex items-center justify-center text-white mr-3">3</div>
                      <div className="text-white font-medium">Delivery & Implementation</div>
                      <svg className="ml-auto h-5 w-5 text-[rgb(14,165,233)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
        </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 