import { Button } from '../ui/button';

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary-900 to-primary-700 relative overflow-hidden">
      {/* Motif de fond */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-10"></div>
      
      {/* Formes décoratives */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-600 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary-800 rounded-full opacity-30 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 lg:p-16">
              <div className="inline-block bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                Découvrez notre plateforme
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-900 mb-6">
                Prêt à transformer votre stratégie de contenu?
              </h2>
              <p className="text-secondary-600 text-lg mb-8 leading-relaxed">
                Utilisez notre IA avancée pour générer du contenu SEO de qualité qui se démarque et convertit.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Button size="lg" className="bg-primary hover:bg-primary-700">
                  Explorer nos fonctionnalités
                </Button>
                <Button variant="outline" size="lg" className="border-secondary-300 text-secondary-800 hover:bg-secondary-50">
                  Voir les tarifs
                </Button>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary-100 to-primary-50 p-8 md:p-12 lg:p-16 flex items-center justify-center">
              <div className="space-y-6 max-w-sm">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-secondary-900 font-semibold mb-1">Contenu optimisé pour le SEO</h4>
                    <p className="text-secondary-600 text-sm">Générez du contenu qui se classe naturellement dans les moteurs de recherche.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-secondary-900 font-semibold mb-1">Économisez du temps</h4>
                    <p className="text-secondary-600 text-sm">Automatisez votre processus de création de contenu et gagnez des heures chaque semaine.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-secondary-900 font-semibold mb-1">Technologies avancées</h4>
                    <p className="text-secondary-600 text-sm">Notre IA utilise les dernières technologies pour générer du contenu performant.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-secondary-900 font-semibold mb-1">Interface intuitive</h4>
                    <p className="text-secondary-600 text-sm">Une plateforme facile à utiliser conçue pour simplifier votre workflow.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 