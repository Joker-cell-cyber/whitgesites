"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import DataManagement from "../illustrations/DataManagement";
import SecurityConsulting from "../illustrations/SecurityConsulting";
import TrainingEducation from "../illustrations/TrainingEducation";
import { CodeBracketIcon, DevicePhoneMobileIcon, PaintBrushIcon, ChartBarIcon, ShieldCheckIcon, AcademicCapIcon } from "@heroicons/react/24/outline";

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
    <section className="py-20 bg-gradient-to-b from-zinc-900 to-black relative overflow-hidden">
      {/* Éléments de design en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-3xl" />
        <div className="absolute -bottom-[300px] -left-[300px] w-[600px] h-[600px] rounded-full bg-blue-900/10 blur-3xl" />
      </div>
      
      <Container className="relative z-10">
        <div className="space-y-16">
          {/* En-tête de section */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-purple-600/20 to-pink-500/20 text-purple-300 border border-purple-500/20">
                Our Expertise
              </span>
            </motion.div>
            
            <motion.h2
              className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Transform Your Ideas into Digital Solutions
            </motion.h2>
            
            <motion.p
              className="text-zinc-400 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our team of experts accompanies you at every step of your digital transformation
            </motion.p>
          </div>
          
          {/* Grille d'expertise */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {expertiseItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="relative"
              >
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 h-full group hover:border-purple-500/30 transition-all duration-300">
                  <div className={`w-16 h-16 rounded-lg mb-6 flex items-center justify-center bg-gradient-to-r ${item.color}`}>
                    {item.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                    {item.title}
                  </h3>
                  
                  <p className="text-zinc-400">
                    {item.description}
                  </p>
                </div>
                
                {/* Effet de lueur au survol */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-600/0 to-pink-500/0 group-hover:from-purple-600/10 group-hover:to-pink-500/10 rounded-xl blur-xl transition-all duration-300 opacity-0 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
          
          {/* Bannière de services complémentaires */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-12 items-center"
          >
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <h3 className="text-lg font-medium text-white">Our other services:</h3>
            </div>
            
            {[
              "Custom web application development",
              "E-commerce integration",
              "API development and integration",
              "Database design and management"
            ].map((service, index) => (
              <motion.div
                key={service}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                className="col-span-1 sm:col-span-1"
              >
                <div className="flex items-center space-x-2">
                  <svg className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-zinc-300 text-sm">{service}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
} 