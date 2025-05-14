import { Metadata } from "next";
import LegalContent from "../LegalContent";

export const metadata: Metadata = {
  title: "Cookie Policy | ProTranslator",
  description: "Cookie Policy for ProTranslator - how we use cookies on our website",
};

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <LegalContent type="cookies" />
      </div>
    </div>
  );
} 