"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import DataManagement from "../illustrations/DataManagement";
import SecurityConsulting from "../illustrations/SecurityConsulting";
import TrainingEducation from "../illustrations/TrainingEducation";
import { CodeBracketIcon, DevicePhoneMobileIcon, PaintBrushIcon, ChartBarIcon, ShieldCheckIcon, AcademicCapIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "../ui/Button";

// Interface pour les items d'expertise
interface ExpertiseItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

// Données pour les items d'expertise
const expertiseItems: ExpertiseItem[] = [
  {
    id: "1",
    title: "Web Development",
    description:
      "Custom websites and applications built with modern technologies to meet your business needs.",
    icon: <CodeBracketIcon className="h-6 w-6" />,
    color: "from-purple-600/20 to-indigo-400/20 border-purple-500/20 text-purple-400",
  },
  {
    id: "2",
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications for iOS and Android devices.",
    icon: <DevicePhoneMobileIcon className="h-6 w-6" />,
    color: "from-cyan-600/20 to-sky-400/20 border-cyan-500/20 text-cyan-400",
  },
  {
    id: "3",
    title: "UI/UX Design",
    description:
      "User-focused designs that enhance usability and create memorable digital experiences.",
    icon: <PaintBrushIcon className="h-6 w-6" />,
    color: "from-pink-600/20 to-rose-400/20 border-pink-500/20 text-pink-400",
  },
  {
    id: "4",
    title: "Data Management",
    description:
      "Organize, store, and analyze your business data effectively for better insights.",
    icon: <ChartBarIcon className="h-6 w-6" />,
    color: "from-blue-600/20 to-cyan-400/20 border-blue-500/20 text-blue-400",
  },
  {
    id: "5",
    title: "Security Consulting",
    description:
      "Expert advice to protect your digital assets and ensure regulatory compliance.",
    icon: <ShieldCheckIcon className="h-6 w-6" />,
    color: "from-red-600/20 to-orange-400/20 border-red-500/20 text-red-400",
  },
  {
    id: "6",
    title: "Training and Education",
    description:
      "Comprehensive training programs to enhance your team's technical skills and knowledge.",
    icon: <AcademicCapIcon className="h-6 w-6" />,
    color: "from-green-600/20 to-emerald-400/20 border-green-500/20 text-green-400",
  },
];

export function WhatWeDo() {
  return (
    <section className="py-24 bg-[#111111] relative">
      {/* Diagonal design element */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-[#161616] skew-y-3 transform origin-left"></div>
      </div>
      
      <Container className="relative z-10">
        <div className="flex flex-col items-center mb-16">
          {/* Section header with creative typography */}
          <div className="mb-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative inline-block"
            >
              <span className="font-mono text-xs tracking-[0.3em] text-[#e63946] uppercase">Our Expertise</span>
              <div className="h-[2px] w-full bg-[#e63946]/20 mt-2"></div>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold text-white mt-4 relative inline-block"
            >
              <span className="relative z-10">Transform Your Ideas into Digital Solutions</span>
              <span className="absolute -bottom-2 left-0 h-3 w-full bg-[#e63946]/10"></span>
            </motion.h2>
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-400 text-center max-w-2xl text-lg mb-16"
          >
            Our team of experts accompanies you at every step of your digital transformation
          </motion.p>
        </div>
        
        {/* Expertise items with new card design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {expertiseItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#e63946]/20 -translate-y-2 translate-x-2 transition-all duration-300"></div>
              
              <div className="relative bg-[#1a1a1a] p-8 h-full transition-transform duration-300 group-hover:translate-y-1 group-hover:-translate-x-1">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-[#e63946]/10 text-[#e63946] mr-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-[#e63946] transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
                
                <div className="h-px w-12 bg-[#e63946]/30 mb-6"></div>
                
                <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Additional services list with horizontal layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 pt-12 border-t border-zinc-800"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
            <div className="lg:col-span-1">
              <h3 className="text-lg font-mono uppercase tracking-wide text-[#e63946]">Our other services:</h3>
            </div>
            
            <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Custom web application development",
                "E-commerce integration",
                "API development and integration",
                "Database design and management"
              ].map((service, index) => (
                <motion.div
                  key={service}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                  className="relative"
                >
                  <div className="border-l-2 border-[#e63946]/50 pl-3 py-1">
                    <span className="text-zinc-300 text-sm">{service}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* CTA button */}
          <div className="mt-16 text-center">
            <Link href="/services#pricing">
              <Button 
                variant="primary"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 px-8 py-3"
              >
                Explore our pricing options
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
} 