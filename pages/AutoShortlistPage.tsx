
import React, { useState } from 'react';
import { 
  ListChecks, 
  Shield, 
  Sparkles, 
  Loader2, 
  HelpCircle, 
  User, 
  Filter, 
  AlertCircle, 
  TrendingUp, 
  Fingerprint,
  Plus,
  X,
  FileText,
  Search,
  CheckCircle2,
  Briefcase
} from 'lucide-react';
import { generateShortlist } from '../services/gemini';
import { ShortlistResponse, ShortlistedCandidate } from '../types';

const AutoShortlistPage: React.FC = () => {
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [jobRole, setJobRole] = useState('Senior Fullstack Engineer');
  const [mandatorySkill, setMandatorySkill] = useState('');
  const [skillsList, setSkillsList] = useState<string[]>(['React', 'TypeScript', 'Node.js']);
  const [shortlist, setShortlist] = useState<ShortlistResponse | null>(null);

  const mockCandidates = [
    { id: 'c1', name: 'Alex Thompson', resumeText: 'Senior developer with 8 years of React and Node experience. Built scalable cloud infra at TechCorp.', verifiedSkills: ['React', 'Node.js', 'AWS', 'TypeScript'] },
    { id: 'c2', name: 'Sarah Chen', resumeText: 'Expert Backend Engineer. Specialized in Go, Python, and Docker. Former Lead at DataFlow.', verifiedSkills: ['Go', 'Python', 'Docker', 'Kubernetes'] },
    { id: 'c3', name: 'Marcus Miller', resumeText: 'Frontend Specialist with 4 years mobile focus. Strong React Native and Firebase background.', verifiedSkills: ['React Native', 'Firebase', 'Redux', 'React'] },
    { id: 'c4', name: 'Elena Rodriguez', resumeText: 'Fullstack Junior. Skilled in Next.js and Tailwind. Very fast learner, high open source contribution.', verifiedSkills: ['React', 'Tailwind', 'Next.js', 'PostgreSQL'] },
  ];

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (mandatorySkill.trim() && !skillsList.includes(mandatorySkill.trim())) {
      setSkillsList([...skillsList, mandatorySkill.trim()]);
      setMandatorySkill('');
    }
  };

  const removeSkill = (skill: string) => {
    setSkillsList(skillsList.filter(s => s !== skill));
  };

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const result = await generateShortlist(jobRole, skillsList, mockCandidates, isAnonymous);
      setShortlist(result);
    } catch (err) {
      console.error(err);
      alert("Intelligence Engine timed out. Please reduce requirements or candidate pool size.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-indigo-100">
            <ListChecks size={32} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-slate-900">Campaign Intelligence</h1>
            <p className="text-slate-500">Define job requirements and find merit-matched talent instantly.</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-sm">
            <Shield className={isAnonymous ? "text-emerald-500" : "text-slate-300"} size={20} />
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Anti-Bias Protocol</span>
              <span className="text-xs font-bold text-slate-700">{isAnonymous ? 'ACTIVE' : 'DISABLED'}</span>
            </div>
            <button 
              onClick={() => setIsAnonymous(!isAnonymous)} 
              className={`ml-4 w-12 h-6 rounded-full relative transition-colors ${isAnonymous ? 'bg-emerald-500' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isAnonymous ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Step 1: Campaign Configuration */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm space-y-8">
            <div className="flex items-center gap-2 text-indigo-600">
              <Briefcase size={20} />
              <h3 className="text-xl font-bold uppercase tracking-tight">1. Define Campaign</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Target Job Role</label>
                <input 
                  type="text"
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Mandatory Skills</label>
                <form onSubmit={handleAddSkill} className="relative">
                  <input 
                    type="text"
                    value={mandatorySkill}
                    onChange={(e) => setMandatorySkill(e.target.value)}
                    placeholder="Type a skill and press Enter..."
                    className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-700 focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
                  />
                  <button type="submit" className="absolute right-2 top-2 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">
                    <Plus size={20} />
                  </button>
                </form>
                
                <div className="flex flex-wrap gap-2">
                  {skillsList.map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 rounded-xl text-xs font-bold flex items-center gap-2 animate-in zoom-in duration-300">
                      {skill}
                      <button onClick={() => removeSkill(skill)} className="hover:text-indigo-900"><X size={14} /></button>
                    </span>
                  ))}
                  {skillsList.length === 0 && <span className="text-xs text-slate-400 italic">No hard requirements added yet.</span>}
                </div>
              </div>
            </div>

            <button 
              onClick={handleRunAnalysis} 
              disabled={isAnalyzing || skillsList.length === 0}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-xl shadow-indigo-100 disabled:bg-slate-200 disabled:shadow-none"
            >
              {isAnalyzing ? <Loader2 className="animate-spin" /> : <Sparkles />} 
              {isAnalyzing ? 'Analyzing Talent Pool...' : 'Run Merit Analysis'}
            </button>
          </div>

          <div className="bg-slate-900 p-8 rounded-[40px] text-white space-y-6 relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <h4 className="font-bold flex items-center gap-2"><Fingerprint size={20} className="text-indigo-400" /> Merit Logic</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                The AI prioritizes candidates who have "Verified" status in the Skill Sandbox. 
                Prestigious employer names are de-prioritized to favor proven technical DNA.
              </p>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
          </div>
        </div>

        {/* Results: Shortlist Rendering */}
        <div className="lg:col-span-8 space-y-6">
          {!shortlist && !isAnalyzing ? (
            <div className="h-full bg-white rounded-[40px] border-2 border-dashed border-slate-200 p-20 flex flex-col items-center justify-center text-center space-y-6">
               <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                 <Search size={48} />
               </div>
               <div className="space-y-2">
                 <h3 className="text-2xl font-black text-slate-400">Analysis Pending</h3>
                 <p className="text-slate-400 max-w-sm">Configure your hiring campaign requirements and click "Run Merit Analysis" to start shortlisting candidates.</p>
               </div>
            </div>
          ) : isAnalyzing ? (
            <div className="bg-white rounded-[40px] border border-slate-200 p-20 text-center space-y-8 shadow-sm">
              <div className="relative w-32 h-32 mx-auto">
                <div className="absolute inset-0 border-8 border-indigo-50 rounded-full"></div>
                <div className="absolute inset-0 border-8 border-indigo-600 rounded-full border-t-transparent animate-[spin_1.5s_linear_infinite]"></div>
                <Sparkles size={40} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400 animate-pulse" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-slate-900">Merit Check in Progress...</h3>
                <p className="text-slate-500 max-w-md mx-auto italic">
                  "Gemini is currently cross-referencing candidate skill portfolios against your mandatory requirements."
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[40px] border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-500">
              <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/30">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900">Campaign Match: {jobRole}</h3>
                  <p className="text-xs text-slate-500 font-medium">{shortlist?.summary}</p>
                </div>
                <div className="flex gap-3">
                  <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-200">
                    High Confidence Analysis
                  </span>
                </div>
              </div>
              
              <div className="divide-y divide-slate-100">
                {shortlist?.candidates.map((candidate, idx) => (
                  <div key={candidate.id} className="p-8 hover:bg-slate-50/50 transition-all space-y-6 group">
                    <div className="flex items-start justify-between gap-8">
                      <div className="flex items-center gap-6 flex-1">
                        <div className="text-3xl font-black text-slate-100 group-hover:text-indigo-100 transition-colors w-12 text-center">
                          {idx + 1}
                        </div>
                        
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all shrink-0 ${isAnonymous ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                          {isAnonymous ? <Shield size={28} className="text-indigo-400" /> : <User size={28} className="text-indigo-600" />}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className={`text-xl font-black text-slate-900 ${isAnonymous ? 'italic' : ''}`}>
                              {candidate.name}
                            </h4>
                            {candidate.score > 90 && (
                              <span className="text-[10px] font-black bg-amber-100 text-amber-700 px-2 py-0.5 rounded flex items-center gap-1">
                                <Sparkles size={10} /> ELITE MATCH
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-2 mt-3">
                            {candidate.technicalMatch.map(s => (
                              <span key={s} className="text-[9px] px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg font-bold uppercase tracking-widest">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right shrink-0">
                        <div className="text-4xl font-black text-indigo-600 leading-none">{candidate.score}%</div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Merit Match</p>
                        <button 
                          onClick={() => setSelectedCandidate(selectedCandidate === candidate.id ? null : candidate.id)} 
                          className="text-[10px] font-black text-indigo-400 hover:text-indigo-600 uppercase tracking-widest flex items-center justify-end gap-1 mt-4 transition-colors"
                        >
                          {selectedCandidate === candidate.id ? 'Close Details' : 'View Intelligence Report'} <HelpCircle size={12} />
                        </button>
                      </div>
                    </div>
                    
                    {selectedCandidate === candidate.id && (
                      <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-200 animate-in slide-in-from-top-4 duration-300 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <h5 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                              <Sparkles size={14} className="text-indigo-600" /> Explainable Logic
                            </h5>
                            <p className="text-slate-600 text-sm leading-relaxed border-l-4 border-indigo-500 pl-4 bg-white/50 p-4 rounded-r-xl shadow-sm">
                              "{candidate.reasoning}"
                            </p>
                          </div>
                          
                          <div className="space-y-4">
                            <h5 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                              <TrendingUp size={14} className="text-emerald-500" /> Requirement Gaps
                            </h5>
                            <div className="space-y-2">
                              {candidate.requirementGaps.length > 0 ? (
                                candidate.requirementGaps.map(gap => (
                                  <div key={gap} className="flex items-center gap-3 px-4 py-2 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl text-xs font-bold">
                                    <X size={14} /> Missing: {gap}
                                  </div>
                                ))
                              ) : (
                                <div className="flex items-center gap-3 px-4 py-2 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl text-xs font-bold">
                                  <CheckCircle2 size={14} /> All Requirements Met
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="pt-4 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
                           <div className="flex items-center gap-6">
                             <div className="text-center">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Behavioral Sync</p>
                               <p className="text-xs font-bold text-slate-700">{candidate.softSkillAnalysis}</p>
                             </div>
                           </div>
                           <div className="flex gap-3 w-full md:w-auto">
                              <button className="flex-1 md:flex-none px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">Schedule Interview</button>
                              <button className="flex-1 md:flex-none px-8 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all">Export Profile</button>
                           </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="p-8 bg-slate-50/30 text-center border-t border-slate-50">
                <button className="text-indigo-600 font-black text-sm hover:underline tracking-tight flex items-center justify-center gap-2 mx-auto">
                  View Remaining 124 Matching Talent <TrendingUp size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AutoShortlistPage;
