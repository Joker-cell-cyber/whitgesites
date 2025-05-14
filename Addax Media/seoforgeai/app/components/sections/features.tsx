import { LucideIcon, PenLine, Target, Sparkles, BarChart4, Zap, Clock, Globe, Award } from 'lucide-react';

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const Feature = ({ icon: Icon, title, description, color }: FeatureProps) => {
  return (
    <div className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
      <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default function Features() {
  const features: FeatureProps[] = [
    {
      icon: PenLine,
      title: 'Contenu sur Mesure',
      description: 'Notre IA génère du contenu personnalisé qui reflète votre ton et votre style de marque.',
      color: 'bg-amber-500',
    },
    {
      icon: Target,
      title: 'Optimisation SEO',
      description: 'Chaque texte est optimisé pour les moteurs de recherche avec les meilleurs mots-clés du secteur.',
      color: 'bg-blue-500',
    },
    {
      icon: Sparkles,
      title: 'Originalité Garantie',
      description: 'Contenu 100% unique, créatif et engageant qui se démarque de la concurrence.',
      color: 'bg-purple-500',
    },
    {
      icon: BarChart4,
      title: 'Analyse de Performance',
      description: "Suivez l'impact de votre contenu avec nos outils d'analyse intégrés.",
      color: 'bg-green-500',
    },
    {
      icon: Zap,
      title: 'Génération Rapide',
      description: 'Obtenez du contenu de qualité en quelques secondes, pas en jours ou en semaines.',
      color: 'bg-red-500',
    },
    {
      icon: Clock,
      title: 'Gain de Temps',
      description: 'Économisez des heures de travail en automatisant votre création de contenu.',
      color: 'bg-indigo-500',
    },
    {
      icon: Globe,
      title: 'Multilingue',
      description: 'Générez du contenu dans plusieurs langues pour toucher une audience internationale.',
      color: 'bg-teal-500',
    },
    {
      icon: Award,
      title: 'Qualité Éditoriale',
      description: 'Notre IA est formée sur les meilleures pratiques éditoriales pour un contenu de haute qualité.',
      color: 'bg-orange-500',
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Fonctionnalités <span className="text-amber-500">Puissantes</span>
          </h2>
          <p className="text-xl text-gray-600">
            SEOForgeAI combine la puissance de l'IA avec les meilleures pratiques SEO pour vous offrir un contenu de qualité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
} 