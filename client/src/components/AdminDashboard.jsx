import React from 'react';
import { Skull, Rocket, Activity, AlertCircle } from 'lucide-react';

const AdminDashboard = ({ history }) => {
  const failCount = history.filter(item => item.status === 'FAILED_FAST').length;
  const successCount = history.filter(item => item.status === 'PROTOTYPE').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Stats Cards */}
      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <Skull className="text-rose-500" size={24} />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Failures</span>
        </div>
        <h3 className="text-4xl font-black">{failCount}</h3>
        <p className="text-xs text-slate-500 mt-2 italic">Institutional knowledge gained.</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <Rocket className="text-cyan-400" size={24} />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Prototypes</span>
        </div>
        <h3 className="text-4xl font-black">{successCount}</h3>
        <p className="text-xs text-slate-500 mt-2 italic">Ready for sandbox testing.</p>
      </div>

      {/* History Table (The Graveyard) */}
      <div className="md:col-span-3 bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-md">
        <div className="p-6 border-b border-slate-800 flex items-center gap-2">
          <Activity className="text-slate-500" size={18} />
          <h2 className="font-bold">The Graveyard & Success Log</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-950/50 text-[10px] uppercase tracking-[0.2em] text-slate-500">
              <tr>
                <th className="p-4 pl-8">Solution</th>
                <th className="p-4">Status</th>
                <th className="p-4">Primary Risk/Reason</th>
                <th className="p-4 pr-8 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-800/50">
              {history.map((item, idx) => (
                <tr key={item._id || idx} className="hover:bg-slate-800/20 transition-colors group">
                  <td className="p-4 pl-8 font-bold text-slate-200">{item.name}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                      item.status === 'PROTOTYPE' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-rose-500/10 text-rose-500'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 truncate max-w-xs font-mono text-xs">
                    {item.failureReason || 'N/A'}
                  </td>
                  <td className="p-4 pr-8 text-right text-slate-600 text-xs">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;