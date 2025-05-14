import { Heart, MessageSquare, Sparkles, Shield, Users, BookOpen } from "lucide-react";

const features = [
  {
    name: "Coaching Personnalisé",
    description:
      "Des conseils sur mesure adaptés à votre personnalité, vos objectifs et votre situation personnelle.",
    icon: Heart,
  },
  {
    name: "Techniques de Communication",
    description:
      "Apprenez à communiquer efficacement pour créer des connexions authentiques et significatives.",
    icon: MessageSquare,
  },
  {
    name: "Développement de la Confiance",
    description:
      "Des exercices pratiques pour renforcer votre confiance en vous et votre charisme naturel.",
    icon: Sparkles,
  },
  {
    name: "Espace Sécurisé",
    description:
      "Un environnement bienveillant où vous pouvez vous développer à votre rythme, sans jugement.",
    icon: Shield,
  },
  {
    name: "Communauté de Soutien",
    description:
      "Échangez avec d'autres personnes partageant les mêmes objectifs et apprenez de leurs expériences.",
    icon: Users,
  },
  {
    name: "Ressources Pédagogiques",
    description:
      "Accédez à une bibliothèque de contenus éducatifs pour enrichir vos connaissances et compétences.",
    icon: BookOpen,
  },
];

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-rose-600">Développement Personnel</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Des outils pour épanouir vos relations
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Découvrez comment CharmAI vous aide à développer des compétences relationnelles authentiques et à créer des connexions significatives.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-rose-50 text-rose-600">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
} 