
import React from 'react';
import { Flame, PieChart, BarChart3, TrendingUp, Filter, Info, Map, Globe, Shield, Zap } from 'lucide-react';

const RecruiterHeatmapPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600">
            <Flame size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900">Talent Heatmap</h1>
            <p className="text-slate-500">Global skill supply vs market demand visualization.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-white border border-slate-200 rounded-xl p-1">
             <button className="px-4 py-1.5 rounded-lg text-xs font-bold bg-indigo-600 text-white transition-all">SKILLS</button>
             <button className="px-4 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:text-slate-600 transition-all">GEOGRAPHY</button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition-all shadow-lg">
            <Filter size={14} /> Refine View
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Detailed Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-8">
             <div className="flex items-center justify-between">
               <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                 <Zap size={22} className="text-amber-500" /> High Velocity
               </h3>
               <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase tracking-widest">Growing</span>
             </div>
             
             <div className="space-y-6">
               <HeatmapItem skill="Rust" count={12} demand={88} color="bg-rose-500" />
               <HeatmapItem skill="React / Next.js" count={92} demand={75} color="bg-indigo-500" />
               <HeatmapItem skill="Go" count={34} demand={62} color="bg-cyan-500" />
               <HeatmapItem skill="TensorFlow" count={22} demand={95} color="bg-amber-500" />
               <HeatmapItem skill="Solidity" count={5} demand={40} color="bg-purple-500" />
             </div>

             <div className="p-6 bg-slate-900 rounded-3xl text-white space-y-4">
                <div className="flex items-center gap-2 text-indigo-400">
                  <Shield size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Diversity Insight</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium italic">
                  "Bias-free trends show a 15% increase in verified merit scores for non-traditional candidates in the last 30 days."
                </p>
             </div>
           </div>
        </div>

        {/* Right Column - Big Visuals */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp size={22} className="text-indigo-600" /> Demand Prediction Engine
                </h3>
                <p className="text-xs text-slate-400">AI-forecasted role demand for the next quarter.</p>
              </div>
              <select className="text-[10px] font-black text-slate-400 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 outline-none uppercase tracking-widest">
                <option>Frontend Dev</option>
                <option>AI Engineer</option>
                <option>Cloud Architect</option>
              </select>
            </div>
            
            <div className="h-72 flex items-end justify-between gap-6 px-4 pt-4 border-b border-slate-50">
              <ChartBar height="30%" label="Q1 24" />
              <ChartBar height="45%" label="Q2 24" />
              <ChartBar height="55%" label="Q3 24" />
              <ChartBar height="68%" label="Q4 24" />
              <ChartBar height="82%" label="Q1 25" active />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TrendBox label="Market Shortage" value="1.2k" type="danger" />
              <TrendBox label="Average Salary" value="$145k" type="neutral" />
              <TrendBox label="Competency Avg" value="B+" type="success" />
            </div>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm flex items-center justify-between gap-12 overflow-hidden relative">
             <div className="space-y-3 relative z-10 max-w-sm">
               <div className="flex items-center gap-2 text-indigo-600">
                 <Globe size={22} />
                 <h3 className="text-xl font-bold">Talent Corridors</h3>
               </div>
               <p className="text-sm text-slate-500 leading-relaxed">Remote talent density is highest in Eastern Europe and South-East Asia for high-specialization roles like Backend Infra.</p>
               <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100 hover:bg-indigo-100 transition-all">
                 View Regional Map
               </button>
             </div>
             <div className="flex -space-x-4 relative z-10">
               {[1,2,3,4,5].map(i => (
                 <div key={i} className="w-16 h-16 rounded-3xl border-4 border-white bg-slate-100 flex items-center justify-center text-xs font-black text-slate-300 shadow-xl shadow-slate-200/50">HUB</div>
               ))}
             </div>
             <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeatmapItem: React.FC<{ skill: string; count: number; demand: number; color: string }> = ({ skill, count, demand, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
      <span className="text-slate-900">{skill}</span>
      <span className="text-slate-400">Supply: {count}% / Demand: {demand}%</span>
    </div>
    <div className="w-full bg-slate-50 h-2.5 rounded-full overflow-hidden border border-slate-100 relative">
      <div className={`absolute left-0 top-0 h-full opacity-30 ${color}`} style={{ width: `${demand}%` }}></div>
      <div className={`absolute left-0 top-0 h-full ${color}`} style={{ width: `${count}%` }}></div>
    </div>
  </div>
);

const ChartBar: React.FC<{ height: string, label: string, active?: boolean }> = ({ height, label, active }) => (
  <div className="flex-1 flex flex-col items-center gap-4">
    <div className="w-full relative group">
      <div className={`w-full rounded-t-2xl transition-all duration-700 ${active ? 'bg-indigo-600' : 'bg-slate-100 group-hover:bg-slate-200'}`} style={{ height }}></div>
      {active && <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded font-bold animate-bounce whitespace-nowrap">PEAK DEMAND</div>}
    </div>
    <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-indigo-600' : 'text-slate-400'}`}>{label}</span>
  </div>
);

const TrendBox: React.FC<{ label: string, value: string, type: 'danger' | 'neutral' | 'success' }> = ({ label, value, type }) => (
  <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 space-y-1">
    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
    <div className="flex items-center justify-between">
      <span className="text-2xl font-black text-slate-900">{value}</span>
      <div className={`w-2 h-2 rounded-full ${type === 'danger' ? 'bg-rose-500' : type === 'success' ? 'bg-emerald-500' : 'bg-indigo-500'}`}></div>
    </div>
  </div>
);

export default RecruiterHeatmapPage;
