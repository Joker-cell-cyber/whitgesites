'use client';

import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

// Questions fréquentes
const faqItems = [
  {
    question: "Qu'est-ce qu'AdInsight AI et en quoi peut-elle m'aider ?",
    answer: "AdInsight AI est une plateforme d'analyse pour Facebook Ads qui vous aide à mieux comprendre les performances de vos campagnes. Notre outil fournit des analyses détaillées et des suggestions basées sur l'IA pour optimiser vos investissements publicitaires."
  },
  {
    question: "Comment fonctionne l'analyse des données ?",
    answer: "Notre système analyse vos données publicitaires en examinant différentes variables comme les performances des créatifs et le comportement des audiences. Il identifie les tendances et patterns pour vous fournir des insights pertinents sur vos campagnes."
  },
  {
    question: "Comment puis-je commencer à utiliser la plateforme ?",
    answer: "Pour commencer, vous devez d'abord importer vos données publicitaires via un fichier CSV. Notre interface vous guidera pas à pas dans ce processus. Une fois vos données importées, vous aurez accès à toutes les fonctionnalités d'analyse incluses dans votre forfait."
  },
  {
    question: "Avec quelles plateformes publicitaires AdInsight AI est-elle compatible ?",
    answer: "Actuellement, AdInsight AI est spécialisée dans l'analyse des campagnes Facebook Ads via l'import de fichiers CSV. Nous étudions la possibilité d'ajouter le support d'autres plateformes publicitaires dans le futur."
  },
  {
    question: "Quelles sont les limites de l'analyse ?",
    answer: "Notre outil fournit des analyses basées uniquement sur vos données historiques importées. Les suggestions et insights sont des indications pour vous aider dans votre prise de décision, mais ne garantissent pas de résultats spécifiques. Les performances futures dépendent de nombreux facteurs externes que nous ne pouvons pas prédire."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-white to-adfi-slate-50 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
      
      {/* Cercles décoratifs */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full bg-adfi-blue-100/20 blur-3xl opacity-30"></div>
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full bg-adfi-blue-100/20 blur-3xl opacity-30"></div>
      
      <div className="container max-w-5xl mx-auto px-6 relative z-10">
        {/* En-tête de section */}
        <div 
          ref={ref}
          className="text-center mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease'
          }}
        >
          <div className="inline-flex items-center px-4 py-2 bg-adfi-blue-50 text-adfi-blue-600 rounded-full mb-6">
            <MessageCircleQuestion className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Centre d'aide</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-adfi-slate-900 mb-6">
            Questions <span className="text-adfi-blue-600">fréquemment posées</span>
          </h2>
          
          <p className="text-xl text-adfi-slate-600 leading-relaxed max-w-3xl mx-auto mb-10">
            Découvrez les réponses aux questions les plus courantes sur notre plateforme d'optimisation Facebook Ads et notre processus d'onboarding.
          </p>
        </div>

        {/* Liste des questions */}
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-sm border border-adfi-slate-100 hover:shadow-md transition-all duration-200"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 0.7s ease, transform 0.7s ease',
                transitionDelay: `${index * 75 + 200}ms`
              }}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="flex justify-between items-center w-full px-6 py-5 text-left"
              >
                <h3 className="text-lg font-semibold text-adfi-slate-900 pr-8">{item.question}</h3>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-adfi-blue-50 flex items-center justify-center transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180 bg-adfi-blue-100' : ''
                }`}>
                  <ChevronDown 
                    className={`w-5 h-5 text-adfi-blue-600 transition-transform`} 
                  />
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 pb-5 text-adfi-slate-600 border-t border-adfi-slate-100">
                  <p className="leading-relaxed">{item.answer}</p>
                  <div className="mt-4 flex items-center">
                    <span className="text-xs text-adfi-slate-400">Cette réponse vous a-t-elle été utile ?</span>
                    <div className="ml-4 flex space-x-2">
                      <button className="px-3 py-1 text-xs rounded-full bg-adfi-blue-50 text-adfi-blue-600 hover:bg-adfi-blue-100 transition-colors">
                        Oui
                      </button>
                      <button className="px-3 py-1 text-xs rounded-full bg-adfi-slate-50 text-adfi-slate-600 hover:bg-adfi-slate-100 transition-colors">
                        Non
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Support supplémentaire */}
        <div 
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-adfi-blue-50 to-white border border-adfi-blue-100 shadow-sm text-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
            transitionDelay: '500ms'
          }}
        >
          <h3 className="text-2xl font-bold text-adfi-slate-900 mb-4">
            Vous n'avez pas trouvé ce que vous cherchiez ?
          </h3>
          
          <p className="text-adfi-slate-600 mb-8 max-w-2xl mx-auto">
            Notre équipe de support est disponible pour vous aider avec toutes vos questions. Contactez-nous directement.
          </p>
          
          <div className="flex justify-center">
            <a 
              href="mailto:support@adinsightai.com" 
              className="px-6 py-3 bg-adfi-blue-600 hover:bg-adfi-blue-700 text-white rounded-xl font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contacter le support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 