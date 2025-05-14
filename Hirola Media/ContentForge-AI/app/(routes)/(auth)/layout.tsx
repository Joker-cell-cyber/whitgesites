import Link from "next/link";
import { SITE_NAME } from "@/app/lib/constants";
import { Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-ocrf-anthracite-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/subtle-grid.svg')] bg-repeat opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-ocrf-gold-500/10 via-ocrf-copper-500/10 to-ocrf-anthracite-900 opacity-80 z-0"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-ocrf-gold-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-ocrf-copper-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-ocrf-gold-300 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-ocrf-gold-500/10 rounded-full z-0"></div>
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-ocrf-copper-500/10 rounded-full z-0"></div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-ocrf-gold-400 to-ocrf-copper-500 flex items-center justify-center relative overflow-hidden shadow-lg shadow-ocrf-copper-500/20">
              <div className="absolute inset-0 bg-gradient-to-r from-ocrf-gold-400 to-ocrf-copper-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Sparkles className="text-ocrf-anthracite-900 w-5 h-5 relative z-10" />
            </div>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ocrf-gold-300 via-ocrf-gold-400 to-ocrf-copper-400">{SITE_NAME}</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Accédez à votre compte
        </h2>
        <p className="mt-2 text-center text-ocrf-brown-200">
          Connectez-vous pour générer des articles SEO optimisés
        </p>
      </div>
      
      {/* Remarque: ce conteneur externe n'est plus nécessaire car nous utilisons notre propre composant de connexion */}
      <div className="mt-8 sm:mx-auto sm:w-full relative z-10 px-4">
        <div className="relative">
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 