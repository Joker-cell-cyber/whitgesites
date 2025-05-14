import Link from "next/link";
import { SITE_NAME } from "@/app/lib/constants";
import { TreePine, Leaf } from "@/components/icons";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-[#2A303D] to-[#1F2330]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center">
            <TreePine className="h-10 w-10 text-[#5F7138]" />
            <Leaf className="h-6 w-6 text-[#C17A56] -ml-3 -mt-3" />
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
          Accédez à votre compte
        </h2>
        <p className="mt-2 text-center text-neutral-light">
          Connectez-vous pour accéder à votre plateforme d'analyse de données publicitaires Facebook Ads
        </p>
      </div>
      
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-white/5 backdrop-blur-lg py-8 px-4 shadow-lg shadow-black/10 sm:rounded-lg sm:px-10 border border-white/10">
          {children}
        </div>
      </div>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#5F7138]/20 to-[#7F8F55]/5 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-[#C17A56]/10 to-[#E8DFC7]/5 blur-3xl"></div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-[#7F7259]/50">
          &copy; {new Date().getFullYear()} AdIntelliVue. Tous droits réservés.
        </p>
      </div>
    </div>
  );
} 