"use client";

import { FileText, Play, Clock, Briefcase, Heart, Laptop } from "lucide-react";
import { motion } from "framer-motion";
import { COMPANY } from "@/app/constants/company";

const ServicesSection = () => {
  const services = [
    {
      icon: <FileText className="w-8 h-8 text-white" />,
      title: "Long-form YouTube Scripts",
      description:
        "Complete scripts tailored for 10-30 minute YouTube videos with SEO-optimized intros, storytelling structure, and audience retention hooks. We include timestamps, b-roll suggestions, and call-to-action segments.",
    },
    {
      icon: <Play className="w-8 h-8 text-white" />,
      title: "Explainer Video Scripts",
      description:
        "Detailed scripts that transform complex topics into clear, engaging narratives. We research your subject matter thoroughly to ensure accuracy while making concepts accessible to your target audience.",
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: "Short-form Scripts",
      description:
        "Punchy, attention-grabbing scripts for TikTok, Instagram Reels, and YouTube Shorts that hook viewers in the first 3 seconds. We focus on viral potential and platform-specific trends to maximize engagement.",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-white" />,
      title: "Tutorial Scripts",
      description:
        "Step-by-step scripts for educational content that balance information with engaging delivery. We include timecodes, visual prompts, and practical examples to optimize learning outcomes for your audience.",
    },
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      title: "Podcast Scripts",
      description:
        "Conversational frameworks with natural dialogue, strategic questioning, and smooth transitions. We help create authentic-sounding discussions while ensuring all your key topics are thoroughly covered.",
    },
    {
      icon: <Laptop className="w-8 h-8 text-white" />,
      title: "Video Marketing Scripts",
      description:
        "Conversion-focused scripts that blend storytelling with persuasive calls to action. We use proven frameworks to build trust, showcase benefits, and guide viewers toward the desired action.",
    },
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-white to-vid-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full px-4 py-1.5 text-sm bg-vid-blue-100 text-vid-blue-700 font-medium border border-vid-blue-200 mb-6"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-accent mr-2"></span>
            What We Offer
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold gradient-text mb-6 heading-font"
          >
            Our Video Script Services
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-vid-blue-700 max-w-3xl mx-auto"
          >
            Professional scripts for content creators, tailored to your unique voice and audience
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl border border-vid-white-200 overflow-hidden hover:translate-y-[-8px] transition-all duration-300"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-vid-blue-400 to-vid-blue-600 opacity-10 rounded-b-[50px]"></div>
                <div className="pt-8 pb-6 px-6">
                  <div className="bg-gradient-to-br from-vid-blue-500 to-vid-blue-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-vid-blue-500/20">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-vid-blue-900 mb-3 heading-font">
                    {service.title}
                  </h3>
                  <p className="text-vid-blue-700">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <a 
            href="#pricing" 
            className="inline-flex items-center text-vid-blue-600 font-medium hover:text-accent transition-colors"
          >
            View our pricing
            <svg className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection; 