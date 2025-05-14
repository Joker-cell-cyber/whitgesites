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
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 text-white">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-purple-500/20 blur-xl"></div>
          <div className="absolute top-1/3 -right-20 w-60 h-60 rounded-full bg-indigo-500/20 blur-xl"></div>
          <div className="absolute -bottom-20 left-1/4 w-80 h-80 rounded-full bg-pink-500/10 blur-xl"></div>
          <div className="grid grid-cols-8 grid-rows-8 absolute inset-0 opacity-10">
            {Array(64).fill(0).map((_, i) => (
              <div key={i} className="border border-white/5"></div>
            ))}
          </div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
            {/* Text content - spans 3 columns */}
            <div className="lg:col-span-3 space-y-8">
              <div className="inline-block py-1 px-3 rounded-full bg-indigo-500/20 text-indigo-300 text-sm font-medium mb-2">
                Data Extraction & Analytics
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">Unleash the Power of</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-300">Web Data Insights</span>
              </h1>
              <p className="text-indigo-200 text-lg md:text-xl max-w-2xl">
                Turn complex web data into actionable business intelligence with our advanced scraping 
                and analytics services. No technical expertise required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/packages" className="btn px-8 py-3.5 text-lg font-medium rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 transition-all shadow-lg shadow-purple-500/25">
                  Explore Solutions
                </Link>
              </div>
              <div className="pt-6 flex items-center space-x-4 text-sm text-indigo-200">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-indigo-900 flex items-center justify-center text-xs">
                      {i}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Visual element - spans 2 columns */}
            <div className="lg:col-span-2 relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-gradient-to-b from-gray-900 to-indigo-950 rounded-2xl p-4 border border-indigo-800/50 shadow-2xl">
                <div className="h-80 sm:h-96 overflow-hidden rounded-lg flex flex-col">
                  <div className="flex items-center p-3 bg-gray-950 rounded-t-lg border-b border-gray-800">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="mx-auto text-gray-400 text-sm font-mono">data-insights.json</div>
                  </div>
                  <div className="flex-grow font-mono text-xs sm:text-sm bg-gray-950 p-4 rounded-b-lg text-indigo-300 overflow-hidden">
                    <div className="animate-pulse bg-indigo-500/10 w-full h-4 rounded mb-3"></div>
                    <div className="animate-pulse bg-indigo-500/10 w-3/4 h-4 rounded mb-3"></div>
                    <div className="animate-pulse bg-indigo-500/5 w-5/6 h-4 rounded mb-3"></div>
                    <div className="animate-pulse bg-pink-500/10 w-2/3 h-4 rounded mb-3"></div>
                    <div className="animate-pulse bg-indigo-500/5 w-4/5 h-4 rounded mb-3"></div>
                    <div className="animate-typing overflow-hidden whitespace-nowrap mt-6">
                      <p className="mb-1 text-pink-300">{`// Extracting competitive pricing data...`}</p>
                      <p className="mb-1">{`{`}</p>
                      <p className="mb-1 ml-4">{`"market_insights": {`}</p>
                      <p className="mb-1 ml-8">{`"competitors": [42],`}</p>
                      <p className="mb-1 ml-8">{`"price_range": "$89-$249",`}</p>
                      <p className="mb-1 ml-8">{`"avg_rating": 4.2,`}</p>
                      <p className="mb-1 ml-8">{`"trending": ["AI analytics", "Real-time"]`}</p>
                      <p className="mb-1 ml-4">{`},`}</p>
                      <p className="mb-1 ml-4">{`"opportunity_score": 87,`}</p>
                      <p className="mb-1 ml-4">{`"recommendation": "Price 15% below average"`}</p>
                      <p className="mb-1">{`}`}</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-white font-bold text-xl">100%</div>
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
