'use client';

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "Comment CharmAI peut-il m'aider à améliorer ma vie relationnelle ?",
    answer:
      "CharmAI vous aide à développer votre intelligence émotionnelle, votre confiance en vous et vos compétences en communication. Notre approche combine conseils personnalisés, exercices pratiques et coaching individuel pour vous permettre de créer des connexions authentiques et épanouissantes, qu'il s'agisse de rencontres amoureuses ou d'interactions sociales plus larges.",
  },
  {
    question: "Vos méthodes fonctionnent-elles pour tout le monde ?",
    answer:
      "Nos méthodes sont adaptables à tous les profils, quel que soit votre niveau de confiance actuel, votre expérience relationnelle ou vos objectifs. Nous personnalisons notre approche en fonction de votre personnalité, de vos valeurs et de vos aspirations spécifiques. Notre objectif n'est pas de vous transformer, mais de révéler la meilleure version de vous-même dans vos relations.",
  },
  {
    question: "Comment se déroule le coaching personnalisé ?",
    answer:
      "Le coaching personnalisé commence par une analyse approfondie de votre situation actuelle et de vos objectifs. Ensuite, nos coachs certifiés élaborent un plan d'action sur mesure et vous accompagnent à travers des sessions vidéo interactives. Entre les sessions, vous mettez en pratique les concepts appris avec des exercices spécifiques et recevez des retours personnalisés sur vos progrès.",
  },
  {
    question: "Combien de temps faut-il pour voir des résultats ?",
    answer:
      "La plupart de nos clients commencent à observer des changements positifs dès les premières semaines de programme. Cependant, les transformations profondes nécessitent généralement 2 à 3 mois d'engagement. Les résultats varient selon votre point de départ, votre implication et vos objectifs. Notre approche vise des améliorations durables plutôt que des solutions temporaires.",
  },
  {
    question: "Votre approche est-elle respectueuse et éthique ?",
    answer:
      "Absolument. Notre philosophie est fondée sur l'authenticité, le respect mutuel et la création de connexions sincères. Nous rejetons les techniques manipulatrices ou les approches qui ne respectent pas le consentement et la dignité de chacun. Notre objectif est de vous aider à développer des relations saines et épanouissantes basées sur la confiance et la compréhension mutuelle.",
  },
  {
    question: "Est-ce que la confidentialité est garantie ?",
    answer:
      "La confidentialité est une priorité absolue. Toutes vos informations personnelles et le contenu de vos sessions de coaching restent strictement confidentiels. Nos coachs suivent un code déontologique rigoureux et notre plateforme utilise un chiffrement avancé pour protéger vos données. Vous pouvez participer à nos programmes en toute sérénité et discrétion.",
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
                          "h-6 w-6 transform text-pink-600 transition duration-200"
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