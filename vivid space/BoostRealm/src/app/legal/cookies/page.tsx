import { Metadata } from "next";
import LegalContent from '../LegalContent';
import { COMPANY } from "@/lib/company";

export const metadata: Metadata = {
  title: `Cookie Policy | ${COMPANY.serviceName}`,
  description: `Cookie policy and usage information for ${COMPANY.serviceName} gaming services.`,
};

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-white">Cookie Policy</h1>
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 shadow-lg p-8 mb-8">
        <LegalContent type="cookies" />
      </div>
    </div>
  );
} 