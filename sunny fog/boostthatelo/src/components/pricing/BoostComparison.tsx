"use client";

import { motion } from "framer-motion";

export default function BoostComparison() {
  return (
    <section className="py-16 relative overflow-hidden" id="comparison">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Service <span className="gradient-text">Comparison</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            Compare our different boosting services to find the best option for your needs
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative overflow-x-auto shadow-md rounded-xl border border-gray-800"
        >
          <table className="w-full text-sm">
            <thead className="text-xs uppercase bg-[#1a1a1a]">
              <tr>
                <th scope="col" className="px-6 py-5 text-left font-semibold text-gray-200">
                  Service Feature
                </th>
                <th scope="col" className="px-6 py-5 text-center font-semibold text-gray-200">
                  Regular Boosting
                </th>
                <th scope="col" className="px-6 py-5 text-center font-semibold text-gray-200">
                  Duo Queue Boosting
                </th>
                <th scope="col" className="px-6 py-5 text-center font-semibold text-gray-200">
                  Coaching
                </th>
              </tr>
            </thead>
            
            <tbody>
              <tr className="bg-[#121212] border-b border-gray-800">
                <th scope="row" className="px-6 py-4 text-left font-medium text-gray-200">
                  Rank Improvement
                </th>
                <td className="px-6 py-4 text-center text-green-500">
                  <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </td>
                <td className="px-6 py-4 text-center text-green-500">
                  <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </td>
                <td className="px-6 py-4 text-center text-gray-400">Varies</td>
              </tr>
              
              <tr className="bg-[#1a1a1a] border-b border-gray-800">
                <th scope="row" className="px-6 py-4 text-left font-medium text-gray-200">
                  Account Safety
                </th>
                <td className="px-6 py-4 text-center text-green-500">
                  <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </td>
                <td className="px-6 py-4 text-center text-green-500">
                  <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </td>
                <td className="px-6 py-4 text-center text-green-500">
                  <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </td>
              </tr>
              
              <tr className="bg-[#121212] border-b border-gray-800">
                <th scope="row" className="px-6 py-4 text-left font-medium text-gray-200">
                  VPN Protection
                </th>
                <td className="px-6 py-4 text-center text-green-500">
                  <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </td>
                <td className="px-6 py-4 text-center text-green-500">
                  <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </td>
                <td className="px-6 py-4 text-center text-gray-400">N/A</td>
              </tr>
              
              <tr className="bg-[#1a1a1a] border-b border-gray-800">
                <th scope="row" className="px-6 py-4 text-left font-medium text-gray-200">
                  Skill Improvement
                </th>
                <td className="px-6 py-4 text-center text-orange-500">Limited</td>
                <td className="px-6 py-4 text-center text-green-500">Moderate</td>
                <td className="px-6 py-4 text-center text-green-500">Significant</td>
              </tr>
              
              <tr className="bg-[#121212] border-b border-gray-800">
                <th scope="row" className="px-6 py-4 text-left font-medium text-gray-200">
                  Learning Opportunity
                </th>
                <td className="px-6 py-4 text-center text-red-500">
                  <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </td>
                <td className="px-6 py-4 text-center text-green-500">
                  <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </td>
                <td className="px-6 py-4 text-center text-green-500">
                  <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </td>
              </tr>
              
              <tr className="bg-[#1a1a1a] border-b border-gray-800">
                <th scope="row" className="px-6 py-4 text-left font-medium text-gray-200">
                  Speed of Results
                </th>
                <td className="px-6 py-4 text-center text-green-500">Fast</td>
                <td className="px-6 py-4 text-center text-orange-500">Medium</td>
                <td className="px-6 py-4 text-center text-orange-500">Slow</td>
              </tr>
              
              <tr className="bg-[#121212] border-b border-gray-800">
                <th scope="row" className="px-6 py-4 text-left font-medium text-gray-200">
                  Personal Involvement
                </th>
                <td className="px-6 py-4 text-center text-gray-400">None</td>
                <td className="px-6 py-4 text-center text-green-500">High</td>
                <td className="px-6 py-4 text-center text-green-500">High</td>
              </tr>
              
              <tr className="bg-[#1a1a1a] border-b border-gray-800">
                <th scope="row" className="px-6 py-4 text-left font-medium text-gray-200">
                  Average Cost
                </th>
                <td className="px-6 py-4 text-center text-gray-300">$$$</td>
                <td className="px-6 py-4 text-center text-gray-300">$$$$</td>
                <td className="px-6 py-4 text-center text-gray-300">$$</td>
              </tr>
              
              <tr className="bg-[#121212]">
                <th scope="row" className="px-6 py-4 text-left font-medium text-gray-200">
                  Best For
                </th>
                <td className="px-6 py-4 text-center text-gray-300">Fast rank-up</td>
                <td className="px-6 py-4 text-center text-gray-300">Learning while ranking</td>
                <td className="px-6 py-4 text-center text-gray-300">Long-term improvement</td>
              </tr>
            </tbody>
          </table>
        </motion.div>
        
        <div className="mt-10 text-center">
          <p className="text-gray-400 text-sm max-w-xl mx-auto">
            Our services are designed to cater to different player needs. Choose the one that best fits your goals and playstyle.
          </p>
        </div>
      </div>
    </section>
  );
} 