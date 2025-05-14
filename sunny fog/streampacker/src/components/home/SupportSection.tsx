"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import GlowText from "@/components/ui/GlowText";
import NeonButton from "@/components/ui/NeonButton";

// Define support resources
const supportResources = [
  {
    title: "Installation Guides",
    description: "Step-by-step tutorials for setting up your stream overlays on OBS, Streamlabs, and XSplit.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    link: "/resources/installation"
  },
  {
    title: "Platform Setup Tutorials",
    description: "Platform-specific configuration guides for Twitch, Kick, and DLive integrations.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
    link: "/resources/tutorials"
  },
  {
    title: "Overlay Customization Tips",
    description: "Learn how to modify colors, animations, and text in your stream overlay packages.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    link: "/resources/customization"
  },
  {
    title: "Stream Design Best Practices",
    description: "Expert tips for creating an engaging and professional stream layout and brand.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    link: "/resources/best-practices"
  }
];

// Define FAQ items
const faqItems = [
  {
    question: "How do I install stream overlays?",
    answer: "Our stream overlays can be installed in OBS Studio, Streamlabs OBS, or XSplit. We provide detailed installation guides for each platform in our resource center. After purchase, you'll receive download links and step-by-step instructions."
  },
  {
    question: "Can I customize the colors and animations?",
    answer: "Yes! All our packages include editable source files. You can customize colors, text, animations, and layout elements. We also offer customization services if you prefer to have our team make the changes for you."
  },
  {
    question: "Which streaming platforms are supported?",
    answer: "Our overlay packages are compatible with all major streaming platforms including Twitch, YouTube, Facebook Gaming, Kick, and DLive. We optimize our designs to work seamlessly across platforms."
  },
  {
    question: "How long does delivery take?",
    answer: "For template packages, delivery is instant after payment. For custom work, standard delivery is 3-5 business days depending on complexity. Rush delivery options are available at checkout."
  }
];

export default function SupportSection() {
  return (
    <section className="py-20 bg-[#0f0f0f]" id="support">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">
              Stream <GlowText color="purple" size="4xl" weight="bold">Support</GlowText> Center
            </h2>
            <p className="text-gray-300 text-lg">
              Everything you need to set up, customize, and optimize your streaming graphics.
            </p>
          </motion.div>
        </div>

        {/* Support Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {supportResources.map((resource, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-effect p-6 bg-[--cyber-deep]/80 backdrop-blur-sm border border-[--neon-purple]/10"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-[--neon-purple] to-[--neon-blue] flex items-center justify-center text-white mb-5 shadow-[0_0_10px_rgba(111,0,255,0.5)]">
                {resource.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3">
                <GlowText color={
                  index % 4 === 0 ? "blue" : 
                  index % 4 === 1 ? "purple" : 
                  index % 4 === 2 ? "pink" : "green"
                } size="xl" weight="bold">{resource.title}</GlowText>
              </h3>
              <p className="text-gray-300 mb-5">{resource.description}</p>
              
              <Link 
                href={resource.link} 
                className="inline-flex items-center text-[--neon-blue] hover:text-white hover:bg-[--neon-blue]/20 px-3 py-1.5 rounded-md transition-all"
              >
                <span>View Guide</span>
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Frequently Asked Questions */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="mb-10 text-center"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white tracking-tight">
              <GlowText color="blue" size="3xl" weight="bold">Frequently Asked Questions</GlowText>
            </h3>
            <p className="text-gray-300">Quick answers to common questions about our streaming packages</p>
          </motion.div>

          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[--cyber-deep]/90 backdrop-blur-sm rounded-lg p-6 border border-gray-800/50"
              >
                <h4 className="text-lg md:text-xl font-bold mb-3 text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">{item.question}</h4>
                <p className="text-gray-300">{item.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Support CTA */}
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-block p-8 glass-effect rounded-xl bg-[--cyber-deep]/80 backdrop-blur-sm border border-[--neon-purple]/20"
          >
            <h3 className="text-2xl font-bold mb-4 text-white drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]">Need Additional Help?</h3>
            <p className="text-gray-300 mb-6">Our support team is ready to assist you with any questions or custom requirements</p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <NeonButton
                color="purple"
                variant="solid"
                size="lg"
              >
                <Link href="/contact">Contact Support</Link>
              </NeonButton>
              <NeonButton
                color="blue"
                variant="outline"
                size="lg"
                icon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
                  </svg>
                }
              >
                <a href="https://discord.gg/streampacker" target="_blank" rel="noopener noreferrer">
                  Join Our Discord
                </a>
              </NeonButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 