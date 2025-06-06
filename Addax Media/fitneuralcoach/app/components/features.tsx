import { Brain, ChartBar, Lightbulb, BarChart, Clock, DeviceTablet } from "lucide-react";

const features = [
  {
    name: "Apprentissage Adaptatif",
    description:
      "Notre IA analyse votre façon d'apprendre et adapte le contenu pour maximiser votre compréhension et votre rétention.",
    icon: Brain,
  },
  {
    name: "Progression Personnalisée",
    description:
      "Suivez votre parcours d'apprentissage avec des tableaux de bord détaillés montrant vos forces et vos axes d'amélioration.",
    icon: ChartBar,
  },
  {
    name: "Recommandations Intelligentes",
    description:
      "Recevez des suggestions de contenu pertinent basées sur vos intérêts, vos objectifs et votre historique d'apprentissage.",
    icon: Lightbulb,
  },
  {
    name: "Analyses Détaillées",
    description:
      "Accédez à des analyses approfondies sur votre parcours d'apprentissage pour mieux comprendre vos performances.",
    icon: BarChart,
  },
  {
    name: "Apprentissage Micro-dosé",
    description:
      "Des sessions courtes et efficaces, parfaitement adaptées à un emploi du temps chargé pour un apprentissage continu.",
    icon: Clock,
  },
  {
    name: "Multi-plateformes",
    description:
      "Apprenez où que vous soyez avec une expérience fluide sur ordinateur, tablette et smartphone.",
    icon: DeviceTablet,
  },
];

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-rose-600">Apprentissage Intelligent</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Une nouvelle façon d'apprendre
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Découvrez comment Neuralearns révolutionne l'apprentissage grâce à l'intelligence artificielle et une approche centrée sur l'utilisateur.
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