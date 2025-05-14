"use client";

import { motion } from "framer-motion";

export default function ServicesSection() {
  const services = [
    {
      title: "Business & Professional E-Books",
      description: "Transform your expertise into comprehensive guides, business manuals, and industry reports.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        "Market research & industry analysis",
        "Professional business tone",
        "Actionable insights and strategies",
        "Expert terminology and references"
      ]
    },
    {
      title: "Educational & How-To Guides",
      description: "Create clear, informative guides that teach valuable skills and share knowledge effectively.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      features: [
        "Step-by-step instruction formats",
        "Clear explanations of complex concepts",
        "Helpful illustrations planning",
        "Progressive learning structure"
      ]
    },
    {
      title: "Fiction & Creative Writing",
      description: "Bring your story ideas to life with engaging narratives, compelling characters, and rich worlds.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      features: [
        "Engaging plot & character development",
        "Genre-appropriate writing style",
        "Dialogue and scene construction",
        "Story arc and pacing refinement"
      ]
    },
    {
      title: "Personal Memoirs & Biographies",
      description: "Document life stories and experiences with sensitivity, authenticity, and compelling narrative.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      features: [
        "Chronological life story structuring",
        "Voice and perspective development",
        "Key life event highlighting",
        "Meaningful reflection and insights"
      ]
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="services">
      {/* Background decorative elements */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-scribe-indigo-50 to-transparent"></div>
      <div className="absolute -left-64 -bottom-64 w-[600px] h-[600px] rounded-full border-[60px] border-scribe-indigo-50 opacity-50"></div>
      <div className="absolute right-0 top-1/4 w-[300px] h-[300px] bg-scribe-amber-50 rounded-full blur-3xl opacity-50"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="mb-20 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-1.5 bg-gradient-to-r from-transparent via-scribe-indigo-500 to-transparent"></div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-scribe-indigo-950">
              What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-scribe-indigo-600 to-scribe-turquoise-500">Write</span>
            </h2>
            <p className="text-scribe-indigo-700 text-lg md:text-xl max-w-2xl mx-auto">
              We specialize in creating high-quality e-books across many niches, tailored to your specific vision and goals.
            </p>
          </motion.div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Card background with hover effect */}
              <div className="absolute inset-0 bg-white rounded-3xl shadow-sm border border-scribe-indigo-100 -z-10 transition-all duration-300 
                              group-hover:shadow-xl group-hover:border-scribe-indigo-200 group-hover:-translate-y-1"></div>
              
              {/* Card content with hover effects */}
              <div className="p-8">
                {/* Service icon */}
                <div className="mb-6 relative">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-scribe-indigo-600 to-scribe-turquoise-500 transition-transform duration-300 group-hover:scale-110"></div>
                    <div className="relative z-10">
                      {service.icon}
                    </div>
                  </div>
                </div>
                
                {/* Service title and description */}
                <h3 className="text-xl font-bold mb-3 text-scribe-indigo-900 group-hover:text-scribe-indigo-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-scribe-indigo-700 mb-6 group-hover:text-scribe-indigo-800 transition-colors duration-300">
                  {service.description}
                </p>
                
                {/* Features list */}
                <ul className="space-y-3">
                  {service.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1 w-5 h-5 rounded-full flex items-center justify-center bg-scribe-indigo-100 group-hover:bg-scribe-turquoise-100 transition-colors duration-300">
                        <svg className="h-3 w-3 text-scribe-indigo-600 group-hover:text-scribe-turquoise-600 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-scribe-indigo-700 group-hover:text-scribe-indigo-800 transition-colors duration-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a 
            href="#pricing" 
            className="group inline-flex items-center text-scribe-indigo-600 hover:text-scribe-indigo-800 font-medium transition-colors duration-300"
          >
            <span>View our pricing packages</span>
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 