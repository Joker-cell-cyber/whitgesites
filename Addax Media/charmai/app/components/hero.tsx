import { Button } from "@/app/components/ui/button";

export function Hero() {
  return (
    <div className="bg-white">
      <div className="relative isolate overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="max-w-lg text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Développez votre confiance et vos relations
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              CharmAI vous aide à développer des compétences relationnelles authentiques pour créer des connexions significatives et épanouissantes.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Button className="bg-pink-600 hover:bg-pink-500">
                Commencer votre transformation
              </Button>
              <Button variant="outline" className="text-pink-600 ring-pink-600 hover:ring-pink-500">
                Découvrir nos méthodes
              </Button>
            </div>
            <div className="mt-10 flex items-center gap-x-8">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-gray-900">98%</span>
                <span className="text-sm text-gray-600">Satisfaction client</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-gray-900">10K+</span>
                <span className="text-sm text-gray-600">Vies transformées</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-gray-900">8+</span>
                <span className="text-sm text-gray-600">Années d'expertise</span>
              </div>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
            <div className="relative mx-auto h-80 w-80 overflow-hidden rounded-lg shadow-xl sm:h-96 sm:w-96 lg:h-[30rem] lg:w-[30rem]">
              <img
                src="/hero-image.jpg"
                alt="Coaching relationnel"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/20 to-transparent"></div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 -z-10 transform-gpu overflow-hidden blur-3xl" aria-hidden="true">
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-pink-600 to-pink-400 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
    </div>
  );
} 