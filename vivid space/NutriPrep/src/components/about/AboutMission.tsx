"use client";

import { motion } from "framer-motion";

export default function AboutMission() {
  return (
    <div className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden aspect-square md:aspect-video shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-turquoise-600/30 to-purple-500/30 mix-blend-overlay z-10"></div>
              <div className="bg-gradient-to-br from-turquoise-100 to-purple-100 h-full w-full flex items-center justify-center">
                <svg className="h-1/3 w-1/3 text-turquoise-600 opacity-20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1h-2zm-2 0H8v-5c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v5z" />
                </svg>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-turquoise-600 to-purple-500">
              Our Mission
            </h2>
            <p className="text-gray-600 text-lg mb-6">
              Our mission is to revolutionize the way people approach nutrition by providing accessible, delicious, and scientifically-backed meal plans that fit seamlessly into modern lifestyles.
            </p>
            <p className="text-gray-600 text-lg mb-6">
              We believe good nutrition should be simple, achievable, and enjoyable for everyone. Our meal plans are designed to eliminate the guesswork from healthy eating, allowing you to focus on what matters most in your life.
            </p>
            <p className="text-gray-600 text-lg">
              By combining culinary expertise with nutritional science, we&apos;re creating a path to better health that&apos;s sustainable and satisfying. Our approach isn&apos;t about restriction—it&apos;s about finding freedom through informed, intentional choices.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 