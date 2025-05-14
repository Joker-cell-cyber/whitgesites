"use client";

import { FileText, Play, Clock, Briefcase, Heart, Laptop } from "lucide-react";
import { motion } from "framer-motion";

const ServicesSection = () => {
  const services = [
    {
      icon: <FileText className="w-8 h-8 text-vid-blue-600" />,
      title: "Long-form YouTube Scripts",
      description:
        "Complete scripts tailored for 10-30 minute YouTube videos with SEO-optimized intros, storytelling structure, and audience retention hooks. We include timestamps, b-roll suggestions, and call-to-action segments.",
    },
    {
      icon: <Play className="w-8 h-8 text-vid-blue-600" />,
      title: "Explainer Video Scripts",
      description:
        "Detailed scripts that transform complex topics into clear, engaging narratives. We research your subject matter thoroughly to ensure accuracy while making concepts accessible to your target audience.",
    },
    {
      icon: <Clock className="w-8 h-8 text-vid-blue-600" />,
      title: "Short-form Scripts",
      description:
        "Punchy, attention-grabbing scripts for TikTok, Instagram Reels, and YouTube Shorts that hook viewers in the first 3 seconds. We focus on viral potential and platform-specific trends to maximize engagement.",
    },
    {
      icon: <Briefcase className="w-8 h-8 text-vid-blue-600" />,
      title: "Tutorial Scripts",
      description:
        "Step-by-step scripts for educational content that balance information with engaging delivery. We include timecodes, visual prompts, and practical examples to optimize learning outcomes for your audience.",
    },
    {
      icon: <Heart className="w-8 h-8 text-vid-blue-600" />,
      title: "Podcast Scripts",
      description:
        "Conversational frameworks with natural dialogue, strategic questioning, and smooth transitions. We help create authentic-sounding discussions while ensuring all your key topics are thoroughly covered.",
    },
    {
      icon: <Laptop className="w-8 h-8 text-vid-blue-600" />,
      title: "Video Marketing Scripts",
      description:
        "Conversion-focused scripts that blend storytelling with persuasive calls to action. We use proven frameworks to build trust, showcase benefits, and guide viewers toward the desired action.",
    },
  ];

  return (
    <section id="services" className="py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Our Video Script Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Professional scripts for content creators, tailored to your unique voice and audience
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-700 hover:shadow-md transition-all duration-300"
            >
              <div className="bg-vid-blue-900/30 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-300">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection; 