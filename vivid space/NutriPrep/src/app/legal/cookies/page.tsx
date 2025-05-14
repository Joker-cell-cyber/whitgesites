import { Metadata } from "next";
import { COMPANY } from "@/app/constants/company";
import { cookiesContent } from "./cookies-content";

export const metadata: Metadata = {
  title: `Cookie Policy | ${COMPANY.serviceName}`,
  description: "Learn about how we use cookies and similar technologies on our website.",
};

export default function CookiePolicyPage() {
  return (
    <div className="bg-gray-50 py-16 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: cookiesContent }}
        />
      </div>
    </div>
  );
} 