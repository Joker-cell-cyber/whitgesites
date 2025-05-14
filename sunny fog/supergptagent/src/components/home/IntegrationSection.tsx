"use client";

import { motion } from "framer-motion";

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
fetch('https://api.supergptagent.com/v1/agents/your-agent-id/query', {
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
<div id="supergpt-agent-container"></div>
<script src="https://cdn.supergptagent.com/embed.js"></script>
<script>
  SuperGPTAgent.init({
    containerId: 'supergpt-agent-container',
    agentId: 'your-agent-id',
    theme: 'dark',
    initialMessage: 'How can I assist you today?'
  });
</script>`,
  };

  return (
    <section className="py-24 relative overflow-hidden" id="integrations">
      {/* Background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[#0c0c14]"></div>
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(to right, #00c3f5 1px, transparent 1px), linear-gradient(to bottom, #00c3f5 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}>
        </div>
      </div>
      
      {/* Circuit lines */}
      <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 right-0 w-[200px] h-[1px] bg-ai-blue-500"></div>
        <div className="absolute top-1/4 right-[200px] w-[1px] h-[100px] bg-ai-blue-500"></div>
        <div className="absolute top-[calc(25%+100px)] right-[200px] w-[150px] h-[1px] bg-ai-blue-500"></div>
        
        <div className="absolute top-1/2 right-0 w-[300px] h-[1px] bg-ai-purple-500"></div>
        <div className="absolute top-1/2 right-[300px] w-[1px] h-[150px] bg-ai-purple-500"></div>
        <div className="absolute top-[calc(50%+150px)] right-[300px] w-[200px] h-[1px] bg-ai-purple-500"></div>
        
        <div className="absolute top-3/4 right-0 w-[250px] h-[1px] bg-ai-green-500"></div>
        <div className="absolute top-3/4 right-[250px] w-[1px] h-[120px] bg-ai-green-500"></div>
        <div className="absolute top-[calc(75%+120px)] right-[250px] w-[180px] h-[1px] bg-ai-green-500"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Seamless <span className="gradient-text">Integration</span> Capabilities
          </h2>
          <p className="text-gray-400 text-lg">
            Connect your AI agents to existing systems and platforms with our flexible integration options
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-[#14141e] p-6 rounded-xl card-hover h-full"
            >
              <h3 className="text-2xl font-bold mb-6 gradient-text">Integration Methods</h3>
              
              <div className="space-y-6">
                {integrations.map((integration, index) => (
                  <motion.div 
                    key={integration.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="p-2 rounded-lg bg-ai-blue-500/10 text-ai-blue-500 mt-1">
                      {integration.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-white mb-1">{integration.name}</h4>
                      <p className="text-gray-400 text-sm">{integration.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="bg-[#14141e] p-6 rounded-xl card-hover h-full cyber-border"
            >
              <h3 className="text-2xl font-bold mb-6 tech-gradient-text">Integration Code Examples</h3>
              
              <div className="bg-[#0a0a12] rounded-lg p-4 overflow-x-auto font-mono text-sm">
                <div className="flex border-b border-gray-800 mb-2">
                  <button className="px-4 py-2 text-ai-blue-500 border-b-2 border-ai-blue-500">REST API</button>
                  <button className="px-4 py-2 text-gray-500 hover:text-gray-300">Webhooks</button>
                  <button className="px-4 py-2 text-gray-500 hover:text-gray-300">Embed</button>
                </div>
                
                <pre className="language-javascript text-gray-300 whitespace-pre-wrap">{codeSnippets.api}</pre>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-ai-blue-500"></div>
                  <div className="w-3 h-3 rounded-full bg-ai-purple-500"></div>
                  <div className="w-3 h-3 rounded-full bg-ai-green-500"></div>
                </div>
                
                <a href="/docs/integration" className="text-ai-blue-500 hover:text-ai-blue-400 text-sm flex items-center">
                  View full documentation
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="inline-block p-px rounded-lg cyber-border">
            <a
              href="#pricing"
              className="inline-block px-6 py-3 bg-[#14141e] hover:bg-[#1a1a24] transition-colors text-white rounded-lg font-medium"
            >
              Explore Integration Options
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 