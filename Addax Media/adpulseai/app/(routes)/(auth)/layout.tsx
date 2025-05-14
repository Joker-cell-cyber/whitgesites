import Link from "next/link";
import { SITE_NAME } from "@/app/lib/constants";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col justify-center bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-orange-100 to-white opacity-80 z-0"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-orange-200 rounded-full z-0"></div>
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-yellow-200 rounded-full z-0"></div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-orange-500 to-yellow-600 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="text-white font-bold text-xl relative z-10">{SITE_NAME.charAt(0)}</span>
            </div>
            <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500">{SITE_NAME}</span>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-800">
          Accédez à votre compte
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Connectez-vous pour accéder à votre analyse publicitaire
        </p>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="relative rounded-2xl border border-orange-200 bg-white shadow-lg shadow-orange-100 p-8">
          {/* Effet de lueur sur les bords */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/5 via-yellow-500/5 to-orange-500/5 p-0.5 opacity-30"></div>
          
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 