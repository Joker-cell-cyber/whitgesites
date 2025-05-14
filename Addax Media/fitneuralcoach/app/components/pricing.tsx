import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Lite",
    id: "tier-lite",
    href: "#",
    price: "19€",
    description: "L'essentiel pour commencer votre parcours d'apprentissage adaptatif.",
    features: [
      "Accès à 5 modules d'apprentissage",
      "Suivi de progression basique",
      "Tests d'évaluation standards",
      "Support par email",
      "Interface mobile responsive",
    ],
    featured: false,
  },
  {
    name: "Basic",
    id: "tier-basic",
    href: "#",
    price: "49€",
    description: "La solution idéale pour un apprentissage personnalisé et efficace.",
    features: [
      "Accès à tous les modules (50+)",
      "Profil d'apprentissage avancé",
      "Recommandations IA personnalisées",
      "Support prioritaire",
      "Mode hors ligne",
      "Rapports de progression détaillés",
      "Exercices pratiques illimités",
    ],
    featured: true,
  },
  {
    name: "Advanced",
    id: "tier-advanced",
    href: "#",
    price: "99€",
    description: "Pour les apprenants avancés souhaitant approfondir leurs connaissances.",
    features: [
      "Tout du plan Basic",
      "Modules d'apprentissage avancés",
      "Coaching personnalisé",
      "Support VIP",
      "Accès aux webinaires",
      "Certification",
      "Communauté privée",
    ],
    featured: false,
  },
  {
    name: "Pro",
    id: "tier-pro",
    href: "#",
    price: "199€",
    description: "Pour les organisations souhaitant former leurs équipes efficacement.",
    features: [
      "Tout du plan Advanced",
      "Intégration LMS/SSO",
      "Modules d'apprentissage personnalisés",
      "Tableaux de bord administrateur",
      "API avancée",
      "Gestionnaire de compte dédié",
      "Analyse cognitive avancée",
      "Formations sur mesure",
    ],
    featured: false,
  },
];

export function Pricing() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-rose-600">Tarifs</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Des prix adaptés à vos besoins d'apprentissage
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choisissez la formule qui correspond à votre style d'apprentissage et à vos objectifs.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-3">
          {tiers.map((tier, tierIdx) => (
            <div
              key={tier.id}
              className={`${
                tier.featured
                  ? 'relative bg-white shadow-2xl shadow-rose-200/50 z-10 rounded-xl'
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
                <p className="absolute top-0 -translate-y-1/2 transform rounded-full bg-rose-600 px-3 py-1 text-sm font-semibold text-white">
                  Le plus populaire
                </p>
              )}
              <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900">{tier.price}</span>
                <span className="text-sm font-semibold leading-6 text-gray-600">/mois</span>
              </p>
              <Button
                href={tier.href}
                aria-describedby={tier.id}
                className={`${
                  tier.featured
                    ? 'bg-rose-600 text-white hover:bg-rose-500'
                    : 'bg-white text-rose-600 ring-1 ring-inset ring-rose-200 hover:ring-rose-300'
                } mt-6 block w-full rounded-md px-3 py-2 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600`}
              >
                Commencer
              </Button>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-rose-600" aria-hidden="true" />
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