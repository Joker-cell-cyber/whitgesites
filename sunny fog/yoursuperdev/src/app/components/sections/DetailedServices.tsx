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
    <section className="py-24 bg-zinc-950">
      <Container>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 mb-4"
          >
            Our Services in Detail
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto text-zinc-400 text-lg"
          >
            Discover our comprehensive range of digital services designed to meet your business needs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {detailedServices.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-full bg-zinc-900/50 rounded-xl p-8 border border-zinc-800 hover:border-purple-500/50 transition-all duration-300">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-zinc-400 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-zinc-300">
                      <svg className="w-4 h-4 mr-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
} 