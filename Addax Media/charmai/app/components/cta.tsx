import { Button } from "@/app/components/ui/button"

export function CTA() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-pink-50 px-6 py-24 text-center shadow-xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Transformez votre vie relationnelle
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Développez votre confiance en vous, améliorez vos compétences en communication
            et créez des connexions authentiques et durables.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button className="bg-pink-600 hover:bg-pink-500">
              Commencer mon parcours
            </Button>
            <Button variant="outline" className="text-pink-600 ring-pink-600 hover:ring-pink-500">
              Découvrir nos programmes
            </Button>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#gradient)"
              fillOpacity="0.15"
            />
            <defs>
              <radialGradient id="gradient">
                <stop stopColor="#BE185D" />
                <stop offset={1} stopColor="#EC4899" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
} 