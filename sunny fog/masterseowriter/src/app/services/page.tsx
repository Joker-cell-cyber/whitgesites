export default function Services() {
  return (
    <>
      <Hero />
      <ServiceFeatures />
      <ServicesSectionWithCards />
      <ServiceProcess />
      <ServiceCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative bg-gradient-to-tr from-turquoise-700 to-turquoise-500 text-white pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-center opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-sm font-semibold bg-white/20 rounded-full px-3 py-1 mb-6">Our Services</span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            SEO Content Solutions that <span className="text-turquoise-100">Drive Results</span>
          </h1>
          
          <p className="text-lg md:text-xl text-turquoise-50 mb-10 max-w-2xl mx-auto">
            Discover our range of specialized content writing services designed to improve your search rankings and engage your audience.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#services" className="btn bg-white text-turquoise-700 hover:bg-gray-100 transition-colors py-3 px-6 rounded-lg font-medium">
              Explore Services
            </a>
            <a href="/pricing" className="btn border border-white/40 hover:bg-white/10 transition-colors py-3 px-6 rounded-lg font-medium">
              See Pricing
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white/10 to-transparent"></div>
    </section>
  );
}

function ServiceFeatures() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 hover:bg-gray-50 rounded-xl transition-all duration-300">
            <div className="w-16 h-16 bg-turquoise-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-turquoise-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">SEO Optimized</h3>
            <p className="text-gray-600">
              All our content is crafted with search engines in mind to help you rank higher for your target keywords.
            </p>
          </div>
          
          <div className="text-center p-6 hover:bg-gray-50 rounded-xl transition-all duration-300">
            <div className="w-16 h-16 bg-turquoise-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-turquoise-600" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Audience Focused</h3>
            <p className="text-gray-600">
              We create content that speaks directly to your target audience, driving engagement and conversions.
            </p>
          </div>
          
          <div className="text-center p-6 hover:bg-gray-50 rounded-xl transition-all duration-300">
            <div className="w-16 h-16 bg-turquoise-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-turquoise-600" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Timely Delivery</h3>
            <p className="text-gray-600">
              Meet your content calendar requirements with our reliable and prompt delivery schedules.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSectionWithCards() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Specialized Services</h2>
          <p className="text-lg text-gray-600">
            We offer a wide range of content writing services tailored to meet your specific needs and goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard 
            title="Blog Articles & Posts" 
            description="Engaging, SEO-optimized blog content that attracts visitors and builds authority in your niche."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            }
          />
          
          <ServiceCard 
            title="Website Copy" 
            description="Compelling website content that communicates your value proposition and converts visitors into customers."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            }
          />
          
          <ServiceCard 
            title="Product Descriptions" 
            description="Persuasive product descriptions that highlight benefits and features to drive sales and conversions."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            }
          />
          
          <ServiceCard 
            title="SEO Content Optimization" 
            description="Enhance existing content to improve search engine rankings and organic traffic to your website."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            }
          />
          
          <ServiceCard 
            title="Email Campaigns" 
            description="Strategic email content that nurtures leads, builds relationships, and drives conversions."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          />
          
          <ServiceCard 
            title="Long-form Content" 
            description="In-depth guides, whitepapers, and ebooks that establish your brand as an industry authority."
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            }
          />
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-turquoise-50 rounded-bl-full -mr-8 -mt-8 transition-all duration-500 group-hover:bg-turquoise-100"></div>
      
      <div className="w-12 h-12 bg-turquoise-100 rounded-full flex items-center justify-center text-turquoise-600 mb-6 relative">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      
      <a href="/pricing" className="inline-flex items-center text-turquoise-600 hover:text-turquoise-700 font-medium transition-colors">
        Get Started
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </a>
    </div>
  );
}

function ServiceProcess() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Content Creation Process</h2>
          <p className="text-lg text-gray-600">
            We follow a proven, systematic approach to deliver high-quality content that meets your objectives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="relative">
            <div className="bg-turquoise-50 p-6 rounded-xl text-center hover:bg-turquoise-100 transition-colors">
              <div className="w-12 h-12 bg-turquoise-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Discovery</h3>
              <p className="text-gray-600">
                We learn about your business, audience, goals, and key competitors to understand your unique requirements.
              </p>
            </div>
            <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
              <svg className="w-8 h-8 text-turquoise-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-turquoise-50 p-6 rounded-xl text-center hover:bg-turquoise-100 transition-colors">
              <div className="w-12 h-12 bg-turquoise-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Strategy</h3>
              <p className="text-gray-600">
                We develop a comprehensive content strategy including keyword research and topic selection.
              </p>
            </div>
            <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
              <svg className="w-8 h-8 text-turquoise-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-turquoise-50 p-6 rounded-xl text-center hover:bg-turquoise-100 transition-colors">
              <div className="w-12 h-12 bg-turquoise-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Creation</h3>
              <p className="text-gray-600">
                Our expert writers craft engaging, SEO-optimized content tailored to your brand voice and audience needs.
              </p>
            </div>
            <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
              <svg className="w-8 h-8 text-turquoise-300" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div>
            <div className="bg-turquoise-50 p-6 rounded-xl text-center hover:bg-turquoise-100 transition-colors">
              <div className="w-12 h-12 bg-turquoise-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Refinement</h3>
              <p className="text-gray-600">
                We review, edit, and optimize the content based on your feedback to ensure it meets your expectations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceCTA() {
  return (
    <section className="bg-turquoise-600 py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to elevate your content strategy?</h2>
          <p className="text-xl text-turquoise-50 mb-8">
            Get in touch with our team today to discuss how we can help you achieve your content marketing goals.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/contact" 
              className="bg-white text-turquoise-600 hover:bg-gray-100 transition-colors py-3 px-8 rounded-lg font-medium"
            >
              Contact Us
            </a>
            <a 
              href="/pricing" 
              className="border border-white/40 hover:bg-white/10 transition-colors py-3 px-8 rounded-lg font-medium"
            >
              View Pricing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 