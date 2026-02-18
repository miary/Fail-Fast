import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CrucibleFunnel = ({ submissions }) => {
  return (
    <div className="relative w-full max-w-lg h-[600px] flex flex-col items-center bg-slate-900/20 rounded-3xl border border-slate-800/50 backdrop-blur-sm overflow-hidden">
      
      {/* Visual Funnel Overlay (SVG) */}
      <svg viewBox="0 0 400 600" className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <linearGradient id="funnelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
        <path 
          d="M20,20 L380,20 L240,580 L160,580 Z" 
          fill="none" 
          stroke="url(#funnelGradient)" 
          strokeWidth="2" 
          strokeDasharray="10 5"
        />
      </svg>

      {/* Particle Container */}
      <div className="relative w-full h-full">
        <AnimatePresence>
          {submissions.map((sub) => (
            <SubmissionParticle key={sub.id} data={sub} />
          ))}
        </AnimatePresence>
      </div>

      {/* Status Labels */}
      <div className="absolute top-4 text-[10px] font-black tracking-[0.3em] text-cyan-500/50 uppercase">Intake Velocity</div>
      <div className="absolute bottom-4 text-[10px] font-black tracking-[0.3em] text-blue-500/50 uppercase">Prototype Ready</div>
    </div>
  );
};

const SubmissionParticle = ({ data }) => {
  // Define the path based on status
  const isSurvivor = data.status === 'PROTOTYPE_CANDIDATE';
  
  const variants = {
    initial: { y: -50, x: "50%", opacity: 0, scale: 0.5 },
    // Phase 1: Dropping into the wide neck
    animate: { 
      y: [0, 150, 300, 550],
      x: ["50%", "45%", "52%", "50%"],
      opacity: [0, 1, 1, isSurvivor ? 1 : 0],
      scale: [0.5, 1, 0.8, isSurvivor ? 1.2 : 0],
      transition: { 
        duration: 3, 
        times: [0, 0.2, 0.5, 1],
        ease: "easeInOut" 
      }
    },
    // Phase 2: If it fails, it "ejects" sideways
    exit: {
        x: data.status === 'FAILED_FAST' ? (Math.random() > 0.5 ? 500 : -500) : "50%",
        opacity: 0,
        transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      className={`absolute w-12 h-12 rounded-xl flex items-center justify-center border shadow-lg ${
        isSurvivor 
          ? "bg-blue-500 border-blue-400 shadow-blue-500/40" 
          : "bg-slate-800 border-slate-700 shadow-black/50"
      }`}
      style={{ left: 'calc(50% - 24px)' }}
    >
      <span className="text-[10px] font-bold truncate px-1">
        {data.name.substring(0, 5)}
      </span>
      
      {/* Survival Glow */}
      {isSurvivor && (
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-blue-400 rounded-xl blur-md -z-10"
        />
      )}
    </motion.div>
  );
};

export default CrucibleFunnel;
