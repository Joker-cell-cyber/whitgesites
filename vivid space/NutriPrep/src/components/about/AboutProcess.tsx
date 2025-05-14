"use client";

import { motion } from "framer-motion";

export default function AboutProcess() {
  const steps = [
    {
      number: "01",
      title: "Research & Assessment",
      description: "We start with thorough research of nutritional science and market needs to understand what truly works."
    },
    {
      number: "02",
      title: "Plan Development",
      description: "Our nutrition experts and chefs collaborate to create meal plans that balance health benefits and culinary excellence."
    },
    {
      number: "03",
      title: "Quality Testing",
      description: "Every meal plan undergoes rigorous testing for nutritional quality, taste satisfaction, and ease of preparation."
    },
    {
      number: "04",
      title: "Continuous Improvement",
      description: "We continually refine our offerings based on the latest nutritional research and customer feedback."
    }
  ];

  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-turquoise-600 to-purple-500">
              Our Process
            </span>
          </motion.h2>
          <motion.p
            className="text-gray-600 text-lg max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            How we create meal plans that are both nutritionally sound and culinary delights.
          </motion.p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col md:flex-row gap-6 items-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-turquoise-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
                  {step.number}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Our dedication to this process ensures that each meal plan we offer meets our high standards for both nutrition and taste, helping you achieve your health goals without compromising on flavor or convenience.
          </p>
        </motion.div>
      </div>
    </div>
  );
} 