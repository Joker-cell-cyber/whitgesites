import { Users, Heart, Target, Star } from "lucide-react";

const stats = [
  {
    name: "Membres actifs",
    value: "20K+",
    icon: Users,
    description: "Une communauté dynamique et bienveillante",
  },
  {
    name: "Relations réussies",
    value: "1000+",
    icon: Heart,
    description: "Des histoires d'amour qui ont vu le jour",
  },
  {
    name: "Taux de satisfaction",
    value: "98%",
    icon: Target,
    description: "Des résultats prouvés et garantis",
  },
  {
    name: "Coachs certifiés",
    value: "50+",
    icon: Star,
    description: "Des experts passionnés à votre service",
  },
];

export function Stats() {
  return (
    <div className="bg-gradient-to-b from-pink-50 to-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-base font-semibold leading-7 text-pink-600">
              Notre succès
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Des résultats qui font la différence
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Découvrez l'impact de notre plateforme sur la vie amoureuse de nos membres.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col bg-white p-8">
                <dt className="text-sm leading-6 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-pink-600">
                  {stat.value}
                </dd>
                <div className="mt-4 flex justify-center">
                  <stat.icon className="h-6 w-6 text-pink-600" aria-hidden="true" />
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