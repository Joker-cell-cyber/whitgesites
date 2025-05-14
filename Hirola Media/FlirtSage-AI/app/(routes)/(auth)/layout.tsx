import Link from "next/link";
import { Heart } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex-col justify-center bg-gradient-to-b from-white to-yfc-cream-50 relative overflow-hidden">
      {/* Éléments décoratifs subtils */}
      <div className="absolute inset-0 bg-[url('/subtle-pattern.svg')] bg-repeat opacity-[0.03]"></div>
      
      {/* Formes décoratives floues */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-yfc-gold-100/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-yfc-cream-200/30 rounded-full blur-3xl -z-10"></div>
      
      {/* Header avec logo */}
      <header className="w-full py-6 px-4 relative z-10">
        <div className="container mx-auto flex justify-center">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-yfc-gold-400 to-yfc-gold-600 flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-serif font-light text-gray-900">
              FlirtSage<span className="font-medium">AI</span>
            </span>
          </Link>
        </div>
      </header>
      
      {/* Contenu principal */}
      <main className="flex-1 flex items-center justify-center py-10 px-4 relative z-10">
        {children}
      </main>
      
      {/* Footer minimaliste */}
      <footer className="w-full py-6 text-center text-yfc-gold-600 text-sm relative z-10">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} FlirtSageAI. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
} 