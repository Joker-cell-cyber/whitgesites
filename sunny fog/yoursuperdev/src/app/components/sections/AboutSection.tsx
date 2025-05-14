"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "../ui/Container";
import { MagneticButton } from "../ui/MagneticButton";
import Link from "next/link";
import TeamWorking from "../illustrations/TeamWorking";

export function AboutSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-black to-zinc-950 relative overflow-hidden">
      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
        <div className="absolute -top-[500px] left-1/3 w-[1000px] h-[1000px] rounded-full bg-purple-900/10 blur-3xl opacity-30" />
      </div>
      
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Contenu texte */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            <div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-gradient-to-r from-purple-600/20 to-pink-500/20 text-purple-300 border border-purple-500/20 mb-4">
                  About Us
                </span>
              </motion.div>
              
              <motion.h2
                className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                YourSuperDev Solutions
              </motion.h2>
              
              <motion.p
                className="text-zinc-400 text-lg mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                At Your Super Dev, we specialize in creating dynamic and responsive web solutions tailored to each client&apos;s unique needs. With years of experience and a passion for innovation, our team is dedicated to transforming your ideas into reality.
              
              </motion.p>
            </div>
            
            {/* Mission et Vision */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Our Mission
                </h3>
                <p className="text-zinc-400">
                  Give businesses the means to succeed through innovative digital solutions that foster growth and success.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-white mb-3 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-pink-600/20 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-pink-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Our Vision
                </h3>
                <p className="text-zinc-400">
                  Become a leading provider of exceptional web development services, recognized for our creativity, technical expertise, and client-centered approach.
                </p>
              </motion.div>
            </div>
            
            {/* Bouton d'action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="pt-4"
            >
              <Link href="/about">
                <MagneticButton variant="outline" strength={20}>
                  Learn more about us
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </MagneticButton>
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Illustration animée et statistiques */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800">
              <div className="w-full h-[450px] relative">
                <TeamWorking className="w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40" />
              </div>
              
              {/* Card flottante avec statistiques */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-zinc-900/80 backdrop-blur-sm rounded-xl border border-zinc-700/50 p-6">
                  <h4 className="text-white font-medium mb-4 text-lg">Technological Expertise</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">20+</div>
                      <div className="text-xs text-zinc-400 mt-1">Technologies</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">7+</div>
                      <div className="text-xs text-zinc-400 mt-1">Dev Frameworks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">10+</div>
                      <div className="text-xs text-zinc-400 mt-1">Years of Exp.</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Badge flottant */}
              <motion.div
                className="absolute top-6 right-6 bg-purple-600/90 text-white text-sm font-medium px-3 py-1 rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                Expert Developers
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
} 