import React from 'react';
import { Skull, Rocket, Activity, BarChart3 } from 'lucide-react';

const AdminDashboard = ({ history }) => {
  return (
    <div className="grid grid-cols-12 gap-6 p-6 bg-slate-950 min-h-screen">
      
      {/* Metric Card: Success Rate */}
      <div className="col-span-12 lg:col-span-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div className="flex justify-between items-start">
          <Activity className="text-cyan-400" />
          <span className="text-xs font-bold text-slate-500 uppercase">Efficiency</span>
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-black text-white">12.5%</h3>
          <p className="text-slate-400 text-sm">Survival Rate to Prototype</p>
        </div>
      </div>

      {/* Metric Card: Kill Count */}
      <div className="col-span-12 lg:col-span-4 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
        <div className="flex justify-between items-start">
          <Skull className="text-rose-500" />
          <span className="text-xs font-bold text-slate-500 uppercase">The Graveyard</span>
        </div>
        <div className="mt-4">
          <h3 className="text-3xl font-black text-white">84</h3>
          <p className="text-slate-400 text-sm">Solutions Failed Fast</p>
        </div>
      </div>

      {/* Main Table: The History */}
      <div className="col-span-12 bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-md">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center">
          <h2 className="font-bold text-xl">Recent Casualties & Victories</h2>
          <button className="text-xs bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-all">Export Post-Mortem</button>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-500 text-[10px] uppercase tracking-widest border-b border-slate-800">
              <th className="p-6">Solution</th>
              <th className="p-6">Status</th>
              <th className="p-6">Fail Reason</th>
              <th className="p-6">Date</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {history.map((item) => (
              <tr key={item.id} className="border-b border-slate-800/50 hover:bg-slate-800/20 transition-colors">
                <td className="p-6 font-semibold">{item.name}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                    item.status === 'PROTOTYPE' ? 'bg-green-900/30 text-green-400' : 'bg-rose-900/30 text-rose-400'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-6 text-slate-400 italic">"{item.failureReason || 'N/A'}"</td>
                <td className="p-6 text-slate-500 font-mono">{new Date(item.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};