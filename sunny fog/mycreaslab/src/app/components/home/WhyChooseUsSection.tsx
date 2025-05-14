"use client";

import React from "react";
import { motion } from "framer-motion";
import { SparklesIcon, UserGroupIcon, BoltIcon, CheckBadgeIcon, CursorArrowRaysIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";

export default function WhyChooseUsSection() {
  const features = [
    {
      icon: <SparklesIcon className="w-7 h-7" />,
      title: "Creative Vision",
      description: "We create unique and memorable visual identities that perfectly capture your brand essence and make you stand out."
    },
    {
      icon: <UserGroupIcon className="w-7 h-7" />,
      title: "Client-Focused Approach",
      description: "Your satisfaction is our top priority. We collaborate closely with you to ensure your vision comes to life exactly as you imagined."
    },
    {
      icon: <BoltIcon className="w-7 h-7" />,
      title: "Fast Delivery",
      description: "We understand the importance of deadlines. Our efficient processes ensure your project is delivered on time, every time."
    },
    {
      icon: <CheckBadgeIcon className="w-7 h-7" />,
      title: "Quality Assurance",
      description: "Every project undergoes rigorous quality checks to ensure impeccable results that meet the highest industry standards."
    },
    {
      icon: <CursorArrowRaysIcon className="w-7 h-7" />,
      title: "Digital Expertise",
      description: "Our team of experts brings years of experience in digital design, marketing, and technology to every project we undertake."
    },
    {
      icon: <RocketLaunchIcon className="w-7 h-7" />,
      title: "Growth Support",
      description: "We don't just deliver projects; we provide ongoing support to help your brand grow and evolve in the digital landscape."
    }
  ];

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <motion.section 
      className="bg-gray-50 dark:bg-gray-900/30"
    >
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <span className="px-4 py-1.5 rounded-full border border-teal-600 dark:border-teal-400 text-teal-600 dark:text-teal-400 text-sm font-medium inline-block mb-4">
            Why choose us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Creative expertise <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-yellow-500">driving your success</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our unique approach combines creativity, strategy, and technical know-how to deliver exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              variants={fadeIn}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl shadow-teal-600/5 dark:shadow-teal-500/5 border border-gray-100 dark:border-gray-700 group hover:shadow-2xl hover:shadow-teal-600/10 dark:hover:shadow-teal-500/10 transition-all duration-300"
            >
              <div className="w-14 h-14 mb-6 rounded-full flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/50 dark:to-teal-800/50 text-teal-600 dark:text-teal-400 group-hover:from-teal-100 group-hover:to-teal-200 dark:group-hover:from-teal-900 dark:group-hover:to-teal-800 transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-all">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
} 