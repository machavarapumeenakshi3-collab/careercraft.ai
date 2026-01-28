
import React from 'react';
import { View } from '../types';
import { Users, Flame, ListChecks, ArrowRight, Shield, Zap, Sparkles, Plus, Clock, Target } from 'lucide-react';

interface RecruiterDashboardPageProps {
  navigate: (view: View) => void;
}

const RecruiterDashboardPage: React.FC<RecruiterDashboardPageProps> = ({ navigate }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Recruiter Intelligence</h1>
          <p className="text-slate-500 font-medium">Monitoring your active talent acquisition ecosystems.</p>
        </div>
        <button 
          onClick={() => navigate('auto-shortlist')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-2xl font-black flex items-center gap-3 transition-all shadow-xl shadow-indigo-100"
        >
          <Plus size={20} /> New Hiring Campaign
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Active Campaigns" value="4" desc="+1 this week" icon={<Target className="text-indigo-600" />} />
        <StatCard title="Global Talent" value="1.2k" desc="Merit verified" icon={<Users className="text-purple-600" />} />
        <StatCard title="Avg. Time-to-Fill" value="12d" desc="-3d vs avg" icon={<Clock className="text-emerald-600" />} />
        <StatCard title="Precision Rate" value="94%" desc="AI shortlisting accuracy" icon={<Sparkles className="text-amber-500" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div 
              onClick={() => navigate('recruiter-heatmap')}
              className="group bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm cursor-pointer hover:shadow-2xl hover:border-indigo-100 transition-all space-y-8 relative overflow-hidden"
            >
              <div className="flex justify-between items-start relative z-10">
                <div className="w-16 h-16 bg-indigo-50 rounded-[20px] flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                  <Flame size={32} />
                </div>
                <ArrowRight className="text-slate-300 group-hover:text-indigo-600 transition-colors" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-slate-900">Talent Heatmap</h3>
                <p className="text-slate-500 mt-2 leading-relaxed font-medium">Real-time skill supply visualization and demographic trends across regions.</p>
              </div>
              <div className="flex gap-2 relative z-10">
                <span className="text-[10px] px-3 py-1 bg-slate-50 rounded-lg font-black text-slate-400 uppercase tracking-widest">Global Trends</span>
                <span className="text-[10px] px-3 py-1 bg-slate-50 rounded-lg font-black text-slate-400 uppercase tracking-widest">Skill Velocity</span>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            <div 
              onClick={() => navigate('auto-shortlist')}
              className="group bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm cursor-pointer hover:shadow-2xl hover:border-emerald-100 transition-all space-y-8 relative overflow-hidden"
            >
              <div className="flex justify-between items-start relative z-10">
                <div className="w-16 h-16 bg-emerald-50 rounded-[20px] flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <ListChecks size={32} />
                </div>
                <ArrowRight className="text-slate-300 group-hover:text-emerald-600 transition-colors" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-black text-slate-900">Merit Campaigns</h3>
                <p className="text-slate-500 mt-2 leading-relaxed font-medium">Intelligent merit-based shortlisting using verified Skill Sandbox data.</p>
              </div>
              <div className="flex gap-2 relative z-10">
                 <span className="text-[10px] px-3 py-1 bg-emerald-50 rounded-lg font-black text-emerald-600 flex items-center gap-1 uppercase tracking-widest">
                   <Shield size={10} /> Bias-Free
                 </span>
                 <span className="text-[10px] px-3 py-1 bg-slate-50 rounded-lg font-black text-slate-400 uppercase tracking-widest">Shortlist AI</span>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>

          <div className="bg-slate-900 p-12 rounded-[56px] text-white flex flex-col md:flex-row items-center gap-12 overflow-hidden relative shadow-2xl shadow-indigo-900/40 border border-slate-800">
            <div className="flex-1 space-y-6 relative z-10 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em]">
                System Analytics
              </div>
              <h3 className="text-4xl font-black tracking-tight">Predictive Hiring Insights</h3>
              <p className="text-slate-400 max-w-xl text-lg font-medium leading-relaxed">
                Gemini is forecasting a 15% shortage in Backend Infrastructure talent next quarter. Launch a preemptive campaign now.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <button className="bg-indigo-600 hover:bg-indigo-500 px-10 py-4 rounded-[20px] font-black transition-all shadow-xl shadow-indigo-900/50">
                  Analyze Talent Forecasts
                </button>
              </div>
            </div>
            <div className="w-56 h-56 bg-white/5 rounded-[40px] flex items-center justify-center border border-white/10 shrink-0 transform rotate-12 hover:rotate-0 transition-transform duration-700">
              <Zap size={80} className="text-indigo-400 opacity-60 animate-pulse" />
            </div>
            <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white p-8 rounded-[48px] border border-slate-200 shadow-sm space-y-8">
             <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Active Campaigns</h4>
             <div className="space-y-4">
               <CampaignItem role="Senior React Architect" matched={12} total={450} color="bg-indigo-600" />
               <CampaignItem role="Golang Microservices" matched={4} total={120} color="bg-emerald-500" />
               <CampaignItem role="ML Platform Junior" matched={32} total={890} color="bg-amber-500" />
             </div>
             <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[20px] text-slate-400 font-bold hover:border-indigo-400 hover:text-indigo-600 transition-all text-sm">
               View Full Archive
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ title: string, value: string, desc: string, icon: React.ReactNode }> = ({ title, value, desc, icon }) => (
  <div className="bg-white p-8 rounded-[36px] border border-slate-100 shadow-sm text-center space-y-3 hover:-translate-y-1 transition-transform">
    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-2">{icon}</div>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
    <h4 className="text-4xl font-black text-slate-900">{value}</h4>
    <p className="text-[10px] text-emerald-600 font-black tracking-widest bg-emerald-50 inline-block px-3 py-1 rounded-full">{desc}</p>
  </div>
);

const CampaignItem: React.FC<{ role: string, matched: number, total: number, color: string }> = ({ role, matched, total, color }) => (
  <div className="p-5 bg-slate-50 rounded-[28px] border border-slate-100 space-y-4 hover:border-indigo-100 transition-colors">
    <div className="flex justify-between items-start">
      <h5 className="font-bold text-slate-800 text-sm">{role}</h5>
      <span className="text-[10px] font-black text-slate-400">{total} apps</span>
    </div>
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Merit Matches</span>
        <span className="text-sm font-black text-slate-900">{matched}</span>
      </div>
      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${(matched/total)*100}%` }}></div>
      </div>
    </div>
  </div>
);

export default RecruiterDashboardPage;
