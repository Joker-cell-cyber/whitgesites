"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLegal } from "@/app/context/legal-context";

const navigation = {
  legal: [
    { name: "Conditions générales", type: "terms" },
    { name: "Politique de confidentialité", type: "privacy" },
    { name: "Mentions légales", type: "legal" },
    { name: "Politique de remboursement", type: "refund" },
  ],
};

export function Footer() {
  const pathname = usePathname();
  const { openLegalModal } = useLegal();

  const handleLegalClick = (type: "terms" | "privacy" | "legal" | "refund") => {
    openLegalModal(type);
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-12 sm:py-16 lg:px-8">
        <div className="mb-8 flex flex-wrap justify-center gap-x-8 gap-y-4">
          {navigation.legal.map((item) => (
            <button 
              key={item.name} 
              className="text-sm text-gray-300 hover:text-pink-400 transition-colors" 
              onClick={() => handleLegalClick(item.type as "terms" | "privacy" | "legal" | "refund")}
            >
              {item.name}
            </button>
          ))}
        </div>
        
        <div className="border-t border-slate-800 pt-8">
          <p className="text-center text-xs leading-5 text-gray-400 mb-2">
            &copy; {new Date().getFullYear()} CharmAI, Inc. Tous droits réservés.
          </p>
          <div className="text-center text-xs leading-5 text-gray-400 max-w-xl mx-auto space-y-1">
            <p>Addax Media Ltd - Entreprise enregistrée en Angleterre sous le numéro 16314045</p>
            <p>Siège social: Flat 5, 9 Langley Road, Watford, England, WD17 4PS</p>
            <p>Contact: support@charmai.com - Téléphone: (803) 886-0993</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 