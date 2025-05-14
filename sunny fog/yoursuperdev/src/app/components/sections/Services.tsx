"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "../ui/Card";
import { Container } from "../ui/Container";
import { FaCode, FaMobileAlt, FaShoppingCart, FaPalette, FaServer, FaRocket } from "react-icons/fa";
import Link from "next/link";

const serviceItems = [
  {
    icon: <FaCode className="w-6 h-6 text-purple-500" />,
    title: "Web Development",
    description: "Custom websites and web applications built with the latest technologies for optimal performance and SEO.",
    href: "/services/web-development",
  },
  {
    icon: <FaMobileAlt className="w-6 h-6 text-pink-500" />,
    title: "Mobile Apps",
    description: "Native and cross-platform mobile applications for iOS and Android with intuitive user interfaces.",
    href: "/services/mobile-apps",
  },
  {
    icon: <FaShoppingCart className="w-6 h-6 text-blue-500" />,
    title: "E-commerce",
    description: "Powerful online stores with customized features, secure payment processing, and inventory management.",
    href: "/services/ecommerce",
  },
  {
    icon: <FaPalette className="w-6 h-6 text-green-500" />,
    title: "UI/UX Design",
    description: "User-centered design that enhances user experience and creates intuitive, beautiful interfaces.",
    href: "/services/ui-ux",
  },
  {
    icon: <FaServer className="w-6 h-6 text-yellow-500" />,
    title: "Backend Solutions",
    description: "Robust server-side applications, API development, and database architecture for your business.",
    href: "/services/backend",
  },
  {
    icon: <FaRocket className="w-6 h-6 text-red-500" />,
    title: "Performance Optimization",
    description: "Optimization services to improve loading speed, performance, and conversion rates of your digital products.",
    href: "/services/optimization",
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-zinc-950">
      <Container>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 mb-4"
          >
            Our Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-2xl mx-auto text-zinc-400 text-lg"
          >
            We deliver tailor-made digital solutions to meet your specific business needs
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={service.href}>
                <Card 
                  className="group h-full bg-zinc-900/50 hover:bg-zinc-900/80 transition-all duration-300 border border-zinc-800 hover:border-purple-500/50"
                >
                  <div className="p-6 md:p-8">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <a 
              href="/services"
              className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 text-white border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300"
            >
              View all services
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  );
} 