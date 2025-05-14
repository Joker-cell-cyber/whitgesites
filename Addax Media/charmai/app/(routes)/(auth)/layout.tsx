import Link from "next/link";
import { Heart } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-white relative overflow-hidden">
      {/* Background elements plus subtils */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50/30 to-white opacity-80 z-0"></div>
      
      {/* Header avec logo */}
      <div className="w-full py-8 z-10 relative">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-red-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000"></div>
              <div className="relative flex items-center justify-center bg-white w-10 h-10 rounded-full shadow-md group-hover:shadow-lg transition duration-300">
                <Heart size={20} className="text-pink-500 fill-pink-500 group-hover:scale-110 transition duration-300" />
              </div>
            </div>
            <div className="ml-3">
              <span className="font-bold text-xl tracking-tight relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500">Your</span>
                <span className="text-gray-800">Flirt</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-red-500">Coach</span>
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-pink-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </span>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Contenu principal */}
      <div className="flex-grow flex items-center justify-center px-4 py-8 relative z-10">
        <div className="w-full max-w-md">
          <div className="relative rounded-xl border border-gray-100 bg-white shadow-md p-8">
            {/* Effet de lueur subtil sur les bords */}
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-pink-200 to-red-200 opacity-20"></div>
            
            <div className="relative z-10">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 