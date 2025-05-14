import React from 'react';
import LegalContent from "../LegalContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | ContentScript",
  description: "Cookie Policy for ContentScript - Learn how we use cookies on our website",
};

export default function CookiesPage() {
  return <LegalContent type="cookies" />;
} 