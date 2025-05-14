"use client";

import { useRouter } from "next/navigation";
import { useCart, Package } from "./CartContext";

interface SelectPackageButtonProps {
  pkg: Package;
  recommended: boolean;
}

export default function SelectPackageButton({ pkg, recommended }: SelectPackageButtonProps) {
  const router = useRouter();
  const { setSelectedPackage } = useCart();

  const handleSelectPackage = () => {
    setSelectedPackage(pkg);
    router.push("/checkout");
  };

  return (
    <button 
      onClick={handleSelectPackage}
      className={`w-full py-3 px-4 rounded-full text-center font-medium transition-all duration-300 ${
        recommended
          ? 'bg-gradient-to-r from-pink-600 to-indigo-600 text-white shadow-lg shadow-pink-900/30 hover:shadow-xl hover:shadow-pink-900/40 hover:translate-y-[-2px]'
          : 'bg-white/5 border border-white/20 text-white hover:bg-white/10 hover:translate-y-[-2px]'
      }`}
    >
      Select Package
    </button>
  );
} 