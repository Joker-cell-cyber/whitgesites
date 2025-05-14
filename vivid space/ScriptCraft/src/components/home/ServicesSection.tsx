"use client";

import { motion } from "framer-motion";

export default function ServicesSection() {
  const services = [
    {
      id: "cold-calling",
      title: "Cold Call Scripts",
      description: "Convert cold prospects into warm leads with persuasive scripts that open doors and set appointments.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      features: [
        "Attention-grabbing openings",
        "Objection handling techniques",
        "Qualifying questions",
        "Appointment setting closes"
      ],
      color: "bg-blue-600",
      lightColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-600",
    },
    {
      id: "closing",
      title: "Sales Closing Scripts",
      description: "Seal the deal with proven closing techniques that overcome objections and lead prospects to a confident 'yes'.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      features: [
        "Value proposition frameworks",
        "Advanced objection handling",
        "Urgency creation tactics",
        "Psychology-based closing techniques"
      ],
      color: "bg-vf-amber-600",
      lightColor: "bg-vf-amber-50",
      borderColor: "border-vf-amber-200",
      textColor: "text-vf-amber-600",
    },
    {
      id: "follow-up",
      title: "Follow-Up Scripts",
      description: "Stay top-of-mind with strategic follow-up sequences that nurture leads and maintain momentum through the sales cycle.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: [
        "Multi-touch sequence design",
        "Value-adding check-ins",
        "Re-engagement strategies",
        "Relationship building templates"
      ],
      color: "bg-emerald-600",
      lightColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      textColor: "text-emerald-600",
    },
    {
      id: "custom",
      title: "Custom Solutions",
      description: "Tailored script solutions designed to address your unique sales challenges and business requirements.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      features: [
        "Industry-specific terminology",
        "Custom objection responses",
        "Personalized messaging",
        "Brand voice alignment"
      ],
      color: "bg-purple-600",
      lightColor: "bg-purple-50",
      borderColor: "border-purple-200",
      textColor: "text-purple-600",
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="services">
      {/* Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-vf-amber-50 to-vf-amber-100/30"></div>
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-vf-amber-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-r from-vf-amber-100/30 to-vf-amber-50"></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center rounded-full px-4 py-1.5 text-sm bg-gradient-to-r from-vf-amber-50 to-vf-amber-100 text-vf-amber-700 shadow-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-vf-amber-500 mr-2"></span>
              <span className="font-medium">Our Service Offerings</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-vf-slate-900">
              Expertly Crafted Sales Scripts For Every Situation
            </h2>
            
            <p className="text-lg text-vf-slate-600 max-w-3xl mx-auto">
              We create persuasive scripts that turn conversations into conversions, helping your sales team close more deals with confidence and consistency.
            </p>
          </motion.div>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden"
              id={service.id}
            >
              {/* Card header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start">
                  <div className={`w-12 h-12 rounded-lg ${service.lightColor} flex items-center justify-center mr-4 ${service.textColor}`}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-vf-slate-900 mb-2">{service.title}</h3>
                    <p className="text-vf-slate-600">{service.description}</p>
                  </div>
                </div>
              </div>
              
              {/* Features list */}
              <div className="p-6">
                <h4 className="text-sm font-semibold text-vf-slate-700 uppercase tracking-wider mb-4">Key Features</h4>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className={`mr-2 ${service.textColor}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-vf-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6">
                  <a 
                    href="/pricing" 
                    className={`inline-flex items-center text-sm font-medium ${service.textColor}`}
                  >
                    <span>View Pricing</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Why Choose Us */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 pt-12 border-t border-gray-100 max-w-5xl mx-auto"
        >
          <div className="bg-white rounded-xl border border-vf-slate-200 shadow-sm p-8">
            <h3 className="text-2xl font-bold text-vf-slate-900 mb-6">Why Choose ScriptCraft?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-start mb-3">
                  <div className="w-8 h-8 bg-vf-amber-100 rounded-lg flex items-center justify-center mr-3 text-vf-amber-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                  <div className="text-vf-slate-800 font-semibold">Expert Copywriters</div>
                </div>
                <p className="text-vf-slate-600 text-sm">Our team consists of professional sales copywriters with years of experience across various industries.</p>
              </div>
              
              <div>
                <div className="flex items-start mb-3">
                  <div className="w-8 h-8 bg-vf-amber-100 rounded-lg flex items-center justify-center mr-3 text-vf-amber-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="text-vf-slate-800 font-semibold">Fast Turnaround</div>
                </div>
                <p className="text-vf-slate-600 text-sm">Get your custom scripts within 24 hours, so you can start implementing them immediately.</p>
              </div>
              
              <div>
                <div className="flex items-start mb-3">
                  <div className="w-8 h-8 bg-vf-amber-100 rounded-lg flex items-center justify-center mr-3 text-vf-amber-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                  </div>
                  <div className="text-vf-slate-800 font-semibold">Proven Results</div>
                </div>
                <p className="text-vf-slate-600 text-sm">Our scripts have helped clients increase conversion rates by up to 300% and close more deals.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 