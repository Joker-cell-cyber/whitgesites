import Link from "next/link";
import { DataCards } from "@/components/home/DataCards";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Features } from "@/components/home/Features";
import { FAQ } from "@/components/home/FAQ";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"></div>
        <div className="absolute right-0 top-0 h-full w-1/2 bg-primary/5"></div>
        <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-primary/10"></div>
        <div className="absolute -right-32 -bottom-32 h-64 w-64 rounded-full bg-primary/10"></div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                Transform Raw Web Data Into 
                <span className="text-primary"> Valuable Insights</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
                Our professional web scraping services deliver clean, structured data directly to you. No coding required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/packages" className="btn btn-primary px-8 py-3 text-lg">
                  View Packages
                </Link>
                <Link href="/contact" className="btn btn-outline px-8 py-3 text-lg">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary-light rounded-lg blur opacity-30"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-lg p-2">
                <div className="h-72 sm:h-80 md:h-96 w-full bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden p-4 flex flex-col">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-4 text-gray-500 text-xs">data_extraction.json</div>
                  </div>
                  <div className="flex-grow font-mono text-xs sm:text-sm overflow-hidden bg-gray-900 text-green-400 p-3 rounded">
                    <div className="animate-typing overflow-hidden whitespace-nowrap">
                      <p className="mb-1">{`{`}</p>
                      <p className="mb-1 ml-4">{`"data": [`}</p>
                      <p className="mb-1 ml-8">{`{`}</p>
                      <p className="mb-1 ml-12">{`"id": "001",`}</p>
                      <p className="mb-1 ml-12">{`"title": "Product Name",`}</p>
                      <p className="mb-1 ml-12">{`"price": "$99.99",`}</p>
                      <p className="mb-1 ml-12">{`"rating": 4.8,`}</p>
                      <p className="mb-1 ml-12">{`"reviews": 423,`}</p>
                      <p className="mb-1 ml-12">{`"available": true`}</p>
                      <p className="mb-1 ml-8">{`},`}</p>
                      <p className="mb-1 ml-8">{`{`}</p>
                      <p className="mb-1 ml-12">{`"id": "002",`}</p>
                      <p className="mb-1 ml-12">{`"title": "Another Product",`}</p>
                      <p className="mb-1 ml-12">{`// 500+ more items`}</p>
                      <p className="mb-1 ml-8">{`}`}</p>
                      <p className="mb-1 ml-4">{`]`}</p>
                      <p className="mb-1">{`}`}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Types Section */}
      <DataCards />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Features Section */}
      <Features />

      {/* FAQ Section */}
      <FAQ />

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
