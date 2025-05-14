import { Metadata } from "next";
import { cookiesContent } from "./cookies-content";

export const metadata: Metadata = {
  title: "Cookie Policy | DontBeNoob",
  description: "Cookie Policy for DontBeNoob - Gaming Coaching Services",
};

export default function CookiesPage() {
  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: cookiesContent }} />
    </div>
  );
} 