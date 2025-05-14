import { PackageCard } from "@/components/packages/PackageCard";
import { COMPANY } from "../constants/company";

export const metadata = {
  title: `Packages & Pricing - ${COMPANY.serviceName}`,
  description: "Choose from our range of data extraction packages. For all your needs, from small projects to enterprise solutions.",
};

export default function PackagesPage() {
  const packages = [
    {
      price: 9.99,
      name: "Starter",
      description: "Simple data extraction for a specific project.",
      features: [
        "Up to 500 data points",
        "1 website",
        "CSV/Excel format",
        "Delivery in 7 days"
      ],
      popular: false
    },
    {
      price: 19.50,
      name: "Basic",
      description: "Data extraction for small-scale projects.",
      features: [
        "Up to 2,000 data points",
        "2 websites",
        "CSV/Excel/JSON format",
        "Delivery in 7 days"
      ],
      popular: false
    },
    {
      price: 29.90,
      name: "Standard",
      description: "Complete data extraction for medium-sized projects.",
      features: [
        "Up to 5,000 data points",
        "3 websites",
        "All data formats",
        "Delivery in 5 days"
      ],
      popular: true
    },
    {
      price: 39.99,
      name: "Professional",
      description: "Advanced extraction for professional projects.",
      features: [
        "Up to 10,000 data points",
        "5 websites",
        "All data formats",
        "Delivery in 5 days"
      ],
      popular: false
    },
    {
      price: 49.90,
      name: "Advanced",
      description: "Complete solution for substantial projects.",
      features: [
        "Up to 20,000 data points",
        "8 websites",
        "All data formats",
        "Delivery in 3 days"
      ],
      popular: false
    },
    {
      price: 59.50,
      name: "Business",
      description: "Robust extraction for business projects.",
      features: [
        "Up to 50,000 data points",
        "10 websites",
        "All data formats",
        "Delivery in 3 days"
      ],
      popular: false
    },
    {
      price: 69.99,
      name: "Business Plus",
      description: "Professional extraction with enriched data.",
      features: [
        "Up to 100,000 data points",
        "15 websites",
        "All data formats",
        "Delivery in 3 days"
      ],
      popular: false
    },
    {
      price: 79.90,
      name: "Enterprise Starter",
      description: "Extraction solution for enterprise projects.",
      features: [
        "Up to 200,000 data points",
        "20 websites",
        "All data formats with custom structure",
        "Delivery in 48 hours"
      ],
      popular: false
    },
    {
      price: 89.50,
      name: "Enterprise",
      description: "Complete extraction for large enterprise projects.",
      features: [
        "Up to 500,000 data points",
        "25 websites",
        "All data formats with advanced structure",
        "Delivery in 48 hours"
      ],
      popular: false
    },
    {
      price: 99.99,
      name: "Enterprise Plus",
      description: "Advanced extraction for strategic projects.",
      features: [
        "Up to 1,000,000 data points",
        "30 websites",
        "All data formats with custom structure",
        "Delivery in 24 hours"
      ],
      popular: false
    },
    {
      price: 109.90,
      name: "Enterprise Pro",
      description: "Professional extraction for critical projects.",
      features: [
        "Up to 2,000,000 data points",
        "40 websites",
        "All data formats with premium structure",
        "Delivery in 24 hours"
      ],
      popular: false
    },
    {
      price: 119.50,
      name: "Enterprise Ultimate",
      description: "Ultimate extraction for large-scale projects.",
      features: [
        "Unlimited data points",
        "50+ websites",
        "All data formats with fully custom structure",
        "Express delivery in 12 hours"
      ],
      popular: false
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-950">Choose Your Data Package</h1>
            <p className="text-xl text-black mb-8">
              From small projects to enterprise solutions, we offer one-time data extraction with no subscription, tailored to your specific needs.
            </p>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {packages.map((pkg, index) => (
              <PackageCard key={index} packageData={pkg} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-lg text-black mb-6">
              Need a custom solution? We can create a tailored package for your specific needs.
            </p>
            <a
              href="/contact"
              className="btn btn-primary px-8 py-3 text-lg"
            >
              Request a custom quote
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to get your data?
          </h2>
          <p className="text-xl text-white mb-10 max-w-2xl mx-auto">
            Choose your package and receive high-quality structured data with a single payment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn px-8 py-4 text-lg bg-white text-primary hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Get started now
            </a>
          </div>
        </div>
      </section>
      
      {/* Spacer */}
      <div className="bg-white py-8"></div>
    </div>
  );
}