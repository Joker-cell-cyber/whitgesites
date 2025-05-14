'use client';

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Comment fonctionne la technologie d'apprentissage adaptatif de Neuralearns ?",
    answer:
      "Notre technologie d'apprentissage adaptatif utilise l'intelligence artificielle pour analyser votre style d'apprentissage, vos forces et vos faiblesses. En fonction de vos performances et interactions, notre algorithme ajuste en temps réel le contenu, la difficulté et le rythme d'apprentissage pour optimiser votre progression et maximiser votre rétention d'information.",
  },
  {
    question: "Est-ce que Neuralearns convient à tous les types d'apprenants ?",
    answer:
      "Absolument ! Neuralearns est conçu pour s'adapter à tous les profils d'apprenants, qu'ils soient visuels, auditifs, kinesthésiques ou lecteurs-rédacteurs. Notre système identifie automatiquement votre style d'apprentissage dominant et adapte les contenus en conséquence, tout en vous aidant à renforcer les autres styles d'apprentissage pour développer votre flexibilité cognitive.",
  },
  {
    question: "Quels types de contenus éducatifs proposez-vous ?",
    answer:
      "Nous proposons une large gamme de contenus couvrant des domaines variés : langues étrangères, sciences, mathématiques, informatique, développement professionnel, et bien d'autres. Chaque module comprend des vidéos interactives, des textes enrichis, des exercices pratiques, des simulations, des jeux éducatifs et des évaluations formatives pour une expérience d'apprentissage complète.",
  },
  {
    question: "Comment suivre ma progression ?",
    answer:
      "Votre tableau de bord personnel offre une visualisation détaillée de votre progression. Vous pouvez suivre votre avancement dans chaque module, visualiser vos points forts et axes d'amélioration, consulter vos statistiques d'apprentissage (temps passé, taux de réussite, etc.) et recevoir des recommandations personnalisées pour optimiser votre apprentissage.",
  },
  {
    question: "Puis-je utiliser Neuralearns hors ligne ?",
    answer:
      "Oui, avec notre abonnement Pro ou Enterprise. L'application mobile Neuralearns permet de télécharger des modules pour un apprentissage hors ligne. Une fois reconnecté à Internet, vos données de progression sont automatiquement synchronisées avec votre compte pour maintenir un suivi cohérent de votre parcours d'apprentissage.",
  },
  {
    question: "Offrez-vous un support pour les établissements éducatifs ?",
    answer:
      "Nous proposons des solutions dédiées aux établissements éducatifs avec notre formule Enterprise. Celle-ci inclut des fonctionnalités avancées comme la gestion de classes, le suivi des élèves, des rapports analytiques détaillés, l'intégration LMS, et la personnalisation du contenu selon vos programmes spécifiques. Notre équipe d'experts vous accompagne dans l'implémentation et la formation de votre personnel.",
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Questions fréquemment posées
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq, index) => (
              <div key={index} className="pt-6">
                <dt>
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-start justify-between text-left text-gray-900"
                    aria-expanded={openIndex === index}
                  >
                    <span className="text-base font-semibold leading-7">
                      {faq.question}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      <ChevronDown
                        className={classNames(
                          openIndex === index ? "-rotate-180" : "rotate-0",
                          "h-6 w-6 transform text-rose-600 transition duration-200"
                        )}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </dt>
                {openIndex === index && (
                  <dd className="mt-2 pr-12">
                    <p className="text-base leading-7 text-gray-600">
                      {faq.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
} 