"use client";

import { motion } from "framer-motion";

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
    <section id="pricing" className="py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariant}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Content Script Packages
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUpVariant}
            className="text-xl text-indigo-200 max-w-3xl mx-auto"
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
              className={`rounded-2xl overflow-hidden ${
                tier.isPopular
                  ? "bg-gradient-to-br from-blue-600/10 to-indigo-600/10 border border-blue-500/20 shadow-lg shadow-blue-500/10 ring-1 ring-blue-500/20"
                  : "bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800"
              }`}
            >
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-indigo-200 mb-6 h-12">{tier.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">{tier.price}</span>
                  <span className="text-indigo-300 ml-2">{tier.period}</span>
                </div>
                
                <a 
                  href={`/checkout?package=${tier.id}&name=${encodeURIComponent(tier.name)}&price=${tier.priceValue}&length=${encodeURIComponent(tier.length)}`}
                  className={`block text-center py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                    tier.isPopular
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-700"
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
          <p className="text-gray-400 text-center mt-12">
            Have special requirements? See our <a href="/pricing" className="text-blue-400 hover:text-blue-300">complete pricing</a> or contact us for customized script writing solutions.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center text-blue-400 hover:text-blue-300 font-medium transition-colors"
          >
            Get in touch for custom quotes
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection; 