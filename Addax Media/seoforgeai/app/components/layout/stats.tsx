'use client';

import { Users, Palette, Star, Heart } from "lucide-react";

const stats = [
  {
    name: "Artisans actifs",
    value: "10K+",
    icon: Users,
    description: "Une communauté passionnée d'artisans créatifs",
  },
  {
    name: "Créations uniques",
    value: "500+",
    icon: Palette,
    description: "Des œuvres d'art exceptionnelles réalisées",
  },
  {
    name: "Satisfaction client",
    value: "98%",
    icon: Star,
    description: "Des retours positifs de nos clients",
  },
  {
    name: "Projets réussis",
    value: "1000+",
    icon: Heart,
    description: "Des projets créatifs menés à bien",
  },
];

export default function Stats() {
  return (
    <div className="bg-gradient-to-b from-amber-50 to-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-base font-semibold leading-7 text-amber-600">
              Notre impact
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Des chiffres qui parlent d'eux-mêmes
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Découvrez l'ampleur de notre communauté et notre engagement envers l'artisanat.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col bg-white p-8">
                <dt className="text-sm leading-6 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-amber-600">
                  {stat.value}
                </dd>
                <div className="mt-4 flex justify-center">
                  <stat.icon className="h-6 w-6 text-amber-600" aria-hidden="true" />
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