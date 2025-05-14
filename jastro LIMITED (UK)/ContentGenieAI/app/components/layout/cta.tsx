'use client';

import Link from "next/link";
import { Button } from "@/app/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShellIcon, WavesIcon, ShipIcon } from "lucide-react";

export default function CTA() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  return (
    <section id="cta" ref={ref} className="onc-section onc-section-wave relative overflow-hidden onc-gradient-bg">
      {/* Effet de fond */}
      <div className="absolute inset-0 onc-water-pattern"></div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-[#BBE5EF]/40 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-[#D3E9DD]/40 blur-[100px] pointer-events-none"></div>
      
      {/* Éléments flottants */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute top-40 right-[15%] w-20 h-20 rounded-full bg-gradient-to-r from-[#BBE5EF] to-[#D3E9DD] border border-[#1A7BA4]/20 shadow-lg opacity-70 animate-float"
        />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
          className="absolute bottom-40 left-[10%] w-12 h-12 rounded-full bg-gradient-to-r from-[#26A69A]/20 to-[#1A7BA4]/20 border border-[#26A69A]/30 shadow-lg opacity-70 animate-float"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="onc-card-glass shadow-lg backdrop-blur-md">
            <div className="px-6 py-12 md:p-16 relative">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col items-center"
                >
                  <div className="inline-block px-4 py-2 border border-[#1A7BA4]/30 rounded-full bg-[#BBE5EF]/30 shadow-sm mb-6">
                    <span className="text-[#1A7BA4] text-sm font-medium flex items-center">
                      <span className="mr-2 inline-block w-2 h-2 rounded-full bg-[#1A7BA4] animate-pulse"></span>
                      Commencez votre voyage créatif
                    </span>
                  </div>
                  
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 onc-heading max-w-3xl mx-auto">
                    Plongez dans un <span className="onc-text-primary">océan</span> de créativité
                  </h2>
                  
                  <p className="text-xl text-[#14304D]/80 mb-10 max-w-2xl mx-auto">
                    Commencez dès aujourd'hui à exprimer votre artisanat unique et rejoignez notre communauté d'artisans inspirés par la mer.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row justify-center gap-5 mb-12">
                    <Button 
                      asChild
                      size="xl"
                      variant="default"
                    >
                      <Link href="/register">
                        <WavesIcon className="mr-2 h-5 w-5" />
                        Ouvrir ma boutique
                      </Link>
                    </Button>
                    
                    <Button 
                      asChild
                      size="xl"
                      variant="outline"
                    >
                      <Link href="/contact">
                        <ShipIcon className="mr-2 h-5 w-5" />
                        Découvrir la plateforme
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Points clés */}
                  <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#BBE5EF]/50 border border-[#1A7BA4]/20 mr-3 shadow-sm">
                        <ShellIcon className="h-5 w-5 text-[#1A7BA4]" />
                      </div>
                      <span className="text-[#14304D]/80">Vente sans commission</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#D3E9DD]/50 border border-[#26A69A]/20 mr-3 shadow-sm">
                        <WavesIcon className="h-5 w-5 text-[#26A69A]" />
                      </div>
                      <span className="text-[#14304D]/80">Visibilité internationale</span>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#BBE5EF]/50 border border-[#18BDD9]/20 mr-3 shadow-sm">
                        <ShipIcon className="h-5 w-5 text-[#18BDD9]" />
                      </div>
                      <span className="text-[#14304D]/80">Support personnalisé</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 