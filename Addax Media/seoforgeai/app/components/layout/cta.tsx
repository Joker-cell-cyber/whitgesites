import { Button } from "@/app/components/ui/button";

export function CTA() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="relative isolate overflow-hidden bg-amber-50 px-6 py-24 text-center shadow-xl sm:rounded-3xl sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Transformez votre vision en réalité
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
            Nos artisans talentueux sont prêts à donner vie à vos idées les plus créatives.
            Commencez votre projet dès aujourd'hui.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button className="bg-amber-600 hover:bg-amber-500">
              Démarrer un projet
            </Button>
            <Button variant="outline" className="text-amber-600 ring-amber-600 hover:ring-amber-500">
              Découvrir nos créations
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
                <stop stopColor="#B45309" />
                <stop offset={1} stopColor="#F59E0B" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
} 