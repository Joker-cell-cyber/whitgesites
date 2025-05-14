import { Metadata } from "next";
import LegalContent from '../LegalContent';

export const metadata: Metadata = {
  title: "Privacy Policy | FarmersJack",
  description: "Data security protocols for FarmersJack gaming services. Learn how we protect your information while providing elite gaming boosting and farming services.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">Privacy Policy</h1>
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg p-8 mb-8">
        <LegalContent type="privacy" />
      </div>
    </div>
  );
} 