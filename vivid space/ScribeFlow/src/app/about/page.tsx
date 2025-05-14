"use client";

import Image from "next/image";
import "../../app/styles/bookEffects.css";

export default function AboutPage() {
  return (
    <main className="bg-white text-scribe-indigo-950 min-h-screen">
      {/* Hero Section with Decorative Elements */}
      <div className="relative overflow-hidden bg-gradient-to-b from-scribe-indigo-50 to-white pt-24 pb-16">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-64 bg-scribe-indigo-600 opacity-5 transform -skew-y-6"></div>
        <div className="absolute top-20 right-0 w-72 h-72 rounded-full bg-scribe-turquoise-500 opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-10 w-64 h-64 rounded-full bg-scribe-amber-500 opacity-10 blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6 px-4 py-1.5 rounded-full text-sm font-medium bg-scribe-indigo-100 text-scribe-indigo-800">
              <span>Our Company</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-8 text-scribe-indigo-900">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500">ReadyBook</span>
            </h1>
            
            <p className="text-xl text-scribe-indigo-700 max-w-3xl mx-auto mb-8">
              We transform ideas into professionally written e-books that educate, inspire, and engage readers around the world.
            </p>
          </div>
          
          {/* Book illustrations */}
          <div className="flex justify-center items-center px-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 md:gap-6 max-w-4xl relative">
              {/* First book */}
              <div className="transform sm:-rotate-6 perspective mx-auto">
                <div className="relative book-effect book-sm shadow-lg">
                  <div className="absolute h-full w-[15px] sm:w-[20px] left-0 bg-gradient-to-r from-scribe-indigo-800 to-scribe-indigo-600 transform origin-left rotate-y-90"></div>
                  <div className="book-cover">
                    <Image 
                      src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Business book"
                      width={300}
                      height={400}
                      className="h-full object-cover rounded-r-md shadow-md"
                    />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-sm font-medium text-scribe-indigo-700">Business Guides</span>
                </div>
              </div>

              {/* Second book (center, raised) */}
              <div className="transform sm:translate-y-[-20px] z-10 mx-auto mt-8 sm:mt-0">
                <div className="relative book-effect book-sm shadow-xl">
                  <div className="absolute h-full w-[15px] sm:w-[25px] left-0 bg-gradient-to-r from-scribe-turquoise-700 to-scribe-turquoise-500 transform origin-left rotate-y-90"></div>
                  <div className="book-cover">
                    <Image 
                      src="https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Educational book"
                      width={320} 
                      height={420}
                      className="h-full object-cover rounded-r-md shadow-md"
                    />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-sm font-medium text-scribe-indigo-700">Educational Books</span>
                </div>
              </div>

              {/* Third book */}
              <div className="transform sm:rotate-6 perspective mx-auto mt-8 sm:mt-0">
                <div className="relative book-effect book-sm shadow-lg">
                  <div className="absolute h-full w-[15px] sm:w-[20px] left-0 bg-gradient-to-r from-scribe-amber-700 to-scribe-amber-500 transform origin-left rotate-y-90"></div>
                  <div className="book-cover">
                    <Image 
                      src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Fiction book"
                      width={300}
                      height={400}
                      className="h-full object-cover rounded-r-md shadow-md"
                    />
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="text-sm font-medium text-scribe-indigo-700">Fiction Stories</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-12 mb-20">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6 text-scribe-indigo-900">Our Story</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500 mb-6"></div>
                <p className="mb-6 text-scribe-indigo-800 leading-relaxed">
                  Founded in 2025, ReadyBook was born from a simple yet powerful idea: everyone has a story to tell, knowledge to share, or expertise to pass on. We recognized that while many individuals and businesses have valuable content to share, they often lack the time, skills, or resources to transform their ideas into polished e-books.
                </p>
                <p className="text-scribe-indigo-800 leading-relaxed">
                  We assembled a team of experienced writers, editors, and publishing experts passionate about helping others bring their written works to life. Since our inception, we've been dedicated to making professional e-book writing services accessible to entrepreneurs, educators, thought leaders, and creative minds.
                </p>
              </div>
              <div className="md:w-1/2 relative">
                <div className="absolute -z-10 top-0 right-0 w-64 h-64 rounded-full bg-scribe-indigo-100/50"></div>
                <div className="aspect-square rounded-2xl overflow-hidden shadow-xl border-8 border-white relative transform rotate-3">
                  <Image 
                    src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="Team working together on books" 
                    width={500} 
                    height={500}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission & Vision Section */}
      <section className="py-16 bg-scribe-indigo-950 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="bg-scribe-indigo-900/50 rounded-3xl p-8 border border-scribe-indigo-800 shadow-lg transform transition-transform hover:scale-[1.02]">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-scribe-indigo-700 to-scribe-turquoise-700 p-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">Our Mission</h2>
                <p className="text-scribe-indigo-100">
                  To empower individuals and organizations to share their knowledge, stories, and expertise through professionally crafted e-books that engage, educate, and inspire readers around the world.
                </p>
              </div>
              
              <div className="bg-scribe-indigo-900/50 rounded-3xl p-8 border border-scribe-indigo-800 shadow-lg transform transition-transform hover:scale-[1.02]">
                <div className="w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-scribe-indigo-700 to-scribe-turquoise-700 p-4 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-4 text-white">Our Vision</h2>
                <p className="text-scribe-indigo-100">
                  To become the leading e-book writing service that transforms ideas into impactful digital publications, making knowledge sharing accessible to everyone regardless of their writing experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-scribe-indigo-900">Our Values</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500 mx-auto mb-6"></div>
              <p className="text-scribe-indigo-700 max-w-2xl mx-auto">
                The principles that guide our work and relationships every day
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-lg border border-scribe-indigo-100 hover:border-scribe-indigo-300 transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-scribe-indigo-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-scribe-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-scribe-indigo-900">Excellence</h3>
                </div>
                <p className="text-scribe-indigo-700 pl-16">
                  We are committed to delivering e-books of exceptional quality that exceed our clients' expectations.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-scribe-indigo-100 hover:border-scribe-indigo-300 transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-scribe-amber-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-scribe-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-scribe-indigo-900">Integrity</h3>
                </div>
                <p className="text-scribe-indigo-700 pl-16">
                  We maintain the highest ethical standards in all our business practices and client relationships.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-scribe-indigo-100 hover:border-scribe-indigo-300 transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-scribe-turquoise-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-scribe-turquoise-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-scribe-indigo-900">Innovation</h3>
                </div>
                <p className="text-scribe-indigo-700 pl-16">
                  We continuously explore new ways to improve our services and adapt to the evolving digital publishing landscape.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg border border-scribe-indigo-100 hover:border-scribe-indigo-300 transition-all">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-scribe-indigo-100 flex items-center justify-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-scribe-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-scribe-indigo-900">Collaboration</h3>
                </div>
                <p className="text-scribe-indigo-700 pl-16">
                  We believe in working closely with our clients to ensure their vision and voice shine through in every project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Approach Section */}
      <section className="py-16 bg-gradient-to-r from-scribe-indigo-50 to-scribe-turquoise-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-scribe-indigo-900">Our Approach</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500 mx-auto mb-6"></div>
              <p className="text-scribe-indigo-700 max-w-2xl mx-auto">
                At ReadyBook, we follow a comprehensive, client-centered approach to e-book writing
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-scribe-indigo-50 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-scribe-turquoise-50 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
              
              <div className="relative z-10">
                <ol className="space-y-8">
                  {[
                    { title: "Discovery", description: "We start by understanding your goals, target audience, and key messages." },
                    { title: "Content Strategy", description: "We develop a detailed outline and content plan tailored to your objectives." },
                    { title: "Professional Writing", description: "Our experienced writers craft engaging, well-researched content." },
                    { title: "Review & Refinement", description: "We collaborate with you through revisions until the manuscript meets your vision." },
                    { title: "Polishing", description: "Professional editing and formatting transforms your manuscript into a publication-ready e-book." }
                  ].map((step, index) => (
                    <li key={index} className="flex">
                      <div className="flex-shrink-0 mr-6">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500 text-white font-bold">
                          {index + 1}
                        </div>
                        {index < 4 && <div className="w-px h-full bg-scribe-indigo-200 mx-auto mt-3"></div>}
                      </div>
                      <div className="pt-1">
                        <h3 className="text-xl font-bold text-scribe-indigo-900 mb-2">{step.title}</h3>
                        <p className="text-scribe-indigo-700">{step.description}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-600 rounded-3xl p-12 text-white text-center shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Ideas into Books?</h2>
            <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
              Let our team of professional writers help you create an e-book that resonates with your audience.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-white text-scribe-indigo-600 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section>
    </main>
  );
} 