
import React, { useState } from 'react';
import { getSkillGapAnalysis } from '../services/gemini';
import { ResumeAnalysis, SkillGapAnalysis } from '../types';
import { Zap, Target, Search, Check, AlertTriangle, Loader2, BarChart3, ExternalLink, Play } from 'lucide-react';

interface SkillGapPageProps {
  resumeData: ResumeAnalysis | null;
  targetRole: string;
  setTargetRole: (role: string) => void;
  onAnalyzed: (data: SkillGapAnalysis) => void;
}

const SkillGapPage: React.FC<SkillGapPageProps> = ({ resumeData, targetRole, setTargetRole, onAnalyzed }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState<SkillGapAnalysis | null>(null);

  const performAnalysis = async () => {
    if (!resumeData) return;
    setIsLoading(true);
    try {
      const data = await getSkillGapAnalysis(resumeData.skills, targetRole);
      setAnalysis(data);
      onAnalyzed(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900">Skill Gap Analysis</h1>
          <p className="text-slate-500">Identify and fill the missing pieces in your career DNA.</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-80">
            <Target className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="Target Role (e.g. Frontend Dev)"
              className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-100 outline-none font-medium"
            />
          </div>
          <button 
            onClick={performAnalysis}
            disabled={isLoading || !resumeData}
            className="w-full md:w-auto bg-indigo-600 disabled:bg-slate-300 text-white px-8 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-100"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Search size={20} />}
            Analyze Gap
          </button>
        </div>
      </div>

      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm text-center">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6">Readiness Match</h3>
              <div className="relative w-48 h-48 mx-auto mb-6">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-slate-100" />
                  <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="16" fill="transparent" className="text-indigo-600" 
                    strokeDasharray={552} strokeDashoffset={552 - (552 * analysis.matchPercentage) / 100} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-slate-900">{analysis.matchPercentage}%</span>
                  <span className="text-xs font-bold text-slate-400 uppercase">Match</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 text-rose-600">
                <Zap className="text-rose-500" size={24} />
                Missing Skills & Solutions
              </h3>
              <div className="space-y-4">
                {analysis.prioritizedMissingSkills.map((item, idx) => (
                  <div key={idx} className="p-6 bg-slate-50 rounded-[32px] border border-slate-100 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-black text-slate-800 text-lg">{item.skill}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                          item.priority === 'High' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {item.priority} Priority
                        </span>
                      </div>
                    </div>
                    
                    {item.suggestions && item.suggestions.length > 0 && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {item.suggestions.map((sug, i) => (
                          <div key={i} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between group hover:border-indigo-400 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                {sug.type === 'course' ? <Play size={16} fill="currentColor" /> : <Check size={16} />}
                              </div>
                              <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{sug.type}</p>
                                <p className="text-sm font-bold text-slate-700">{sug.title}</p>
                              </div>
                            </div>
                            <ExternalLink size={14} className="text-slate-300 group-hover:text-indigo-500" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillGapPage;
