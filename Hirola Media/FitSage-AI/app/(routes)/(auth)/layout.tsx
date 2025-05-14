import Link from "next/link";
import { SITE_NAME } from "@/app/lib/constants";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gradient-to-b from-fs-slate-900 to-fs-slate-800 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 fs-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fs-teal-500/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fs-teal-500/30 to-transparent"></div>
      
      {/* Cercles lumineux */}
      <div className="absolute top-1/4 -right-48 w-96 h-96 rounded-full bg-fs-blue-600/5 blur-3xl"></div>
      <div className="absolute bottom-1/3 -left-24 w-72 h-72 rounded-full bg-fs-teal-600/5 blur-3xl"></div>
      
      {/* Éléments flottants animés */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/5 backdrop-blur-sm border border-fs-teal-500/20 rounded-lg transform fs-floating-element"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animationDuration: `${Math.random() * 10 + 15}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.5 + Math.random() * 0.3,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>
      
      {/* Points lumineux */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-fs-teal-400 fs-glow-point"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.7,
              animation: `fs-pulse ${Math.random() * 5 + 2}s infinite alternate`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-fs-teal-500 to-fs-blue-500 flex items-center justify-center relative overflow-hidden">
              <span className="text-white font-bold text-xl relative z-10">{SITE_NAME.charAt(0)}</span>
            </div>
            <span className="text-2xl font-bold fs-text-gradient">{SITE_NAME}</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Accédez à votre compte
        </h2>
        <p className="mt-2 text-center text-fs-teal-100">
          Connectez-vous pour accéder à votre coach fitness personnel
        </p>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-fs-slate-800/70 backdrop-blur-sm border border-fs-teal-500/20 rounded-lg p-8 shadow-lg shadow-fs-teal-900/20 hover:shadow-xl transition-all duration-300">
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 