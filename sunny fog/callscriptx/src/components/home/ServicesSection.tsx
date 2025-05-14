"use client";

import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

// Custom SVG illustrations for each service
const ColdCallIllustration = () => (
  <svg width="100%" height="160" viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="150" cy="80" r="70" fill="#E0EAFF" />
    
    {/* Phone */}
    <rect x="110" y="45" width="80" height="160" rx="10" fill="#2E3560" />
    <rect x="115" y="55" width="70" height="125" rx="5" fill="#FFFFFF" />
    <circle cx="150" cy="190" r="10" fill="#3A6FFF" />
    
    {/* Call Wave Animations */}
    <path d="M60 80C80 60 120 50 150 50" stroke="#3A6FFF" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M40 100C70 70 120 60 170 60" stroke="#3A6FFF" strokeWidth="2" strokeDasharray="4 4" />
    <path d="M30 120C60 90 120 75 190 75" stroke="#3A6FFF" strokeWidth="2" strokeDasharray="4 4" />
    
    {/* Script */}
    <rect x="130" y="70" width="120" height="80" rx="5" fill="#F0F5FF" stroke="#3A6FFF" strokeWidth="2" />
    <line x1="140" y1="85" x2="240" y2="85" stroke="#B8C7E0" strokeWidth="2" />
    <line x1="140" y1="100" x2="220" y2="100" stroke="#B8C7E0" strokeWidth="2" />
    <line x1="140" y1="115" x2="230" y2="115" stroke="#B8C7E0" strokeWidth="2" />
    <line x1="140" y1="130" x2="200" y2="130" stroke="#B8C7E0" strokeWidth="2" />
  </svg>
);

const ClosingIllustration = () => (
  <svg width="100%" height="160" viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="150" cy="80" r="70" fill="#E0EAFF" />
    
    {/* Handshake */}
    <path d="M90 100C90 100 100 120 120 120C140 120 140 100 160 100C180 100 180 120 200 120C220 120 230 100 230 100" stroke="#3A6FFF" strokeWidth="6" strokeLinecap="round" />
    
    {/* Contract/Deal */}
    <rect x="100" y="40" width="100" height="140" rx="5" fill="#FFFFFF" stroke="#2E3560" strokeWidth="2" />
    <line x1="110" y1="60" x2="190" y2="60" stroke="#B8C7E0" strokeWidth="2" />
    <line x1="110" y1="75" x2="170" y2="75" stroke="#B8C7E0" strokeWidth="2" />
    <line x1="110" y1="90" x2="190" y2="90" stroke="#B8C7E0" strokeWidth="2" />
    
    {/* Signature line */}
    <line x1="130" y1="150" x2="180" y2="150" stroke="#3A6FFF" strokeWidth="2" />
    <path d="M140 148C145 145 150 155 155 148C160 141 165 150 170 148" stroke="#4F66A3" strokeWidth="2" />
    
    {/* Checkmark */}
    <circle cx="200" cy="50" r="20" fill="#3A6FFF" fillOpacity="0.2" />
    <path d="M190 50L198 58L215 40" stroke="#3A6FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FollowUpIllustration = () => (
  <svg width="100%" height="160" viewBox="0 0 300 160" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="150" cy="80" r="70" fill="#E0EAFF" />
    
    {/* Calendar or sequence */}
    <rect x="100" y="40" width="120" height="120" rx="5" fill="#FFFFFF" stroke="#2E3560" strokeWidth="2" />
    <rect x="110" y="50" width="100" height="20" fill="#3A6FFF" fillOpacity="0.1" />
    <line x1="110" y1="80" x2="210" y2="80" stroke="#B8C7E0" strokeWidth="2" />
    
    {/* Sequence points */}
    <circle cx="120" cy="95" r="5" fill="#3A6FFF" />
    <line x1="130" y1="95" x2="180" y2="95" stroke="#B8C7E0" strokeWidth="2" />
    
    <circle cx="120" cy="115" r="5" fill="#4F66A3" />
    <line x1="130" y1="115" x2="190" y2="115" stroke="#B8C7E0" strokeWidth="2" />
    
    <circle cx="120" cy="135" r="5" fill="#2E3560" />
    <line x1="130" y1="135" x2="170" y2="135" stroke="#B8C7E0" strokeWidth="2" />
    
    {/* Connect arrows */}
    <path d="M230 65C250 65 260 95 230 95" stroke="#3A6FFF" strokeWidth="2" strokeDasharray="3 3" />
    <path d="M230 95C250 95 260 115 230 115" stroke="#3A6FFF" strokeWidth="2" strokeDasharray="3 3" />
    <path d="M230 115C250 115 260 135 230 135" stroke="#3A6FFF" strokeWidth="2" strokeDasharray="3 3" />
    
    {/* Arrow heads */}
    <path d="M230 95L225 90L225 100L230 95Z" fill="#3A6FFF" />
    <path d="M230 115L225 110L225 120L230 115Z" fill="#3A6FFF" />
    <path d="M230 135L225 130L225 140L230 135Z" fill="#3A6FFF" />
  </svg>
);

