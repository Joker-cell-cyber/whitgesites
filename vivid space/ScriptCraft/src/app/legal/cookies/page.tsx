import { Metadata } from "next";
import { cookiesContent } from "./cookies-content";
import { COMPANY } from "@/app/constants/company";

export const metadata: Metadata = {
  title: `Cookie Policy | ${COMPANY.serviceName}`,
  description: "Learn about how we use cookies and similar technologies on our website.",
};

export default function CookiesPage() {
  return (
    <div className="relative pt-32 pb-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:max-w-4xl">
        <div className="prose prose-lg max-w-none text-cs-navy-900">
          <div dangerouslySetInnerHTML={{ __html: cookiesContent }} />
        </div>
      </div>
    </div>
  );
} 