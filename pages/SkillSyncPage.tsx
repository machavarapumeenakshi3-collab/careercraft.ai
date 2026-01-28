
import React from 'react';
import { RefreshCw, Github, Linkedin, Code2, Globe, Database, ShieldCheck, CheckCircle2 } from 'lucide-react';

const SkillSyncPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-black text-slate-900">Unified Skill Profile</h1>
        <p className="text-slate-500">Sync activity from your dev ecosystems to build a verified proof-of-work.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SyncCard 
          icon={<Github size={24} />} 
          title="GitHub" 
          desc="Extract languages from repos and contribution activity." 
          status="connected" 
          skills={['React', 'Go', 'Docker']}
        />
        <SyncCard 
          icon={<Linkedin size={24} />} 
          title="LinkedIn" 
          desc="Import endorsements, certificates, and job history." 
          status="pending"
        />
        <SyncCard 
          icon={<Code2 size={24} className="text-amber-500" />} 
          title="LeetCode" 
          desc="Verify DSA expertise and problem-solving rank." 
          status="pending"
        />
        <SyncCard 
          icon={<Database size={24} className="text-indigo-500" />} 
          title="Kaggle" 
          desc="Sync ML notebooks and competition results." 
          status="connected" 
          skills={['Python', 'Pandas', 'TensorFlow']}
        />
      </div>

      <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm overflow-hidden relative">
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <ShieldCheck size={32} className="text-emerald-500" />
            <h3 className="text-2xl font-black text-slate-900">Verification Engine</h3>
          </div>
          <p className="text-slate-500 max-w-xl">Our engine cross-references your activity logs to prevent "Skill Inflation." Only skills backed by code, commits, or certificates are verified.</p>
          <div className="flex gap-4">
             <div className="px-6 py-3 bg-indigo-50 text-indigo-700 rounded-2xl font-bold flex items-center gap-2">
               <RefreshCw size={18} /> Resync All
             </div>
          </div>
        </div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-80 h-80 bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center -z-0 opacity-50">
          <RefreshCw size={120} className="text-slate-200 animate-[spin_10s_linear_infinite]" />
        </div>
      </div>
    </div>
  );
};

const SyncCard: React.FC<{ icon: React.ReactNode; title: string; desc: string; status: 'connected' | 'pending'; skills?: string[] }> = ({ icon, title, desc, status, skills }) => (
  <div className={`bg-white p-8 rounded-[40px] border transition-all ${status === 'connected' ? 'border-emerald-100 bg-emerald-50/10' : 'border-slate-200'}`}>
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center">{icon}</div>
      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${status === 'connected' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
        {status}
      </span>
    </div>
    <h4 className="text-xl font-black text-slate-900 mb-2">{title}</h4>
    <p className="text-slate-500 text-sm leading-relaxed mb-6">{desc}</p>
    
    {skills ? (
      <div className="flex flex-wrap gap-2">
        {skills.map((s, i) => (
          <span key={i} className="flex items-center gap-1 px-2.5 py-1 bg-white border border-emerald-200 text-emerald-700 rounded-lg text-[10px] font-bold">
            <CheckCircle2 size={10} /> {s}
          </span>
        ))}
      </div>
    ) : (
      <button className="text-indigo-600 font-bold text-sm hover:underline">Connect Account →</button>
    )}
  </div>
);

export default SkillSyncPage;
