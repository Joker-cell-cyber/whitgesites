import Link from "next/link";
import { SITE_NAME } from "@/app/lib/constants";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-darkest via-neutral-darker to-neutral-darkest flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Effet de fond animé */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Effet de gradient */}
      <div className="absolute inset-0 bg-gradient-radial from-rose-500/5 via-transparent to-transparent"></div>
      
      {/* Logo et titre */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center shadow-lg shadow-rose-200 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-400 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="text-white font-bold text-2xl relative z-10">F</span>
            </div>
            <span className="text-3xl font-bold">
              <span className="text-white">FitNeural</span>
              <span className="text-rose-600">Coach</span>
            </span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Bienvenue sur votre coach IA
        </h2>
        <p className="mt-2 text-center text-neutral-light">
          Connectez-vous pour accéder à votre programme d'entraînement personnalisé
        </p>
      </div>
      
      {/* Formulaire */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-white/5 backdrop-blur-sm p-8 shadow-lg hover:shadow-rose-500/5 transition-shadow duration-300 rounded-xl border border-white/10">
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 