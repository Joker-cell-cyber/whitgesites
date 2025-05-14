import { Metadata } from "next";
import LegalContent from "../LegalContent";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Learn about how we use cookies on our website to enhance your browsing experience.",
};

export default function CookiesPage() {
  return (
    <div className="py-12 md:py-20 bg-notion-black-25">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 md:p-10 rounded-xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-notion-black text-center">
              Cookie Policy
            </h1>
            <div className="prose prose-lg max-w-none">
              <LegalContent type="cookies" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 