"use client";

import { motion } from "framer-motion";
import GlowText from "@/components/ui/GlowText";

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

export default function ServicesSection() {
  const services = [
    {
      title: "Stream Overlays",
      description: "Stand out with eye-catching, branded stream overlays that enhance viewer engagement while maintaining professional aesthetics.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      features: [
        "Webcam frames & borders",
        "Info panels & lower thirds",
        "Stream scene layouts",
        "Game-specific designs"
      ]
    },
    {
      title: "Animated Alerts",
      description: "Grab your audience's attention with custom animated alerts for followers, subscribers, donations and raids.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      features: [
        "Follow/Sub notifications",
        "Donation/Bits alerts",
        "Raid/Host animations",
        "Sound effect integration"
      ]
    },
    {
      title: "Stream Panels",
      description: "Complete your channel with matching stream panels that provide viewers with important information and links.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      ),
      features: [
        "About/Bio panels",
        "Schedule/Rules displays",
        "Donation/Social panels",
        "Sponsor/Affiliate sections"
      ]
    },
    {
      title: "Screen Transitions",
      description: "Create a seamless viewing experience with professional transitions between stream scenes that maintain viewer engagement.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      ),
      features: [
        "Scene transition animations",
        "Stinger transitions",
        "Be right back screens",
        "Intermission animations"
      ]
    },
    {
      title: "Starting/Ending Screens",
      description: "Make powerful first and last impressions with custom starting soon and stream ending screens.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      features: [
        "Starting soon countdowns",
        "Stream ending animations",
        "Intermission screens",
        "Custom animated elements"
      ]
    },
    {
      title: "Custom Emotes",
      description: "Express your channel's personality with unique animated emotes for Twitch subscribers, Kick, and Discord.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      features: [
        "Channel-specific emotes",
        "Animated emote packages",
        "Badge designs",
        "Platform-optimized formats"
      ]
    }
  ];

  return (
    <section className="py-20 bg-[#0f0f0f]" id="services">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">
              Complete Visual <GlowText color="pink" size="4xl" weight="bold">Ecosystem</GlowText>
            </h2>
            <p className="text-gray-300 text-lg">
              Complete customized streaming packages designed to help you stand out on any platform.
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="card-hover rounded-xl p-6 relative overflow-hidden bg-[--cyber-deep]/80 backdrop-blur-sm border border-[--neon-purple]/10"
              variants={itemVariants}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#6441A4]/10 to-[#00FFFF]/10 rounded-full transform translate-x-10 -translate-y-10 blur-2xl"></div>
              
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[--neon-purple] to-[--neon-blue] flex items-center justify-center text-white mb-5 shadow-[0_0_10px_rgba(111,0,255,0.5)]">
                {service.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3">
                <GlowText color={
                  index % 4 === 0 ? "blue" : 
                  index % 4 === 1 ? "purple" : 
                  index % 4 === 2 ? "pink" : "green"
                } size="xl" weight="bold">{service.title}</GlowText>
              </h3>
              <p className="text-gray-300 mb-5">{service.description}</p>
              
              <ul className="space-y-2">
                {service.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start">
                    <svg className="h-5 w-5 text-[--neon-blue] mt-0.5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-200">{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* Platform Compatibility */}
              <div className="mt-5 pt-4 border-t border-gray-800/30 flex items-center gap-2">
                <span className="text-xs text-gray-400">Compatible:</span>
                <div className="flex space-x-2">
                  <div className="text-[#6441A4]">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43z"/>
                    </svg>
                  </div>
                  <div className="text-[#00FFFF]">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <div className="text-[#FFE100]">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 