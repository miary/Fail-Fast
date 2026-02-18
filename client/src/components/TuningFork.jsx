import React, { useState } from 'react';
import { Sliders, Activity } from 'lucide-react';

const TuningFork = ({ onWeightChange }) => {
  const [weights, setWeights] = useState({ risk: 1.5, time: 2.0 });

  const handleChange = (key, val) => {
    const newWeights = { ...weights, [key]: parseFloat(val) };
    setWeights(newWeights);
    onWeightChange(newWeights);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl">
      <h3 className="flex items-center gap-2 text-cyan-400 text-xs font-black uppercase tracking-widest mb-6">
        <Activity size={16} /> Strategy Calibration
      </h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs text-slate-400 uppercase font-bold">Risk Weight</label>
            <span className="text-xs text-cyan-400 font-mono">{weights.risk}x</span>
          </div>
          <input 
            type="range" min="0.5" max="3" step="0.1" value={weights.risk}
            onChange={(e) => handleChange('risk', e.target.value)}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <label className="text-xs text-slate-400 uppercase font-bold">Time Penalty</label>
            <span className="text-xs text-cyan-400 font-mono">{weights.time}x</span>
          </div>
          <input 
            type="range" min="0.5" max="3" step="0.1" value={weights.time}
            onChange={(e) => handleChange('time', e.target.value)}
            className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>
      </div>
      
      <p className="mt-6 text-[10px] text-slate-500 italic">
        * Increasing weights will cause more solutions to be ejected from the Funnel.
      </p>
    </div>
  );
};