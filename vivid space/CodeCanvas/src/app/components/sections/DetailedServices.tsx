"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { MagneticButton } from "../ui/MagneticButton";
import Link from "next/link";

interface DetailedService {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  color: string;
}

const detailedServices: DetailedService[] = [
  {
    title: "Web Development",
    description: "We create modern, responsive, and high-performance websites using the latest technologies.",
    features: [
      "Custom website development",
      "Responsive design",
      "SEO optimization",
      "Performance optimization",
      "Content management systems",
      "E-commerce integration"
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Mobile Apps",
    description: "We develop native and cross-platform mobile applications for iOS and Android.",
    features: [
      "Native iOS development",
      "Native Android development",
      "Cross-platform solutions",
      "UI/UX design",
      "App store optimization",
      "Push notifications"
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "E-commerce",
    description: "We build powerful and scalable e-commerce platforms to grow your online business.",
    features: [
      "Custom e-commerce development",
      "Payment gateway integration",
      "Inventory management",
      "Order processing",
      "Customer management",
      "Analytics and reporting"
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    color: "from-green-500 to-emerald-500"
  }
];

export function DetailedServices() {
  return (
    <section className="py-20 bg-[#010101] relative">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[linear-gradient(#ff3e00_1px,transparent_1px),linear-gradient(90deg,#ff3e00_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="flex flex-col items-center">
          {/* Section header with horizontal line */}
          <div className="relative mb-16 text-center">
            <div className="font-mono text-sm tracking-widest text-[#ff3e00] uppercase mb-1">Our Services</div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "100px" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-0.5 bg-[#ff3e00] mx-auto mb-4"
            />
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">
              Our Services in Detail
            </h2>
            <p className="max-w-2xl mx-auto text-zinc-400 text-lg">
              Discover our comprehensive range of digital services designed to meet your business needs
            </p>
          </div>
          
          {/* Services in a different layout */}
          <div className="grid grid-cols-1 gap-12">
            {detailedServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="relative"
              >
                <div className={`flex flex-col lg:flex-row items-start gap-10 p-8 ${
                  index % 2 === 0 
                    ? "border-l-4 border-[#ff3e00] pl-6 bg-gradient-to-r from-zinc-900/80 to-black" 
                    : "border-r-4 border-[#ff3e00] pr-6 lg:flex-row-reverse bg-gradient-to-l from-zinc-900/80 to-black"
                }`}>
                  {/* Service header */}
                  <div className="lg:w-1/3">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 rounded-sm bg-[#ff3e00]/10 text-[#ff3e00]">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-zinc-400 mb-4">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Service features */}
                  <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {service.features.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex} 
                        className="bg-zinc-900/50 p-3 border border-zinc-800 flex flex-col relative overflow-hidden group"
                      >
                        <div className="absolute h-full w-1 bg-[#ff3e00]/40 top-0 left-0 group-hover:bg-[#ff3e00] transition-colors duration-300"></div>
                        <span className="text-zinc-200 font-mono text-sm pl-3 group-hover:text-white transition-colors duration-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* CTA button */}
          <div className="mt-16 text-center">
            <Link href="/services#pricing">
              <MagneticButton 
                className="bg-[#ff3e00] hover:bg-[#e03600] text-white font-medium px-8 py-4" 
                strength={30}
              >
                View our pricing options
              </MagneticButton>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
} 