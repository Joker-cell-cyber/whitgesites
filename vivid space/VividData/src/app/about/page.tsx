import { COMPANY } from '../constants/company';

export const metadata = {
  title: `About Us - ${COMPANY.serviceName}`,
  description: "Learn about our mission, values, and vision for revolutionizing data extraction",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute w-full h-full opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dot-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dot-pattern)" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="inline-flex p-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">
              <div className="bg-gray-900 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              About {COMPANY.serviceName}
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
              Revolutionizing how businesses access and utilize data
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Mission */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-gray-800 backdrop-filter backdrop-blur-sm bg-opacity-80 p-8 rounded-2xl border border-gray-700 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Our Mission</h2>
                </div>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  At {COMPANY.serviceName}, our mission is to democratize access to valuable web data, 
                  making it accessible, usable, and actionable for businesses of all sizes. We believe that 
                  data should be a resource available to everyone, not just to those with technical expertise 
                  or large budgets.
                </p>
                <p className="text-lg text-gray-300 leading-relaxed">
                  We're committed to providing powerful data extraction solutions that are easy to use, 
                  reliable, and deliver exceptional value. By removing the technical barriers to data access, 
                  we empower businesses to make better decisions and drive innovation.
                </p>
              </div>
            </div>
            
            {/* Values */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-gray-800 backdrop-filter backdrop-blur-sm bg-opacity-80 p-8 rounded-2xl border border-gray-700 shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold text-white">Our Values</h2>
                </div>
                <div className="space-y-6">
                  {[
                    {
                      title: "Innovation",
                      description: "We continuously improve our technology to deliver the most effective data extraction solutions."
                    },
                    {
                      title: "Integrity",
                      description: "We operate with transparency and respect for digital ethics and data privacy regulations."
                    },
                    {
                      title: "Accessibility",
                      description: "We make powerful data tools available to businesses of all sizes, not just large enterprises."
                    },
                    {
                      title: "Quality",
                      description: "We prioritize accuracy, reliability, and usefulness in all the data we deliver."
                    }
                  ].map((value, index) => (
                    <div key={index} className="flex">
                      <div className="flex-shrink-0 h-10 w-10 rounded-md bg-indigo-800/50 flex items-center justify-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">{value.title}</h3>
                        <p className="text-gray-300">{value.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-indigo-900/30"></div>
        
        {/* Geometric patterns background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <svg className="absolute h-full w-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            
            {/* Abstract shapes */}
            <circle cx="400" cy="400" r="200" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.3" />
            <circle cx="400" cy="400" r="150" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
            <circle cx="400" cy="400" r="100" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.7" />
            <circle cx="400" cy="400" r="50" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.9" />
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-500/10 to-indigo-600/10 backdrop-blur-sm p-px rounded-3xl">
              <div className="bg-gray-900/60 backdrop-blur-sm rounded-3xl">
                <div className="p-8 md:p-12 text-center">
                  <div className="inline-flex p-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 mb-6">
                    <div className="bg-gray-900 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Our Vision</h2>
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    We envision a future where any business, regardless of size or technical resources, 
                    can harness the power of web data to drive growth, innovation, and competitive advantage.
                  </p>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    By continuing to develop cutting-edge extraction technologies and user-friendly 
                    interfaces, we aim to become the global leader in accessible data solutions, 
                    helping organizations transform raw information into actionable insights.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Approach Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Approach</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-8"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                We combine innovative technology with ethical practices to deliver exceptional data solutions
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "Ethical Data Collection",
                  description: "We adhere to the highest standards of web scraping ethics, respecting website terms of service and robots.txt directives. Our solutions are designed to minimize server impact and operate within legal and ethical boundaries."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Cutting-Edge Technology",
                  description: "We employ advanced algorithms, machine learning, and distributed computing to overcome the challenges of modern web scraping, ensuring reliable data extraction even from complex, dynamic websites."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  ),
                  title: "Data Quality Focus",
                  description: "We go beyond simple data extraction by implementing robust validation, cleaning, and transformation processes. This ensures you receive accurate, structured, and immediately usable data every time."
                }
              ].map((approach, index) => (
                <div key={index} className="group relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 blur transition duration-300"></div>
                  <div className="relative h-full backdrop-blur-sm bg-gray-800 bg-opacity-80 p-8 rounded-2xl border border-gray-700 shadow-xl group-hover:border-gray-500 transition duration-300">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center transform group-hover:rotate-6 transition duration-300">
                          <div className="text-white">
                            {approach.icon}
                          </div>
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-indigo-400 transition duration-300">
                        {approach.title}
                      </h3>
                      <p className="text-gray-300">
                        {approach.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-blue-900 opacity-20"></div>
        
        {/* Wave background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1200 300" preserveAspectRatio="none">
            <path 
              d="M 0 300 Q 300 150 600 300 Q 900 450 1200 300 L 1200 0 L 0 0 Z" 
              fill="url(#wave-gradient)" 
              opacity="0.15"
            >
              <animate 
                attributeName="d" 
                values="
                  M 0 300 Q 300 150 600 300 Q 900 450 1200 300 L 1200 0 L 0 0 Z;
                  M 0 300 Q 300 150 600 300 Q 900 150 1200 300 L 1200 0 L 0 0 Z;
                  M 0 300 Q 300 450 600 300 Q 900 150 1200 300 L 1200 0 L 0 0 Z;
                  M 0 300 Q 300 150 600 300 Q 900 450 1200 300 L 1200 0 L 0 0 Z
                " 
                repeatCount="indefinite" 
                dur="20s" 
              />
            </path>
            <defs>
              <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="50%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#4F46E5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Ready to Get Your Data?
            </h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              Choose a package or request a custom solution tailored to your specific data extraction needs.
            </p>
            <a
              href="/packages"
              className="inline-flex items-center px-8 py-4 text-lg rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-xl shadow-blue-500/20 hover:shadow-indigo-600/30 transition-all duration-300 transform hover:scale-105"
            >
              View Packages
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 