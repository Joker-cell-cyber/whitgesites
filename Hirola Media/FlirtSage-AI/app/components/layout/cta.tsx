'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, MessageCircleHeart, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function CTA() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white via-white to-yfc-cream-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square rounded-full bg-gradient-to-tr from-yfc-gold-50 via-yfc-cream-100 to-transparent opacity-50 blur-3xl"></div>
        
        {/* Formes décoratives */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 2}rem`,
              height: `${Math.random() * 8 + 2}rem`,
              backgroundColor: i % 2 === 0 ? '#F9EDD9' : '#D4AF37',
              transform: `scale(${Math.random() * 0.8 + 0.6})`,
              transformOrigin: 'center',
              animation: `float ${Math.random() * 10 + 20}s infinite ease-in-out`
            }}
          ></div>
        ))}
      </div>

      <div className="container relative z-10 px-6 mx-auto">
        <div 
          ref={ref}
          className={`max-w-5xl mx-auto bg-white rounded-2xl shadow-xl border border-yfc-gold-100 p-8 md:p-12 transition-all duration-1000 transform ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            <div className="md:col-span-3 space-y-6">
              <div className="inline-flex items-center space-x-2 bg-yfc-cream-100 text-yfc-gold-800 px-4 py-2 rounded-full mb-6">
                <MessageCircleHeart className="h-4 w-4" />
                <span className="text-sm font-medium">Commencez dès aujourd'hui</span>
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl font-light text-gray-900 mb-6 leading-tight">
                Transformez vos conversations et <span className="relative inline-block">
                  relations
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yfc-gold-400"></span>
                </span> dès maintenant
              </h2>
              
              <p className="text-gray-600 mb-8">
                FlirtSageAI est votre assistant intelligent qui vous guide vers des conversations plus engageantes et des connexions plus profondes.
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Link 
                  href="#pricing" 
                  className="inline-flex items-center justify-center bg-yfc-gold-600 hover:bg-yfc-gold-700 text-white px-6 py-3 rounded-lg transition-all duration-300 group"
                >
                  <span>Découvrir nos offres</span>
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link 
                  href="#pricing" 
                  className="inline-flex items-center justify-center bg-white hover:bg-yfc-cream-50 text-gray-800 border border-gray-200 px-6 py-3 rounded-lg transition-all duration-300"
                >
                  Voir nos forfaits
                </Link>
              </div>
              
              <div className="pt-8 border-t border-gray-100 mt-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-yfc-gold-100 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-yfc-gold-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Coaching personnalisé</p>
                      <p className="text-xs text-gray-500">
                        Des conseils adaptés à votre profil
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-2 relative">
              <div className="relative mx-auto w-full max-w-sm">
                {/* Élément décoratif */}
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-24 h-24 rounded-full bg-yfc-gold-100 opacity-60 blur-lg"></div>
                
                <div className="relative p-1 border-4 border-yfc-cream-200 rounded-3xl bg-white shadow-lg transform md:rotate-3">
                  {/* Interface de chat */}
                  <div className="rounded-2xl overflow-hidden bg-white">
                    {/* Bandeau supérieur */}
                    <div className="bg-yfc-gold-50 p-4 flex items-center border-b border-yfc-gold-100">
                      <div className="w-8 h-8 rounded-full bg-yfc-gold-100 flex items-center justify-center">
                        <MessageCircleHeart className="h-4 w-4 text-yfc-gold-600" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">FlirtSageAI</h3>
                        <p className="text-xs text-gray-500">Votre assistant personnel</p>
                      </div>
                    </div>
                    
                    {/* Messages */}
                    <div className="p-4 space-y-3 bg-gray-50 min-h-[240px]">
                      <div className="flex justify-start">
                        <div className="bg-white rounded-lg rounded-tl-none py-2 px-3 shadow-sm border border-gray-100 max-w-[80%]">
                          <p className="text-sm text-gray-800">Comment puis-je vous aider aujourd'hui ?</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <div className="bg-yfc-gold-50 rounded-lg rounded-tr-none py-2 px-3 shadow-sm border border-yfc-gold-100 max-w-[80%]">
                          <p className="text-sm text-gray-800">J'aimerais des conseils pour mon premier rendez-vous demain.</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-start">
                        <div className="bg-white rounded-lg rounded-tl-none py-2 px-3 shadow-sm border border-gray-100 max-w-[80%]">
                          <p className="text-sm text-gray-800">Excellente nouvelle pour ce premier rendez-vous ! Voici quelques conseils clés...</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Champ de message */}
                    <div className="p-3 border-t border-gray-100 flex items-center">
                      <input
                        type="text"
                        placeholder="Votre message..."
                        className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yfc-gold-200"
                      />
                      <button className="ml-2 bg-yfc-gold-500 text-white p-2 rounded-lg">
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Pastille décorative */}
                <div className="absolute -bottom-4 -left-4 bg-yfc-cream-300 rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                  <Sparkles className="h-6 w-6 text-yfc-gold-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 