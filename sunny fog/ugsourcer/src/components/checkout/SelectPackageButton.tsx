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
      className={`w-full py-3 px-4 rounded-lg text-center font-medium transition-all duration-300 ${
        recommended
          ? 'bg-gradient-to-r from-vid-red-500 to-vid-orange-500 text-white shadow-lg shadow-vid-red-500/20 hover:shadow-xl hover:shadow-vid-red-500/30'
          : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
      }`}
    >
      Select Package
    </button>
  );
} 