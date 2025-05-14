'use client';

import { 
  Search, 
  BarChart2, 
  Target, 
  Zap, 
  Shield, 
  Users, 
  Globe, 
  LineChart,
  Sparkles,
  ArrowRight,
  Palette,
  Brush,
  Heart,
  Star,
  Footprints,
  GalleryHorizontal,
  PenTool,
  Handshake,
  Package
} from "lucide-react";
import { Button } from "@/app/components/ui/button";
import Link from "next/link";

const features = [
  {
    name: "Artisanat Traditionnel",
    description:
      "Des techniques éprouvées par le temps rencontrent l'innovation moderne pour créer des pièces uniques et durables.",
    icon: Brush,
  },
  {
    name: "Matériaux Premium",
    description:
      "Nous sélectionnons uniquement les meilleurs matériaux pour garantir la qualité et la longévité de chaque création.",
    icon: PenTool,
  },
  {
    name: "Design Personnalisé",
    description:
      "Chaque pièce est conçue selon vos spécifications pour répondre parfaitement à vos besoins et préférences.",
    icon: GalleryHorizontal,
  },
  {
    name: "Traçabilité",
    description:
      "Suivez le parcours de votre création, de la conception initiale jusqu'à votre porte, en toute transparence.",
    icon: Footprints,
  },
  {
    name: "Collaboration Éthique",
    description:
      "Nous travaillons étroitement avec des artisans qui partagent nos valeurs d'équité et de respect.",
    icon: Handshake,
  },
  {
    name: "Emballage Écologique",
    description:
      "Des solutions d'emballage respectueuses de l'environnement pour minimiser notre impact sur la planète.",
    icon: Package,
  },
];

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-amber-600">Artisanat d'Excellence</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Tout ce dont vous avez besoin pour des créations uniques
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Découvrez comment OneiricCrafts transforme vos rêves en réalité tangible grâce à notre savoir-faire artisanal et notre passion pour l'excellence.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-amber-50 text-amber-600">
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