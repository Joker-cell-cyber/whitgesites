"use client";

import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="py-24 px-4 bg-gray-900 relative">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <svg width="100%" height="100%">
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 0 10 L 40 10 M 10 0 L 10 40" stroke="white" strokeWidth="0.5" fill="none" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
        
        {/* Diagonal accent */}
        <div className="absolute top-0 left-0 w-full h-16 bg-flow-green-500 transform -skew-y-2 origin-left translate-y-24 opacity-20"></div>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center space-x-2 mb-6">
              <div className="h-px w-12 bg-flow-green-500"></div>
              <span className="text-flow-green-400 font-semibold uppercase tracking-wider text-sm">Let's Get Started</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Prêt à automatiser vos processus d'entreprise ?
            </h2>
            
            <p className="text-xl text-gray-300 mb-10">
              Bénéficiez d'une consultation gratuite pour découvrir comment nos solutions d'automatisation personnalisées peuvent transformer votre entreprise.
            </p>
            
            {/* Features with alternate design */}
            <div className="space-y-5 mb-10">
              {[
                "Automatisations sur mesure",
                "Équipe de spécialistes certifiés",
                "Support technique permanent"
              ].map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div className="mr-4 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-md bg-flow-green-900/40 border border-flow-green-500/20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-flow-green-400">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <span className="text-gray-300 font-medium">{feature}</span>
                </div>
              ))}
            </div>
            
            {/* CTA buttons on mobile */}
            <div className="flex flex-col sm:flex-row gap-4 lg:hidden">
              <Link
                href="/contact"
                className="px-8 py-4 bg-flow-green-500 hover:bg-flow-green-600 text-white font-medium rounded-lg shadow-lg shadow-flow-green-500/20 text-center transition-colors"
              >
                Démarrer Gratuitement
              </Link>
              
              <Link 
                href="/pricing"
                className="px-8 py-4 bg-transparent border border-gray-700 hover:border-gray-600 text-white font-medium rounded-lg text-center transition-colors"
              >
                Voir les Tarifs
              </Link>
            </div>
          </div>
          
          {/* Right content */}
          <div className="relative">
            {/* Card with layered effect */}
            <div className="absolute top-6 right-6 w-full h-full bg-gray-800 rounded-xl"></div>
            <div className="absolute top-3 right-3 w-full h-full bg-gray-700 rounded-xl"></div>
            
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-10 rounded-xl border border-gray-700 shadow-2xl">
              <div className="absolute -top-5 -left-5 w-10 h-10 bg-flow-green-500/20 rounded-full"></div>
              <div className="absolute -bottom-5 -right-5 w-10 h-10 bg-flow-green-500/20 rounded-full"></div>
              
              <h3 className="text-2xl font-bold text-white mb-6">Obtenez une consultation gratuite</h3>
              
              <div className="space-y-6 mb-8">
                <div>
                  <label className="block text-gray-400 mb-2 text-sm" htmlFor="name">Votre nom</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Entrez votre nom" 
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-flow-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 mb-2 text-sm" htmlFor="email">Votre email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Entrez votre email" 
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-flow-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-400 mb-2 text-sm" htmlFor="company">Votre entreprise</label>
                  <input 
                    type="text" 
                    id="company" 
                    placeholder="Nom de votre entreprise" 
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-flow-green-500"
                  />
                </div>
              </div>
              
              <div className="flex gap-4">
                <Link
                  href="/contact"
                  className="flex-1 px-8 py-4 bg-flow-green-500 hover:bg-flow-green-600 text-white font-medium rounded-lg text-center transition-colors"
                >
                  Démarrer Gratuitement
                </Link>
                
                <Link 
                  href="/pricing"
                  className="px-8 py-4 bg-transparent border border-gray-700 hover:border-gray-600 text-white font-medium rounded-lg text-center transition-colors"
                >
                  Tarifs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 