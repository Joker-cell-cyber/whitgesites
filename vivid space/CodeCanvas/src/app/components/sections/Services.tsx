"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Container } from "../ui/Container";
import Link from "next/link";

const serviceItems = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Web Development",
    description: "Custom websites and web applications built with the latest technologies for optimal performance and SEO.",
    href: "/services/web-development",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android with intuitive user interfaces.",
    href: "/services/mobile-apps",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "E-commerce",
    description: "Powerful online stores with customized features, secure payment processing, and inventory management.",
    href: "/services/ecommerce",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "UI/UX Design",
    description: "User-centered design that enhances user experience and creates intuitive, beautiful interfaces.",
    href: "/services/ui-ux",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    title: "Backend Solutions",
    description: "Robust server-side applications, API development, and database architecture for your business.",
    href: "/services/backend",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Performance Optimization",
    description: "Optimization services to improve loading speed, performance, and conversion rates of your digital products.",
    href: "/services/optimization",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-slate-950 relative">
      {/* Decorative background */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-sky-500/20 to-transparent" />
      <div className="absolute left-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-sky-500/20 to-transparent" />
      <div className="absolute right-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-sky-500/20 to-transparent" />
      
      <Container>
        <div className="flex flex-col items-center">
          {/* Section header */}
          <div className="flex flex-col items-center mb-16 relative">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-px w-16 bg-sky-500 mb-4 origin-left"
            />
            
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-sky-500 text-sm uppercase tracking-widest font-mono"
            >
              Our Services
            </motion.span>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl font-bold text-white mt-4 mb-4"
            >
              Our Services
            </motion.h2>
            
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-px w-16 bg-sky-500 mb-6 origin-right"
            />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-2xl text-center text-slate-400 text-lg"
            >
              We deliver tailor-made digital solutions to meet your specific business needs
            </motion.p>
          </div>
          
          {/* Services with new layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-20 gap-x-8 w-full">
            {serviceItems.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative"
              >
                <Link href={service.href} className="block group">
                  {/* Service card with horizontal orientation */}
                  <div className="relative">
                    {/* Icon circle that overlaps the top */}
                    <div className="absolute -top-10 left-0 w-20 h-20 bg-slate-900 border-2 border-sky-500/20 rounded-full flex items-center justify-center group-hover:border-sky-500 transition-colors duration-300">
                      <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                        {service.icon}
                      </div>
                    </div>
                    
                    {/* Content box with border that lights up */}
                    <div className="pt-12 pl-4 pr-4 pb-6 bg-slate-900/50 border border-slate-800 group-hover:border-sky-500/40 transition-colors duration-300">
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors duration-300">
                        {service.title}
                      </h3>
                      
                      <p className="text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                        {service.description}
                      </p>
                      
                      <div className="mt-4 flex items-center">
                        <span className="text-sm text-sky-500 font-semibold group-hover:text-sky-400 transition-colors duration-300">
                          Learn more
                        </span>
                        <svg 
                          className="ml-2 w-4 h-4 text-sky-500 transform group-hover:translate-x-1 transition-transform duration-300" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          {/* "View all services" link with new style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-20"
          >
            <a 
              href="/services"
              className="inline-flex items-center group"
            >
              <span className="bg-sky-500/10 border border-sky-500/30 text-sky-400 px-6 py-3 font-mono uppercase text-sm tracking-wider hover:bg-sky-500/20 transition-colors duration-300">
                View all services
              </span>
              <div className="w-8 h-px bg-sky-500/50 group-hover:w-12 transition-all duration-300 ml-3"></div>
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
} 