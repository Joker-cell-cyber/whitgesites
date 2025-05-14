"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCheckout } from "@/context/CheckoutContext";

export default function PricingSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { setSelectedPackage } = useCheckout();
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  interface PricingPackage {
    price: number;
    name: string;
    description: string;
    features: string[];
    popular?: boolean;
  }

  // Versions simplifiées des packages pour la page d'accueil
  const packages: PricingPackage[] = [
    {
      price: 19.50,
      name: "Basic",
      description: "Ideal for personal blogs and small businesses",
      features: [
        "1 article (800 words)",
        "2 main keywords",
        "Standard SEO optimization",
        "1 revision",
        "Delivery time: 5 days"
      ]
    },
    {
      price: 29.90,
      name: "Standard",
      description: "For businesses looking to grow their online presence",
      features: [
        "1 article (1200 words)",
        "3 main keywords",
        "Advanced SEO optimization",
        "2 revisions",
        "Delivery time: 4 days"
      ],
      popular: true
    },
    {
      price: 49.90,
      name: "Pro",
      description: "For businesses wanting a complete content strategy",
      features: [
        "2 articles (1200 words each)",
        "3 keywords per article",
        "Advanced SEO optimization",
        "2 revisions per article",
        "Delivery time: 4 days"
      ]
    }
  ];

  const handleSelectPackage = (pkg: PricingPackage) => {
    setSelectedPackage({
      name: pkg.name,
      price: pkg.price,
      description: pkg.description,
      features: pkg.features,
      popular: pkg.popular
    });
    router.push("/checkout");
  };

  return (
    <section className="py-24 relative bg-white">
      {/* Subtil motif de fond */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
          <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gray-900 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gray-900 rounded-tr-full"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* En-tête de section */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-black text-white text-sm font-medium mb-6">
            Pricing
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Packages for <span className="text-black">all your needs</span>
          </h2>
          <p className="text-xl text-black mb-8">
            Choose the package that suits your needs and start improving your online presence today. Each package is a one-time purchase.
          </p>
        </div>

        {/* Grille de tarification */}
        <div 
          ref={gridRef} 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {packages.map((pkg, index) => (
            <div 
              key={index}
              className={`bg-white border ${pkg.popular ? 'border-black' : 'border-gray-200'} rounded-none shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden ${
                isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {pkg.popular && (
                <div className="bg-black text-white text-center py-1.5 text-sm font-medium">
                  Popular Choice
                </div>
              )}
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{pkg.name}</h3>
                    <p className="text-black text-sm">{pkg.description}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">${pkg.price}</span>
                  <span className="text-black ml-1 text-sm">/one-time</span>
                </div>
                
                <ul className="mb-8 space-y-3">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-black mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-black">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleSelectPackage(pkg)}
                  className={`w-full py-3 px-4 rounded-none font-medium transition-colors ${
                    pkg.popular
                      ? 'bg-black text-white hover:bg-gray-800'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bannière d'appel à l'action */}
        <div className="mt-12">
          <div className="bg-black rounded-none p-8 md:p-12 text-white">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Need a custom solution?</h2>
              <p className="text-gray-300 text-lg mb-6">
                Not finding what you need? View all our packages or contact us for a personalized content strategy.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/pricing"
                  className="inline-block bg-white text-black font-medium py-3 px-6 rounded-none hover:bg-gray-100 transition-colors"
                >
                  View All Packages
                </Link>
                <Link
                  href="/contact"
                  className="inline-block bg-transparent text-white border border-white font-medium py-3 px-6 rounded-none hover:bg-white/10 transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}