import React from 'react';
import { motion } from 'framer-motion';

interface CodeEditorProps {
  width?: number;
  height?: number;
  className?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ width = 500, height = 500, className = "" }) => {
  return (
    <div className={`w-full h-full ${className}`} style={{ maxWidth: width, maxHeight: height }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Background */}
        <rect width="500" height="500" rx="8" fill="#1E1E1E" />
        
        {/* Code editor lines */}
        <g className="code-content">
          {/* Line 1 - Import statement */}
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <text x="20" y="40" fill="#C586C0" fontSize="14">import</text>
            <text x="70" y="40" fill="#9CDCFE" fontSize="14">React</text>
            <text x="110" y="40" fill="#C586C0" fontSize="14">from</text>
            <text x="145" y="40" fill="#CE9178" fontSize="14">'react';</text>
          </motion.g>
          
          {/* Line 2 - Import statement */}
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <text x="20" y="65" fill="#C586C0" fontSize="14">import</text>
            <text x="70" y="65" fill="#9CDCFE" fontSize="14">{`{ motion }`}</text>
            <text x="145" y="65" fill="#C586C0" fontSize="14">from</text>
            <text x="180" y="65" fill="#CE9178" fontSize="14">'framer-motion';</text>
          </motion.g>
          
          {/* Line 3 - Empty space */}
          <text x="20" y="90" fill="#D4D4D4" fontSize="14"></text>
          
          {/* Line 4 - Interface */}
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <text x="20" y="115" fill="#569CD6" fontSize="14">interface</text>
            <text x="90" y="115" fill="#4EC9B0" fontSize="14">HeroProps</text>
            <text x="160" y="115" fill="#D4D4D4" fontSize="14">{"{"}</text>
          </motion.g>
          
          {/* Line 5 - Interface content */}
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <text x="40" y="140" fill="#9CDCFE" fontSize="14">title:</text>
            <text x="80" y="140" fill="#569CD6" fontSize="14">string;</text>
          </motion.g>
          
          {/* Line 6 - Interface content */}
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <text x="40" y="165" fill="#9CDCFE" fontSize="14">description:</text>
            <text x="125" y="165" fill="#569CD6" fontSize="14">string;</text>
          </motion.g>
          
          {/* Line 7 - Interface closing */}
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <text x="20" y="190" fill="#D4D4D4" fontSize="14">{"}"}</text>
          </motion.g>
          
          {/* Line 8 - Empty space */}
          <text x="20" y="215" fill="#D4D4D4" fontSize="14"></text>
          
          {/* Line 9 - Component declaration */}
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <text x="20" y="240" fill="#C586C0" fontSize="14">export</text>
            <text x="70" y="240" fill="#C586C0" fontSize="14">const</text>
            <text x="105" y="240" fill="#DCDCAA" fontSize="14">Hero</text>
            <text x="140" y="240" fill="#D4D4D4" fontSize="14">= (</text>
            <text x="160" y="240" fill="#9CDCFE" fontSize="14">{"{ title, description }"}</text>
            <text x="310" y="240" fill="#9CDCFE" fontSize="14">:</text>
            <text x="320" y="240" fill="#4EC9B0" fontSize="14">HeroProps</text>
            <text x="390" y="240" fill="#D4D4D4" fontSize="14">) =&gt;</text>
            <text x="420" y="240" fill="#D4D4D4" fontSize="14">{"{"}</text>
          </motion.g>
          
          {/* Line 10 - Return statement */}
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <text x="40" y="265" fill="#C586C0" fontSize="14">return</text>
            <text x="85" y="265" fill="#D4D4D4" fontSize="14">(</text>
          </motion.g>
          
          {/* Line 11 - JSX */}
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <text x="60" y="290" fill="#808080" fontSize="14">&gt;</text>
            <text x="70" y="290" fill="#4EC9B0" fontSize="14">motion.section</text>
          </motion.g>
          
          {/* Line 12 - Props */}
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <text x="80" y="315" fill="#9CDCFE" fontSize="14">className</text>
            <text x="145" y="315" fill="#D4D4D4" fontSize="14">=</text>
            <text x="155" y="315" fill="#CE9178" fontSize="14">"hero-container"</text>
          </motion.g>
          
          {/* Line 13 - Props */}
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <text x="80" y="340" fill="#9CDCFE" fontSize="14">initial</text>
            <text x="125" y="340" fill="#D4D4D4" fontSize="14">=</text>
            <text x="135" y="340" fill="#D4D4D4" fontSize="14">{"{{ opacity: 0 }}"}</text>
          </motion.g>
          
          {/* Line 14 - Props */}
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <text x="80" y="365" fill="#9CDCFE" fontSize="14">animate</text>
            <text x="130" y="365" fill="#D4D4D4" fontSize="14">=</text>
            <text x="140" y="365" fill="#D4D4D4" fontSize="14">{"{{ opacity: 1 }}"}</text>
          </motion.g>
          
          {/* Line 15 - Closing JSX tag */}
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <text x="60" y="390" fill="#808080" fontSize="14">&gt;</text>
          </motion.g>
          
          {/* Line 16 - JSX content */}
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
          >
            <text x="80" y="415" fill="#808080" fontSize="14">&gt;</text>
            <text x="90" y="415" fill="#4EC9B0" fontSize="14">h1</text>
            <text x="110" y="415" fill="#808080" fontSize="14">&gt;</text>
            <text x="120" y="415" fill="#D4D4D4" fontSize="14">{"{"}</text>
            <text x="130" y="415" fill="#9CDCFE" fontSize="14">title</text>
            <text x="160" y="415" fill="#D4D4D4" fontSize="14">{"}"}</text>
            <text x="170" y="415" fill="#808080" fontSize="14">&lt;/</text>
            <text x="185" y="415" fill="#4EC9B0" fontSize="14">h1</text>
            <text x="200" y="415" fill="#808080" fontSize="14">&gt;</text>
          </motion.g>
          
          {/* Line 17 - JSX content */}
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <text x="80" y="440" fill="#808080" fontSize="14">&gt;</text>
            <text x="90" y="440" fill="#4EC9B0" fontSize="14">p</text>
            <text x="100" y="440" fill="#808080" fontSize="14">&gt;</text>
            <text x="110" y="440" fill="#D4D4D4" fontSize="14">{"{"}</text>
            <text x="120" y="440" fill="#9CDCFE" fontSize="14">description</text>
            <text x="190" y="440" fill="#D4D4D4" fontSize="14">{"}"}</text>
            <text x="200" y="440" fill="#808080" fontSize="14">&lt;/</text>
            <text x="215" y="440" fill="#4EC9B0" fontSize="14">p</text>
            <text x="225" y="440" fill="#808080" fontSize="14">&gt;</text>
          </motion.g>
          
          {/* Line 18 - Closing JSX tag */}
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <text x="60" y="465" fill="#808080" fontSize="14">&gt;</text>
          </motion.g>
          
          {/* Line 19 - Closing braces */}
          <motion.g
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 1.6 }}
          >
            <text x="40" y="490" fill="#D4D4D4" fontSize="14">);</text>
          </motion.g>
          
          {/* Blinking cursor */}
          <motion.rect
            x="60"
            y="478"
            width="2"
            height="14"
            fill="#D4D4D4"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        </g>
        
        {/* Line numbers */}
        <g>
          {Array.from({ length: 19 }).map((_, i) => (
            <text 
              key={i} 
              x="10" 
              y={40 + i * 25} 
              fill="#858585" 
              fontSize="12"
              textAnchor="end"
            >
              {i + 1}
            </text>
          ))}
        </g>

        {/* Glowing Effect */}
        <motion.circle
          cx="400"
          cy="100"
          r="50"
          fill="url(#purpleGlow)"
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            r: [40, 60, 40]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            ease: "easeInOut"
          }}
        />

        <motion.circle
          cx="120"
          cy="400"
          r="40"
          fill="url(#pinkGlow)"
          animate={{ 
            opacity: [0.3, 0.5, 0.3],
            r: [30, 50, 30]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4,
            ease: "easeInOut",
            delay: 1
          }}
        />

        {/* Gradients */}
        <defs>
          <radialGradient id="purpleGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="pinkGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0"/>
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default CodeEditor; 