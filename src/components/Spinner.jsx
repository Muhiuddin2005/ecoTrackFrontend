import React from 'react';

const Spinner = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-100 transition-colors duration-300">
      <style>{`
        @keyframes stemGrow {
          0% { stroke-dashoffset: 100; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes leafSprout {
          0%, 25% { transform: scale(0); opacity: 0; }
          55% { transform: scale(1.25); opacity: 0.9; }
          85%, 100% { transform: scale(1); opacity: 1; }
        }
        @keyframes floatParticle {
          0% { transform: translateY(15px) translateX(0) scale(0.8); opacity: 0; }
          50% { opacity: 0.7; }
          100% { transform: translateY(-45px) translateX(var(--x-shift)) scale(0.4); opacity: 0; }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(0.92); opacity: 0.15; }
          50% { transform: scale(1.08); opacity: 0.45; }
        }
        .animate-stem {
          stroke-dasharray: 100;
          stroke-dashoffset: 100;
          animation: stemGrow 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .animate-leaf-left {
          transform-origin: 32px 42px;
          animation: leafSprout 2s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
        }
        .animate-leaf-right {
          transform-origin: 48px 35px;
          animation: leafSprout 2s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
        }
        .animate-leaf-top {
          transform-origin: 40px 15px;
          animation: leafSprout 2s cubic-bezier(0.34, 1.56, 0.64, 1) infinite;
        }
        .particle {
          animation: floatParticle 1.8s ease-in-out infinite;
        }
        .glow {
          animation: pulseGlow 2s ease-in-out infinite;
        }
      `}</style>
      
      <div className="relative flex flex-col items-center justify-center">
        {/* Soft glowing background eco-pulse */}
        <div className="absolute w-36 h-36 bg-primary/10 rounded-full blur-2xl glow"></div>
        
        {/* Seedling SVG */}
        <svg 
          viewBox="0 0 80 80" 
          className="w-28 h-28 text-primary relative z-10 filter drop-shadow-[0_4px_12px_rgba(34,197,94,0.35)]"
          fill="none" 
          stroke="currentColor" 
          strokeWidth="3.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          {/* Tree Trunk / Stem */}
          <path 
            d="M40 70 C40 50, 36 30, 40 15" 
            className="animate-stem stroke-primary"
          />
          
          {/* Left Sprout Leaf */}
          <path 
            d="M38 42 C22 40, 22 24, 34 30 Z" 
            fill="var(--color-secondary)"
            className="animate-leaf-left stroke-secondary"
          />
          
          {/* Right Sprout Leaf */}
          <path 
            d="M42 35 C58 33, 58 17, 46 23 Z" 
            fill="var(--color-primary)"
            className="animate-leaf-right stroke-primary"
          />
          
          {/* Top Sprout Leaf */}
          <path 
            d="M40 15 C30 5, 50 5, 40 15 Z" 
            fill="var(--color-accent)"
            className="animate-leaf-top stroke-accent"
          />
        </svg>

        {/* Floating Spores */}
        <div className="absolute z-0 w-28 h-28">
          <span className="absolute particle w-3 h-3 bg-primary/70 rounded-full top-8 left-6" style={{ '--x-shift': '-15px', animationDelay: '0.2s' }}></span>
          <span className="absolute particle w-2 h-2 bg-secondary/80 rounded-full top-4 left-18" style={{ '--x-shift': '12px', animationDelay: '0.8s' }}></span>
          <span className="absolute particle w-1.5 h-1.5 bg-accent/70 rounded-full top-10 left-12" style={{ '--x-shift': '6px', animationDelay: '1.4s' }}></span>
        </div>

        {/* Eco-Theme Loading Label */}
        <div className="mt-8 text-sm font-extrabold text-primary tracking-widest uppercase animate-pulse">
          Nurturing Environment...
        </div>
      </div>
    </div>
  );
};

export default Spinner;