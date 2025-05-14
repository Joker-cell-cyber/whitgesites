"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

// Animation variants
const fadeInUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: "easeOut" 
    } 
  }
};

const pricingTiers = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for creators starting out with short-form content",
    price: "$9.99",
    priceValue: 9.99,
    period: "per script",
    btnText: "Get Started",
    isPopular: false,
    length: "Up to 3 min",
  },
  {
    id: "standard",
    name: "Standard",
    description: "Ideal for growing creators across any platform",
    price: "$39.50",
    priceValue: 39.50,
    period: "per script",
    btnText: "Choose Standard",
    isPopular: true,
    length: "Up to 10 min",
  },
  {
    id: "professional",
    name: "Professional",
    description: "For established creators who need the highest quality scripts",
    price: "$99.90",
    priceValue: 99.90,
    period: "per script",
    btnText: "Choose Pro",
    isPopular: false,
    length: "Up to 40 min",
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-vid-blue-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full filter blur-[80px] opacity-80"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-vid-blue-200 rounded-full filter blur-[80px] opacity-40"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-vid-blue-100 rounded-full filter blur-[60px] opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center rounded-full px-4 py-1.5 text-sm bg-vid-blue-100 text-vid-blue-700 font-medium border border-vid-blue-200 mb-6"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-accent mr-2"></span>
            Transparent Pricing
          </motion.div>
          
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariant}
            className="text-3xl md:text-5xl font-bold gradient-text mb-6 heading-font"
          >
            {COMPANY.serviceName} Packages
          </motion.h2>
          
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariant}
            className="text-xl text-vid-blue-700 max-w-3xl mx-auto"
          >
            Choose the perfect script package that matches your content needs and audience goals
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`rounded-3xl overflow-hidden relative group transition-all duration-300 hover:translate-y-[-8px] ${
                tier.isPopular
                  ? "bg-white shadow-2xl border-2 border-accent/20"
                  : "bg-white shadow-xl border border-vid-blue-100"
              }`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-accent to-accent-hover text-white text-center py-1.5 text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className={`p-8 ${tier.isPopular ? 'pt-12' : ''}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-vid-blue-900 heading-font">{tier.name}</h3>
                  <div className="px-3 py-1 bg-vid-blue-100 text-vid-blue-700 text-sm rounded-full font-medium">
                    {tier.length}
                  </div>
                </div>
                
                <p className="text-vid-blue-700 mb-6 h-12">{tier.description}</p>
                
                <div className="mb-8">
                  <span className="text-4xl font-bold text-vid-blue-900 heading-font">{tier.price}</span>
                  <span className="text-vid-blue-600 ml-2">{tier.period}</span>
                </div>
                
                <a 
                  href={`/checkout?package=${tier.id}&name=${encodeURIComponent(tier.name)}&price=${tier.priceValue}&length=${encodeURIComponent(tier.length)}`}
                  className={`block w-full text-center py-4 px-6 rounded-full font-medium transition-all duration-300 ${
                    tier.isPopular
                      ? "bg-gradient-to-r from-accent to-accent-hover text-white shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transform hover:scale-[1.02]"
                      : "bg-vid-blue-100 text-vid-blue-700 hover:bg-vid-blue-200 border border-vid-blue-200"
                  }`}
                >
                  {tier.btnText}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-vid-blue-700 text-center mb-4">
            Have special requirements? See our <a href="/pricing" className="text-accent hover:text-accent-hover font-medium">complete pricing</a> or contact us for customized script writing solutions.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center text-vid-blue-600 hover:text-accent font-medium transition-colors"
          >
            Get in touch for custom quotes
            <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection; 