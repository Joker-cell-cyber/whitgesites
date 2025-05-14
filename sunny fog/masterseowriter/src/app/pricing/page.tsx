"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCheckout } from "@/context/CheckoutContext";

export default function Pricing() {
  return (
    <>
      <PricingHeader />
      <PricingGrid />
      <CallToAction />
    </>
  );
}

function PricingHeader() {
  return (
    <section className="bg-gray-50 py-20 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block py-1 px-3 rounded-full bg-turquoise-100 text-turquoise-800 text-sm font-medium mb-6">
            Pricing
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Packages for <span className="text-turquoise-500">all your needs</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Choose the package that suits your needs and start improving your online presence today. Each package is a one-time purchase.
          </p>
        </div>
      </div>
    </section>
  );
}

function PricingGrid() {
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

  const packages: PricingPackage[] = [
    {
      price: 9.99,
      name: "Starter",
      description: "For small projects and individual entrepreneurs",
      features: [
        "1 article (500 words)",
        "1 main keyword",
        "Basic SEO optimization",
        "1 revision",
        "Delivery time: 7 days"
      ]
    },
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
      price: 39.99,
      name: "Plus",
      description: "For businesses that need regular content",
      features: [
        "2 articles (800 words each)",
        "2 keywords per article",
        "Advanced SEO optimization",
        "2 revisions per article",
        "Delivery time: 5 days"
      ]
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
    },
    {
      price: 59.50,
      name: "Premium",
      description: "High-quality content to boost your SEO strategy",
      features: [
        "1 article (2000 words)",
        "4 main keywords",
        "Premium SEO optimization",
        "3 revisions",
        "Delivery time: 3 days"
      ]
    },
    {
      price: 69.99,
      name: "Elite",
      description: "Complete solution for ambitious businesses",
      features: [
        "3 articles (1000 words each)",
        "3 keywords per article",
        "Advanced SEO optimization",
        "2 revisions per article",
        "Delivery time: 5 days"
      ]
    },
    {
      price: 79.90,
      name: "Business",
      description: "For businesses that want to stand out",
      features: [
        "2 articles (1500 words each)",
        "4 keywords per article",
        "Premium SEO optimization",
        "3 revisions per article",
        "Competitor analysis",
        "Delivery time: 4 days"
      ]
    },
    {
      price: 89.50,
      name: "Expert",
      description: "Expert content to dominate your market",
      features: [
        "1 in-depth article (3000 words)",
        "5 main keywords",
        "Premium SEO optimization",
        "In-depth research",
        "3 revisions",
        "Delivery time: 5 days"
      ]
    },
    {
      price: 99.99,
      name: "Corporate",
      description: "Complete solution for established businesses",
      features: [
        "4 articles (1000 words each)",
        "3 keywords per article",
        "Premium SEO optimization",
        "3 revisions per article",
        "Delivery time: 5 days"
      ],
      popular: true
    },
    {
      price: 109.90,
      name: "Agency",
      description: "Ideal for agencies and high-growth businesses",
      features: [
        "5 articles (800 words each)",
        "3 keywords per article",
        "Premium SEO optimization",
        "2 revisions per article",
        "Delivery time: 6 days"
      ]
    },
    {
      price: 119.50,
      name: "Enterprise",
      description: "Comprehensive content solution for large enterprises",
      features: [
        "3 articles (2000 words each)",
        "5 keywords per article",
        "Premium SEO optimization",
        "Expert copywriting",
        "3 revisions per article",
        "Priority support",
        "Delivery time: 7 days"
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
    <section className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div 
          ref={gridRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {packages.map((pkg, index) => (
            <div 
              key={index}
              className={`bg-white border ${pkg.popular ? 'border-turquoise-300' : 'border-gray-200'} rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden ${
                isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {pkg.popular && (
                <div className="bg-turquoise-500 text-white text-center py-1.5 text-sm font-medium">
                  Popular Choice
                </div>
              )}
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{pkg.name}</h3>
                    <p className="text-gray-600 text-sm">{pkg.description}</p>
                  </div>
                </div>
                
                <div className="mb-5">
                  <span className="text-3xl font-bold text-gray-900">${pkg.price}</span>
                  <span className="text-gray-600 ml-1 text-sm">/one-time</span>
                </div>
                
                <ul className="mb-6 space-y-2">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-turquoise-500 mr-2 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleSelectPackage(pkg)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                    pkg.popular
                      ? 'bg-turquoise-600 text-white hover:bg-turquoise-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-gradient-to-r from-turquoise-600 to-turquoise-500 rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Need a custom solution?</h2>
            <p className="text-turquoise-50 text-lg mb-6">
              Not finding what you need? Contact us for a personalized content strategy tailored to your business goals.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-white text-turquoise-600 font-medium py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 