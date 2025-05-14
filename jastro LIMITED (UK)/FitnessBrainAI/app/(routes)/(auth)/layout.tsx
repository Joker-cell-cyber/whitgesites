import Link from "next/link";
import { SITE_NAME } from "@/app/lib/constants";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-neutral-darkest relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-neutral-darkest opacity-80 z-0"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-accent rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/10 rounded-full z-0"></div>
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-secondary/10 rounded-full z-0"></div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="text-neutral-darkest font-bold text-xl relative z-10">{SITE_NAME.charAt(0)}</span>
            </div>
            <span className="text-2xl font-bold text-gradient-primary">{SITE_NAME}</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Accédez à votre compte
        </h2>
        <p className="mt-2 text-center text-neutral-light">
          Connectez-vous pour accéder à votre coach fitness personnel
        </p>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="border-gradient glass-card p-8 shadow-lg hover-lift">
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 