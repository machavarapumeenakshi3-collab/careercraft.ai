
import React, { useState } from 'react';
import { generateRoadmap } from '../services/gemini';
import { SkillGapAnalysis, RoadmapStep } from '../types';
import { Map, Calendar, BookOpen, Layers, CheckCircle, ExternalLink, Loader2, Sparkles, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

interface RoadmapPageProps {
  skillGapData: SkillGapAnalysis | null;
  targetRole: string;
  onGenerated: (data: RoadmapStep[]) => void;
  existingRoadmap: RoadmapStep[] | null;
}

const RoadmapPage: React.FC<RoadmapPageProps> = ({ skillGapData, targetRole, onGenerated, existingRoadmap }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

  const handleGenerate = async () => {
    if (!skillGapData) return;
    setIsLoading(true);
    setError(null);
    try {
      const missing = skillGapData.prioritizedMissingSkills.map(s => s.skill);
      const data = await generateRoadmap(missing, targetRole);
      onGenerated(data);
    } catch (err) {
      console.error("Roadmap generation failed:", err);
      setError("Failed to generate roadmap. Please try again or check your internet connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleComplete = (week: number) => {
    setCompletedSteps(prev => 
      prev.includes(week) ? prev.filter(w => w !== week) : [...prev, week]
    );
  };

  const roadmap = existingRoadmap;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900">Learning Roadmap</h1>
          <p className="text-slate-500">Your step-by-step path to master {targetRole} skills.</p>
        </div>
        
        <button 
          onClick={handleGenerate}
          disabled={isLoading || !skillGapData}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-8 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-100"
        >
          {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
          {roadmap ? 'Regenerate Path' : 'Generate Roadmap'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 font-medium">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {!skillGapData && (
        <div className="p-12 text-center bg-indigo-50 rounded-3xl border border-indigo-100">
          <Map className="mx-auto text-indigo-400 mb-4" size={48} />
          <h3 className="text-xl font-bold text-indigo-900">Skill Analysis Required</h3>
          <p className="text-indigo-700 mt-2">Identify your skill gaps first to generate a customized roadmap.</p>
        </div>
      )}

      {roadmap && (
        <div className="space-y-6">
          <div className="flex items-center justify-between px-6 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                {Math.round((completedSteps.length / roadmap.length) * 100)}%
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Overall Progress</h4>
                <p className="text-sm text-slate-500">{completedSteps.length} of {roadmap.length} weeks completed</p>
              </div>
            </div>
            <div className="w-64 bg-slate-100 h-2.5 rounded-full overflow-hidden hidden md:block">
              <div 
                className="h-full bg-indigo-600 transition-all duration-1000" 
                style={{ width: `${(completedSteps.length / roadmap.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-4">
            {roadmap.map((step) => (
              <div 
                key={step.week}
                className={`bg-white border rounded-3xl overflow-hidden transition-all duration-300 ${
                  completedSteps.includes(step.week) ? 'border-emerald-200' : 'border-slate-200'
                }`}
              >
                <div 
                  className={`p-6 flex items-center justify-between cursor-pointer ${
                    completedSteps.includes(step.week) ? 'bg-emerald-50/30' : 'bg-white'
                  }`}
                  onClick={() => setExpandedWeek(expandedWeek === step.week ? null : step.week)}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                      completedSteps.includes(step.week) ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      W{step.week}
                    </div>
                    <div>
                      <h3 className={`text-lg font-bold ${completedSteps.includes(step.week) ? 'text-emerald-900 line-through opacity-60' : 'text-slate-900'}`}>
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-500">{step.topics.length} core topics</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleComplete(step.week);
                      }}
                      className={`p-2 rounded-xl border transition-all ${
                        completedSteps.includes(step.week) 
                          ? 'bg-emerald-600 border-emerald-600 text-white' 
                          : 'bg-white border-slate-200 text-slate-400 hover:border-emerald-400 hover:text-emerald-500'
                      }`}
                    >
                      <CheckCircle size={20} />
                    </button>
                    {expandedWeek === step.week ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>

                {expandedWeek === step.week && (
                  <div className="px-6 pb-8 pt-2 animate-in slide-in-from-top-4 duration-300 grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-slate-100 mt-2">
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <Layers size={14} /> Key Topics
                        </h4>
                        <ul className="space-y-2">
                          {step.topics.map((t, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-slate-700 text-sm">
                              <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <BookOpen size={14} /> Practice Ideas
                        </h4>
                        <ul className="space-y-2">
                          {step.practiceIdeas.map((p, idx) => (
                            <li key={idx} className="p-3 bg-slate-50 rounded-xl text-slate-600 text-sm italic">
                              "{p}"
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                          <ExternalLink size={14} /> Recommended Resources
                        </h4>
                        <div className="space-y-2">
                          {step.resources.map((res, idx) => (
                            <a 
                              key={idx} 
                              href={res.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block p-4 border border-slate-100 rounded-2xl hover:bg-indigo-50 hover:border-indigo-100 transition-all group"
                            >
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-800 text-sm group-hover:text-indigo-700">{res.name}</span>
                                <ExternalLink size={14} className="text-slate-300 group-hover:text-indigo-500" />
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapPage;
