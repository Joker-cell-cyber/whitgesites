"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "ClickForge has transformed how I build landing pages for my affiliate campaigns. I went from a 3% to a 14% conversion rate in just two weeks!",
    author: "Sarah J.",
    role: "Affiliate Marketer",
    avatar: "/images/avatar-1.jpg"
  },
  {
    quote: "The templates are not only beautiful but actually convert. I've tried other builders before, but nothing comes close to ClickForge's performance.",
    author: "Michael R.",
    role: "Digital Marketing Agency",
    avatar: "/images/avatar-2.jpg"
  },
  {
    quote: "As someone with zero design skills, ClickForge has been a game-changer. I can now launch professional landing pages that actually convert in minutes.",
    author: "Jessica T.",
    role: "Solo Entrepreneur",
    avatar: "/images/avatar-3.jpg"
  },
  {
    quote: "The analytics dashboard alone is worth the price. Being able to see what's working and optimize in real-time has increased my ROI dramatically.",
    author: "David K.",
    role: "SaaS Affiliate",
    avatar: "/images/avatar-4.jpg"
  }
];

export default function TestimonialSection() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-[rgba(37,99,235,0.03)] rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[rgba(124,58,237,0.03)] rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[rgba(124,58,237,0.1)] to-transparent"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[rgba(124,58,237,0.1)] text-[rgb(124,58,237)] mb-4"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 9a3 3 0 013-3v0a3 3 0 013 3v1.5a3 3 0 01-3 3v0a3 3 0 01-3-3V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 9a3 3 0 013-3v0a3 3 0 013 3v1.5a3 3 0 01-3 3v0a3 3 0 01-3-3V9z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Testimonials
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[rgb(37,99,235)] to-[rgb(124,58,237)]">Customers</span> Say
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Thousands of affiliate marketers rely on ClickForge to build high-converting landing pages
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-8 relative overflow-hidden"
            >
              {/* Quote mark decoration */}
              <div className="absolute top-4 right-4 text-[rgba(124,58,237,0.1)] text-6xl font-serif">
                &quot;
              </div>

              <p className="text-lg mb-6 relative z-10">{testimonial.quote}</p>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 relative bg-[rgba(255,255,255,0.05)]">
                  {/* Avatar placeholder - in a real app you'd use actual images */}
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-[rgb(37,99,235)]">
                    {testimonial.author.charAt(0)}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold">{testimonial.author}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-sm text-gray-500 mb-6">TRUSTED BY MARKETERS FROM</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="h-8 grayscale opacity-50 hover:opacity-100 transition-opacity">
              <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 5H5V20H20V5Z" fill="#4285F4"/>
                <path d="M35 5H25V20H35V5Z" fill="#EA4335"/>
                <path d="M50 5H40V20H50V5Z" fill="#FBBC05"/>
                <path d="M65 5H55V20H65V5Z" fill="#34A853"/>
                <path d="M95.0001 13.1111C95.0001 8.82333 91.6223 5.44444 87.3334 5.44444C83.0445 5.44444 79.6667 8.82333 79.6667 13.1111C79.6667 17.3989 83.0445 20.7778 87.3334 20.7778C91.6223 20.7778 95.0001 17.3989 95.0001 13.1111Z" fill="white"/>
              </svg>
            </div>
            <div className="h-8 grayscale opacity-50 hover:opacity-100 transition-opacity">
              <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 5L5 25H15L25 5H15Z" fill="#FF9900"/>
                <path d="M32.5 5L22.5 25H32.5L42.5 5H32.5Z" fill="#FF9900"/>
                <path d="M60 5H50V25H60V5Z" fill="#FF9900"/>
                <path d="M80 15C80 9.47715 84.4772 5 90 5C95.5228 5 100 9.47715 100 15C100 20.5228 95.5228 25 90 25C84.4772 25 80 20.5228 80 15Z" fill="#FF9900"/>
              </svg>
            </div>
            <div className="h-8 grayscale opacity-50 hover:opacity-100 transition-opacity">
              <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="5" y="5" width="20" height="20" rx="10" fill="#1877F2"/>
                <rect x="35" y="5" width="20" height="20" rx="4" fill="#1877F2"/>
                <rect x="65" y="5" width="20" height="20" rx="10" fill="#1877F2"/>
                <rect x="95" y="5" width="20" height="20" rx="4" fill="#1877F2"/>
              </svg>
            </div>
            <div className="h-8 grayscale opacity-50 hover:opacity-100 transition-opacity">
              <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 5H5V25H25V5Z" fill="#7289DA"/>
                <path d="M55 5H35V25H55V5Z" fill="#7289DA"/>
                <path d="M85 5H65V25H85V5Z" fill="#7289DA"/>
                <path d="M115 5H95V25H115V5Z" fill="#7289DA"/>
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-8"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[rgb(37,99,235)] to-[rgb(124,58,237)]">10,000+</h3>
            <p className="text-gray-400">Active Users</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-8"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[rgb(37,99,235)] to-[rgb(124,58,237)]">500K+</h3>
            <p className="text-gray-400">Landing Pages Created</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] rounded-2xl p-8"
          >
            <h3 className="text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[rgb(37,99,235)] to-[rgb(124,58,237)]">8.5%</h3>
            <p className="text-gray-400">Average Conversion Rate</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 