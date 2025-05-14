import type { Metadata } from "next";
import { cookiesContent } from "./cookies-content";

export const metadata: Metadata = {
  title: "Cookie Policy | FindYourCreator",
  description: "Learn about how FindYourCreator uses cookies and your options for managing them.",
};

export default function CookiesPage() {
  return (
    <div className="py-20 bg-gradient-to-b from-[#121212] to-[#1a1a1a] min-h-screen text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        <div className="bg-[#1e1e1e] rounded-lg shadow-lg border border-gray-800/30 p-8 md:p-10">
          <div dangerouslySetInnerHTML={{ __html: cookiesContent }} />
        </div>
      </div>
    </div>
  );
} 