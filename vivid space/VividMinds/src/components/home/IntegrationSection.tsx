"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

export default function IntegrationSection() {
  const integrations = [
    {
      name: "RESTful APIs",
      description: "Connect your agents to existing systems with standard REST endpoints",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 10h-4V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v6H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2z"></path>
        </svg>
      ),
    },
    {
      name: "Webhooks",
      description: "Trigger external actions or receive events from other platforms",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
      ),
    },
    {
      name: "Web Embeds",
      description: "Embed your agents directly into websites with a simple code snippet",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      ),
    },
    {
      name: "SDKs",
      description: "Developer toolkits for popular languages and frameworks",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m8 3 4 8 5-5 5 15H2L8 3z"></path>
        </svg>
      ),
    },
    {
      name: "Authentication",
      description: "Secure access with OAuth, API keys, or custom auth flows",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
    },
    {
      name: "Databases",
      description: "Connect to SQL, NoSQL, or vector databases for enhanced capabilities",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        </svg>
      ),
    },
  ];

  // Code snippets for different integration methods
  const codeSnippets = {
    api: `// Example API call to your agent
fetch('https://api.vividminds.ai/v1/agents/your-agent-id/query', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    query: "What insights can you provide from this data?",
    context: { 
      dataSource: "quarterly_sales",
      timeFrame: "2023-Q4"
    }
  })
})
.then(response => response.json())
.then(data => console.log(data));`,

    webhook: `// Configure a webhook receiver
app.post('/agent-webhook', (req, res) => {
  const { event, agentId, data } = req.body;
  
  switch(event) {
    case 'prediction_complete':
      // Handle prediction results
      processPredictionResults(data);
      break;
    case 'agent_training_complete':
      // Handle training completion
      updateAgentStatus(agentId, 'ready');
      break;
  }
  
  res.status(200).send({ received: true });
});`,

    embed: `<!-- Embed your agent in a webpage -->
<div id="vividminds-agent-container"></div>
<script src="https://cdn.vividminds.ai/embed.js"></script>
<script>
  VividMinds.init({
    containerId: 'vividminds-agent-container',
    agentId: 'your-agent-id',
    theme: 'dark',
    initialMessage: 'How can I assist you today?'
  });
</script>`,
  };

  const [activeTab, setActiveTab] = React.useState('api');
  
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden" id="integrations">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050518] to-[#070721]"></div>
        <div className="absolute inset-0 opacity-5" 
          style={{
            backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}>
        </div>
      </div>
      
      {/* Glowing orbs */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-indigo-600/5 blur-[120px]"></div>
      <div className="absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-[120px]"></div>
      
      {/* Digital circuit lines */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-20 pointer-events-none">
        <svg className="absolute top-0 right-0 w-1/2 h-full" viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M500 200 L300 200 L300 350 L450 350" stroke="url(#circuit1)" strokeWidth="1" />
          <path d="M500 400 L250 400 L250 550 L400 550" stroke="url(#circuit2)" strokeWidth="1" />
          <path d="M500 600 L350 600 L350 750 L450 750" stroke="url(#circuit3)" strokeWidth="1" />
          <defs>
            <linearGradient id="circuit1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="circuit2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="circuit3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.div 
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <span className="text-xs tracking-wider text-indigo-400 uppercase bg-indigo-900/30 py-1 px-3 rounded-full">Connectivity</span>
          </motion.div>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl font-bold mb-6"
          >
            Seamless <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">Integration</span> Capabilities
          </motion.h2>
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-lg"
          >
            Connect your AI agents to existing systems and platforms with our flexible integration options
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16"
        >
          <div className="lg:col-span-2">
            <motion.div
              variants={itemVariants}
              className="bg-[rgba(15,15,35,0.5)] backdrop-blur-sm p-8 rounded-2xl border border-indigo-800/20 h-full shadow-lg shadow-indigo-900/10"
            >
              <h3 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">Integration Methods</h3>
              
              <div className="space-y-7">
                {integrations.map((integration, index) => (
                  <motion.div 
                    key={integration.name}
                    variants={itemVariants}
                    className="flex items-start space-x-5 group hover:translate-x-1 transition-transform duration-300"
                  >
                    <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-900/50 to-purple-900/50 text-indigo-400 border border-indigo-800/30 shadow-md group-hover:shadow-indigo-900/30 transition-all duration-300">
                      {integration.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2 text-lg">{integration.name}</h4>
                      <p className="text-gray-400">{integration.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-3">
            <motion.div
              variants={itemVariants}
              className="bg-[rgba(15,15,35,0.5)] backdrop-blur-sm p-8 rounded-2xl border border-indigo-800/20 h-full shadow-lg shadow-indigo-900/10 relative overflow-hidden"
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 border border-indigo-500/0 rounded-2xl transition-colors duration-1000 group-hover:border-indigo-500/50"></div>
              
              <h3 className="text-2xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-400">Integration Code Examples</h3>
              
              <div className="bg-[rgba(10,10,25,0.8)] rounded-xl overflow-hidden shadow-inner">
                <div className="flex border-b border-gray-800">
                  <button 
                    className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'api' ? 'text-indigo-400 border-b-2 border-indigo-500 bg-indigo-900/20' : 'text-gray-400 hover:text-gray-300 hover:bg-indigo-900/10'}`}
                    onClick={() => setActiveTab('api')}
                  >
                    REST API
                  </button>
                  <button 
                    className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'webhook' ? 'text-indigo-400 border-b-2 border-indigo-500 bg-indigo-900/20' : 'text-gray-400 hover:text-gray-300 hover:bg-indigo-900/10'}`}
                    onClick={() => setActiveTab('webhook')}
                  >
                    Webhooks
                  </button>
                  <button 
                    className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'embed' ? 'text-indigo-400 border-b-2 border-indigo-500 bg-indigo-900/20' : 'text-gray-400 hover:text-gray-300 hover:bg-indigo-900/10'}`}
                    onClick={() => setActiveTab('embed')}
                  >
                    Embed
                  </button>
                </div>
                
                <div className="p-6 overflow-x-auto">
                  <pre className="font-mono text-gray-300 whitespace-pre-wrap text-sm leading-relaxed">
                    {codeSnippets[activeTab]}
                  </pre>
                </div>
              </div>
              
              <div className="mt-8 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></div>
                  <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
                
                <a href="/docs/integration" className="group text-indigo-400 hover:text-indigo-300 text-sm flex items-center font-medium transition-colors">
                  View full documentation
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-900/20 hover:shadow-indigo-700/30"
          >
            Explore Integration Options
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
} 