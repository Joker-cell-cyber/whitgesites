"use client";

export default function WhyChooseUsSection() {
  const features = [
    {
      icon: "🔍",
      title: "Analyse approfondie",
      description: "Nous prenons le temps de comprendre en détail vos processus actuels pour identifier les meilleures opportunités d'automatisation."
    },
    {
      icon: "⚙️",
      title: "Solutions sur mesure",
      description: "Chaque solution est conçue spécifiquement pour votre entreprise, en prenant en compte vos objectifs uniques et votre workflow existant."
    },
    {
      icon: "🚀",
      title: "Expertise technologique",
      description: "Notre équipe maîtrise les plateformes d'automatisation les plus performantes comme Make.com et Zapier pour créer des solutions robustes."
    },
    {
      icon: "📚",
      title: "Documentation complète",
      description: "Nous fournissons une documentation détaillée et une formation pour que vous puissiez comprendre et gérer facilement vos automatisations."
    }
  ];

  const advantages = [
    {
      icon: "⏱️",
      title: "Gains de temps significatifs",
      description: "L'automatisation libère votre équipe des tâches répétitives, permettant de se concentrer sur des activités à plus forte valeur ajoutée."
    },
    {
      icon: "📊",
      title: "Réduction des erreurs",
      description: "Les processus automatisés éliminent les erreurs humaines et assurent une exécution cohérente à chaque fois."
    },
    {
      icon: "💰",
      title: "Économies de coûts",
      description: "Réduisez les coûts opérationnels en automatisant les processus manuels et en optimisant l'utilisation des ressources."
    },
    {
      icon: "📈",
      title: "Évolutivité facilitée",
      description: "Les solutions d'automatisation s'adaptent facilement à la croissance de votre entreprise sans nécessiter des ressources supplémentaires."
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute h-full w-full bg-gradient-to-br from-blue-50/30 to-green-50/30"></div>
        <div className="absolute right-0 w-1/3 h-screen bg-gradient-to-l from-flow-green-50/20 to-transparent"></div>
        <div className="absolute left-0 w-1/3 h-screen bg-gradient-to-r from-blue-50/20 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/images/grid.svg')] opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Two-column header layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-px w-12 bg-flow-green-500"></div>
              <span className="text-flow-green-600 font-semibold uppercase tracking-wider text-sm">Notre Expertise</span>
            </div>
            
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              Pourquoi <span className="text-flow-green-600">nous choisir</span> ?
            </h2>
          </div>
          
          <div className="lg:pt-12">
            <p className="text-xl text-gray-600 leading-relaxed">
              Nous combinons expertise technique et approche personnalisée pour créer des solutions d'automatisation qui transforment votre entreprise
            </p>
          </div>
        </div>

        {/* Features in cards with 3D effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              {/* Top border accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-flow-green-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              
              <div className="p-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-6">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-4xl shadow-inner group-hover:bg-flow-green-50 transition-colors">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-flow-green-600 transition-colors">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Advantages section with different background */}
        <div className="bg-gray-900 text-white rounded-xl p-10 mb-16">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 rounded-full bg-flow-green-900/20 text-flow-green-400 text-sm font-medium mb-4">
              Transformez votre entreprise
            </span>
            
            <h3 className="text-3xl font-bold text-white mb-4">
              Les avantages de l'automatisation
            </h3>
            
            <p className="text-gray-300 max-w-3xl mx-auto">
              Voici les bénéfices concrets que vous pouvez attendre en implémentant nos solutions d'automatisation dans votre entreprise
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((advantage, index) => (
              <div 
                key={index}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:bg-gray-800/70 transition-colors"
              >
                <div className="mb-4 bg-flow-green-900/20 w-12 h-12 rounded-lg flex items-center justify-center text-2xl">
                  {advantage.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{advantage.title}</h4>
                <p className="text-gray-400">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA with split design */}
        <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="md:w-2/3 p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Prêt à optimiser vos processus?</h3>
            <p className="text-gray-600 mb-6">
              Discutons de vos besoins spécifiques et découvrez comment nos solutions d'automatisation peuvent transformer votre entreprise.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 rounded-lg bg-flow-green-600 text-white font-medium hover:bg-flow-green-700 transition-colors"
            >
              Discuter de votre projet
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
          <div className="hidden md:block md:w-1/3 bg-gradient-to-br from-flow-green-500 to-flow-green-600 p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" viewBox="0 0 100 100">
                <defs>
                  <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#grid-pattern)" />
              </svg>
            </div>
            <div className="absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2">
              <div className="w-32 h-32 rounded-full bg-white opacity-10"></div>
            </div>
            <div className="absolute bottom-0 left-0 transform translate-y-1/2 -translate-x-1/2">
              <div className="w-24 h-24 rounded-full bg-white opacity-10"></div>
            </div>
            <div className="relative text-white font-bold text-3xl">
              Transformez vos processus dès maintenant
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 