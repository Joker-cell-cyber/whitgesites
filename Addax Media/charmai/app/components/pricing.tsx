import { Check } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

const tiers = [
  {
    name: "Lite",
    id: "tier-lite",
    href: "#",
    price: "29€",
    description: "Idéal pour commencer à améliorer vos compétences relationnelles.",
    features: [
      "Accès aux guides de base",
      "Conseils personnalisés limités",
      "1 session de coaching vidéo",
      "Support par email",
      "Accès à la communauté de base",
    ],
    featured: false,
  },
  {
    name: "Basic",
    id: "tier-basic",
    href: "#",
    price: "89€",
    description: "Pour ceux qui souhaitent transformer leur vie sociale et amoureuse.",
    features: [
      "Accès à tous les guides et ressources",
      "Plan personnalisé complet",
      "4 sessions de coaching vidéo",
      "Support prioritaire 7j/7",
      "Accès complet à la communauté",
      "Ateliers pratiques mensuels",
      "Analyses de situation personnalisées",
    ],
    featured: true,
  },
  {
    name: "Advanced",
    id: "tier-advanced",
    href: "#",
    price: "149€",
    description: "Pour une transformation relationnelle approfondie.",
    features: [
      "Tout du plan Basic",
      "8 sessions de coaching vidéo",
      "Support VIP",
      "Accès aux masterclasses",
      "Analyse comportementale avancée",
      "Plan d'action sur mesure",
      "Suivi hebdomadaire personnalisé",
    ],
    featured: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    href: "#",
    price: "249€",
    description: "Accompagnement VIP pour une transformation relationnelle complète.",
    features: [
      "Tout du plan Advanced",
      "Coaching privé illimité",
      "Numéro de téléphone dédié",
      "Analyse comportementale avancée",
      "Plan d'action sur mesure",
      "Suivi hebdomadaire personnalisé",
      "Accès privilégié aux nouveautés",
      "Garantie de résultats",
    ],
    featured: false,
  },
];

export function Pricing() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-pink-600">Tarifs</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Investissez dans votre bonheur relationnel
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choisissez la formule qui correspond à vos objectifs et à votre niveau d'engagement.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={`${
                tier.featured
                  ? 'relative bg-white shadow-2xl shadow-pink-200/50 z-10 rounded-xl'
                  : 'relative bg-white shadow-md z-0 sm:rounded-xl'
              } ${
                tierIdx === 0 ? 'sm:rounded-r-none' : ''
              } ${
                tierIdx === 2 ? 'sm:rounded-l-none' : ''
              } p-8 ring-1 ring-gray-900/10`}
            >
              <h3 id={tier.id} className="text-lg font-semibold leading-8 text-gray-900">
                {tier.name}
              </h3>
              {tier.featured && (
                <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-pink-600 px-3 py-1 text-sm font-semibold text-white">
                  Le plus populaire
                </p>
              )}
              <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price}</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">/mois</span>
              </p>
              <Link href={tier.href}>
                <Button
                  aria-describedby={tier.id}
                  className={`${
                    tier.featured
                      ? 'bg-pink-600 text-white hover:bg-pink-500'
                      : 'bg-white text-pink-600 ring-1 ring-inset ring-pink-200 hover:ring-pink-300'
                  } mt-6 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600`}
                >
                  Commencer
                </Button>
              </Link>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-pink-600" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 