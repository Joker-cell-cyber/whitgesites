"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

export default function AboutContent() {
  return (
    <div className="py-12 md:py-20 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-10"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-600 opacity-20 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white">
            About <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">BetterSetup</span>
          </h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-lg max-w-none prose-invert"
          >
            <h2 className="text-2xl font-semibold mb-4 text-white">Our Story</h2>
            <p className="mb-6 text-gray-300">
              Founded in 2025, {COMPANY.serviceName} was created to address the growing need for efficient organization systems in today&apos;s digital landscape. As businesses and individuals navigate an increasingly complex world, we recognized the opportunity to create streamlined solutions that help our clients achieve their goals with less stress and greater clarity.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 text-white">Our Mission</h2>
            <p className="mb-6 text-gray-300">
              At {COMPANY.serviceName}, our mission is to empower individuals and businesses to reach their full potential through structured organization systems. We believe that with the right organizational framework, anyone can transform chaos into clarity and achieve their goals more efficiently.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 text-white">Our Vision</h2>
            <p className="mb-6 text-gray-300">
              We envision a world where organization is accessible to everyone, where technology serves as an enhancement to human productivity rather than a distraction. {COMPANY.serviceName} aims to be at the forefront of this movement, continuously innovating to provide cutting-edge organization solutions for the modern world.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4 text-white">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div 
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-gray-800/70 to-black/70 backdrop-blur-sm p-5 rounded-xl border border-gray-800 shadow-lg shadow-indigo-500/5"
              >
                <h3 className="font-medium text-lg mb-2 text-white">Simplicity</h3>
                <p className="text-gray-300">We believe in creating systems that are intuitive and user-friendly. Complexity is the enemy of productivity.</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-gray-800/70 to-black/70 backdrop-blur-sm p-5 rounded-xl border border-gray-800 shadow-lg shadow-indigo-500/5"
              >
                <h3 className="font-medium text-lg mb-2 text-white">Efficiency</h3>
                <p className="text-gray-300">Our solutions are designed to maximize productivity while minimizing effort, allowing you to focus on what truly matters.</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-gray-800/70 to-black/70 backdrop-blur-sm p-5 rounded-xl border border-gray-800 shadow-lg shadow-indigo-500/5"
              >
                <h3 className="font-medium text-lg mb-2 text-white">Innovation</h3>
                <p className="text-gray-300">We continuously explore new methods and technologies to improve our organization systems and stay ahead of evolving needs.</p>
              </motion.div>
              <motion.div 
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-gradient-to-br from-gray-800/70 to-black/70 backdrop-blur-sm p-5 rounded-xl border border-gray-800 shadow-lg shadow-indigo-500/5"
              >
                <h3 className="font-medium text-lg mb-2 text-white">Quality</h3>
                <p className="text-gray-300">We are committed to delivering exceptional service and attention to detail in everything we do.</p>
              </motion.div>
            </div>
            
            <h2 className="text-2xl font-semibold mb-4 text-white">Our Approach</h2>
            <p className="mb-6 text-gray-300">
              {COMPANY.serviceName} takes a holistic approach to organization. We understand that every individual and business has unique needs, which is why we offer customizable solutions rather than one-size-fits-all packages. Our proven methodology involves:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-300">
              <li className="mb-2">Thorough assessment of current organizational challenges</li>
              <li className="mb-2">Custom design of tailored organization systems</li>
              <li className="mb-2">Implementation with clear instructions and support</li>
              <li className="mb-2">Follow-up to ensure optimal functionality and user satisfaction</li>
            </ul>
            
            <p className="text-gray-300">
              Whether you&apos;re an individual seeking to better organize your personal projects, a small team aiming to improve collaboration, or a large business looking to streamline operations, {COMPANY.serviceName} has the expertise and tools to help you succeed.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12 text-center"
          >
            <a 
              href="/contact" 
              className="inline-flex items-center px-8 py-4 rounded-full font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/30 transition-all duration-300"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 