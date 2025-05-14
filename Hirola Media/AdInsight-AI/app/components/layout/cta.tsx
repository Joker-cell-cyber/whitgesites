'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState("idle"); // idle, loading, success, error
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("loading");
    
    // Simuler un appel API
    setTimeout(() => {
      setFormState("success");
      setEmail("");
    }, 1000);
  };
  
  return (
    <section ref={ref} className="py-24 bg-adfi-blue-600 text-white relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"></div>
      
      {/* Cercles décoratifs */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-adfi-blue-500 blur-3xl opacity-30 -translate-y-1/4 translate-x-1/4"></div>
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-adfi-blue-400 blur-3xl opacity-30 -translate-x-1/4 -translate-y-1/4"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div 
              className="text-center lg:text-left"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
              }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-white/10 text-white rounded-full mb-6 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                <span className="text-sm font-medium">Offre spéciale</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                Optimisez vos <span className="text-adfi-blue-200">Facebook Ads</span> dès aujourd'hui
              </h2>
              
              <p className="text-xl text-adfi-blue-100 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                Rejoignez plus de 1 500 entreprises qui utilisent notre plateforme IA pour maximiser leurs performances publicitaires et réduire leurs coûts d'acquisition.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Amélioration des performances publicitaires",
                  "Support client dédié",
                  "Mises à jour régulières",
                  "Accès à toutes les fonctionnalités",
                ].map((item, i) => (
                  <div key={i} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-adfi-blue-200 mr-3 flex-shrink-0" />
                    <span className="text-adfi-blue-50">{item}</span>
                  </div>
                ))}
              </div>
              
              <form 
                onSubmit={handleSubmit} 
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0"
              >
                <div className="relative flex-1">
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    className="w-full px-4 py-3 rounded-lg bg-white text-adfi-slate-900 placeholder-adfi-slate-400 focus:outline-none focus:ring-2 focus:ring-adfi-blue-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={formState === "loading" || formState === "success"}
                    required
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={formState === "loading" || formState === "success"}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
                    formState === "success" 
                      ? "bg-emerald-500 hover:bg-emerald-600"
                      : "bg-white text-adfi-blue-600 hover:bg-adfi-blue-50"
                  }`}
                >
                  {formState === "loading" && (
                    <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  
                  {formState === "success" ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span>Envoyé !</span>
                    </>
                  ) : (
                    <span>Commencer gratuitement</span>
                  )}
                </button>
              </form>
              
              <p className="text-sm text-adfi-blue-200 mt-4">
                Aucune carte de crédit requise. Annulez à tout moment.
              </p>
            </div>
            
            <div 
              className="hidden lg:block"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateX(0)' : 'translateX(20px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
                transitionDelay: '200ms'
              }}
            >
              <div className="relative">
                {/* Éléments décoratifs */}
                <div className="absolute -top-10 -left-10 w-20 h-20 border-2 border-adfi-blue-400/30 rounded-lg"></div>
                <div className="absolute -bottom-10 -right-10 w-20 h-20 border-2 border-adfi-blue-400/30 rounded-lg"></div>
                
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-white/20">
                  <div className="bg-adfi-slate-50 p-4 border-b border-adfi-slate-200">
                    <div className="flex items-center">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 rounded-full bg-adfi-slate-300"></div>
                        <div className="w-3 h-3 rounded-full bg-adfi-slate-300"></div>
                        <div className="w-3 h-3 rounded-full bg-adfi-slate-300"></div>
                      </div>
                      <div className="mx-auto text-sm font-medium text-adfi-slate-500">
                        Tableau de bord AdInsight AI
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <Image
                      src="/dashboard-preview.png"
                      alt="Dashboard AdInsight AI"
                      width={500}
                      height={360}
                      className="rounded-lg shadow-lg"
                    />
                    
                    <div className="mt-6 bg-adfi-blue-50 rounded-lg p-4 border border-adfi-blue-100">
                      <div className="flex items-start">
                        <div className="bg-adfi-blue-500 rounded-full p-2 mr-3">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <h4 className="text-adfi-slate-900 font-semibold mb-1">Recommandation IA</h4>
                          <p className="text-sm text-adfi-slate-700">
                            Augmentez le budget de la campagne "Promotion été" de 20% pour maximiser le ROAS prévu à 4.7x.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 