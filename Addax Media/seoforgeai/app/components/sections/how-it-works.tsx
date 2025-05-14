import { ArrowRight, Edit3, Search, FileText, Brain } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: Search,
      title: "Définissez votre sujet",
      description: "Entrez votre sujet, vos mots-clés cibles et le ton que vous souhaitez pour votre contenu.",
      color: "bg-blue-500",
    },
    {
      id: 2,
      icon: Brain,
      title: "Notre IA analyse",
      description: "Notre intelligence artificielle analyse les meilleures pratiques SEO et le contenu performant dans votre secteur.",
      color: "bg-purple-500",
    },
    {
      id: 3,
      icon: FileText,
      title: "Génération de contenu",
      description: "L'IA crée un contenu optimisé avec une structure adaptée, des sous-titres pertinents et des mots-clés stratégiquement placés.",
      color: "bg-amber-500",
    },
    {
      id: 4,
      icon: Edit3,
      title: "Modification et export",
      description: "Révisez, modifiez si nécessaire, et exportez votre contenu prêt à être publié sur votre site ou blog.",
      color: "bg-green-500",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-600 text-sm font-medium mb-6">
            Simple et efficace
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comment fonctionne <span className="text-amber-500">SEOForgeAI</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Notre plateforme transforme votre idée en contenu optimisé pour les moteurs de recherche en quelques étapes simples
          </p>
        </div>

        <div className="relative">
          {/* Ligne de connexion entre les étapes */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center text-center">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white shadow-lg mb-6`}>
                  {index < steps.length - 1 && (
                    <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 hidden md:block">
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center shadow-md">
                  {step.id}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-gray-50 border border-gray-100 rounded-xl p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-amber-500">45s</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Génération ultra-rapide</h3>
              <p className="text-gray-600">
                Notre moteur d'IA peut générer un article complet de 1500 mots en moins d'une minute, vous permettant 
                de créer plusieurs contenus de qualité en une fraction du temps habituellement nécessaire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 