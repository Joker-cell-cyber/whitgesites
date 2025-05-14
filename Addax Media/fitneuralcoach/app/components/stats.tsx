import { Users, Brain, Target, ChartBar } from "lucide-react";

const stats = [
  {
    name: "Utilisateurs actifs",
    value: "15K+",
    icon: Users,
    description: "Une communauté d'apprenants engagés",
  },
  {
    name: "Modules d'apprentissage",
    value: "200+",
    icon: Brain,
    description: "Des contenus pédagogiques adaptés",
  },
  {
    name: "Progression moyenne",
    value: "92%",
    icon: Target,
    description: "Un excellent taux de progression",
  },
  {
    name: "Analyses réalisées",
    value: "5000+",
    icon: ChartBar,
    description: "Des analyses détaillées de progression",
  },
];

export function Stats() {
  return (
    <div className="bg-gradient-to-b from-rose-50 to-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-base font-semibold leading-7 text-rose-600">
              Notre impact
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Des chiffres qui parlent d'eux-mêmes
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Découvrez l'ampleur de notre communauté et notre engagement envers l'apprentissage intelligent.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col bg-white p-8">
                <dt className="text-sm leading-6 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-rose-600">
                  {stat.value}
                </dd>
                <div className="mt-4 flex justify-center">
                  <stat.icon className="h-6 w-6 text-rose-600" aria-hidden="true" />
                </div>
                <p className="mt-4 text-sm text-gray-600">{stat.description}</p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
} 