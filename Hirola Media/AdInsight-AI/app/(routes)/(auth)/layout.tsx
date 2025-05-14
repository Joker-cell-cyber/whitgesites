import Link from "next/link";
import { SITE_NAME } from "@/app/lib/constants";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-gradient-to-b from-adfi-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
      
      {/* Animated elements */}
      <div className="absolute top-40 right-10 w-64 h-64 rounded-full bg-adfi-blue-100/20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 left-10 w-80 h-80 rounded-full bg-adfi-blue-100/30 blur-3xl animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-adfi-blue-400 rounded-full animate-ping"></div>
      <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-adfi-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-adfi-blue-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 animate-scaleIn">
        <div className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl border border-adfi-slate-200/50 overflow-hidden">          
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
      
      <footer className="p-6 text-center text-adfi-slate-500 text-sm mt-8">
        <p>
          © 2023 {SITE_NAME} — <span className="text-adfi-slate-400">Plateforme d'analyse de données publicitaires</span>
        </p>
      </footer>
    </div>
  );
} 