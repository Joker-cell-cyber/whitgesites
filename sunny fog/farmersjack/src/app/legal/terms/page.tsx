import { Metadata } from "next";
import LegalContent from '../LegalContent';

export const metadata: Metadata = {
  title: "Terms of Service | FarmersJack",
  description: "Terms and conditions for FarmersJack gaming services. Read our mission protocols before engaging our elite operators for your gaming objectives.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">Terms of Service</h1>
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg p-8 mb-8">
        <LegalContent type="terms" />
      </div>
    </div>
  );
} 