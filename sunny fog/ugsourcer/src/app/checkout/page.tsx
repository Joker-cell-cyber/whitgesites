import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata = {
  title: "Checkout - UGSourcer",
  description: "Complete your order for UGC creator sourcing services.",
  robots: "noindex, nofollow",
};

export default function CheckoutPage() {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-ug-blue-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-10 text-center text-ug-gray-900">Checkout</h1>
        <CheckoutForm />
      </div>
    </div>
  );
} 