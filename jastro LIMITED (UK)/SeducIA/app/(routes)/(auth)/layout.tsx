import Link from "next/link";
import { Flame } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col justify-center yfc-gradient-bg relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[url('/love-pattern.svg')] bg-repeat opacity-5"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF5C3E]/20 via-[#FFA728]/20 to-black opacity-80 z-0"></div>
      
      {/* Animated particles */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#FF5C3E] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#FFA728] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-[#FF5C3E] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Éléments décoratifs */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-[#FF5C3E]/10 rounded-full z-0"></div>
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#FFA728]/10 rounded-full z-0"></div>
      
      <div className="text-center z-10 relative">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <Flame className="h-10 w-10 text-[#FF5C3E] fill-[#FF5C3E]" />
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FF5C3E] via-[#FF8046] to-[#FFA728]">SeducIA</span>
        </Link>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="relative rounded-2xl border border-[#FF5C3E]/20 bg-black/40 backdrop-blur-xl p-8 shadow-2xl shadow-[#FF5C3E]/10">
          {/* Effet de lueur sur les bords */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#FF5C3E]/10 via-[#FF8046]/10 to-[#FFA728]/10 p-0.5 opacity-30"></div>
          
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 