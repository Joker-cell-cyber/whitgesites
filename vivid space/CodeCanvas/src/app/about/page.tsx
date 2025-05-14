"use client";

import React from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { motion } from "framer-motion";
import { Container } from "../components/ui/Container";
import { MagneticButton } from "../components/ui/MagneticButton";
import Image from "next/image";
import { GlowingEffect } from "../components/animations/GlowingEffect";
import Link from "next/link";

const values = [
  {
    title: "Innovation",
    description: "We embrace cutting-edge technologies and creative approaches to deliver solutions that stand out in today's digital landscape.",
    icon: "🚀"
  },
  {
    title: "Quality",
    description: "We are committed to excellence in every aspect of our work, ensuring robust, scalable, and high-performing applications.",
    icon: "✨"
  },
  {
    title: "Transparency",
    description: "We believe in open communication and keeping our clients informed throughout the development process.",
    icon: "🔍"
  },
  {
    title: "Client-Centric",
    description: "Your success is our success. We prioritize understanding your needs to deliver solutions that exceed expectations.",
    icon: "🤝"
  }
];

// Composant pour afficher une valeur de l'entreprise
const ValueCard = ({ value, index }: { value: typeof values[0], index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300 p-6"
    >
      <div className="text-4xl mb-4">{value.icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
      <p className="text-zinc-400">{value.description}</p>
    </motion.div>
  );
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* En-tête de la page */}
        <section className="relative py-20 lg:py-32 bg-gradient-to-b from-black to-zinc-950 overflow-hidden">
          <GlowingEffect 
            color1="rgba(124, 58, 237, 0.1)" 
            color2="rgba(236, 72, 153, 0.1)" 
            speed={0.02}
          />
          
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-purple-600/20 to-pink-500/20 text-purple-300 border border-purple-500/20 mb-4">
                  Our Story
                </span>
              </motion.div>
              
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Who are we?
              </motion.h1>
              
              <motion.p
                className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                CodeCanvas was born from a vision to revolutionize the way businesses approach web development, delivering innovative digital solutions that drive real-world results.
              </motion.p>
            </div>
          </Container>
        </section>
        
        {/* Section Notre Mission */}
        <section className="py-16 lg:py-24 bg-zinc-950">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="/images/illustrations/mission-illustration.svg"
                    alt="Notre mission"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 to-transparent" />
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-zinc-400 mb-6">
                  At CodeCanvas, we believe that digital transformation is the key to business success in today's fast-paced world. Our mission is to design innovative technological solutions that empower businesses to stand out in an increasingly competitive landscape.
                </p>
                <p className="text-zinc-400 mb-8">
                  We combine technical expertise, creativity, and strategic insight to deliver products that exceed expectations and generate lasting value for our clients.
                </p>
                <MagneticButton strength={40}>
                  Discover our approach
                </MagneticButton>
              </motion.div>
            </div>
          </Container>
        </section>
        
        {/* Section Notre Vision */}
        <section className="py-16 lg:py-24 bg-black">
          <Container>
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Our Vision
              </motion.h2>
              <motion.p 
                className="text-zinc-400 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                We're building a future where technology enhances human potential and creates lasting positive impact.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-3">Digital Transformation</h3>
                <p className="text-zinc-400">
                  We envision a world where businesses of all sizes can harness the power of digital technologies to transform their operations, enhance customer experiences, and drive growth. We're committed to making that vision a reality through accessible, powerful solutions.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6"
              >
                <h3 className="text-xl font-bold text-white mb-3">Innovation That Matters</h3>
                <p className="text-zinc-400">
                  We believe in pursuing innovation that solves real problems and creates tangible value. Our approach combines cutting-edge technologies with practical business sense, ensuring we deliver solutions that matter in the real world.
                </p>
              </motion.div>
            </div>
          </Container>
        </section>
        
        {/* Section Nos Valeurs */}
        <section className="py-16 lg:py-24 bg-zinc-950">
          <Container>
            <div className="text-center mb-16">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Our Values
              </motion.h2>
              <motion.p 
                className="text-zinc-400 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                The core principles that guide our work and define who we are as a company.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <ValueCard 
                  key={value.title} 
                  value={value} 
                  index={index} 
                />
              ))}
            </div>
          </Container>
        </section>
        
        {/* Section Why Choose Us */}
        <section className="py-16 lg:py-24 bg-black">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 lg:order-1"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why Choose Us?</h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">✓</div>
                    <div>
                      <h3 className="font-semibold text-white">Modern Approach</h3>
                      <p className="text-zinc-400">We leverage the latest technologies and methodologies to create future-proof solutions.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">✓</div>
                    <div>
                      <h3 className="font-semibold text-white">Dedicated Support</h3>
                      <p className="text-zinc-400">We provide ongoing support and maintenance to ensure your digital assets continue to perform optimally.</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">✓</div>
                    <div>
                      <h3 className="font-semibold text-white">Tailored Solutions</h3>
                      <p className="text-zinc-400">Every business is unique. We craft custom solutions that address your specific challenges and goals.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 lg:order-2"
              >
                <div className="relative rounded-2xl overflow-hidden">
                  <Image
                    src="/images/illustrations/team-illustration.svg"
                    alt="Why choose us"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-bl from-purple-900/40 to-transparent" />
                </div>
              </motion.div>
            </div>
          </Container>
        </section>
        
        {/* Section CTA */}
        <section className="py-16 lg:py-24 bg-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-pink-600/20 opacity-50" />
          
          <Container className="relative z-10">
            <motion.div 
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to transform your vision into reality?
              </h2>
              <p className="text-zinc-300 mb-8 text-lg">
                Contact us today to discuss your project and discover how we can help you achieve your goals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/services#pricing">
                  <MagneticButton strength={40}>
                    View pricing
                  </MagneticButton>
                </Link>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a 
                    href="/services"
                    className="inline-flex items-center justify-center px-6 py-3 border border-purple-600/30 text-purple-400 hover:bg-purple-600/10 rounded-full transition-colors duration-300"
                  >
                    View our services
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
} 