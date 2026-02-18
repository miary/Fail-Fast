import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import IntakeForm from './components/IntakeForm';
import CrucibleFunnel from './components/CrucibleFunnel';
import AdminDashboard from './components/AdminDashboard';
import { Activity, Shield } from 'lucide-react';

// Connect to the Node.js backend
const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');

function App() {
  const [activeSubmissions, setActiveSubmissions] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Initial load of the "Graveyard" data
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/history`)
      .then(res => res.json())
      .then(data => setHistory(data));

    // Listen for real-time evaluations from the server
    socket.on('new_evaluation', (newSubmission) => {
      // 1. Add to Funnel for animation
      setActiveSubmissions(prev => [...prev, newSubmission]);
      
      // 2. Add to Dashboard History
      setHistory(prev => [newSubmission, ...prev]);

      // 3. Cleanup: Remove particle from funnel after animation (4.5s)
      setTimeout(() => {
        setActiveSubmissions(prev => prev.filter(s => s.id !== newSubmission.id));
      }, 4500);
    });

    return () => socket.off('new_evaluation');
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">
      {/* Header Area */}
      <nav className="border-b border-slate-800/50 backdrop-blur-md sticky top-0 z-50 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Shield className="text-white" size={20} />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter">THE CRUCIBLE</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] leading-none">Fail-Fast Architecture</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
            <span className="flex items-center gap-2"><Activity size={14} className="text-green-500" /> System Live</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-8 space-y-12">
        {/* Top Section: Intake and Funnel */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <IntakeForm />
          <CrucibleFunnel submissions={activeSubmissions} />
        </div>

        {/* Bottom Section: Admin Dashboard */}
        <section className="pt-12 border-t border-slate-800/50">
          <h2 className="text-2xl font-bold mb-8">Executive Intelligence</h2>
          <AdminDashboard history={history} />
        </section>
      </main>
    </div>
  );
}

export default App;