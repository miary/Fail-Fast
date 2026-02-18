import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Target, Trash2, ChevronRight } from 'lucide-react';

const TechIntake = () => {
  const [submissions, setSubmissions] = useState([]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <header className="mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black tracking-tighter bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            THE CRUCIBLE
          </h1>
          <p className="text-slate-500 uppercase tracking-widest text-xs mt-1">Fail Fast // Evaluate Often</p>
        </div>
      </header>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* LEFT: Intake Form */}
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Zap className="text-cyan-400" size={20} /> New Solution Intake
          </h2>
          <form className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Technology Name</label>
              <input type="text" className="w-full bg-slate-800 border-none rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none transition-all" placeholder="e.g. Vector DB Implementation" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Time to Value (Weeks)</label>
                <input type="number" className="w-full bg-slate-800 border-none rounded-xl p-4 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase">Risk Level (1-10)</label>
                <input type="number" className="w-full bg-slate-800 border-none rounded-xl p-4 outline-none" />
              </div>
            </div>
            <button className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 rounded-xl font-bold shadow-lg shadow-cyan-900/20 transition-all flex justify-center items-center gap-2">
              Drop into Funnel <ChevronRight size={18} />
            </button>
          </form>
        </div>

        {/* RIGHT: The Funnel Visualization */}
        <div className="relative flex flex-col items-center">
           <div className="w-full max-w-md h-[500px] relative overflow-hidden flex flex-col items-center">
              {/* SVG Funnel Overlay */}
              <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full text-slate-800/50 fill-current">
                <path d="M0,0 L400,0 L250,500 L150,500 Z" />
              </svg>
              
              <div className="z-10 text-center pt-8">
                <span className="text-xs font-bold text-cyan-400 bg-cyan-900/30 px-3 py-1 rounded-full">INTAKE ZONE</span>
              </div>
              
              <div className="mt-auto pb-8 z-10 text-center">
                <span className="text-xs font-bold text-green-400 bg-green-900/30 px-3 py-1 rounded-full">PROTOTYPE PHASE</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default IntakeForm;