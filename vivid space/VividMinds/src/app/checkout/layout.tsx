import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout - Complete Your Order",
  description: "Finalize your purchase of AI agent building services.",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 