export default function ServicesSection() {
  const services = [
    {
      title: "Cold Call Scripts",
      description: "Convert cold prospects into warm leads with persuasive scripts that open doors and set appointments.",
      illustration: <ColdCallIllustration />,
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
      ]
    },
    {
      title: "Sales Closing Scripts",
      description: "Seal the deal with proven closing techniques that overcome objections and lead prospects to a confident &apos;yes&apos;.",
      illustration: <ClosingIllustration />,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: [
        "Value proposition frameworks",
        "Advanced objection handling",
        "Urgency creation tactics",
        "Psychology-based closing techniques"
      ]
    },
    {
      title: "Follow-Up Scripts",
      description: "Stay top-of-mind with strategic follow-up sequences that nurture leads and maintain momentum through the sales cycle.",
      illustration: <FollowUpIllustration />,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      features: [
        "Multi-touch sequence design",
        "Value-adding check-ins",
        "Re-engagement strategies",
        "Relationship building templates"
      ]
    }
  ];

  return (
    <section className="relative py-20" id="services">
      {/* Full-width background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-cs-blue-50 z-0"></div>
      
      {/* Top wave decoration - using full-width-section */}
      <div className="full-width-section absolute top-0 left-0 right-0 w-screen z-0">
        <svg width="100vw" height="120" viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="opacity-20 w-full">
          <path d="M0 40C240 80 480 120 720 100C960 80 1200 20 1440 40V120H0V40Z" fill="#3A6FFF" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-white text-cs-navy-700 border border-cs-blue-200 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-cs-blue-500 mr-2"></span>
              Our Expertise
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cs-navy-900">
              Our <span className="gradient-text">Professional</span> Script Creation Services
            </h2>
            <p className="text-cs-navy-700 text-lg">
              We craft persuasive sales scripts that turn conversations into conversions, boosting your team&apos;s closing rates.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="rounded-xl overflow-hidden relative z-10"
              variants={itemVariants}
            >
              <div className="card-hover rounded-xl p-6 relative overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cs-blue-500/10 to-cs-navy-500/10 rounded-full transform translate-x-10 -translate-y-10 blur-2xl"></div>
              
                {/* Icon and title row */}
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cs-blue-500 to-cs-navy-500 flex items-center justify-center text-white mr-4">
                {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-cs-navy-900">{service.title}</h3>
                </div>
                
                {/* Illustration */}
                <div className="mb-5 flex-grow-0">
                  {service.illustration}
              </div>
              
                <p className="text-cs-navy-700 mb-5">{service.description}</p>
              
                <ul className="space-y-2 mt-auto">
                {service.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start">
                      <svg className="h-5 w-5 text-cs-blue-500 mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                      <span className="text-cs-navy-700">{feature}</span>
                  </li>
                ))}
              </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <a href="#pricing" className="inline-flex items-center text-white bg-gradient-to-r from-cs-blue-600 to-cs-navy-600 px-6 py-3 rounded-lg hover:shadow-lg transition-shadow">
            <span>View our pricing packages</span>
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
      
      {/* Bottom wave decoration - using full-width-section */}
      <div className="full-width-section absolute bottom-0 left-0 right-0 w-screen z-0 transform rotate-180">
        <svg width="100vw" height="80" viewBox="0 0 1440 80" fill="none" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="opacity-10 w-full">
          <path d="M0 40C240 10 480 0 720 20C960 40 1200 80 1440 40V0H0V40Z" fill="#3A6FFF" />
        </svg>
      </div>
    </section>
  );
} 