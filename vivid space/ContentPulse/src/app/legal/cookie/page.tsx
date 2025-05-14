"use client";

import { useState, useEffect } from "react";
import { cookieContent } from "@/content/legal/cookie";

export default function CookiePolicyPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: cookieContent }} />
        </div>
      </div>
    </div>
  );
} 