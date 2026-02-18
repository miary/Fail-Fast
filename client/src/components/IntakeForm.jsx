import React, { useState } from 'react';
import { Zap, AlertTriangle, Clock, Target } from 'lucide-react';

const IntakeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'AI',
    timeToValue: 4,
    risk: 5
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        // Reset form after successful drop into the funnel
        setFormData({ name: '', category: 'AI', timeToValue: 4, risk: 5 });
      }
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  return (
    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
      <div className="flex items-center gap-2 mb-8">
        <Zap className="text-cyan-400" size={20} />
        <h2 className="text-xl font-bold tracking-tight">Solution Intake</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Technology Name</label>
          <input 
            type="text" 
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 focus:ring-2 focus:ring-cyan-500 outline-none transition-all placeholder:text-slate-700" 
            placeholder="e.g. Distributed Vector Index" 
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
              <Clock size={12} /> Time to Value
            </label>
            <input 
              type="number" 
              value={formData.timeToValue}
              onChange={(e) => setFormData({...formData, timeToValue: e.target.value})}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-cyan-500" 
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">
              <AlertTriangle size={12} /> Risk Level
            </label>
            <input 
              type="number" 
              min="1" max="10"
              value={formData.risk}
              onChange={(e) => setFormData({...formData, risk: e.target.value})}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 outline-none focus:ring-2 focus:ring-cyan-500" 
            />
          </div>
        </div>

        <button 
          type="submit"
          className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/20 transition-all flex justify-center items-center gap-2 group"
        >
          Inject into Funnel
          <Target size={18} className="group-hover:scale-125 transition-transform" />
        </button>
      </form>
    </div>
  );
};

export default IntakeForm;