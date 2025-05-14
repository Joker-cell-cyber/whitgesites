'use client';

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Quels types de contenus SEOForgeAI peut-il générer ?",
    answer:
      "SEOForgeAI excelle dans la génération de contenus optimisés pour le référencement, incluant des articles de blog, descriptions produits, méta-descriptions, textes de landing pages et bien plus. Notre technologie d'IA avancée peut transformer n'importe quel sujet en contenu SEO de qualité.",
  },
  {
    question: "Comment fonctionne le processus de génération de contenu ?",
    answer:
      "Notre processus est simple : vous indiquez le sujet, les mots-clés principaux et le ton souhaité. Notre IA génère ensuite un contenu optimisé que vous pouvez modifier, ajuster et exporter selon vos besoins. Le contenu est automatiquement optimisé pour le référencement naturel.",
  },
  {
    question: "Quels sont les délais typiques pour générer un article ?",
    answer:
      "La génération d'un article complet prend en moyenne 45 secondes, quelle que soit sa longueur. Pour les projets plus complexes nécessitant plusieurs articles liés, notre système peut générer l'ensemble du contenu en quelques minutes seulement.",
  },
  {
    question: "Comment sont calculés les tarifs ?",
    answer:
      "Nos tarifs sont basés sur un système de tokens. Chaque génération de contenu utilise un certain nombre de tokens selon la longueur et la complexité. Nous proposons différentes formules d'abonnement avec des tokens inclus mensuellement, ainsi qu'une option à la carte pour les besoins ponctuels.",
  },
  {
    question: "Dans quelles langues le contenu peut-il être généré ?",
    answer:
      "Selon votre forfait, nous proposons la génération de contenu en plusieurs langues. Le forfait Basic inclut 2 langues, le forfait Pro en inclut 5, et les forfaits Business et Enterprise incluent toutes les langues disponibles. Chaque contenu est optimisé selon les spécificités SEO de la langue choisie.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mb-6">
              Besoin d'aide ?
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Questions fréquemment posées
            </h2>
            <p className="text-xl text-gray-600">
              Trouvez rapidement des réponses aux questions courantes sur notre service
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border ${
                  openIndex === index
                    ? "border-amber-200 bg-amber-50"
                    : "border-gray-200 bg-white"
                } rounded-xl overflow-hidden transition-colors duration-200`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex items-center justify-between w-full p-6 focus:outline-none"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-lg font-semibold text-gray-900 text-left">
                    {faq.question}
                  </span>
                  <div className={`flex-shrink-0 ml-4 ${
                    openIndex === index
                      ? "bg-amber-500 text-white"
                      : "bg-gray-100 text-gray-500"
                  } rounded-full p-2 transition-colors duration-200`}>
                    {openIndex === index ? (
                      <Minus className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </div>
                </button>
                
                {openIndex === index && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center p-8 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Vous avez d'autres questions?
            </h3>
            <p className="text-gray-600 mb-6">
              N'hésitez pas à nous contacter directement par email pour toute demande d'information.
            </p>
            <div className="flex justify-center">
              <a 
                href="/contact" 
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
      </div>
    </section>
  );
} 