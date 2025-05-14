import { Metadata } from "next";
import LegalContent from "../LegalContent";
import { COMPANY } from "../../constants/company";

export const metadata: Metadata = {
  title: `Cookie Policy | ${COMPANY.serviceName}`,
  description: "Our cookie policy explains how we use cookies and similar technologies on our website.",
};

export default function CookiePolicyPage() {
  return (
    <main className="bg-[#111827] text-[#f2f2f2]">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-lead-blue-500 to-lead-green-500">
            Cookie Policy
          </h1>
          <div className="bg-[#1F2937] border border-gray-800/30 text-white rounded-lg shadow-xl p-8">
            <LegalContent type="cookies" />
          </div>
        </div>
      </div>
    </main>
  );
} 